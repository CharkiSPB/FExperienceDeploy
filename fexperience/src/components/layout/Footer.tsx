'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Send, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { ParticipantModal } from '@/components/shared/ParticipantModal';
import { PartnerModal } from '@/components/shared/PartnerModal';
import { TeamProject } from '@/components/shared/TeamProject';

export function Footer() {
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  return (
    <footer id="footer" className="relative bg-[#0D0D0D] border-t border-[#2A2A2A] pt-12 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🔹 НОВАЯ ОРАНЖЕВАЯ КНОПКА (CTA) */}
        <div className="flex justify-center mb-16">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsParticipantModalOpen(true)}
            className="bg-[#FF8800] text-white rounded-full py-4 px-6 md:px-12 flex flex-col items-center shadow-lg hover:bg-[#FFA733] hover:shadow-xl hover:shadow-[#FF8800]/30 transition-all duration-300 group w-fit cursor-pointer"
          >
            <span className="text-base md:text-lg font-bold tracking-wide uppercase leading-none mb-2 group-hover:text-white transition-colors">
              УЗНАЙТЕ ПЕРВЫМИ
            </span>
            <span className="text-[10px] md:text-xs text-white/90 font-medium leading-none">
              о предстоящих мероприятиях
            </span>
          </motion.button>
        </div>

        {/* Основной контент футера (Сетка) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {/* Левая часть: Лого + Контакты */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="block w-fit">
              <Image
                src="/images/logo/logoFExperience2.svg"
                alt="FExperience"
                width={180}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>

            <div id="contacts" className="flex flex-col gap-3 text-[#A0A0A0] scroll-mt-32">
              <a href="tel:+79201949003" className="flex items-center gap-2 hover:text-white transition-colors w-fit">
                <Phone className="w-4 h-4" /> +7 (920) 194-90-03
              </a>
              <a href="mailto:FExperience@forbes.ru" className="flex items-center gap-2 hover:text-white transition-colors w-fit">
                <Mail className="w-4 h-4" /> FExperience@forbes.ru
              </a>
              <div className="flex gap-3 mt-1">
                <a href="https://t.me/Milena_Amor" target="_blank" rel="noopener noreferrer">
                  <Send className="w-5 h-5 hover:text-[#F7931A] cursor-pointer transition-colors" />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 hover:text-[#F7931A] cursor-pointer transition-colors" />
                </a>
                <div className="relative group">
                  <MapPin className="w-5 h-5 hover:text-[#F7931A] cursor-pointer transition-colors" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                    <div className="bg-[#1A1A1A] text-white text-xs rounded-lg px-4 py-2.5 whitespace-nowrap shadow-xl border border-white/10 min-w-[200px] text-center">
                      123022, город Москва, 2-я Звенигородская ул., д. 13 стр 15, эт 4 пом X ком 1
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#1A1A1A]"></div>
                    </div>
                  </div>
                </div>
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
          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center gap-4">
            <motion.button
              onClick={() => setIsParticipantModalOpen(true)}
              className="cursor-pointer px-5 py-2.5 text-sm font-medium border border-[#FF8800] text-[#FF8800] rounded-[10px] hover:bg-white/5 transition-all whitespace-nowrap"
            >
              Стать участником
            </motion.button>

            <motion.button
              onClick={() => setIsPartnerModalOpen(true)}
              className="cursor-pointer px-5 py-2.5 text-sm font-medium border border-[#FF8800] text-[#FF8800] rounded-[10px] hover:bg-white/5 transition-all whitespace-nowrap"
            >
              Стать партнёром  
            </motion.button>
          </div>
        </div>

      </div>

      {/* Нижняя строка — ниже контейнера, ближе к водяному знаку */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="text-xs text-[#666666] text-center md:text-left">
          <span>© Forbes FExperience 2024-2026. Права защищены.</span>
        </div>
      </div>

      {/* 🔹 Проект команды — правый нижний угол */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10">
        <TeamProject />
      </div>

      {/* Водяной знак */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="text-center translate-y-[25%] text-[16vw] md:text-[18vw] lg:text-[16vw] font-serif font-bold text-white/[0.03] whitespace-nowrap">
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
