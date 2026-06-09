'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { TeamSectionClient } from '@/components/shared/TeamSectionClient';
import { teamMembers } from '@/data/team';
import { dueDiligenceItems } from '@/data/dueDiligence';

// 🔹 КОНФИГУРАЦИЯ СТАТИСТИКИ (редактируйте здесь)
const STATS_CONFIG = {
  show: false,              // true - показать блок, false - скрыть
  expeditions: 2,          // Количество прошедших экспедиций
  experts: 15,             // Количество мэров экспертов
  entrepreneurs: 180,      // Количество предпринимателей
};

// 🔹 ФОТО ДЛЯ АВТОСЛАЙДЕРА
const programPhotos = [
  '/images/about/photo1.jpg',
  '/images/about/photo2.jpg',
  '/images/about/photo3.webp',
  '/images/about/photo4.webp',
];

export function AboutContent() {
  // 🔹 Автослайдер для фото
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % programPhotos.length);
    }, 4000); // Смена каждые 4 секунды

    return () => clearInterval(timer);
  }, []);
  
  // 🔹 Due Diligence — реф и анимация поочерёдного увеличения карточек
  const ddRef = useRef<HTMLDivElement>(null);
  const isDdVisible = useInView(ddRef, { once: true, margin: '-100px' });
  const [activeDdCard, setActiveDdCard] = useState(-1);

  useEffect(() => {
    if (!isDdVisible) return;
    let cancelled = false;
    let i = 0;
    const tick = () => {
      if (cancelled || i >= dueDiligenceItems.length) {
        setActiveDdCard(-1);
        return;
      }
      setActiveDdCard(i);
      setTimeout(() => {
        if (!cancelled) {
          setActiveDdCard(-1);
          i++;
          setTimeout(tick, 200);
        }
      }, 400);
    };
    tick();
    return () => { cancelled = true; };
  }, [isDdVisible]);

  // 🔹 Флаг для включения видео (пока false - используется темный фон)
  const useVideoBackground = false; // Измените на true когда добавите видео

  return (
    <main className="min-h-screen bg-[#0D0805] text-white">
      {/* 1. Заголовок и миссия с видеофоном */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* 🔹 ВИДЕОФОН (раскомментируйте когда будет видео) */}
        {useVideoBackground ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/about-bg.mp4" type="video/mp4" />
              {/* Fallback для браузеров без поддержки video */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0D0805] via-[#1a1512] to-[#0D0805]" />
            </video>
            {/* Overlay для читаемости текста */}
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          /* 🔹 TEMP ФОН (пока нет видео) */
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0805] via-[#1a1512] to-[#0D0805]">
            {/* Опционально: можно добавить фоновое изображение */}
            {/* <Image
              src="/images/about/temp-bg.jpg"
              alt=""
              fill
              className="object-cover opacity-30"
              priority
            /> */}
          </div>
        )}

        {/* Контент поверх фона */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8 text-white">
            FEXPERIENCE — НОВЫЙ ПРОЕКТ<br />КОМАНДЫ FORBES RUSSIA
          </h1>

          <div className="text-sm md:text-xl text-white/90 leading-relaxed max-w-7xl mx-auto space-y-6">
            <p>
              МЫ ПОМОГАЕМ ПРЕДПРИНИМАТЕЛЯМ ОТКРЫВАТЬ НОВЫЕ ГОРИЗОНТЫ НА САМЫХ ПЕРСПЕКТИВНЫХ<br />
               РЫНКАХ — В РОССИИ И ЗА РУБЕЖОМ. МЫ НЕ ОРГАНИЗУЕМ ТУРИСТИЧЕСКИЕ ПОЕЗДКИ.
            </p>

            <p className="text-[#FF8800] font-medium">
              МЫ ПРОВОДИМ БИЗНЕС-ЭКСПЕДИЦИИ.
            </p>

            <p>
              РЕЗУЛЬТАТ — ВАШЕ ВЗВЕШЕННОЕ СТРАТЕГИЧЕСКОЕ РЕШЕНИЕ ОБ ЭКСПАНСИИ БИЗНЕСА.
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 2. БЛОК СО СТАТИСТИКОЙ (скрываемый/показываемый) */}
      {STATS_CONFIG.show && (
        <section className="w-full bg-black py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              
              {/* Экспедиции */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-white text-sm uppercase tracking-wide mb-2">
                  УЖЕ ПРОИЗОШЛИ
                </p>
                <p className="text-5xl md:text-6xl font-bold text-[#F7931A] mb-2">
                  {STATS_CONFIG.expeditions}
                </p>
                <p className="text-white text-sm uppercase tracking-wide">
                  ЭКСПЕДИЦИИ
                </p>
              </motion.div>

              {/* Эксперты */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="text-white text-sm uppercase tracking-wide mb-2">
                  ПРИВЛЕЧЕНО
                </p>
                <p className="text-5xl md:text-6xl font-bold text-[#F7931A] mb-2">
                  {STATS_CONFIG.experts}
                </p>
                <p className="text-white text-sm uppercase tracking-wide">
                  МЭРОВ ЭКСПЕРТОВ
                </p>
              </motion.div>

              {/* Предприниматели */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-white text-sm uppercase tracking-wide mb-2">
                  ПОУЧАСТВОВАЛО
                </p>
                <p className="text-5xl md:text-6xl font-bold text-[#F7931A] mb-2">
                  {STATS_CONFIG.entrepreneurs}
                </p>
                <p className="text-white text-sm uppercase tracking-wide">
                  ПРЕДПРИНИМАТЕЛЕЙ
                </p>
              </motion.div>

            </div>
          </div>
        </section>
      )}

      {/* 🔹 3. БЛОК "ДЕЛОВАЯ ПРОГРАММА" */}
      <section className="relative pt-4 md:pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-[1298px] mx-auto"
          style={{ minHeight: '426px' }}
        >
          {/* Фоновое изображение — с rounded corners */}
          <div className="absolute inset-0 rounded-[46px] overflow-hidden">
            <Image
              src="/images/about/delProgramma.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
            {/* Затемнение фона */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Контент */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-4 lg:gap-10 p-8 lg:p-12">
            
            {/* Левая часть - текст */}
            <div className="flex-1 pl-12 lg:pl-8">
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#FF8800] leading-tight mb-6">
                ДЕЛОВАЯ ПРОГРАММА<br />
                <span className="text-base md:text-2xl font-serif font-bold text-black">И ПОГРУЖЕНИЕ В ЛОКАЛЬНУЮ КУЛЬТУРУ</span>
              </h2>
              
               <p className="text-black/90 font-roman text-base md:text-[16px] leading-relaxed mb-6 max-w-[615px] lg:max-w-[580px]">
                Встречи с госструктурами, локальным бизнесом, отраслевыми экспертами и русскоязычными предпринимателями, уже работающими в регионе, помогают оценить потребности рынка во внешних инвестициях, установить деловые контакты и наметить взаимовыгодные партнерства. Не менее важно знакомство с традициями и понимание местной культуры — это основа для адекватного восприятия бизнес-среды и правил взаимодействия.
              </p>
              
             
            </div>

            {/* Правая часть - автослайдер с фото */}
            <div className="relative mt-10 lg:absolute lg:right-0 lg:top-[47%] lg:-translate-y-1/2 lg:translate-x-19">
              <div 
                className="relative rounded-[44px] overflow-hidden shadow-2xl h-[250px] md:h-[382px]"
                style={{ width: '705px', maxWidth: '100%' }}
              >
                {programPhotos.map((src, index) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Деловая программа ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
                
              </div>
              
              
            </div>
          </div>
        </motion.div>

        {/* Кнопка */}
        <div className="flex justify-center -mt-8 relative z-20">
          <Link 
            href="/expeditions"
            className="inline-flex items-center px-8 py-4 bg-[#FF8800] text-white font-bold text-lg rounded-full hover:bg-[#E8850F] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            СМОТРЕТЬ ВСЕ ЭКСПЕДИЦИИ
            
          </Link>
        </div>
      </section>

      {/* 🔹 4. Due Diligence — НОВЫЙ ДИЗАЙН */}
      <div ref={ddRef}>
        <section className="relative -mt-23 z-10">
          {/* Фон секции */}
          <div className="absolute inset-0">
            <Image
              src="/images/about/dueDiligence-bg.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-90 md:pb-114">
            {/* Заголовок */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-black leading-tight mb-4">
                Ключевое отличие{' '}
                <span className="text-[#FF8800]">F</span>Experience
              </h2>
              <p className="text-black/80 text-[15px] leading-relaxed max-w-4xl mx-auto">
                Собственный независимый дью-дилидженс (due diligence).
                Наши эксперты проводят комплексную проверку инвестиционной привлекательности и потенциала выбранного региона:
              </p>
            </div>

            {/* Сетка карточек 3×3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 justify-items-center">
              {dueDiligenceItems.map((item, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: activeDdCard === index ? 1.08 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="relative w-[280px] h-[80px] rounded-[12px] md:w-[343px] md:h-[93px]"
                >
                  {/* Фон карточки — внутри overflow-hidden для скругления */}
                  <div className="absolute inset-0 rounded-[16px] overflow-hidden">
                    <Image
                      src="/images/about/kartochkaFon.jpg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Иконка — выходит за границы карточки влево (НЕ обрезается) */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 z-10 scale-[0.8] md:scale-100 origin-center"
                    style={{
                      left: item.iconLeftOffset ?? -16,
                      width: item.iconWidth ?? 92,
                      height: item.iconHeight ?? 92,
                    }}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={item.iconWidth ?? 92}
                      height={item.iconHeight ?? 92}
                      className="object-contain"
                    />
                  </div>

                  {/* Текст карточки (с отступом под иконку) */}
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pl-10 md:pl-12 pr-4">
                    <span className="text-white text-xs md:text-base font-medium leading-tight text-center">
                      {item.text.split(' ')[0]}
                    </span>
                    <span className="text-black text-xs md:text-base font-medium leading-tight text-center">
                      {item.text.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Текст под карточками */}
            <div className="text-center mt-10 md:mt-16">
              <p className="text-xl md:text-3xl font-serif font-bold text-black tracking-wide">
                <span className="block md:inline">DUE DILIGENCE</span>
                <span className="hidden md:inline">{' — '}</span>
                <span className="block md:inline text-[#FF8800]">ОСНОВА НАШЕЙ МЕТОДОЛОГИИ</span>
              </p>
            </div>
          </div>

        </section>
      </div>

      {/* 5. Команда проекта */}
      <div className="pt-1 md:pt-17">
        <TeamSectionClient members={teamMembers} />
      </div>

      {/* 6. Контакты */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="font-serif font-bold mb-8">
          <span className="text-[#FF8800] text-3xl md:text-4xl">Контакты</span>
          <br />
          <span className="text-white/90 text-lg md:text-xl font-normal">и юридическая информация</span>
        </h2>
        <address className="not-italic text-[#A0A0A0] leading-relaxed mb-10">
          <p className="flex items-center justify-center mb-8 text-white/90 text-xs md:text-base gap-1 md:gap-2">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#F7931A]" />
              <a href="mailto:FExperience@forbes.ru" className="hover:text-white transition-colors">FExperience@forbes.ru</a>
            </span>
            <span className="mx-[33px] w-px h-5 bg-[#FF8800]" />
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#F7931A]" />
              <a href="tel:+79001909003" className="hover:text-white transition-colors">+7 (920) 194-90-03</a>
            </span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-[#F7931A]" />
            <span>123022, город Москва, 2-я Звенигородская ул., д. 13 стр 15, эт 4 пом X ком 1 </span>
          </p>
        </address>
        <p className="text-sm text-[#666666] leading-relaxed">
          Оператор персональных данных: АО «АС РУС МЕДИА» | ИНН: 7716236112 | ОГРН: 1037716027777
          <br />
          Обработка данных ведётся в строгом соответствии с{' '}
          <Link href="/privacy" className="text-[#F7931A] hover:underline transition-colors">
            Политикой конфиденциальности
          </Link>{' '}
          (ФЗ-152 «О персональных данных»).
        </p>
      </section>
    </main>
  );
}