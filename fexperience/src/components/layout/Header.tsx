'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Send } from 'lucide-react';
import { expeditions } from '@/data/expeditions';
import { Dropdown } from '@/components/ui/Dropdown';
import { PartnerModal } from '@/components/shared/PartnerModal';
import { ParticipantModal } from '@/components/shared/ParticipantModal';
import { config } from '@/data/config';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > window.innerHeight * 0.5);
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
    .sort((a, b) => new Date(a.dates).getTime() - new Date(b.dates).getTime());

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
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between relative">
        {/* 🔹 ЛЕВАЯ ЧАСТЬ: Навигация */}
        <nav className="hidden xl:flex items-center gap-6">
          <Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors whitespace-nowrap">
            О нас
          </Link>
          
          <Dropdown
            trigger={
              <button className="cursor-pointer flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors focus:outline-none whitespace-nowrap">
                Экспедиции <ChevronDown className="w-3 h-3" />
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
          
          <Link href="/#why" className="text-sm text-white/80 hover:text-white transition-colors whitespace-nowrap">
            Почему FExperience
          </Link>
        </nav>

        {/* 🔹 ЛОГОТИП — строго по центру */}
        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/logo/logoFExperience2.svg"
            alt="FExperience Logo"
            width={197}
            height={34}
            priority 
          />
        </Link>

        {/* 🔹 ПРАВАЯ ЧАСТЬ: Навигация + Telegram + Кнопка */}
        <div className="hidden xl:flex items-center gap-6">
          <Link href="/articles" className="text-sm text-white/80 hover:text-white transition-colors whitespace-nowrap">Статьи</Link>
          <Link href="/#reviews" className="text-sm text-white/80 hover:text-white transition-colors whitespace-nowrap">Отзывы</Link>
          <Link href="/#contacts" className="text-sm text-white/80 hover:text-white transition-colors">Контакты</Link>

          <span className="w-px h-5 bg-white/10" />

          <Link 
            href={config.social.telegram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#A0A0A0] hover:text-white transition-colors"
          >
            <Send className="w-5 h-5" />
          </Link>

          <motion.button 
            onClick={() => setIsPartnerModalOpen(true)}
            className="cursor-pointer px-3 py-1.5 text-sm font-medium border border-[#F7931A] text-white rounded-full hover:bg-white/5 transition-all whitespace-nowrap"
          >
            Стать партнёром
          </motion.button>
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
          <Link href="/#why" className="block py-2 text-white hover:text-[#F7931A]" onClick={() => setIsOpen(false)}>Почему FExperience</Link>
          <Link href="/articles" className="block py-2 text-white hover:text-[#F7931A]" onClick={() => setIsOpen(false)}>Статьи</Link>
          <Link href="/#reviews" className="block py-2 text-white hover:text-[#F7931A]" onClick={() => setIsOpen(false)}>Отзывы</Link>
          <Link href="/#contacts" className="block py-2 text-white hover:text-[#F7931A]" onClick={() => setIsOpen(false)}>Контакты</Link>
          
          <div className="pt-3 border-t border-[#2A2A2A]">
             <Link 
                href={config.social.telegram} 
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