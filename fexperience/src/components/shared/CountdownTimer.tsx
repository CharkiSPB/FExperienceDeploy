'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FlipText } from '@/components/ui/FlipText';
import { declension } from '@/lib/utils';
import { ParticipantModal } from '@/components/shared/ParticipantModal';
import { expeditions } from '@/data/expeditions';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

type CountdownTimerProps = {
  expeditionSlug?: string;
};

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
    <div className="flex flex-col items-center justify-center px-2 md:px-8 lg:px-10">
      <div className="text-4xl md:text-6xl lg:text-5xl font-bold text-white tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-2 md:mt-3 text-xs md:text-base text-white font-medium uppercase tracking-wide">
        {declinedLabel}
      </div>
    </div>
  );
}

export function CountdownTimer({ expeditionSlug = 'vietnam' }: CountdownTimerProps) {
  //  Находим экспедицию по slug (или берем Вьетнам по умолчанию)
  const expedition = useMemo(
    () => expeditions.find(e => e.slug === expeditionSlug),
    [expeditionSlug]
  );
  
  // Если экспедиция не найдена или у нее нет таймера — ничего не рендерим
  if (!expedition?.timer?.enabled || !expedition.timer.targetDate) {
    return null;
  }

  // 🔹 ИСПРАВЛЕНИЕ: Добавляем безопасный доступ (?.) и значение по умолчанию
  const targetDate = useMemo(() => {
    const dateStr = expedition?.timer?.targetDate || '';
    return dateStr ? new Date(dateStr) : new Date();
  }, [expedition?.timer?.targetDate]);
  
  const remainingSpots = expedition.spots ?? 0;
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !targetDate) return;

    const tick = () => {
      setTimeLeft(calcTimeLeft(targetDate));
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [targetDate, mounted]);

  const formatDate = (dateStr: string) => {
    return dateStr.toUpperCase();
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[883px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full bg-[#FF8800] rounded-[44px] p-3 md:p-12 flex flex-col items-center justify-center"
        >
          <div className="text-xl md:text-3xl lg:text-4xl font-bold text-[#0D0805] mb-3 text-center">
            ДО СТАРТА ЭКСПЕДИЦИИ
          </div>
          
          <div className="text-white/90 text-sm md:text-base lg:text-lg mb-3 text-center font-bold">
            {expedition.country.toUpperCase()} {formatDate(expedition.dates)}:
          </div>

          {remainingSpots > 0 && (
            <div className="bg-white backdrop-blur-sm px-4 md:px-6 py-2 rounded-full mb-6 md:mb-5">
              <span className="text-[#0D0805] text-sm md:text-base font-bold">
                Осталось мест: {remainingSpots}
              </span>
            </div>
          )}

          <div className="flex flex-wrap justify-center items-center gap-1 md:gap-4 lg:gap-2 mb-8 md:mb-12">
            <TimerUnit value={timeLeft.days} label="days" />
            <div className="hidden md:block w-0.5 h-16 bg-[#0D0805]/30" />
            <TimerUnit value={timeLeft.hours} label="hours" />
            <div className="hidden md:block w-0.5 h-16 bg-[#0D0805]/30" />
            <TimerUnit value={timeLeft.minutes} label="minutes" />
            <div className="hidden md:block w-0.5 h-16 bg-[#0D0805]/30" />
            <TimerUnit value={timeLeft.seconds} label="seconds" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="group w-full max-w-[400px] bg-[#0D0805] text-white font-bold py-4 px-8 rounded-full text-base md:text-lg hover:bg-[#1A1A1A] transition-colors duration-300 cursor-pointer"
          >
            <FlipText className="flex items-center justify-center">УЧАСТВОВАТЬ В ЭКСПЕДИЦИИ</FlipText>
          </motion.button>
        </motion.div>
      </div>

      <ParticipantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
