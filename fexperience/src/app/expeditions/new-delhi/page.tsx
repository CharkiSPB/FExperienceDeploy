import type { Metadata } from 'next';
import Image from 'next/image';
import { config } from '@/data/config';
import { NewDelhiMap } from '@/components/sections/NewDelhiMap';
import { NewDelhiHeroCta } from '@/components/sections/NewDelhiHeroCta';
import { ExpeditionForm } from '@/components/shared/ExpeditionForm';

export const metadata: Metadata = {
  title: `Эксклюзивный деловой ужин Forbes в Индии | FExperience`,
  description: 'Уникальная возможность посетить выставку ИННОПРОМ в Нью-Дели и попасть на закрытый деловой ужин с лидерами рынка Индии.',
  openGraph: {
    title: 'Эксклюзивный деловой ужин Forbes в Индии | FExperience',
    description: 'Уникальная возможность посетить выставку ИННОПРОМ в Нью-Дели и попасть на закрытый деловой ужин с лидерами рынка Индии.',
    type: 'website',
    images: [{ url: '/images/newDeli/newDeli-bg1.webp', width: 1200, height: 630, alt: 'Эксклюзивный деловой ужин Forbes в Индии' }],
  },
  alternates: {
    canonical: `${config.site.url}/expeditions/new-delhi`,
  },
};

export default function NewDelhiExpeditionPage() {
  return (
    <article className="min-h-screen bg-[#000004]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'Эксклюзивный деловой ужин Forbes в Индии',
            description: 'Уникальная возможность посетить выставку ИННОПРОМ в Нью-Дели и попасть на закрытый деловой ужин с лидерами рынка Индии.',
            url: `${config.site.url}/expeditions/new-delhi`,
            image: `${config.site.url}/images/newDeli/newDeli-bg1.webp`,
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
      <div className="relative h-screen bg-[#1A1A1A]">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/newDeli/newDeli-bg1.webp"
            alt="Нью-Дели"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Bottom gradient: white → #000004, 52px */}
        <div className="absolute bottom-0 left-0 right-0 h-[52px] z-10 bg-gradient-to-b from-transparent to-[#000004]" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center pt-36 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">

              {/* Title — две строки */}
              <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl xxl:text-6xl font-serif font-roman text-white leading-tight mb-8 md:mb-10">
                <div>Деловой ужин с{' '}
                  <Image
                    src="/images/forbes-logo-white.svg"
                    alt="Forbes"
                    width={160}
                    height={38}
                    className="inline-block h-[0.8em] w-auto align-middle relative -top-[0.1em]"
                  />
                </div>
                <div>Точка принятия решений</div>
              </h1>

              {/* Subtitle — uppercase, на шаг больше */}
              <p className="text-base md:text-2xl xxl:text-2xl text-white max-w-3xl mx-auto mb-16 md:mb-18 font-bold uppercase tracking-wide">
                Уникальная возможность посетить выставку иннопром в Нью-Дели и попасть на закрытый деловой ужин с лидерами рынка индии
              </p>

              {/* Кнопка — открывает модалку */}
              <div className="flex justify-center mb-14 md:mb-16">
                <NewDelhiHeroCta />
              </div>

              {/* Текст под кнопкой */}
              <p className="text-white text-sm md:text-base mb-4 uppercase tracking-wide font-bold">
                Закрытое мероприятие Forbes.{' '}
                <span className="text-[#FF6F00]">Количество мест ограничено.</span>
              </p>

              {/* Логотипы */}
              <div className="flex items-center justify-center gap-6">
                <Image
                  src="/images/newDeli/logoForbes.svg"
                  alt="Forbes"
                  width={152.68}
                  height={39.16}
                  className="h-8 w-auto object-contain"
                />
                {/* <Image
                  src="/images/newDeli/logoInoprom.svg"
                  alt="Иннопром"
                  width={144}
                  height={41}
                  className="h-8 w-auto object-contain"
                /> */}
              </div>

            </div>
          </div>
        </div>
      </div>

      <NewDelhiMap />

      {/* Experience блок */}
      <section className="relative h-[526px] w-[100%] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/newDeli/newDeliExperience2.webp"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Top gradient: smooth transition from map (dark top → transparent) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000004] to-transparent" />

        {/* Bottom gradient: smooth transition to next section (dark bottom → transparent) */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#000004] to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex">
          {/* Left — image, прижат к левому краю экрана */}
          <div className="w-[45%] relative overflow-hidden">
            <Image
              src="/images/newDeli/newDeliExperience1.webp"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#000004] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#000004]/40" />
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#000004] to-transparent" />
          </div>

          {/* Right — text */}
          <div className="flex-1 flex items-start pt-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <h2 className="uppercase font-bold text-[61px] leading-none">
                <span className="text-[#FF6F00]">Только</span>
                <br />
                <span className="text-white">experience</span>
              </h2>
              <p className="text-white font-roman text-[21px] leading-relaxed mt-6">
                С нами у вас есть уникальная возможность не просто посетить главную промышленную выставку года, а стать частью эксклюзивной программы Forbes, где крупнейшие российские компании поделятся своим опытом ведения бизнеса на одном из самых сложных рынков мира.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Градиентная линия */}
      <div className="h-2 w-full bg-gradient-to-r from-[#C95A00] to-[#C97500] shadow-[0_4px_6px_-2px_rgba(0,0,0,0.9)]" />

      {/* Деловой ужин блок */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/newDeli/newDeliUzin.webp"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Top gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000004] to-transparent" />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000004] to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center">
            <div className="w-full lg:w-1/2">
              {/* Forbes logo */}
              <Image
                src="/images/forbes-logo-white.svg"
                alt="Forbes"
                width={285}
                height={73}
              />

              {/* Title */}
              <h2 className="text-[#FF6F00] font-roman text-[64.12px] leading-tight mt-4">
                деловой ужин
              </h2>

              {/* Description */}
              <p className="text-white font-roman text-[21px] mt-6 leading-relaxed max-w-xl">
                Закрытое мероприятие. Мы собираем за одним столом тех, кто определяет экономическую повестку в регионе:
              </p>

              {/* Digital blocks with vertical divider */}
              <div className="flex items-stretch mt-8">
                {/* Left block — 80% */}
                <div>
                  <div className="text-white text-[48px] font-bold leading-none">80%</div>
                  <div className="text-[#FF6F00] text-[24.45px] font-bold uppercase mt-1">бизнес</div>
                  <div className="text-white font-roman text-[21px] mt-2 leading-tight">
                    российские корпорации;<br />
                    крупнейшие индийские<br />
                    предприниматели
                  </div>
                </div>

                {/* Vertical divider */}
                <div className="w-[2px] bg-white self-stretch mx-[49px]" />

                {/* Right block — 20% */}
                <div>
                  <div className="text-white text-[48px] font-bold leading-none">20%</div>
                  <div className="text-[#FF6F00] text-[24.45px] font-bold uppercase mt-1">государство</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Форма заявки перед подвалом */}
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
