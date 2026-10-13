'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, ChevronDown, Check } from 'lucide-react';
import { expeditions, getNearestExpedition } from '@/data/expeditions';

// ВАЖНО: дублирует логику RequestModal (участник) для отдельной страницы /form.
// Правило: меняешь валидацию/поля здесь — повтори там же, и наоборот.
// Выделено отдельно специально, чтобы не трогать боевую модалку.
const formSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое').max(150),
  phone: z.string().min(10, 'Введите корректный телефон').max(30),
  email: z.string().email('Некорректный email').max(254).optional().or(z.literal('')),
  expedition: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const activeExpeditions = expeditions.filter((e) => e.status === 'active');
  const nearest = getNearestExpedition(expeditions);
  const preselect = nearest?.slug ?? activeExpeditions[0]?.slug ?? '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { consent: false, expedition: preselect },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'participant',
          expedition: data.expedition || preselect || '',
          name: data.name,
          phone: data.phone,
          email: data.email || '',
          consent: data.consent,
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.error || 'Ошибка отправки');
      }
      setIsSuccess(true);
      reset();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="request-modal__success">
        <span className="request-modal__success-check" aria-hidden="true">
          <Check className="w-6 h-6" />
        </span>
        <h3 className="request-modal__success-title">Заявка отправлена</h3>
        <p className="request-modal__success-text">
          Спасибо за заявку. Эксперт свяжется с вами в ближайшее время.
        </p>
        <Link href="/" className="btn-text" >
          Вернуться на главную <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="request-modal__title">Стать участником</h1>
      <span className="request-modal__title-line" aria-hidden="true" />

      <form onSubmit={handleSubmit(onSubmit)} className="request-modal__form" noValidate>
        <div className="request-field">
          <label className="request-field__label" htmlFor="formpage-expedition">
            <span className="req" aria-hidden="true">*</span>Бизнес-экспедиция
          </label>
          <div className="request-select-wrap">
            <select
              id="formpage-expedition"
              {...register('expedition')}
              className="request-select"
              disabled={isSubmitting}
            >
              <option value="">Выберите экспедицию</option>
              {activeExpeditions.map((exp) => (
                <option key={exp.slug} value={exp.slug}>
                  {exp.country}{exp.dates ? ` — ${exp.dates}` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="request-select__chevron" aria-hidden="true" />
          </div>
        </div>

        <div className="request-field">
          <label className="request-field__label" htmlFor="formpage-name">
            <span className="req" aria-hidden="true">*</span>Ваше имя
          </label>
          <div>
            <input
              id="formpage-name"
              maxLength={150}
              {...register('name')}
              placeholder="Иван Иванов"
              autoComplete="name"
              className="request-input"
              disabled={isSubmitting}
            />
            {errors.name && <p className="request-error">{errors.name.message}</p>}
          </div>
        </div>

        <div className="request-field">
          <label className="request-field__label" htmlFor="formpage-phone">
            <span className="req" aria-hidden="true">*</span>Телефон
          </label>
          <div>
            <input
              id="formpage-phone"
              maxLength={30}
              {...register('phone')}
              placeholder="+7 (___) ___ __ __"
              autoComplete="tel"
              inputMode="tel"
              className="request-input"
              disabled={isSubmitting}
            />
            {errors.phone && <p className="request-error">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="request-field">
          <label className="request-field__label" htmlFor="formpage-email">
            E-mail
          </label>
          <div>
            <input
              id="formpage-email"
              maxLength={254}
              {...register('email')}
              placeholder="example@mail.ru"
              autoComplete="email"
              inputMode="email"
              className="request-input"
              disabled={isSubmitting}
            />
            {errors.email && <p className="request-error">{errors.email.message}</p>}
          </div>
        </div>

        <div className="request-consent">
          <input
            id="formpage-consent"
            type="checkbox"
            {...register('consent')}
            disabled={isSubmitting}
          />
          <label htmlFor="formpage-consent">
            Я согласен с политикой{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              обработки персональных данных
            </a>
          </label>
        </div>
        {errors.consent && <p className="request-error">{errors.consent.message}</p>}

        <button type="submit" disabled={isSubmitting} className="request-submit">
          {isSubmitting ? (
            <>
              <span className="request-submit__spinner" aria-hidden="true" />
              Отправляем...
            </>
          ) : (
            'Оставить заявку'
          )}
        </button>
        {submitError && (
          <p className="request-error request-error--submit" role="alert">
            {submitError}
          </p>
        )}
      </form>

      <p className="request-privacy-note">
        <Shield aria-hidden="true" />
        <span>
          Мы гарантируем конфиденциальность ваших данных и не передаем их третьим лицам
        </span>
      </p>
    </>
  );
}
