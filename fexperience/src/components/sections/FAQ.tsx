'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { faqItems } from '@/data/faq';

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggle = (id: number) => setOpenId(prev => (prev === id ? null : id));
  const toggleSection = () => setIsSectionOpen(prev => !prev);

  return (
    <section id="faq" className="w-full">
      
      {/* ============================================ */}
      {/*  КНОПКА-ТРИГГЕР (на всю ширину экрана) */}
      {/* ============================================ */}
      <motion.button
        onClick={toggleSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[70px] overflow-hidden group focus:outline-none"
        aria-expanded={isSectionOpen}
        aria-controls="faq-content"
      >
        {/* Кастомный фон триггера (на всю ширину) */}
        <Image
          src="/images/faq/faq-trigger-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        
        {/* Контент кнопки — центрирован внутри max-w */}
        <div className="relative z-10 flex items-center justify-center gap-4 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Левая иконка-треугольник ▼ */}
          <div className={`transition-transform duration-300 ${
            isSectionOpen ? 'rotate-180' : ''
          }`}>
            <Image
              src="/images/faq/faq-arrow-down.svg"
              alt=""
              width={18}
              height={18}
              className="w-[18px] h-[18px]"
            />
          </div>
          
          {/* Текст заголовка */}
          <span className="text-base md:text-lg font-bold uppercase tracking-wide">
            <span className="text-[#0D0805]">ЧАСТО ЗАДАВАЕМЫЕ </span>
            <span className="text-[#F7931A]">ВОПРОСЫ</span>
          </span>
          
          {/* Правая иконка-треугольник ▼ */}
          <div className={`transition-transform duration-300 ${
            isSectionOpen ? 'rotate-180' : ''
          }`}>
            <Image
              src="/images/faq/faq-arrow-down.svg"
              alt=""
              width={18}
              height={18}
              className="w-[18px] h-[18px]"
            />
          </div>
        </div>
      </motion.button>

      {/* ============================================ */}
      {/*  РАСКРЫВАЮЩИЙСЯ БЛОК (по центру экрана) */}
      {/* ============================================ */}
      <AnimatePresence>
        {isSectionOpen && (
          <motion.div
            id="faq-content"
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: reducedMotion ? 0.1 : 0.5, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="overflow-hidden"
          >
            {/* Фон контента — растянут на всю ширину */}
            <div className="relative w-full">
              <Image
                src="/images/faq/faq-content-bg.jpg"
                alt=""
                fill
                className="object-cover"
                priority
              />
              
              {/* Контент аккордеона — отцентрирован */}
              <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                
                {/* Заголовок с оранжевыми стрелками вверх */}
                <div className="flex items-center justify-center gap-4 mb-12">
                  <Image
                    src="/images/faq/faq-arrow-up.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-wide text-center">
                    <span className="text-[#0D0805]">ЧАСТО ЗАДАВАЕМЫЕ </span>
                    <span className="text-[#F7931A]">ВОПРОСЫ</span>
                  </h2>
                  <Image
                    src="/images/faq/faq-arrow-up.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>

                {/* Аккордеон */}
                <div className="space-y-3">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: reducedMotion ? 0.1 : 0.4, 
                        delay: reducedMotion ? 0 : index * 0.08,
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      className="bg-[#E8E8E8]/90 backdrop-blur-sm rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(item.id)}
                        className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A] group"
                        aria-expanded={openId === item.id}
                      >
                        <span className="text-base md:text-lg text-[#0D0805] font-medium pr-4">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#0D0805] transition-transform duration-300 flex-shrink-0 ${
                            openId === item.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openId === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ 
                              duration: reducedMotion ? 0.1 : 0.3, 
                              ease: [0.16, 1, 0.3, 1] 
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 text-[#555] leading-relaxed text-base">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}