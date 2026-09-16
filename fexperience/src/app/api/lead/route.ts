import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendLeadEmail } from '@/lib/mail';
import { expeditions } from '@/data/expeditions';

const partnerSchema = z.object({
  formType: z.literal('partner'),
  expedition: z.string().min(1, 'Выберите экспедицию').max(200),
  fullName: z.string().min(2, 'Минимум 2 символа').max(150),
  position: z.string().min(2, 'Укажите должность').max(200),
  company: z.string().min(2, 'Укажите компанию').max(200),
  phone: z.string().min(10, 'Введите корректный телефон').max(30),
  consent: z.boolean().refine((val) => val === true, { message: 'Необходимо согласие' }),
});

const participantSchema = z.object({
  formType: z.literal('participant'),
  expedition: z.string().min(1, 'Выберите экспедицию').max(200),
  name: z.string().min(2, 'Минимум 2 символа').max(150),
  phone: z.string().min(10, 'Введите корректный телефон').max(30),
  email: z.string().email('Некорректный email').max(254).optional().or(z.literal('')),
  consent: z.boolean().refine((val) => val === true, { message: 'Необходимо согласие' }),
});

const subscribeSchema = z.object({
  formType: z.literal('subscribe'),
  email: z.string().email('Некорректный email').max(254),
});

// Простой in-memory троттлинг: максимум 10 заявок с одного IP за 10 минут.
// Защита от примитивного флуда (не распределённая — для одного инстанса standalone достаточно).
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

const leadSchema = z.discriminatedUnion('formType', [partnerSchema, participantSchema, subscribeSchema]);

function buildAmoPayload(data: z.infer<typeof leadSchema>) {
  if (data.formType === 'subscribe') {
    return {
      add: [
        {
          name: `Подписка: ${data.email}`,
          custom_fields_values: [
            { field_code: 'EMAIL', values: [{ value: data.email }] },
          ],
          tags: ['Подписка'],
          _embedded: {
            notes: [
              {
                note_type: 'common',
                text: 'Участник подписался (форма в подвале сайта)',
              },
            ],
          },
        },
      ],
    };
  }

  if (data.formType === 'partner') {
    return {
      add: [
        {
          name: `Партнёр: ${data.fullName}`,
          custom_fields_values: [
            { field_code: 'PHONE', values: [{ value: data.phone, enum_code: 'WORK' }] },
          ],
          tags: ['Партнёрство'],
          _embedded: {
            notes: [
              {
                note_type: 'common',
                text: `Должность: ${data.position}\nКомпания: ${data.company}\nЭкспедиция: ${data.expedition}\nСогласие 152-ФЗ: Получено`,
              },
            ],
          },
        },
      ],
    };
  }

  const emailField = data.email
    ? [{ field_code: 'EMAIL', values: [{ value: data.email }] }]
    : [];

  return {
    add: [
      {
        name: `Участник: ${data.name}`,
        custom_fields_values: [
          { field_code: 'PHONE', values: [{ value: data.phone, enum_code: 'WORK' }] },
          ...emailField,
        ],
        tags: ['Экспедиция'],
        _embedded: {
          notes: [
            {
              note_type: 'common',
              text: `Экспедиция: ${data.expedition}\nEmail: ${data.email || '—'}\nСогласие 152-ФЗ: Получено`,
            },
          ],
        },
      },
    ],
  };
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json({ error: 'Слишком много запросов. Попробуйте позже.' }, { status: 429 });
    }

    const body = await request.json();
    const data = leadSchema.parse(body);

    // Преобразуем slug (vietnam, sakhalin) в читаемое название страны (Вьетнам, Сахалин)
    // У подписки поля expedition нет — пропускаем
    if (data.formType !== 'subscribe') {
      const expedition = expeditions.find(e => e.slug === data.expedition);
      if (expedition) {
        data.expedition = expedition.country;
      }
    }

    const webhookUrl = process.env.AMOCRM_WEBHOOK_URL;

    // Только HTTPS — PII лидов нельзя слать по незашифрованному HTTP
    if (webhookUrl && webhookUrl.startsWith('https://')) {
      try {
        const payload = buildAmoPayload(data);
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          return NextResponse.json({ success: true }, { status: 200 });
        }

        const errorText = await response.text();
        console.error('AmoCRM API Error:', errorText);
      } catch (e) {
        console.warn('AmoCRM unavailable, falling back to email:', e);
      }
    }

    await sendLeadEmail(data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Lead API Error:', error);
    if (error instanceof z.ZodError) {
      // Клиенту — только первое сообщение, без внутренней структуры схемы
      const message = error.issues[0]?.message || 'Некорректные данные формы';
      return NextResponse.json({ error: message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
