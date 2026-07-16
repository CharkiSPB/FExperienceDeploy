import type { Metadata } from 'next';
import Image from 'next/image';
import { config } from '@/data/config';
import { ExpeditionForm } from '@/components/shared/ExpeditionForm';
import { IncludedSlider } from '@/components/shared/IncludedSlider';
import { expeditions } from '@/data/expeditions';
import { FlipText } from '@/components/ui/FlipText';

export const metadata: Metadata = {
  title: `Эксклюзивный деловой ужин Forbes в Индии | FExperience`,
  description: 'За одним столом — те, кто определяет экономическую повестку Индии. 10 сентября 2026, Нью-Дели.',
  openGraph: {
    title: 'Эксклюзивный деловой ужин Forbes в Индии | FExperience',
    description: 'За одним столом — те, кто определяет экономическую повестку Индии. 10 сентября 2026, Нью-Дели.',
    type: 'website',
    images: [{ url: '/images/newDeli/newDeli-bg.jpg', width: 1200, height: 630, alt: 'Эксклюзивный деловой ужин Forbes в Индии' }],
  },
  alternates: {
    canonical: `${config.site.url}/expeditions/new-delhi`,
  },
};

export default function NewDelhiExpeditionPage() {
  return (
    <article className="min-h-screen bg-[#0D0805]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'Эксклюзивный деловой ужин Forbes в Индии',
            description: 'За одним столом — те, кто определяет экономическую повестку Индии',
            url: `${config.site.url}/expeditions/new-delhi`,
            image: `${config.site.url}/images/newDeli/newDeli-bg.jpg`,
            organizer: { '@type': 'Organization', name: 'FExperience', url: config.site.url },
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: { '@type': 'Place', name: 'Индия' },
            startDate: '2026-09-10T19:00:00+05:30',
            endDate: '2026-09-10T22:00:00+05:30',
          }),
        }}
      />

      {/* Hero */}
      <div className="relative h-[90vh] bg-[#1A1A1A]">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/newDeli/newDeli-bg.jpg"
            alt="Нью-Дели"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center md:justify-end pb-12 md:pb-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              {/* Title — прежний размер шрифта, Forbes логотипом */}
              <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl xxl:text-6xl font-serif font-bold text-white leading-tight mb-8 md:mb-10 xxl:mb-14">
                <span>Деловой ужин </span>
                <Image
                  src="/images/forbes-logo-white.svg"
                  alt="Forbes"
                  width={160}
                  height={38}
                  className="inline-block h-[0.8em] w-auto align-middle relative -top-[0.1em]"
                />
                <span> — точка принятия решений</span>
              </h1>

              {/* Teaser вместо трёх карточек + линия */}
              <div className="inline-flex flex-col items-center mb-4 md:mb-4">
                <p className="text-white/90 text-base md:text-xl xxl:text-xl font-bold mb-3 md:mb-2">
                  Мы собираем за одним столом — тех, кто определяет экономическую повестку в регионе
                </p>
                <div className="h-px bg-[#FF8800] w-full" />
              </div>

              {/* Дата */}
              <p className="text-white text-sm md:text-xl xxl:text-xl font-medium">
                10 сентября 2026, 19:00 — 22:00
              </p>
              {/* Место */}
              <p className="text-white text-sm md:text-xl xxl:text-xl font-medium mb-6 md:mb-10">
                Нью-Дели, Индия
              </p>

              {/* Кнопка — как на главной */}
              <div className="flex justify-center mt-8 md:mt-16">
                <a
                  href="#form"
                  className="group cursor-pointer px-8 py-2.5 rounded-full font-medium bg-[#F39200] text-white border border-transparent hover:bg-[#FFA733] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#F7931A]/30 transition-all duration-300 shadow-lg shadow-[#F7931A]/20 inline-flex"
                >
                  <FlipText className="flex items-center justify-center">СТАТЬ УЧАСТНИКОМ</FlipText>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Карточка «Индия — горячая точка» — как таймер на других экспедициях */}
      <div className="relative z-30 -mt-16 md:-mt-20 lg:-mt-24">
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative w-full rounded-[44px] overflow-hidden p-6 md:p-12 flex flex-col items-center justify-center">
              <Image
                src="/images/newDeli/newDeliTimer.jpg"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 text-xl md:text-3xl lg:text-4xl font-bold text-[#2A2A2A] text-center leading-tight">
                СЕГОДНЯ ИНДИЯ — ОДНА ИЗ САМЫХ ГОРЯЧИХ ТОЧЕК
              </div>
              <div className="relative z-10 text-xl md:text-3xl lg:text-4xl font-bold text-[#F77B17] text-center leading-tight mb-6 md:mb-8">
                НА ИНВЕСТИЦИОННОЙ КАРТЕ МИРА
              </div>

              <div className="relative z-10 text-white text-sm md:text-base lg:text-lg text-center font-bold max-w-4xl leading-relaxed mb-4">
                Экономика региона развивается быстрее прогнозов, создавая колоссальный спрос на инфраструктурные проекты, цифровые платформы и долгосрочные вложения.
              </div>
              <div className="relative z-10 text-white text-sm md:text-base lg:text-lg text-center font-bold max-w-4xl leading-relaxed">
                <span className="text-[#F77B17]">9–11 сентября</span> в Индии, г. Нью-Дели, пройдет выставка «ИННОПРОМ» - пространство для развития международного сотрудничества, открывающее новые возможности для российского бизнеса.
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Что включено */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-4 uppercase">
                Что <span className="text-[#F7931A]">включено</span>
              </h2>
              <p className="text-[#A0A0A0] text-base md:text-lg leading-relaxed">
                С нами у вас есть уникальная возможность не просто посетить главную промышленную выставку года, а стать частью эксклюзивной программы Forbes, где крупнейшие российские компании поделятся своим опытом ведения бизнеса на одном из самых сложных рынков мира.
              </p>
            </div>
            <div className="lg:col-span-8 relative">
              <IncludedSlider items={expeditions.find(e => e.slug === 'new-delhi')?.includes ?? []} slug="new-delhi" />
            </div>
          </div>
        </section>
      </div>

      {/* Карточка стоимости */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <section className="py-8">
          <div className="max-w-5xl mx-auto">
            <div className="w-full rounded-[44px] border border-[#F77B17] bg-[#212121] p-4 md:p-12 flex flex-col items-center justify-center overflow-hidden">
              <div className="text-xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
                Закрытое мероприятие Forbes. Количество мест ограничено
              </div>
              <div className="mt-6 md:mt-8 flex flex-col items-center text-center w-full">
                <div className="text-lg md:text-2xl lg:text-3xl font-bold whitespace-nowrap">
                  <span className="block md:inline text-[#F77B17]">СТОИМОСТЬ: </span>
                  <span className="block md:inline text-white">до 13 августа — 400 000 руб. (вкл. НДС)</span>
                </div>
                <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white text-center md:ml-[16ch] whitespace-nowrap">
                  после 13 августа — 500 000 руб. (вкл. НДС)
                </div>
              </div>
              <div className="mt-6 md:mt-8 text-white/90 text-sm md:text-base lg:text-lg text-center font-bold max-w-2xl leading-relaxed">
                Для участия в программе оставьте заявку до <span className="text-[#F77B17]">10 августа 2026</span>, и мы свяжемся с вами для обсуждения деталей
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Form Section */}
      <section id="form" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Оставьте заявку
          </h2>
          <p className="text-white/60 text-center mb-10">
            Заполните форму, и мы свяжемся с вами для подтверждения участия
          </p>
          <ExpeditionForm />
        </div>
      </section>
    </article>
  );
}
