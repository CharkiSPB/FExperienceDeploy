import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CalendarDays } from 'lucide-react';
import { expeditions } from '@/data/expeditions';
import { programs } from '@/data/program';
import { ExpeditionForm } from '@/components/shared/ExpeditionForm';
import { config } from '@/data/config';
import { speakers } from '@/data/speakers';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { IncludedSlider } from '@/components/shared/IncludedSlider';
import { ExpertsSectionClient } from '@/components/shared/ExpertsSectionClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const expedition = expeditions.find(e => e.slug === slug);
  
  if (!expedition) {
    return {
      title: 'Экспедиция не найдена | FExperience',
    };
  }

  return {
    title: `${expedition.title} | FExperience`,
    description: expedition.description,
    openGraph: {
      title: expedition.title,
      description: expedition.description,
      type: 'website',
      images: [{ url: expedition.image, width: 1200, height: 630, alt: expedition.title }],
    },
    alternates: {
      canonical: `${config.site.url}/expeditions/${slug}`,
    },
  };
}

export default async function ExpeditionDetailPage({ params }: Props) {
  const { slug } = await params;
  const expedition = expeditions.find(e => e.slug === slug);
  const program = programs[expedition?.programSlug || ''] || [];
  
  if (!expedition) {
    notFound();
  }

  const isCompleted = expedition.status === 'completed';
  const isUpcoming = expedition.status === 'upcoming';
  const hasExactDates = /^\d{1,2}[-–]\d{1,2}\s+[а-яА-ЯёЁ]+\s+\d{4}/.test(expedition.dates);

  // Фильтр спикеров
  const expeditionSpeakers = speakers.filter(s => 
    s.expeditionSlugs?.includes(slug) || s.category === 'other'
  );

  // JSON-LD разметка для поисковиков
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: expedition.title,
    description: expedition.description,
    url: `${config.site.url}/expeditions/${slug}`,
    image: `${config.site.url}${expedition.image}`,
    organizer: {
      '@type': 'Organization',
      name: 'FExperience',
      url: config.site.url,
    },
    eventStatus: isCompleted
      ? 'https://schema.org/EventCancelled'
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: expedition.country,
    },
    offers: expedition.price
      ? {
          '@type': 'Offer',
          price: expedition.price,
          priceCurrency: 'RUB',
          availability: expedition.spots && expedition.spots > 0
            ? 'https://schema.org/InStock'
            : 'https://schema.org/LimitedAvailability',
        }
      : undefined,
  };

  return (
    <article className="min-h-screen bg-[#0D0805]">
      {/* JSON-LD — хлебные крошки */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: config.site.url },
              { '@type': 'ListItem', position: 2, name: 'Экспедиции', item: `${config.site.url}/expeditions` },
              { '@type': 'ListItem', position: 3, name: expedition.title, item: `${config.site.url}/expeditions/${slug}` },
            ],
          }),
        }}
      />

      {/* JSON-LD структурированные данные (Event) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* ========================================== */}
      {/*  FULL-WIDTH HERO */}
      {/* ========================================== */}
      <div className="relative h-[70vh] bg-[#1A1A1A]">
        <Image
          src={expedition.image}
          alt={expedition.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {expedition.spots && expedition.spots > 0 && (
              <div className="flex justify-center mb-3 md:mb-6">
                <span className="bg-[#F7931A] text-[#0D0805] px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-sm font-bold">
                  Осталось мест: {expedition.spots}
                </span>
              </div>
            )}

            <div className="text-center mb-4 md:mb-8">
              <div className="text-base md:text-xl text-white/90 mb-2 md:mb-4">{expedition.dates}</div>
              <h1 className="text-xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-2 md:mb-4">
                {expedition.title}
              </h1>
              <p className="text-sm md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                {expedition.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 max-w-4xl mx-auto mb-16 md:mb-8">
              <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-6 text-center">
                <p className="text-[10px] md:text-sm text-white/90 mb-0.5 md:mb-1 uppercase tracking-wide">Продолжительность</p>
                <p className="text-base md:text-3xl font-serif font-bold text-[#F7931A]">{expedition.duration || '5'} дней</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-6 text-center">
                <p className="text-[10px] md:text-sm text-white/90 mb-0.5 md:mb-1 uppercase tracking-wide">Кол-во участников</p>
                <p className="text-base md:text-3xl font-serif font-bold text-[#F7931A]">{expedition.participantsCount || '15-30'} человек</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-6 text-center">
                <p className="text-[10px] md:text-sm text-white/90 mb-0.5 md:mb-1 uppercase tracking-wide">Статус</p>
                <p className="text-base md:text-3xl font-serif font-bold text-[#F7931A]">
                  {expedition.status === 'active' ? 'Сбор заявок' : expedition.status === 'completed' ? 'Завершена' : 'Скоро'}
                </p>
              </div>
            </div>

            <div className="hidden md:flex justify-center md:justify-end">
              <a href="#footer" className="px-5 py-2 text-sm bg-[#F7931A] text-[#0D0805] font-bold rounded-full hover:bg-[#E8850F] transition-all shadow-lg whitespace-nowrap">
                СВЯЗАТЬСЯ С НАМИ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/*  КОНТЕЙНЕР 2: Таймер, Что включено, остальное */}
      {/* ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Таймер */}
        {hasExactDates && expedition.timer?.enabled && (
          <div className="relative z-30 -mt-16 md:-mt-20 lg:-mt-24">
            <CountdownTimer expeditionSlug={expedition.slug} />
          </div>
        )}

        {/* Что включено */}
        {expedition.status !== 'upcoming' && expedition.includes && (
          <section className="py-16 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-4">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-4">
                  Что <span className="text-[#F7931A]">включено</span>
                </h2>
                <p className="text-[#A0A0A0] text-base md:text-lg leading-relaxed">
                  Мы полностью берём на себя организацию экспедиции и решение всех операционных вопросов.
                </p>
              </div>
              <div className="lg:col-span-8 relative">
                <IncludedSlider items={expedition.includes} />
              </div>
            </div>
          </section>
        )}

        {/* Дополнительная информация */}
        {expedition.additionalInfo && (
          <section className="mb-4">
            <div className="bg-[#110F0D] border border-[#2A2A2A] rounded-xl p-6 md:p-8">
              <p className="text-[#A0A0A0] leading-relaxed whitespace-pre-line">{expedition.additionalInfo}</p>
            </div>
          </section>
        )}

      </div> {/* Конец Контейнера 1 */}


      {/* ========================================== */}
      {/* 🔹 СЕКЦИЯ: ПРОГРАММА (На всю ширину) */}
      {/* ========================================== */}
      {program.length > 0 && (
        <section className="w-full py-24 relative -mt-20">
          {/* Кастомный фон на всю ширину */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/expeditions/program-bg.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
            
          </div>

          {/* Контент секции */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0D0805] mb-16 text-center uppercase tracking-wide">
              Программа экспедиции
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-80">
              {program.map((day) => (
                <div key={day.day} className="flex flex-col gap-4">
                  {/* 1. Заголовок ДНЯ (Над фото) */}
                  <div>
                    <span className="text-[#F7931A] font-bold text-sm uppercase tracking-wide block mb-1">
                      День {day.day}
                    </span>
                    <h3 className="text-[#0D0805] font-bold text-lg md:text-xl leading-tight">
                      {day.title}
                    </h3>
                  </div>

                  {/* 2. Изображение (Скругленное) */}
                  <div className="relative w-full h-[217px] rounded-[20px] overflow-hidden bg-[#E0E0E0] shadow-sm">
                    <Image
                      src={day.image}
                      alt={day.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* 3. Описание (Под фото, прозрачное) */}
                  <p className="text-[#555] text-sm leading-relaxed pt-1">
                    {day.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ========================================== */}
      {/* 🔹 КОНТЕЙНЕР 3: Эксперты */}
      {expeditionSpeakers.length > 0 && (
        <ExpertsSectionClient speakersList={expeditionSpeakers} />
      )}

      {/* 🔹 Форма на всю ширину с фоном */}
      {!isCompleted && (
        <section id="register" className="relative w-full py-16 md:py-24 overflow-hidden bg-[#110F0D]">
          {/* Full-width background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/expeditions/expeditions-form-bg.webp"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 text-center">Стать участником экспедиции</h2>
            <p className="text-[#A0A0A0] mb-8 text-center text-sm">
              {isUpcoming 
                ? 'Мы свяжемся с вами, когда направление станет доступным для бронирования'
                : 'Заполните форму, и эксперт свяжется с вами для обсуждения деталей участия'
              }
            </p>
            <ExpeditionForm />
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Для завершённых экспедиций */}
        {isCompleted && (
          <section className="text-center py-12 bg-[#110F0D] border border-[#2A2A2A] rounded-xl mb-16">
            <p className="text-[#A0A0A0] mb-4">Эта экспедиция уже завершена, но вы можете:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/articles" className="px-6 py-3 rounded-lg font-medium border border-[#2A2A2A] text-white hover:bg-white/5 transition-all">Читать отчёты участников</Link>
              <Link href="/consultation" className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white hover:from-[#FFA733] hover:to-[#F7931A] transition-all">Узнать о будущих экспедициях</Link>
            </div>
          </section>
        )}

      </div> {/* Конец контейнера Завершённые */}
    </article>
  );
}