'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { whyUsItems } from '@/data/whyUs';

export function WhyFExperience() {
  return (
    <section id="why" className="relative z-10 w-full py-24 px-4 sm:px-6 lg:px-8 flex justify-center items-center -mb-14">
      {/* 🔹 Контейнер без фона */}
      <div className="relative rounded-[44px] p-4 md:p-8 lg:p-16 w-full md:w-[1353px] max-w-full">

        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-[#FFFFFF] leading-tight mb-8 md:mb-12 text-center relative z-10"
        >
          ПОЧЕМУ{' '}
          <span className="text-[#FF8800]">F</span>
          <span className="text-[#FFFFFF]">EXPERIENCE</span>
        </motion.h2>

        {/* 🔹 Бенто-грид 3×2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
          {whyUsItems.map((item, index) => {
            // 1, 3, 5 — карточки с изображением; 2, 4, 6 — оранжевые
            const isOrangeCard = (index + 1) % 2 === 0;

            // Разбиваем заголовок: первое слово + остальное
            const words = item.title.split(' ');
            const firstWord = words[0];
            const restOfTitle = words.slice(1).join(' ');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-[28px] overflow-hidden border-2 min-h-[220px] md:min-h-[260px] ${
                  isOrangeCard ? 'bg-[#FF8800] border-white' : 'bg-white border-[#FF8800]'
                }`}
              >
                {/* Фоновое изображение для карточек 1, 3, 5 */}
                {!isOrangeCard && (
                  <div className="absolute inset-0">
                    <Image
                      src="/images/WhyFexperience/cardWhyFex.jpg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Контент */}
                <div className="relative z-10 p-5 md:p-7 h-full flex flex-col">
                  {/* Заголовок */}
                  <h3 className="text-lg md:text-2xl font-medium leading-tight mb-2">
                    <span className={isOrangeCard ? 'text-white' : 'text-[#FF8800]'}>{firstWord}</span>
                    <br />
                    {restOfTitle && (
                      <span className="text-[#000004]"> {restOfTitle}</span>
                    )}
                  </h3>

                  {/* Горизонтальная линия под заголовком */}
                  {isOrangeCard ? (
                    <div className="w-full h-px bg-white/60 mb-2 md:mb-4" />
                  ) : (
                    <div className="w-full h-px bg-gradient-to-r from-[#000004]/40 via-[#000004]/60 to-transparent mb-2 md:mb-4" />
                  )}

                  {/* Текст */}
                  <p className={`text-[12px] md:text-base leading-relaxed ${isOrangeCard ? 'text-white' : 'text-[#000004]'}`}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
