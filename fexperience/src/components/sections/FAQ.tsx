'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/data/faq';

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggle = (id: number) => setOpenId(prev => (prev === id ? null : id));

  return (
    <section ref={ref} id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reducedMotion ? 0.1 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-12 text-center"
      >
        ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
      </motion.h2>

      <div className="divide-y divide-[#2A2A2A]">
        {faqItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: reducedMotion ? 0.1 : 0.5, 
              delay: reducedMotion ? 0 : index * 0.1, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex justify-between items-center py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0805] rounded-sm group"
              aria-expanded={openId === item.id}
            >
              <span className="text-lg md:text-xl text-white font-medium group-hover:text-[#F7931A] transition-colors pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={`w-6 h-6 text-[#A0A0A0] group-hover:text-[#F7931A] transition-all duration-300 flex-shrink-0 ${
                  openId === item.id ? 'rotate-180 text-[#F7931A]' : ''
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
                    duration: reducedMotion ? 0.1 : 0.35, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-[#A0A0A0] leading-relaxed text-base md:text-lg">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}