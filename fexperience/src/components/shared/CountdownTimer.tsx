'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { declension } from '@/lib/utils';
import { RequestModal } from '@/components/shared/RequestModal';
import { expeditions } from '@/data/expeditions';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function calcTimeLeft(targetDate: Date): TimeLeft {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimerUnit({ value, label }: { value: number; label: string }) {
  const labelSets = {
    days: ['день', 'дня', 'дней'],
    hours: ['час', 'часа', 'часов'],
    minutes: ['минута', 'минуты', 'минут'],
    seconds: ['секунда', 'секунды', 'секунд'],
  };

  const declinedLabel = declension(value, labelSets[label as keyof typeof labelSets]);

  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-10">
      <div className="text-5xl md:text-6xl lg:text-5xl font-bold text-white tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-3 text-sm md:text-base text-[#000004] font-medium uppercase tracking-wide">
        {declinedLabel}
      </div>
    </div>
  );
}

export function CountdownTimer() {
  // 🔹 Находим экспедицию Вьетнам
  const vietnamExpedition = useMemo(
    () => expeditions.find(e => e.slug === 'vietnam'),
    []
  );
  
  // 🔹 Дата старта (из экспедиции или хардкод)
  const targetDate = useMemo(
    () => vietnamExpedition?.timer?.targetDate 
      ? new Date(vietnamExpedition.timer.targetDate) 
      : new Date('2026-10-11T00:00:00'),
    [vietnamExpedition]
  );
  
  // 🔹 Количество мест (из экспедиции)
  const remainingSpots = vietnamExpedition?.spots ?? 17;
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const tick = () => {
      setTimeLeft(calcTimeLeft(targetDate));
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [targetDate, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-[883px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[409px] bg-[#FF8800] rounded-[44px] p-8 md:p-12 flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#000004] mb-3 text-center">
            ДО СТАРТА ЭКСПЕДИЦИИ
          </div>
          
          <div className="text-white/90 text-sm md:text-base lg:text-lg mb-3 text-center font-bold">
            ВЬЕТНАМ 11-16 ОКТЯБРЯ 2026:
          </div>

          {/* 🔹 Динамическое количество мест */}
          <div className="bg-white backdrop-blur-sm px-6 py-2 rounded-full mb-10 md:mb-5">
            <span className="text-[#000004] text-sm md:text-base font-bold">
              Осталось мест: {remainingSpots}
            </span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 lg:gap-2 mb-12">
            <TimerUnit value={timeLeft.days} label="days" />
            <div className="hidden md:block w-0.5 h-18 bg-[#000004]/30" />
            <TimerUnit value={timeLeft.hours} label="hours" />
            <div className="hidden md:block w-0.5 h-18 bg-[#000004]/30" />
            <TimerUnit value={timeLeft.minutes} label="minutes" />
            <div className="hidden md:block w-0.5 h-18 bg-[#000004]/30" />
            <TimerUnit value={timeLeft.seconds} label="seconds" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full max-w-[400px] bg-[#0D0805] text-white font-bold py-4 px-8 rounded-full text-base md:text-lg hover:bg-[#1A1A1A] transition-colors duration-300 cursor-pointer"
          >
            УЧАСТВОВАТЬ В ЭКСПЕДИЦИИ
          </motion.button>
        </motion.div>
      </div>

      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
