'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, Send, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { FlipText } from '@/components/ui/FlipText';
import { ParticipantModal } from '@/components/shared/ParticipantModal';
import { TeamProject } from '@/components/shared/TeamProject';

export function Footer() {
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);

  return (
    <footer id="footer" className="relative bg-[#0D0D0D] border-t border-[#2A2A2A] pt-8 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔹 CTA */}
        <div className="flex justify-center mb-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsParticipantModalOpen(true)}
            className="bg-[#FF8800] text-white rounded-full py-3 px-8 flex flex-col items-center shadow-lg hover:bg-[#FFA733] hover:shadow-xl hover:shadow-[#FF8800]/30 transition-all duration-300 group w-fit cursor-pointer"
          >
            <span className="text-sm md:text-base font-bold tracking-wide uppercase leading-none mb-1.5">
              <FlipText>УЗНАЙТЕ ПЕРВЫМИ</FlipText>
            </span>
            <span className="text-[10px] md:text-xs text-white/90 font-medium leading-none">
              о предстоящих мероприятиях
            </span>
          </motion.button>
        </div>

        {/* 🔹 Проект команды — под CTA */}
        <div className="flex justify-center mb-12">
          <TeamProject />
        </div>

        {/* 🔹 Навигация — горизонтально, по центру */}
        <nav className="flex items-center justify-center gap-8 md:gap-16 mb-12">
          <Link href="/about" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">О нас</Link>
          <Link href="/expeditions" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">Экспедиции</Link>
          <Link href="/articles" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">Статьи</Link>
        </nav>

        {/* 🔹 Контакты — заголовок */}
        <h3 id="contacts" className="text-center text-xs font-bold text-white uppercase tracking-widest mb-6">
          Контакты
        </h3>

        {/* 🔹 Контакты — строка */}
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap mb-12 text-sm text-[#A0A0A0]">
          <a href="tel:+79201949003" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-4 h-4" /> +7 (920) 194-90-03
          </a>
          <a href="mailto:FExperience@forbes.ru" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-4 h-4" /> FExperience@forbes.ru
          </a>
          <a href="https://t.me/Milena_Amor" target="_blank" rel="noopener noreferrer" className="hover:text-[#F7931A] transition-colors">
            <Send className="w-5 h-5" />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer" className="hover:text-[#F7931A] transition-colors">
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        {/* 🔹 Разделитель */}
        <hr className="border-t border-white/10 max-w-xl mx-auto mb-8" />

        {/* 🔹 Нижняя строка — копирайт, логотип, локация */}
        <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap text-[11px] text-[#666666]">
          <span>© Forbes FExperience 2024-2026. Права защищены.</span>

          <Link href="/privacy" className="text-[#FF8800] hover:text-[#FFA733] transition-colors underline underline-offset-2">
            Политика обработки персональных данных
          </Link>

          <div className="flex items-center gap-1.5 text-[#A0A0A0]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[10px] md:text-[11px] leading-tight">
              123022, город Москва, 2-я Звенигородская ул., д. 13 стр 15
            </span>
          </div>
        </div>

      </div>

      {/* 🔹 Водяной знак */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="text-center translate-y-[25%] text-[16vw] md:text-[18vw] lg:text-[16vw] font-serif font-bold text-white/[0.03] whitespace-nowrap">
          FExperience
        </div>
      </div>

      <ParticipantModal
        isOpen={isParticipantModalOpen}
        onClose={() => setIsParticipantModalOpen(false)}
      />

    </footer>
  );
}
