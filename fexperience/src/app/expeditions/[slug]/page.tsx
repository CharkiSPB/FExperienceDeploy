import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Users, MapPin } from 'lucide-react';
import { expeditions } from '@/data/expeditions';
import { programs } from '@/data/program';
import { ExpeditionForm } from '@/components/shared/ExpeditionForm';
import { config } from '@/data/config';
import { speakers } from '@/data/speakers';
import { SpeakersSlider } from '@/components/shared/SpeakersSlider';

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

  return (
    <article className="min-h-screen bg-[#0D0805]">
      {/* Hero с изображением */}
      <div className="relative h-[40vh] md:h-[50vh] bg-[#1A1A1A] z-10">
        <Image
          src={expedition.image}
          alt={expedition.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0805] via-[#0D0805]/60 to-transparent" />
        
        {/* Навигация "Назад" */}
          <div className="absolute top-0 left-0 w-full z-[60] pt-24 md:pt-28 px-4 md:px-8">
        <Link
          href="/expeditions"
          className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors mb-8 mt-24 md:mt-28 ml-4 md:ml-8 lg:ml-12"
        >
          {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg> */}
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium"> Назад к экспедициям</span>
        </Link>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Заголовок и мета */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#A0A0A0] mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {expedition.country}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" /> {expedition.dates}
            </span>
            {expedition.speakersCount && (
              <>
                {/* <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {expedition.speakersCount} спикеров
                </span> */}
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4">
            {expedition.title}
          </h1>
          <p className="text-lg text-[#A0A0A0] leading-relaxed max-w-3xl">
            {expedition.description}
          </p>
        </header>

        {/* Блок с ценой и местами */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#110F0D] border border-[#2A2A2A] rounded-lg p-4 text-center">
            <p className="text-sm text-[#A0A0A0] mb-1">Продолжительность</p>
            <p className="text-3xl font-serif font-bold text-white">{expedition.duration || '—'}</p>
            <p className="text-sm text-[#A0A0A0] mb-1">дней</p>
          </div>
          <div className="bg-[#110F0D] border border-[#2A2A2A] rounded-lg p-4 text-center">
            <p className="text-sm text-[#A0A0A0] mb-1">Количество участников</p>
            <p className="text-3xl font-serif font-bold text-white">
              {expedition.participantsCount || '—'}
            </p>
            <p className="text-sm text-[#A0A0A0] mb-1">{expedition.participantsDescription}</p>
            
          </div>
          <div className="bg-[#110F0D] border border-[#2A2A2A] rounded-lg p-4 text-center">
            <p className="text-sm text-[#A0A0A0] mb-1">Статус</p>
            <p className={`text-2xl font-medium ${
              expedition.status === 'active' ? 'text-[#F7931A]' :
              expedition.status === 'completed' ? 'text-[#666666]' :
              'text-[#F7931A]'
            }`}>
              {expedition.status === 'active' ? 'Сбор заявок' :
               expedition.status === 'completed' ? 'Завершена' :
               'Скоро'}
            </p>
          </div>
        </div>

        {/* Что включено */}
        {expedition.status !== 'upcoming' && (
        <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold text-white mb-6">Что включено</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {expedition.includes?.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[#A0A0A0]">
          <span className="text-[#F7931A] mt-1">✓</span>
          <span>{item}</span>
        </li>
        ))}
        </ul>
        </section>
      )}

        {expedition.additionalInfo && (
          <section className="mb-16">
            <div className="bg-[#110F0D] border border-[#2A2A2A] rounded-xl p-6 md:p-8">
              <p className="text-[#A0A0A0] leading-relaxed whitespace-pre-line">
                {expedition.additionalInfo}
              </p>
            </div>
          </section>
        )}

        {/* Программа по дням */}
        {program.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-white mb-8">Программа экспедиции</h2>
            <div className="space-y-6">
              {program.map((day) => (
                <div key={day.day} className="bg-[#110F0D] border border-[#2A2A2A] rounded-xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Изображение дня */}
                    <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 bg-[#1A1A1A]">
                      <Image
                        src={day.image}
                        alt={`День ${day.day}: ${day.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 192px"
                      />
                    </div>
                    
                    {/* Контент */}
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 bg-[#F7931A]/10 text-[#F7931A] rounded text-sm font-medium">
                          День {day.day}
                        </span>
                        <h3 className="text-lg font-medium text-white">{day.title}</h3>
                      </div>
                      <p className="text-[#A0A0A0] text-sm mb-4 whitespace-pre-line leading-relaxed">{day.description}</p>
                      
                      {/* <div className="space-y-2">
                        {day.schedule.map((item, idx) => (
                          <div key={idx} className="flex gap-4 text-sm">
                            <span className="text-[#F7931A] font-medium min-w-[60px]">
                              {item.time}
                            </span>
                            <span className="text-[#D0D0D0]">{item.event}</span>
                          </div>
                        ))}
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(() => {
          // Фильтруем спикеров: привязанные к экспедиции + универсальные (категория 'other')
          const expeditionSpeakers = speakers.filter(s => 
            s.expeditionSlugs?.includes(slug) || s.category === 'other'
          );
          
          // Если нет спикеров — не рендерим блок
          if (expeditionSpeakers.length === 0) return null;
          
          return (
            <section className="mb-16">
              <h2 className="text-2xl font-serif font-bold text-white mb-8 text-center">
                Наши эксперты
              </h2>
              <SpeakersSlider speakers={expeditionSpeakers} />
            </section>
          );
        })()}

        {/* Форма записи */}
        {!isCompleted && (
          <section id="register" className="mb-16">
            <div className="bg-[#110F0D] border border-[#2A2A2A] rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-white mb-2 text-center">
                Оставить заявку
              </h2>
              <p className="text-[#A0A0A0] mb-6 text-center text-sm">
                {isUpcoming 
                  ? 'Мы свяжемся с вами, когда направление станет доступным для бронирования'
                  : 'Заполните форму, и эксперт свяжется с вами для обсуждения деталей участия'
                }
              </p>
              <ExpeditionForm />
            </div>
          </section>
        )}

        {/* Для завершённых экспедиций */}
        {isCompleted && (
          <section className="text-center py-12 bg-[#110F0D] border border-[#2A2A2A] rounded-xl">
            <p className="text-[#A0A0A0] mb-4">
              Эта экспедиция уже завершена, но вы можете:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="px-6 py-3 rounded-lg font-medium border border-[#2A2A2A] text-white hover:bg-white/5 transition-all"
              >
                Читать отчёты участников
              </Link>
              <Link
                href="/consultation"
                className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white hover:from-[#FFA733] hover:to-[#F7931A] transition-all"
              >
                Узнать о будущих экспедициях
              </Link>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}