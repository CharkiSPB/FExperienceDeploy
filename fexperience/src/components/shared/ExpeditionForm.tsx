'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, Loader2 } from 'lucide-react';
import { expeditions } from '@/data/expeditions';

// 1. Схема валидации — как в ParticipantModal
const formSchema = z.object({
  expedition: z.string().min(1, 'Выберите экспедицию'),
  name: z.string().min(2, 'Минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный телефон'),
  email: z.string().email('Некорректный email'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ExpeditionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: false,
    },
  });

  const activeExpeditions = expeditions.filter(e => e.status === 'active');

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Реальная отправка (как в ParticipantModal)
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'participant' }),
      });
      if (!response.ok) throw new Error('Ошибка отправки');

      setIsSuccess(true);
    } catch {
      setError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Состояние успеха
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Заявка отправлена!</h3>
        <p className="text-[#A0A0A0] max-w-sm">
          Эксперт свяжется с вами в ближайшее время.
        </p>
        <button
          onClick={() => { setIsSuccess(false); reset(); }}
          className="mt-6 text-sm text-[#FF8800] hover:text-[#FFA733] underline underline-offset-4 transition-colors"
        >
          Отправить еще одну
        </button>
      </div>
    );
  }

  // 3. Форма — поля как в ParticipantModal
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Бизнес-экспедиция */}
      <div className="flex items-start gap-3">
        <label className="w-[180px] flex-shrink-0 flex items-center gap-1.5 text-sm text-white/80 pt-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8800] flex-shrink-0 mt-0.5" />
          Бизнес-экспедиция
        </label>
        <div className="flex-1 min-w-0">
          <select
            {...register('expedition')}
            className="w-full bg-[#1A1A1A]/80 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF8800] transition-colors appearance-none"
            disabled={isSubmitting}
          >
            <option value="">Выберите экспедицию</option>
            {activeExpeditions.map(exp => (
              <option key={exp.slug} value={exp.slug}>{exp.country} — {exp.dates}</option>
            ))}
          </select>
          {errors.expedition && <p className="text-red-500 text-xs mt-0.5">{errors.expedition.message}</p>}
        </div>
      </div>

      {/* Ваше имя */}
      <div className="flex items-start gap-3">
        <label className="w-[180px] flex-shrink-0 flex items-center gap-1.5 text-sm text-white/80 pt-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8800] flex-shrink-0" />
          Ваше имя
        </label>
        <div className="flex-1 min-w-0">
          <input
            {...register('name')}
            placeholder="Иван Иванов"
            className="w-full bg-[#1A1A1A]/80 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#FF8800] transition-colors"
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name.message}</p>}
        </div>
      </div>

      {/* Телефон */}
      <div className="flex items-start gap-3">
        <label className="w-[180px] flex-shrink-0 flex items-center gap-1.5 text-sm text-white/80 pt-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8800] flex-shrink-0" />
          Телефон
        </label>
        <div className="flex-1 min-w-0">
          <input
            type="tel"
            placeholder="+7 (___) ___ __ __"
            {...register('phone')}
            className="w-full bg-[#1A1A1A]/80 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#FF8800] transition-colors"
            disabled={isSubmitting}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone.message}</p>}
        </div>
      </div>

      {/* E-mail */}
      <div className="flex items-start gap-3">
        <label className="w-[180px] flex-shrink-0 flex items-center gap-1.5 text-sm text-white/80 pt-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8800] flex-shrink-0" />
          E-mail
        </label>
        <div className="flex-1 min-w-0">
          <input
            type="email"
            placeholder="example@mail.ru"
            {...register('email')}
            className="w-full bg-[#1A1A1A]/80 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#FF8800] transition-colors"
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>}
        </div>
      </div>

      {/* Согласие */}
      <div className="flex items-start gap-2 pt-2">
        <input
          id="form-consent"
          type="checkbox"
          {...register('consent')}
          className="mt-1 w-4 h-4 accent-[#FF8800] rounded border-[#2A2A2A] bg-[#1A1A1A] cursor-pointer flex-shrink-0"
          disabled={isSubmitting}
        />
        <label htmlFor="form-consent" className="text-xs text-[#A0A0A0] leading-tight cursor-pointer">
          Я согласен с политикой <a href="/privacy" target="_blank" className="text-[#FF8800] hover:underline">обработки персональных данных</a>
        </label>
      </div>
      {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>}

      {/* Кнопка */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4 py-3 rounded-lg font-medium bg-gradient-to-r from-[#FF8800] to-[#E8850F] text-white hover:from-[#FFA733] hover:to-[#FF8800] transition-all shadow-lg shadow-[#FF8800]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Отправка...
          </>
        ) : (
          'Стать участником'
        )}
      </button>

      {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
    </form>
  );
}
