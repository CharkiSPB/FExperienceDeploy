'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Send } from 'lucide-react';
import { expeditions } from '@/data/expeditions';
import { Dropdown } from '@/components/ui/Dropdown';
import { FlipText } from '@/components/ui/FlipText';
import { PartnerModal } from '@/components/shared/PartnerModal';
import { ParticipantModal } from '@/components/shared/ParticipantModal';
import { config } from '@/data/config';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLenis } from '@/components/providers/LenisProvider';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();
  const router = useRouter();

  // Скролл к hash-секции через Lenis (с fallback на нативный скролл)
  const scrollToHash = useCallback((e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (pathname !== '/') {
      // На другой странице — навигация через роутер
      router.push('/' + hash);
      return;
    }
    // Уже на главной — плавный скролл через Lenis
    window.history.pushState(null, '', hash);
    if (lenis?.scrollTo) {
      lenis.scrollTo(hash);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lenis, pathname, router]);

  // Определяем, на странице какой экспедиции мы находимся
  const expeditionSlug = pathname?.match(/^\/expeditions\/([^/]+)/)?.[1];
  const currentExpedition = expeditionSlug
    ? expeditions.find(e => e.slug === expeditionSlug)
    : undefined;
  const partner = currentExpedition?.generalPartner;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > window.innerHeight * 0.1);
      setShowCta(scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Разделяем экспедиции на три группы
  const activeExpeditions = expeditions
    .filter(e => e.status === 'active')
    .sort((a, b) => new Date(a.dates).getTime() - new Date(b.dates).getTime());

  const upcomingExpeditions = expeditions
    .filter(e => e.status === 'upcoming')
    .sort((a, b) => a.country.localeCompare(b.country, 'ru'));

  const completedExpeditions = expeditions
    .filter(e => e.status === 'completed')
    .sort((a, b) => new Date(b.dates).getTime() - new Date(a.dates).getTime());

  // Форматируем дату: "11-16 октября 2026" → "11-16 октября '26"
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const match = dateStr.match(/(\d{1,2}-\d{1,2}\s+[а-яА-ЯёЁ]+)\s+(\d{4})/);
    return match ? `${match[1]} '${match[2].slice(2)}` : dateStr;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
        ? 'bg-[#0D0805]/70 backdrop-blur-xl border-b border-white/10 shadow-lg' 
        : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center relative">
        {/* 🔹 ЛЕВАЯ ЧАСТЬ: Навигация */}
        <nav className="hidden xl:flex items-center gap-6 ml-32 xl:ml-16">
          <Link href="/about" className="group flex items-center text-sm text-white/90 whitespace-nowrap">
            <FlipText>О нас</FlipText>
          </Link>
          
          <Dropdown
            trigger={
              <button className="group cursor-pointer flex items-center gap-1 text-sm text-white/90 hover:text-white transition-colors focus:outline-none whitespace-nowrap">
                <FlipText>Экспедиции</FlipText> <ChevronDown className="w-3 h-3" />
              </button>
            }
            items={[
              { type: 'header', label: 'Ближайшие экспедиции', color: 'orange' } as any,
              ...activeExpeditions.map(e => ({
                label: (
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F7931A] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F7931A]"></span>
                    </span>
                    <span className="text-[#F7931A] font-medium">
                      {e.country}
                    </span>
                  </div>
                ),
                href: `/expeditions/${e.slug}`,
                subtitle: (
                  <span className="text-[#F7931A] text-xs">
                    {formatDate(e.dates)}
                  </span>
                ),
              })),
              
              { type: 'header', label: '', color: 'gray' } as any,
              ...upcomingExpeditions.map(e => ({
                label: (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#999999]">
                      {e.country}
                    </span>
                  </div>
                ),
                href: `/expeditions/${e.slug}`,
                subtitle: (
                  <span className="text-[#999999] text-xs">
                    Скоро
                  </span>
                ),
              })),
              
              { type: 'divider' } as any,
            ]}
          />
          
          <a href="/#why" onClick={(e) => scrollToHash(e, '#why')} className="group flex items-center text-sm text-white/90 whitespace-nowrap hover:text-white transition-colors cursor-pointer">
            <FlipText>Почему FExperience</FlipText>
          </a>
        </nav>

        {/* 🔹 ЛОГОТИП — по центру на десктопе, слева на мобилке */}
        <Link href="/" className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2">
          <Image
            src="/images/logo/logoFExperience2.svg"
            alt="FExperience Logo"
            width={197}
            height={34}
            priority
            className="w-[120px] md:w-[197px] h-auto"
          />
        </Link>

        {/* 🔹 ПРАВАЯ ЧАСТЬ: Навигация + Telegram + Кнопка */}
        <div className="hidden xl:flex items-center gap-6 xl:gap-4 ml-auto">
          <Link href="/articles" className="group flex items-center text-sm text-white/90 whitespace-nowrap"><FlipText>Статьи</FlipText></Link>
          <a href="/#reviews" onClick={(e) => scrollToHash(e, '#reviews')} className="group flex items-center text-sm text-white/90 whitespace-nowrap hover:text-white transition-colors cursor-pointer"><FlipText>Отзывы</FlipText></a>
          <a href="/#contacts" onClick={(e) => scrollToHash(e, '#contacts')} className="group flex items-center text-sm text-white/90 hover:text-white transition-colors cursor-pointer"><FlipText>Контакты</FlipText></a>

          <span className="w-px h-5 bg-white/10" />

          <Link 
            href="https://t.me/Milena_Amor" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#FFFFFF] hover:text-[#FF8800] transition-colors"
          >
            <Send className="w-5 h-5" />
          </Link>

          

          {/* Кнопка "Стать партнёром" / логотип партнёра */}
          {partner ? (
            <div className="flex flex-col items-end">
              <span className="text-xs text-[#A0A0A0] uppercase tracking-wide mb-1">
                Генеральный партнер
              </span>
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          ) : (
            <motion.button 
              onClick={() => setIsPartnerModalOpen(true)}
              className="group cursor-pointer px-3 py-1.5 xl:px-2 xl:py-1 text-sm xl:text-xs font-medium border border-[#F7931A] text-white rounded-full hover:bg-white/5 transition-all whitespace-nowrap"
            >
              <FlipText>Стать партнёром</FlipText>
            </motion.button>
          )}
        </div>

        {/* 🔹 МОБИЛЬНОЕ МЕНЮ: Бургер */}
        <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden ml-auto text-white p-2" aria-label="Меню">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 🔹 МОБИЛЬНОЕ МЕНЮ */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-[#0D0805]/95 backdrop-blur-xl border-b border-white/10 p-4 space-y-4">
          <Link href="/about" className="block py-2 text-white hover:text-[#F7931A]" onClick={() => setIsOpen(false)}>О нас</Link>
          <Link href="/expeditions" className="block py-2 text-white hover:text-[#F7931A]" onClick={() => setIsOpen(false)}>Экспедиции</Link>
          <a href="/#why" onClick={(e) => { scrollToHash(e, '#why'); setIsOpen(false); }} className="block py-2 text-white hover:text-[#F7931A] cursor-pointer">Почему FExperience</a>
          <Link href="/articles" className="block py-2 text-white hover:text-[#F7931A]" onClick={() => setIsOpen(false)}>Статьи</Link>
          <a href="/#reviews" onClick={(e) => { scrollToHash(e, '#reviews'); setIsOpen(false); }} className="block py-2 text-white hover:text-[#F7931A] cursor-pointer">Отзывы</a>
          <a href="/#contacts" onClick={(e) => { scrollToHash(e, '#contacts'); setIsOpen(false); }} className="block py-2 text-white hover:text-[#F7931A] cursor-pointer">Контакты</a>
          
          <div className="pt-3 border-t border-[#2A2A2A]">
             <Link 
                href="https://t.me/Milena_Amor" 
                className="flex items-center gap-2 py-2 text-white hover:text-[#F7931A]"
                onClick={() => setIsOpen(false)}
             >
                <Send className="w-4 h-4" /> Telegram
             </Link>
          </div>

          <Link href="#more" className="block px-4 py-2 text-center font-medium border border-[#2A2A2A] text-white rounded-lg" onClick={() => setIsOpen(false)}>
            Узнать подробности
          </Link>
        </div>
      )}

      {/* 🔹 Модалки */}
      <ParticipantModal
        isOpen={isParticipantModalOpen}
        onClose={() => setIsParticipantModalOpen(false)}
      />
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </header>
  );
}