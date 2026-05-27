'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { motion } from 'framer-motion';

const consultationSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  phone: z.string().min(10, 'Введите корректный номер'),
  company: z.string().min(2, 'Укажите название компании').optional(),
  goal: z.enum(['exploration', 'partnership', 'investment', 'expansion'], {
    error: 'Выберите цель обращения',
  }),
  consent: z.boolean().refine(val => val === true, 'Необходимо согласие на обработку данных'),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

export function ConsultationForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { name: '', email: '', phone: '', company: '', goal: 'exploration', consent: false }
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onSubmit = async (data: ConsultationFormValues) => {
    setStatus('loading');
    try {
      // TODO: Реальная интеграция с /api/consultation + Turnstile + логирование 152-ФЗ (Этап 10.4)
      await new Promise(resolve => setTimeout(resolve, 1200));
      console.log('Consultation payload:', data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 bg-[#110F0D] border border-[#2A2A2A] rounded-xl">
        <h3 className="text-2xl font-serif text-white mb-2">Заявка успешно отправлена!</h3>
        <p className="text-[#A0A0A0] mb-6 max-w-sm">Наш эксперт свяжется с вами в течение 24 часов для согласования времени консультации.</p>
        <button onClick={() => setStatus('idle')} className="text-[#F7931A] hover:text-[#FFA733] underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A] rounded-sm">
          Отправить ещё одну заявку
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#110F0D] border border-[#2A2A2A] rounded-xl p-6 md:p-8 space-y-5">
      <div>
        <label htmlFor="cf-name" className="block text-sm text-[#A0A0A0] mb-1.5">Имя</label>
        <input id="cf-name" type="text" placeholder="Как к вам обращаться?" {...register('name')} className="w-full bg-[#0D0805] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#555555] focus:border-[#F7931A] focus:outline-none transition-colors" />
        {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-email" className="block text-sm text-[#A0A0A0] mb-1.5">Email</label>
        <input id="cf-email" type="email" placeholder="your@email.com" {...register('email')} className="w-full bg-[#0D0805] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#555555] focus:border-[#F7931A] focus:outline-none transition-colors" />
        {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-phone" className="block text-sm text-[#A0A0A0] mb-1.5">Телефон</label>
        <input id="cf-phone" type="tel" placeholder="+7 (___) ___-__-__" {...register('phone')} className="w-full bg-[#0D0805] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#555555] focus:border-[#F7931A] focus:outline-none transition-colors" />
        {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-company" className="block text-sm text-[#A0A0A0] mb-1.5">Компания (опционально)</label>
        <input id="cf-company" type="text" placeholder="Название бизнеса" {...register('company')} className="w-full bg-[#0D0805] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#555555] focus:border-[#F7931A] focus:outline-none transition-colors" />
      </div>

      <div>
        <label htmlFor="cf-goal" className="block text-sm text-[#A0A0A0] mb-1.5">Цель обращения</label>
        <div className="relative">
          <select id="cf-goal" {...register('goal')} className="w-full bg-[#0D0805] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:border-[#F7931A] focus:outline-none transition-colors appearance-none">
            <option value="exploration">Изучение новых рынков</option>
            <option value="partnership">Поиск локальных партнёров</option>
            <option value="investment">Инвестиционные возможности</option>
            <option value="expansion">Масштабирование текущего бизнеса</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#A0A0A0]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
        {errors.goal && <p className="text-red-400 text-xs mt-1.5">{errors.goal.message}</p>}
      </div>

      <div className="flex items-start gap-3 pt-2">
        <input type="checkbox" id="cf-consent" {...register('consent')} className="mt-1 w-4 h-4 accent-[#F7931A] rounded cursor-pointer" />
        <label htmlFor="cf-consent" className="text-sm text-[#A0A0A0] leading-snug cursor-pointer select-none">
          Я согласен с <Link href="/privacy" className="text-[#F7931A] hover:underline transition-colors">политикой конфиденциальности</Link> и даю согласие на обработку персональных данных
        </label>
      </div>
      {errors.consent && <p className="text-red-400 text-xs">{errors.consent.message}</p>}

      <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white py-3.5 rounded-lg font-medium hover:from-[#FFA733] hover:to-[#F7931A] transition-all shadow-lg shadow-[#F7931A]/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#110F0D]">
        {isSubmitting ? 'Отправка...' : 'Записаться на консультацию'}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-sm text-center mt-2 bg-red-400/5 py-2 rounded">
          Произошла ошибка при отправке. Пожалуйста, попробуйте позже.
        </p>
      )}
    </form>
  );
}