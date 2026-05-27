'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, Loader2 } from 'lucide-react';

// 1. Схема валидации
const formSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  phone: z.string().min(10, 'Введите корректный телефон'),
  email: z.string().email('Некорректный email'),
  consent: z.boolean().refine(val => val === true, 'Необходимо согласие'),
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

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 🔹 Имитация отправки для демо (данные не отправляются)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Реальный fetch отключен для демо:
      // await fetch('/api/consultation', { method: 'POST', body: JSON.stringify(data) });

      setIsSuccess(true);
    } catch (err) {
      setError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Состояние успеха
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Заявка отправлена!</h3>
        <p className="text-[#A0A0A0] max-w-sm">
          Мы свяжемся с вами в ближайшее время, чтобы обсудить детали участия в экспедиции.
        </p>
        <button
          onClick={() => { setIsSuccess(false); reset(); }}
          className="mt-6 text-sm text-[#F7931A] hover:text-[#FFA733] underline underline-offset-4 transition-colors"
        >
          Отправить еще одну
        </button>
      </div>
    );
  }

  // 3. Форма
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Поле Имя */}
      <div>
        <input
          {...register('name')}
          type="text"
          placeholder="Ваше имя"
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F7931A] transition-colors"
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Поле Email */}
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F7931A] transition-colors"
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* Поле Телефон */}
      <div>
        <input
          {...register('phone')}
          type="tel"
          placeholder="Телефон"
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F7931A] transition-colors"
          disabled={isSubmitting}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      {/* Согласие */}
      <div className="flex items-start gap-2 pt-2">
        <input
          id="consent"
          type="checkbox"
          {...register('consent')}
          className="mt-1 w-4 h-4 accent-[#F7931A] rounded border-[#2A2A2A] bg-[#1A1A1A]"
          disabled={isSubmitting}
        />
        <label htmlFor="consent" className="text-xs text-[#A0A0A0] leading-tight">
          Я согласен с <a href="/privacy" target="_blank" className="text-[#F7931A] hover:underline">политикой конфиденциальности</a>
        </label>
      </div>
      {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

      {/* Кнопка отправки */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 py-3 rounded-lg font-medium bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white hover:from-[#FFA733] hover:to-[#F7931A] transition-all shadow-lg shadow-[#F7931A]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Отправка...
          </>
        ) : (
          'Оставить заявку'
        )}
      </button>

      {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
    </form>
  );
}