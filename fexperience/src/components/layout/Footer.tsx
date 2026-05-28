'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, Send, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { ParticipantModal } from '@/components/shared/ParticipantModal';
import { PartnerModal } from '@/components/shared/PartnerModal';
import { TeamProject } from '@/components/shared/TeamProject';

export function Footer() {
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  return (
    <footer className="relative bg-[#0D0D0D] border-t border-[#2A2A2A] pt-12 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🔹 НОВАЯ ОРАНЖЕВАЯ КНОПКА (CTA) */}
        <div className="flex justify-center mb-16">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsParticipantModalOpen(true)}
            className="bg-[#FF8800] text-white rounded-full py-6 px-10 md:px-16 flex flex-col items-center shadow-lg hover:shadow-[#FF8800]/20 transition-all group w-fit cursor-pointer"
          >
            <span className="text-xl md:text-2xl font-bold tracking-wide uppercase leading-none mb-2 group-hover:text-white transition-colors">
              УЗНАЙТЕ ПЕРВЫМИ
            </span>
            <span className="text-sm md:text-base text-white/90 font-medium leading-none">
              о предстоящих мероприятиях
            </span>
          </motion.button>
        </div>

        {/* Основной контент футера (Сетка) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {/* Левая часть: Лого + Контакты */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="text-3xl font-serif font-bold block">
              <span className="text-[#F7931A]">F</span>
              <span className="text-white">Experience</span>
            </Link>

            <div id="contacts" className="flex flex-col gap-3 text-[#A0A0A0] scroll-mt-32">
              <a href="tel:+79001909003" className="flex items-center gap-2 hover:text-white transition-colors w-fit">
                <Phone className="w-4 h-4" /> +7 (920) 194-90-03
              </a>
              <a href="mailto:FExperience@forbes.ru" className="flex items-center gap-2 hover:text-white transition-colors w-fit">
                <Mail className="w-4 h-4" /> FExperience@forbes.ru
              </a>
              <div className="flex gap-3 mt-1">
                <Send className="w-5 h-5 hover:text-[#F7931A] cursor-pointer transition-colors" />
                <MessageCircle className="w-5 h-5 hover:text-[#F7931A] cursor-pointer transition-colors" />
                <MapPin className="w-5 h-5 hover:text-[#F7931A] cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          {/* Центр: Навигация */}
          <nav className="md:col-span-4 flex flex-col items-center justify-center gap-4 text-[#A0A0A0]">
            <Link href="/about" className="hover:text-white transition-colors">О нас</Link>
            <Link href="/expeditions" className="hover:text-white transition-colors">Экспедиции</Link>
            <Link href="/articles" className="hover:text-white transition-colors">Статьи</Link>
          </nav>

          {/* Правая часть: Кнопки */}
          <div className="md:col-span-4 flex flex-col items-end justify-center gap-4">
            <motion.button
              onClick={() => setIsParticipantModalOpen(true)}
              className="cursor-pointer px-5 py-2.5 text-sm font-medium border border-[#F7931A] text-white rounded-full hover:bg-white/5 transition-all whitespace-nowrap"
            >
              Стать участником
            </motion.button>

            <motion.button
              onClick={() => setIsPartnerModalOpen(true)}
              className="cursor-pointer px-5 py-2.5 text-sm font-medium border border-[#F7931A] text-white rounded-full hover:bg-white/5 transition-all whitespace-nowrap"
            >
              Стать партнёром
            </motion.button>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="text-xs text-[#666666] mb-8">
          <span>© Forbes FExperience 2024-2026. Права защищены.</span>
        </div>
      </div>

      {/* 🔹 Проект команды — правый нижний угол */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10">
        <TeamProject />
      </div>

      {/* Водяной знак */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="text-center translate-y-[25%] text-[20vw] md:text-[18vw] lg:text-[16vw] font-serif font-bold text-white/[0.03] whitespace-nowrap">
          FExperience
        </div>
      </div>

      <ParticipantModal
        isOpen={isParticipantModalOpen}
        onClose={() => setIsParticipantModalOpen(false)}
      />

      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </footer>
  );
}
