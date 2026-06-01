'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export function MediaCoverage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section ref={ref} className="pt-28 md:pt-36 pb-0 px-4 sm:px-6 lg:px-8 relative">
      {/* 🔹 Фоновое изображение секции */}
      <div className="absolute inset-0">
        <Image
          src="/images/media/media-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 🔹 Grid: ЛЕВАЯ колонка (текст) + ПРАВАЯ колонка (медиа) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-30 items-start">
          
          {/* 🔹 ЛЕВАЯ ЧАСТЬ: Заголовок и описание */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reducedMotion ? 0.1 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 pt-8 lg:pt-42"
          >
            <h2 className="text-3xl md:text-4xl lg:text-2xl font-serif font-bold leading-tight mb-6">
              <span className="text-[#0D0805] block">УЧАСТНИКИ ЭКСПЕДИЦИИ</span>
              <span className="text-[#F7931A] block mt-2 text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">В ЦЕНТРЕ ВНИМАНИЯ</span>
            </h2>
            
            <p className="text-[#0D0805]/80 text-base md:text-lg leading-relaxed">
              Экспедиция с Forbes — это не только новые контакты и опыт, но и персональное медийное сопровождение. 
              Всё, что вы делаете в рамках экспедиции, получает продолжение в медиаполе Forbes и выходит на многомиллионную аудиторию.
            </p>
          </motion.div>

          {/* 🔹 ПРАВАЯ ЧАСТЬ: Медиа-контент */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* 🔹 Верхний ряд: ИЗОБРАЖЕНИЕ + ЖУРНАЛ */}
              
              {/* Изображение с ноутбуком и журналом */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
                className="relative"
              >
                <Image
                  src="/images/media/nout.webp"
                  alt="Forbes media"
                  width={400}
                  height={320}
                  className="w-[80%] md:w-full h-auto object-contain mx-auto md:mx-0"
                  priority
                />

                <Image
                  src="/images/media/zhyrnal1.webp"
                  alt="FExperience Forbes Magazine"
                  width={200}
                  height={120}
                  className="absolute left-[10%] md:right-[-5px] bottom-0 md:bottom-[-20px] w-[30%] md:w-[45%] h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>

              {/* Карточка ЖУРНАЛ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: reducedMotion ? 0.1 : 0.5, delay: reducedMotion ? 0 : 0.1 }}
                className="text-left"
              >
                <h3 className="text-xl md:text-2xl font-bold text-[#0D0805] uppercase mb-2">
                  ЖУРНАЛ
                </h3>
                <div className="w-[285px] h-px bg-[#F7931A] mb-3" />
                
                {/* 🔹 Текст под заголовком в две строки */}
                <p className="text-[#0D0805]/70 text-sm md:text-base mb-6 leading-tight">
                  Специальная секция<br/>FExperience
                </p>

                {/* 🔹 Блок статистики (как на макете) */}
                <div className="flex items-center gap-2">
                  <span className="text-6xl md:text-8xl font-bold text-[#F7931A] leading-none">
                    &gt;1
                  </span>
                  <div className="flex flex-col leading-none">
                    <span className="text-[#0D0805] text-sm md:text-base font-medium">
                      охват
                    </span>
                    <span className="text-[#0D0805] text-sm md:text-base font-medium -mt-1.5">
                      читателей
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-[#F7931A] leading-none mt-0.5">
                      МЛН
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 🔹 Нижний ряд: САЙТ + ВИДЕО */}
              
              {/* Карточка САЙТ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: reducedMotion ? 0.1 : 0.5, delay: reducedMotion ? 0 : 0.2 }}
                className="text-left"
              >
                <h3 className="text-xl md:text-2xl font-bold text-[#0D0805] uppercase mb-2">
                  САЙТ
                </h3>
                <div className="w-full h-px bg-[#F7931A] mb-3" />
                
                {/* 🔹 Текст в две строки */}
                <p className="text-[#0D0805]/70 text-sm md:text-base mb-6 leading-tight">
                  Статья по итогам экспедиции<br/>на главной странице Forbes
                </p>

                {/* 🔹 Блок статистики */}
                <div className="flex items-center gap-2">
                  <span className="text-6xl md:text-8xl font-bold text-[#F7931A] leading-none">
                    &gt;10
                  </span>
                  <div className="flex flex-col leading-none">
                    <span className="text-[#0D0805] text-sm md:text-base font-medium">
                      читателей
                    </span>
                    <span className="text-[#0D0805] text-sm md:text-base font-medium -mt-1.5">
                      в месяц
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-[#F7931A] leading-none mt-0.5">
                      МЛН
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Карточка ВИДЕО */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: reducedMotion ? 0.1 : 0.5, delay: reducedMotion ? 0 : 0.3 }}
                className="text-left"
              >
                <h3 className="text-xl md:text-2xl font-bold text-[#0D0805] uppercase mb-2">
                  ВИДЕО
                </h3>
                <div className="w-full h-px bg-[#F7931A] mb-3" />
                
                {/* 🔹 Текст в две строки */}
                <p className="text-[#0D0805]/70 text-sm md:text-base mb-6 leading-tight">
                  Специальный видеоматериал<br/>на каналах Forbes
                </p>

                {/* 🔹 Блок статистики */}
                <div className="flex items-center gap-2">
                  <span className="text-6xl md:text-8xl font-bold text-[#F7931A] leading-none">
                    &gt;100
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[#0D0805] text-sm md:text-base font-medium">
                      просмотров
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-[#F7931A] leading-none mt-0.5">
                      ТЫС.
                    </span>
                  </div>
                </div>

                {/* 🔹 Изображение под карточкой ВИДЕО */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: reducedMotion ? 0.1 : 0.5, delay: reducedMotion ? 0 : 0.4 }}
                  className="relative max-w-[250px] md:max-w-[300px]"
                >
                  <Image
                    src="/images/media/videoPlay.png"
                    alt="Forbes video"
                    width={300}
                    height={180}
                  className="w-[80%] md:w-full h-auto object-contain mx-auto md:mx-0 translate-y-12 md:translate-y-30 translate-x-4 md:translate-x-9"
                  />
                </motion.div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}