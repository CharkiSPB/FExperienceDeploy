import { Hero } from '@/components/sections/Hero';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import dynamic from 'next/dynamic';

// Секции ниже первого экрана — загружаются отдельно (code splitting)
const Relevance = dynamic(() => import('@/components/sections/Relevance').then(m => ({ default: m.Relevance })), {
  loading: () => <div className="py-24 bg-[#0D0805]" />
});

const InteractiveMap = dynamic(() => import('@/components/sections/InteractiveMap').then(m => ({ default: m.InteractiveMap })), {
  loading: () => <div className="py-24 bg-[#0D0805]" />
});

const WhyFExperience = dynamic(() => import('@/components/sections/WhyFExperience').then(m => ({ default: m.WhyFExperience })), {
  loading: () => <div className="py-24 bg-[#0D0805]" />
});

const MediaCoverage = dynamic(() => import('@/components/sections/MediaCoverage').then(m => ({ default: m.MediaCoverage })), {
  loading: () => <div className="py-24 bg-[#0D0805]" />
});

const Reviews = dynamic(() => import('@/components/sections/Reviews').then(m => ({ default: m.Reviews })), {
  loading: () => <div className="py-24 bg-[#0D0805]" />
});

const FAQ = dynamic(() => import('@/components/sections/FAQ').then(m => ({ default: m.FAQ })), {
  loading: () => <div className="py-24 bg-[#0D0805]" />
});

const Numbers = dynamic(() => import('@/components/sections/Numbers').then(m => ({ default: m.Numbers })), {
  loading: () => <div className="py-8 bg-[#0D0805]" />
});

export default function HomePage() {
  return (
    <>
      <ErrorBoundary fallback={<div className="h-screen bg-[#0D0805] flex items-center justify-center text-[#A0A0A0]">Ошибка загрузки Hero</div>}>
        <Hero />
      </ErrorBoundary>

      {/* Разделитель вместо перенесённого CountdownTimer */}
      <div className="h-8 md:h-24" />

      <Relevance />
      
      <ErrorBoundary fallback={<div className="py-24 text-center text-[#A0A0A0]">Карта временно недоступна</div>}>
        <InteractiveMap />
      </ErrorBoundary>

      
      <style>{`
        @media (max-height: 640px) {
          .ehc-numwrap.ehc-numwrap {
            margin-top: -4rem;
          }
        }
      `}</style>
      <section className="relative -mt-16 md:-mt-38 z-10 px-4 pb-8 max-w-7xl mx-auto pointer-events-none ehc-numwrap">
       <div className="pointer-events-auto">
       <Numbers />
       </div>
      </section>

      <WhyFExperience />

      <MediaCoverage />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-22 md:-mt-30 relative z-10">
        <CountdownTimer />
      </div>
      
      <Reviews />
      <FAQ />

      {/* 
        Блок генерального партнёра временно скрыт.
        Чтобы вернуть:
          1. Добавить dynamic import: const PartnerBlock = dynamic(() => import('@/components/layout/PartnerBlock').then(m => ({ default: m.PartnerBlock })), { loading: () => <div className="py-16 bg-[#0D0805]" /> })
          2. Добавить <PartnerBlock variant="section" /> в JSX выше
          3. Проверить src/data/partner.ts (role: general) и config.ts (pageVisible: true)
      */}
    </>
  );
}
