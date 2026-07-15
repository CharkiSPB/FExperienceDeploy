'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FlipText } from '@/components/ui/FlipText';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { config } from '@/data/config';
import { expeditions } from '@/data/expeditions';
import { ParticipantModal } from '@/components/shared/ParticipantModal';
import { useExpedition } from '@/components/providers/ExpeditionContext';

export function Hero() {
  const visibleExpeditions = expeditions.filter(exp => exp.status === 'active');
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setActiveExpeditionSlug } = useExpedition();

  // 🔹 Проверяем cookies при загрузке
  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (accepted === 'true') {
      setCookiesAccepted(true);
    }
  }, []);

  // 🔹 Обработчик принятия cookies
  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setCookiesAccepted(true);
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: visibleExpeditions.length > 1,
    skipSnaps: false,
    dragFree: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setActiveIndex(idx);
      setActiveExpeditionSlug(visibleExpeditions[idx]?.slug ?? 'vietnam');
    };
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, visibleExpeditions, setActiveExpeditionSlug]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // 🔹 Форматируем даты: "11-16 октября 2026" → "16.10.2026 - 22.10.2026"
  const formatDates = (dateStr: string) => {
    if (!dateStr) return '';
    const match = dateStr.match(/(\d{1,2})-(\d{1,2})\s+([а-яА-ЯёЁ]+)\s+(\d{4})/);
    if (match) {
      const [, day1, day2, monthName, year] = match;
      const months: Record<string, string> = {
        'января': '01', 'февраля': '02', 'марта': '03', 'апреля': '04',
        'мая': '05', 'июня': '06', 'июля': '07', 'августа': '08',
        'сентября': '09', 'октября': '10', 'ноября': '11', 'декабря': '12'
      };
      const month = months[monthName.toLowerCase()] || '01';
      return `${day1}.${month}.${year} - ${day2}.${month}.${year}`;
    }
    return dateStr;
  };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-[#0D0805]">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {visibleExpeditions.map((expedition, index) => (
            <div key={expedition.slug} className="embla__slide relative flex-[0_0_100%] min-w-0 h-full">
              
              <HeroVideo
                videoSrc={`/videos/hero-${expedition.slug}`}
                poster={expedition.image}
                alt={expedition.title}
              />

              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center                     justify-center pt-8 md:pt-10 pb-8 font-bold font-serif">
                  
                  <div className="max-w-4xl text-center flex flex-col items-center w-full">
                      {/* 🔸 Оранжевая плашка с количеством мест */}
                      {expedition.spots && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="inline-block mb-4"
                        >
                          <span className="px-4 py-1.5 bg-[#F7931A] text-black text-sm font-semibold rounded-md">
                            Осталось мест: {expedition.spots}
                          </span>
                        </motion.div>
                      )}

                      {/* 🔸 Даты экспедиции (формат: 16.10.2026 - 22.10.2026) */}
                      {expedition.dates && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="mb-6"
                        >
                          <span className="text-[29.28px] font-bold text-white tracking-wide">
                            {formatDates(expedition.dates)}
                          </span>
                        </motion.div>
                      )}

                      {/* 🔸 Заголовок */}
                      <AnimatePresence mode="wait">
                        <motion.h1
                          key={`h1-${index}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-serif font-medium text-white leading-tight mb-10"
                        >
                          {expedition.slug === 'new-delhi' ? (
                            <>
                              {/* New Delhi: Forbes logo within title text */}
                              <span className="hidden md:block whitespace-nowrap">
                                <span>Деловой ужин </span>
                                <Image
                                  src="/images/forbes-logo-white.svg"
                                  alt="Forbes"
                                  width={160}
                                  height={38}
                                  className="inline-block h-[0.8em] w-auto align-middle relative -top-[0.1em]"
                                />
                                <span> в Индии</span>
                              </span>
                              <span className="block md:hidden">
                                <span>Деловой </span>
                                <Image
                                  src="/images/forbes-logo-white.svg"
                                  alt="Forbes"
                                  width={120}
                                  height={28}
                                  className="inline-block h-[0.8em] w-auto align-middle relative -top-[0.1em]"
                                />
                              </span>
                              <span className="block md:hidden mt-2">
                                <span>ужин </span>
                                <Image
                                  src="/images/forbes-logo-white.svg"
                                  alt="Forbes"
                                  width={120}
                                  height={28}
                                  className="inline-block h-[0.8em] w-auto align-middle relative -top-[0.1em]"
                                />
                                <span> в Индии</span>
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="hidden md:block whitespace-nowrap">
                                {expedition.title}
                              </span>
                              <span className="block md:hidden whitespace-nowrap">
                                {expedition.title.split(' ')[0]}
                              </span>
                              <span className="block md:hidden mt-2">
                                {expedition.title.substring(expedition.title.indexOf(' ') + 1)}
                              </span>
                              <span className="flex items-center justify-center gap-1.5 text-2xl lg:text-3xl font-normal mt-2">
                                <span>с</span>
                                <Image
                                  src="/images/forbes-logo-white.svg"
                                  alt="Forbes"
                                  width={110}
                                  height={26}
                                  className="h-6 lg:h-7 w-auto"
                                />
                              </span>
                            </>
                          )}
                        </motion.h1>
                      </AnimatePresence>

                      {/* 🔸 Тезисы / подзаголовок */}
                      <AnimatePresence mode="wait">
                        {expedition.description ? (
                          <motion.p
                            key={`p-${index}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8"
                          >
                            {expedition.description}
                          </motion.p>
                        ) : (
                          <motion.div
                            key={`p-${index}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-wrap items-center justify-center gap-3 mb-8 max-w-3xl mx-auto"
                          >
                            <span className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/30 text-xs md:text-sm font-medium text-white uppercase tracking-wide">
                              погружение в культуру
                            </span>
                            <span className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/30 text-xs md:text-sm font-medium text-white uppercase tracking-wide">
                              эксклюзивный нетворкинг
                            </span>
                            <span className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/30 text-xs md:text-sm font-medium text-white uppercase tracking-wide">
                              лучшие бизнес-практики
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    <div className="translate-y-14 md:translate-y-24">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`cta-${index}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-wrap gap-4 justify-center mb-12"
                        >
                          <button
                            onClick={() => setIsRequestModalOpen(true)}
                            className="group cursor-pointer px-8 py-2.5 rounded-full font-medium bg-[#F39200] text-white border border-transparent hover:bg-[#FFA733] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#F7931A]/30 transition-all duration-300 shadow-lg shadow-[#F7931A]/20"
                          >
                            <FlipText className="flex items-center justify-center">СТАТЬ УЧАСТНИКОМ</FlipText>
                          </button>

                          <Link
                            href={`/expeditions/${expedition.slug}`}
                            className="group px-8 py-2.5 rounded-full font-medium bg-transparent text-white/90 border-2 border-white/30 hover:bg-white/10 hover:text-white hover:border-[#F7931A] hover:scale-[1.02] transition-all duration-300"
                          >
                            <FlipText className="flex items-center justify-center">ПОДРОБНЕЕ</FlipText>
                          </Link>
                        </motion.div>
                      </AnimatePresence>

                      {/* 🔸 Cookies блок */}
                      <AnimatePresence>
                        {!cookiesAccepted && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                            transition={{ delay: 0.8, duration: 0.4 }}
                            className="flex flex-nowrap items-center justify-between gap-2 md:gap-3 bg-black/60 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full text-white/80 text-[10px] md:text-xs max-w-2xl mx-auto"
                          >
                            <span className="text-white/60 text-center sm:text-left flex-1">
                              Мы используем <span className="text-[#F7931A] font-medium">cookies</span>. Продолжая работу с сайтом, вы соглашаетесь с нашей{' '}
                              <Link 
                                href="/privacy" 
                                className="text-[#F7931A] hover:text-[#FFA733] underline hover:no-underline font-medium"
                              >
                                политикой конфиденциальности.
                              </Link>
                            </span>
                            <button 
                              onClick={handleAcceptCookies}
                              className="bg-[#F39200] text-white px-4 py-1.5 rounded-full hover:bg-[#FFA733] hover:shadow-xl hover:shadow-[#F39200]/30 hover:scale-[1.02] transition-all duration-300 font-medium whitespace-nowrap flex-shrink-0 shadow-lg"
                            >
                              OK
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ◀️ Точки ▶️ (мобильные + десктоп: стрелки по бокам точек) */}
      {visibleExpeditions.length > 1 && (
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 md:gap-4">
          <button
            onClick={scrollPrev}
            className="p-2 bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-full text-white hover:bg-[#F7931A] hover:border-[#F7931A] transition-all duration-300 cursor-pointer"
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <div className="flex gap-2">
            {visibleExpeditions.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeIndex ? 'bg-[#F7931A] scale-125' : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={scrollNext}
            className="p-2 bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-full text-white hover:bg-[#F7931A] hover:border-[#F7931A] transition-all duration-300 cursor-pointer"
            aria-label="Следующий слайд"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      )}

      <ParticipantModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
    </section>
  );
}