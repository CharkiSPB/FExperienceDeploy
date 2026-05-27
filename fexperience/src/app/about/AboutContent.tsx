'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const team = [

  {
    name: 'Марина Матыцина',
    role: 'Генеральный директор Forbes Russia',
    bio: 'В медиабизнесе с мая 2000 года. Более 16 лет проработала в Independent Media (в газете «Ведомости» и других изданиях) от менеджера по рекламе до руководителя блока бизнес-изданий.',
    photo: '/images/team/marinaM.jpg',
  },
  {
    name: 'Денис Кошкин',
    role: 'Исполнительный директор Forbes Russia',
    bio: '15 лет консалтинга. Советник при Торговых палатах Вьетнама и ЮАР. Автор 30+ аналитических отчётов по макроэкономике.',
    photo: '/images/team/koshkinD.jpg',
  },
  {
    name: 'Анастасия Никитина',
    role: 'Директор по устойчивому развитию и международным проектам Forbes Russia',
    bio: '12 лет в международных бизнес-миссиях. Экс-руководитель event-направления Forbes. Эксперт по выходу на рынки Азии и Африки.',
    photo: '/images/team/nicitinaA.jpg',
  },
  
  
  {
    name: 'Елена Волкова',
    role: 'Руководитель медийного сопровождения',
    bio: 'Журналист с 10-летним опытом в Forbes. Автор спецпроектов о бизнес-экспедициях. Обеспечивает публикацию итоговых материалов.',
    photo: '/images/team/3.jpg',
  },
  // Добавьте остальных членов команды
];

const dueDiligenceItems = [
  "Безопасность в стране",
  "Деловой климат",
  "Регуляторная среда",
  "Особенности логистики",
  "Реальный запрос бизнеса",
  "Культурные барьеры",
  "Финансовая инфраструктура",
  "Квалифицированные кадры",
  "Стоимость выхода на рынок",
];

export function AboutContent() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridView = useInView(gridRef, { once: true, margin: '-400px' });
  
  // 🔹 Эмбла карусель для команды
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'start',
    skipSnaps: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };
    
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    // setActiveIndex(emblaApi.selectedScrollSnap());
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <main className="min-h-screen bg-[#0D0805] text-white">
      {/* 1. Заголовок и миссия */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8">
          О проекте FExperience
        </h1>
        <div className="text-xl md:text-2xl text-[#A0A0A0] leading-relaxed max-w-6xl mx-auto text-left">
          <span className="text-[#F7931A] font-medium">FExperience</span>
          {' '} — новый проект команды Forbes Russia. <br />Мы помогаем предпринимателям открывать новые горизонты на самых перспективных рынках - в России и за рубежом.
          <br /><br />
          Мы не организуем туристические поездки. Мы проводим бизнес-экспедиции. Результат - ваше
          взвешенное стратегическое решение об экспансии бизнеса.
          <br /><br />
          <div className="text-xl md:text-2xl text-[#A0A0A0] leading-relaxed max-w-6xl mx-auto text-left">
            <span className="text-[#F7931A] font-medium">ДЕЛОВАЯ ПРОГРАММА И ПОГРУЖЕНИЕ В ЛОКАЛЬНУЮ КУЛЬТУРУ</span>
            {' '}
          </div>
          Встречи с госструктурами, локальным бизнесом, отраслевыми экспертами и русскоязычными предпринимателями, уже работающими в регионе, помогают оценить потребности рынка во внешних инвестициях, установить деловые контакты и наметить взаимовыгодные партнерства. Не менее важно знакомство с традициями и понимание местной культуры - это основа для адекватного восприятия бизнес-среды и правил взаимодействия. 
        </div>
      </section>

      {/* 🔹 2. Due Diligence — ТЕКСТОВЫЕ БЛОКИ С ГРАДИЕНТНЫМИ РАЗДЕЛИТЕЛЯМИ */}
      <section ref={gridRef} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-xl md:text-2xl text-[#A0A0A0] leading-relaxed max-w-6xl mx-auto text-left mb-10">
          <span className="text-[#F7931A] font-medium">Ключевое отличие FExperience</span>
          {' '} - собственный независимый дью-дилидженс (due diligence).
          Наши эксперты проводят комплексную проверку инвистиционной привлекательности и потенциал выбранного региона:
        </p>

        {/* 🔹 Грид 3x3 с градиентными разделителями */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {dueDiligenceItems.map((text, index) => {
            const isLastRow = index >= 6; // нижний ряд (индексы 6,7,8)
            const isLastCol = (index + 1) % 3 === 0; // правая колонка (индексы 2,5,8)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isGridView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative p-6 md:p-8 flex items-center justify-center min-h-[100px]"
              >
                <span className="text-white text-lg md:text-xl font-medium text-center leading-snug">
                  {text}
                </span>
              
                {/* 🔹 Вертикальный разделитель (справа, кроме последней колонки) */}
                {!isLastCol && (
                  <div className="absolute top-4 right-0 bottom-4 w-px bg-gradient-to-b from-transparent via-[#F7931A] to-transparent" />
                )}

                {/* 🔹 Горизонтальный разделитель (снизу, кроме последнего ряда) — для ВСЕХ экранов */}
                {!isLastRow && (
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F7931A] to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isGridView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
            DUE DILIGENCE — ОСНОВА НАШЕЙ МЕТОДОЛОГИИ.
          </p>
        </motion.div>
      </section>

      {/* 4. Команда — ГОРИЗОНТАЛЬНЫЙ СЛАЙДЕР С КНОПКАМИ СВЕРХУ СПРАВА */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Команда проекта</h2>
          
          {/* 🔹 Кнопки управления справа вверху */}
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              className="p-2 md:p-3 bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-full text-white hover:bg-[#F7931A] hover:border-[#F7931A] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Предыдущий"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={scrollNext}
              disabled={activeIndex >= team.length - visibleCount}
              className="p-2 md:p-3 bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-full text-white hover:bg-[#F7931A] hover:border-[#F7931A] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Следующий"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* 🔹 Слайдер команды */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {team.map((member) => (
              <div 
                key={member.name} 
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-0 md:pl-4"
              >
                <div className="bg-[#110F0D] border border-[#2A2A2A] rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 h-full">
                  <div className="relative w-full aspect-[4/5] bg-[#1A1A1A]">
                    <Image 
                      src={member.photo} 
                      alt={member.name} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                    <p className="text-[#F7931A] text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Контакты */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Контакты и юридическая информация</h2>
        <address className="not-italic space-y-3 text-[#A0A0A0] leading-relaxed mb-8">
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-[#F7931A]" />
            <a href="mailto:FExperience@forbes.ru" className="hover:text-white transition-colors">FExperience@forbes.ru</a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-[#F7931A]" />
            <a href="tel:+79001909003" className="hover:text-white transition-colors">+7 (900) 190-90-03</a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-[#F7931A]" />
            <span>г. Москва, Пресненская наб., 10</span>
          </p>
        </address>
        <p className="text-sm text-[#666666] leading-relaxed">
          Оператор персональных данных: ООО «ФЭкспириенс» | ИНН: 7700000000 | ОГРН: 1107700000000
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