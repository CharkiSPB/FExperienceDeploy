import { NextResponse } from 'next/server';
import { z } from 'zod';

// 🔹 Схема должна точно совпадать с данными из модалки
const leadSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  phone: z.string().min(5, 'Введите корректный телефон'),
  email: z.string().email('Некорректный email').optional().or(z.literal('')),
  expedition: z.string().optional(),
  leadType: z.enum(['consultation', 'expedition']), // 🔹 Тип заявки
  consent: z.boolean().refine((val) => val === true, { message: 'Необходимо согласие' }),
});

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const data = leadSchema.parse(body);

      // 🔹 Отключена реальная отправка в AmoCRM для демо
      // Имитация задержки для реалистичного UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Весь блок отправки в AmoCRM закомментирован:
      /*
      const webhookUrl = process.env.AMOCRM_WEBHOOK_URL;
      if (!webhookUrl) {
        return NextResponse.json({ error: 'AmoCRM webhook not configured' }, { status: 500 });
      }

      // 🔹 Формируем payload для AmoCRM
      const payload = {
        add: [
          {
            name: `Заявка: ${data.name}`,
            custom_fields_values: [
              { field_code: 'PHONE', values: [{ value: data.phone, enum_code: 'WORK' }] },
              { field_code: 'EMAIL', values: [{ value: data.email || '' }] },
            ],
            // 🔹 Теги сразу разделяют заявки в CRM
            tags: data.leadType === 'consultation' ? ['Диагностика'] : ['Экспедиция'],
            _embedded: {
              notes: [
                {
                  note_type: 'common',
                  text: `Тип: ${data.leadType === 'consultation' ? 'Запрос диагностики' : 'Заявка на участие'}\nЭкспедиция: ${data.expedition || 'Не выбрана'}\nСогласие 152-ФЗ: Получено`,
                },
              ],
            },
          },
        ],
      };

      // 🔹 Отправка в AmoCRM
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AmoCRM API Error:', errorText);
        return NextResponse.json({ error: 'Failed to send to AmoCRM' }, { status: 502 });
      }
      */

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error('Lead API Error:', error);
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
      }
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }