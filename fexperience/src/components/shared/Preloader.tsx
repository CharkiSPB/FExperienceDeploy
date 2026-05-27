'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    window.addEventListener('load', () => {
      setTimeout(() => {
        if (mounted) setIsLoaded(true);
      }, 1800); // 🔹 Уменьшено с 2500 → 1800 (быстрее переход на сайт)
    });

    const fallbackTimer = setTimeout(() => {
      if (mounted) setIsLoaded(true);
    }, 3000); // 🔹 Уменьшено с 4000 → 3000

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.2 } }}
          className="fixed inset-0 z-[100] bg-[#000004] flex items-center justify-center"
        >
          <div className="flex items-center relative">
            
            
            <motion.span
              initial={{ scale: 2.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.8, // 🔹 Увеличено с 0.8 → 1.4 (медленнее и плавнее)
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="text-[#FF8800] font-serif font-bold text-[140px] md:text-[180px] leading-none relative z-10"
            >
              F
            </motion.span>

            {/* 🔹 2. Остальная часть логотипа */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.5,
                duration: 0.7, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="flex flex-col justify-center pl-2 md:pl-3"
            >
              {/* Верхняя строка: Forbes */}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-white font-serif font-bold text-3xl md:text-5xl leading-none mt-12"
              >
                Forbes
              </motion.span>
              
              {/* Нижняя строка: EXPERIENCE */}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-white font-sans font-bold text-6xl md:text-8xl leading-none"
              >
                EXPERIENCE
              </motion.span>
              
              {/* Слоган */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="flex justify-end w-full mt-1"
              >
                <span className="text-[#A0A0A0] text-xs md:text-sm tracking-wider uppercase text-right whitespace-nowrap">
                  Новые точки на карте вашего бизнеса
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}