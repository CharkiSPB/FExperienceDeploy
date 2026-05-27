'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  phone: z.string().min(10, 'Введите корректный номер'),
  consent: z.boolean().refine(val => val === true, 'Необходимо согласие'),
});

type FormValues = z.infer<typeof formSchema>;

export function DiagnosticsForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phone: '', consent: false }
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      // TODO: Заменить на реальный вызов /api/consultation с Turnstile
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Diagnostics payload:', data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full min-h-[320px] flex flex-col items-center justify-center text-center p-6">
        <h3 className="text-2xl font-serif text-white mb-2">Заявка отправлена!</h3>
        <p className="text-[#A0A0A0] mb-4">Наш эксперт свяжется с вами в течение 24 часов.</p>
        <button onClick={() => setStatus('idle')} className="text-[#F7931A] hover:text-[#FFA733] underline transition-colors">Отправить ещё</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input type="text" placeholder="Ваше имя" {...register('name')} className="w-full bg-[#110F0D] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:border-[#F7931A] focus:outline-none transition-colors" />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input type="email" placeholder="Email" {...register('email')} className="w-full bg-[#110F0D] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:border-[#F7931A] focus:outline-none transition-colors" />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <input type="tel" placeholder="Телефон" {...register('phone')} className="w-full bg-[#110F0D] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:border-[#F7931A] focus:outline-none transition-colors" />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
      </div>
      <div className="flex items-start gap-3 pt-2">
        <input type="checkbox" {...register('consent')} id="consent" className="mt-1 accent-[#F7931A] w-4 h-4" />
        <label htmlFor="consent" className="text-sm text-[#A0A0A0] leading-snug cursor-pointer">
          Я согласен с <a href="/privacy" className="text-[#F7931A] hover:text-[#FFA733] underline">политикой конфиденциальности</a>
        </label>
      </div>
      {errors.consent && <p className="text-red-400 text-xs">{errors.consent.message}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white py-3 rounded-lg font-medium hover:from-[#FFA733] hover:to-[#F7931A] transition-all shadow-lg shadow-[#F7931A]/20 disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? 'Отправка...' : 'Получить анализ'}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs text-center">Произошла ошибка. Попробуйте позже.</p>}
    </form>
  );
}