import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/data/config';
import { NewDelhiMap } from '@/components/sections/NewDelhiMap';
import { NewDelhiHeroCta } from '@/components/sections/NewDelhiHeroCta';
import { ExpeditionForm } from '@/components/shared/ExpeditionForm';
import { FlipText } from '@/components/ui/FlipText';

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
              <p className="text-[#FF6F00] text-sm md:text-base mb-4 uppercase tracking-wide font-bold">
                Количество мест ограничено
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
              <h2 className="uppercase font-bold text-3xl lg:text-[61px] leading-none">
                <span className="text-[#FF6F00]">Только</span>
                <br />
                <span className="text-white">experience</span>
              </h2>
              <p className="text-white font-roman text-sm lg:text-[21px] leading-relaxed mt-6">
                С нами у вас есть уникальная возможность не просто посетить главную промышленную выставку года, а стать частью эксклюзивной программы Forbes, где крупнейшие российские компании поделятся своим опытом ведения бизнеса на одном из самых сложных рынков мира.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Градиентная линия */}
      <div className="h-2 w-full bg-gradient-to-r from-[#C95A00] to-[#C97500] shadow-[0_4px_6px_-2px_rgba(0,0,0,0.9)]" />

      {/* Плавающий блок карточек — на стыке Experience и Деловой ужин */}
      <div className="hidden lg:block relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-0">
        <div className="absolute w-[804px] h-[204px] -top-[102px] right-12 rounded-[14px] overflow-hidden">
          {/* Layer 0 — подложка 1sloi.webp */}
          <div className="absolute inset-0">
            <Image
              src="/images/newDeli/1sloi.webp"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          {/* Layer 1 — фон keis.webp */}
          <div className="absolute inset-0">
            <Image
              src="/images/newDeli/keis.webp"
              alt=""
              fill
              className="object-cover opacity-[0.36]"
            />
          </div>
          {/* Layer 2 — затемнение #151D00 */}
          <div className="absolute inset-0 bg-[#151D00]/67" />
          {/* Top gradient — затемнение сверху 76px */}
          <div className="absolute top-0 left-0 right-0 h-[76px] bg-gradient-to-b from-[#000004]/80 to-transparent" />
          
          {/* Layer 3 — карточки */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-[14px] gap-[10px]">
            {/* Card 1 */}
            <div className="relative w-[253px] h-[176px] rounded-[14px] overflow-hidden">
              <Image
                src="/images/newDeli/keis1.webp"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" />
              <div className="absolute inset-0 flex flex-col items-left justify-center px-6 text-left">
                <span className="text-[#FF6F00] text-[24.45px] font-bold leading-tight">за кулисами</span>
                <span className="text-white text-[24.45px] font-bold leading-tight">успешных</span>
                <span className="text-white text-[24.45px] font-bold leading-tight">кейсов</span>
                <span className="text-[#FF6F00] text-[18px] font-roman leading-tight mt-4">то, о чем молчат</span>
                <span className="text-[#FF6F00] text-[18px] font-roman leading-tight">цифры</span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative w-[253px] h-[176px] rounded-[14px] overflow-hidden">
              <Image
                src="/images/newDeli/keis2.webp"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" />
              <div className="absolute inset-0 flex flex-col items-left justify-center px-6 text-left">
                <span className="text-white text-[24.45px] font-bold leading-tight">комфортный</span>
                <span className="text-white text-[24.45px] font-bold leading-tight">экспертный</span>
                <span className="text-[#FF6F00] text-[24.45px] font-bold leading-tight">нетворкинг</span>
                <span className="text-white text-[18px] font-roman leading-tight mt-4.5">на уровне решений,</span>
                <span className="text-white text-[18px] font-roman leading-tight">а не визиток</span>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative w-[253px] h-[176px] rounded-[14px] overflow-hidden">
              <Image
                src="/images/newDeli/keis3.webp"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" />
              <div className="absolute inset-0 flex flex-col items-left justify-center px-6 text-left">
                <span className="text-[#FF6F00] text-[24.45px] font-bold leading-tight">вход</span>
                <span className="text-white text-[24.45px] font-bold leading-tight">на рынок</span>
                <span className="text-white text-[24.45px] font-bold leading-tight">индии</span>
                <span className="text-[#FF6F00] text-[18px] font-roman leading-tight mt-4">через доверие</span>
                <span className="text-[#FF6F00] text-[18px] font-roman leading-tight">и личные контакты</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
          <div className="flex-1 flex items-center">
            <div className="w-full lg:w-1/2">
              {/* Forbes logo */}
              <Image
                src="/images/forbes-logo-white.svg"
                alt="Forbes"
                width={285}
                height={73}
                className="w-40 lg:w-[285px] h-auto"
              />

              {/* Title */}
              <h2 className="text-[#FF6F00] font-roman text-3xl lg:text-[64.12px] leading-tight mt-4">
                деловой ужин
              </h2>

              {/* Description */}
              <p className="text-white font-roman text-sm lg:text-[21px] mt-6 leading-relaxed max-w-xl">
                Мы собираем за одним столом тех, кто определяет экономическую повестку в регионе:
              </p>

              {/* Digital blocks with vertical divider */}
              <div className="flex items-stretch mt-8">
                {/* Left block — 80% */}
                <div>
                  <div className="text-white text-3xl lg:text-[48px] font-bold leading-none">80%</div>
                  <div className="text-[#FF6F00] text-lg lg:text-[24.45px] font-bold uppercase mt-1">бизнес</div>
                </div>

                {/* Vertical divider */}
                <div className="w-[2px] bg-white self-stretch mx-[49px]" />

                {/* Right block — 20% */}
                <div>
                  <div className="text-white text-3xl lg:text-[48px] font-bold leading-none">20%</div>
                  <div className="text-[#FF6F00] text-lg lg:text-[24.45px] font-bold uppercase mt-1">государство</div>
                </div>
              </div>
            </div>
          </div>

          {/* Кнопка внизу блока */}
          <div className="pb-12 md:pb-16 flex">
            <Link
              href="/expeditions/new-delhi#form"
              className="group px-8 py-2.5 rounded-full font-medium bg-[#F39200] text-white border border-transparent hover:bg-[#FFA733] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#F7931A]/30 transition-all duration-300 shadow-lg shadow-[#F7931A]/20 inline-flex"
            >
              <FlipText className="flex items-center justify-center">СТАТЬ УЧАСТНИКОМ</FlipText>
            </Link>
          </div>
        </div>
      </section>

      {/* Стоимость + форма — общий фон до футера */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="/images/newDeli/bgStoimostDeli.webp"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute top-0 left-0 right-0 h-[123px] bg-gradient-to-b from-[#000004] to-transparent mix-blend-multiply" />
        </div>

        <div className="relative z-10">
          {/* Стоимость */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-6 lg:gap-8">
              <h2 className="text-white text-[32px] lg:text-[48px] font-bold shrink-0 mt-2 uppercase">стоимость</h2>

              <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[45px] w-full lg:w-auto">
                <div className="relative w-full lg:w-[346px] h-[140px] lg:h-[187px] rounded-[14px] overflow-hidden">
                  <Image
                    src="/images/newDeli/stoimostCart1.webp"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center p-4 lg:p-5">
                    <p className="text-[20px] lg:text-[24px] font-bold uppercase">
                      <span className="text-white">до </span>
                      <span className="text-[#FF6F00]">13 августа</span>
                    </p>
                    <p className="text-white text-[36px] lg:text-[48px] font-roman mt-1 lg:mt-2 leading-none">400 000 Р</p>
                    <p className="text-[#898989] text-[14px] lg:text-[18px] font-light">(вкл. НДС)</p>
                  </div>
                </div>

                <div className="relative w-full lg:w-[346px] h-[140px] lg:h-[187px] rounded-[14px] overflow-hidden">
                  <Image
                    src="/images/newDeli/stoimostCart1.webp"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center p-4 lg:p-5">
                    <p className="text-[20px] lg:text-[24px] font-bold uppercase">
                      <span className="text-white">после </span>
                      <span className="text-[#FF6F00]">13 августа</span>
                    </p>
                    <p className="text-white text-[36px] lg:text-[48px] font-roman mt-1 lg:mt-2 leading-none">500 000 Р</p>
                    <p className="text-[#898989] text-[14px] lg:text-[18px] font-light">(вкл. НДС)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Что включено */}
            <div className="relative mt-[120px] lg:mt-[186px] pb-40">
              {/* Декоративное изображение снаружи overflow-hidden — может выходить за края */}
              <div className="hidden lg:block absolute -right-20 -top-52 z-20 w-[871px] h-[820px] pointer-events-none">
                <Image
                  src="/images/newDeli/GroupStoimost.webp"
                  alt=""
                  fill
                  className="object-contain object-right-top"
                />
              </div>

              <div className="relative w-full min-h-[250px] lg:min-h-[550px] rounded-[14px] overflow-hidden">
            <div className="absolute inset-0 bg-[#000004]/59 backdrop-blur-2xl"/>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.06] to-transparent" />

                <div className="relative z-10 px-4 lg:px-0 pb-6 lg:pb-0">
                  <div className="text-center mt-6 lg:mt-8 uppercase">
                    <span className="text-[#FF6F00] text-[24px] lg:text-[31.86px] font-bold">что </span>
                    <span className="text-white text-[24px] lg:text-[31.86px] font-bold">включено</span>
                  </div>

                  <div className="lg:pl-8 mt-6 lg:mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[363px_363px] gap-[16px] lg:gap-[21px] justify-items-center lg:justify-items-start">
                      <div className="relative w-full max-w-[363px] lg:w-[363px] h-[140px] lg:h-[173px] rounded-[14px] overflow-hidden bg-[#000004]/59 backdrop-blur-2xl">
                        <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.06] to-transparent" />
                        <div className="relative z-10 h-full flex flex-col justify-between p-3 lg:p-4">
                          <div>
                            <span className="text-[#FF6F00] text-[20px] lg:text-[24px] font-bold">ВИП</span>
                            <span className="text-white text-[20px] lg:text-[24px] font-bold">-БИЛЕТ</span>
                          </div>
                          <div>
                            <p className="text-white/90 font-roman text-[14px] lg:text-[17.12px] leading-tight">ВИП-билет участника</p>
                            <p className="text-white/90 font-roman text-[14px] lg:text-[17.12px] leading-tight">выставка «Иннопром. Индия»</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full max-w-[363px] lg:w-[363px] h-[140px] lg:h-[173px] rounded-[14px] overflow-hidden bg-[#000004]/59 backdrop-blur-2xl">
                        <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.06] to-transparent" />
                        <div className="relative z-10 h-full flex flex-col justify-between p-3 lg:p-4">
                          <div>
                            <p className="text-white text-[20px] lg:text-[24px] font-bold leading-tight">МЕДИЙНОЕ</p>
                            <p className="text-[#FF6F00] text-[20px] lg:text-[24px] font-bold leading-tight">СОПРОВОЖДЕНИЕ</p>
                          </div>
                          <div>
                            <p className="text-white/90 font-roman text-[14px] lg:text-[17.12px] leading-tight">Материал на сайте и в</p>
                            <p className="text-white/90 font-roman text-[14px] lg:text-[17.12px] leading-tight">журнале Forbes.</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full max-w-[363px] lg:w-[363px] h-[180px] lg:h-[232px] rounded-[14px] overflow-hidden bg-[#000004]/59 backdrop-blur-2xl">
                        <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.06] to-transparent" />
                        <div className="relative z-10 h-full flex flex-col justify-between p-3 lg:p-4">
                          <div>
                            <p className="text-[#FF6F00] text-[20px] lg:text-[24px] font-bold leading-tight">ПРИГЛАШЕНИЕ</p>
                            <p className="text-white text-[20px] lg:text-[24px] font-bold leading-tight">НА ЗАКРЫТЫЙ ДЕЛОВОЙ</p>
                            <p className="text-white text-[20px] lg:text-[24px] font-bold leading-tight">УЖИН FORBES</p>
                          </div>
                          <div>
                            <p className="text-white/90 font-roman text-[14px] lg:text-[17.12px] leading-tight">Эксклюзивный вечер с лидерами рынка.</p>
                            <p className="text-white/90 font-roman text-[14px] lg:text-[17.12px] leading-tight">Честный разговор о реальных</p>
                            <p className="text-white/90 font-roman text-[14px] lg:text-[17.12px] leading-tight">стратегиях работы в Индии.</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full max-w-[363px] lg:w-[363px] h-[180px] lg:h-[232px] rounded-[14px] overflow-hidden bg-[#000004]/59 backdrop-blur-2xl">
                        <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.06] to-transparent" />
                        <div className="relative z-10 h-full flex flex-col justify-between p-3 lg:p-4">
                          <div>
                            <p className="text-white text-[20px] lg:text-[24px] font-bold leading-tight">ПОДТВЕРЖДЕННЫЙ</p>
                            <p className="text-[#FF6F00] text-[20px] lg:text-[24px] font-bold leading-tight">СТАТУС ЭКСПЕРТА</p>
                            <p className="text-white text-[20px] lg:text-[24px] font-bold leading-tight">FORBES</p>
                          </div>
                          <div>
                            <p className="text-white/90 font-roman text-[14px] lg:text-[17.12px] leading-tight">Доступ к закрытому сообществу</p>
                            <p className="text-white/90 font-roman text-[14px] lg:text-[17.12px] leading-tight">лидеров и партнеров Forbes</p>
                            <p className="text-white/90 font-roman text-[14px] lg:text-[17.12px] leading-tight">FExperience.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Текст перед формой */}
          <div className="text-center px-4 mb-8">
            <p className="text-white text-[14px] md:text-[22px] font-bold uppercase leading-tight">
              Для участия в программе оставьте заявку до 10 августа 2026,
            </p>
            <p className="text-white text-[14px] md:text-[22px] font-bold uppercase leading-tight">
              и мы свяжемся с вами для обсуждения деталей.
            </p>
          </div>

          {/* Форма заявки перед подвалом */}
          <section id="form" className="relative pt-28 pb-20 px-4 overflow-hidden">
            {/* Glass overlay: тёмное тонированное стекло */}
            <div className="absolute inset-0 bg-[#000004]/15 backdrop-blur-lg" />
            <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.03] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                Оставьте заявку
              </h2>
              <p className="text-white/60 text-center mb-10">
                Заполните форму, и мы свяжемся с вами для подтверждения участия
              </p>
              <ExpeditionForm />
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
