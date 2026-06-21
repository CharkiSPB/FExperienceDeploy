'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { reviews } from '@/data/reviews';
import { useInView, motion } from 'framer-motion';

export function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section ref={containerRef} id="reviews" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
          Впечатления участников
        </h2>
        <p className="text-xl md:text-2xl text-[#F7931A] font-medium">
          экспедиций FExperience
        </p>
      </motion.div>

      {/* Навигация */}
      <div className="flex justify-end gap-3 mb-8">
        <button
          onClick={scrollPrev}
          disabled={!emblaApi || !emblaApi.canScrollPrev()}
          className="p-2 rounded-full border border-[#2A2A2A] text-white hover:bg-[#F7931A] hover:border-[#F7931A] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!emblaApi || !emblaApi.canScrollNext()}
          className="p-2 rounded-full border border-[#2A2A2A] text-white hover:bg-[#F7931A] hover:border-[#F7931A] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Следующий отзыв"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Слайдер */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 md:-ml-6 lg:-ml-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 md:pl-6 lg:pl-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#110F0D] rounded-xl p-6 h-full flex flex-col"
              >
                {/* Фото + Имя + Компания */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#2A2A2A]">
                    <Image
                      src={review.photo}
                      alt={review.photoAlt}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg uppercase">
                      {review.name}
                    </h3>
                    <p className="text-[#A0A0A0] text-sm">{review.company}</p>
                  </div>
                </div>

                {/* 🔹 Оранжевая строка с экспедицией */}
                {review.expeditionLabel && (
                  <p className="text-[#F7931A] text-sm font-bold uppercase mb-4">
                    {review.expeditionLabel}
                  </p>
                )}

                {/* Текст отзыва */}
                <blockquote className="text-[#D0D0D0] leading-relaxed flex-grow italic">
                  "{review.text}"
                </blockquote>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Точки-индикаторы */}
      <div className="flex justify-center gap-2 mt-10">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-[#F7931A] w-6' : 'bg-[#2A2A2A] w-2 hover:bg-[#4A4A4A]'
            }`}
            aria-label={`Перейти к отзыву ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}