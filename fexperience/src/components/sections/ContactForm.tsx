'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { RequestModal } from '@/components/shared/RequestModal'; // ← Добавьте импорт

// Убираем пропс onOpenModal, так как модалка теперь внутри
export function ContactForm() {
  const [isModalOpen, setIsModalOpen] = useState(false); // ← Локальный стейт
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} id="contact" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* 🔹 Кликабельный заголовок */}
        <motion.button
          onClick={() => setIsModalOpen(true)} // ← Открываем локальную модалку
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0805] rounded-lg w-full"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-4 group-hover:text-[#F7931A] transition-colors duration-300">
            Готовы открыть новые рынки?<br/>{' '}
            <span className="text-[#F7931A] group-hover:underline decoration-[#F7931A]/40">
              Узнайте первым о предстоящих мероприятиях
            </span>
          </h2>
          <p className="text-[#A0A0A0] text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
            Нажмите, чтобы оставить заявку →
          </p>
        </motion.button>
      </motion.div>

      {/* 🔹 Модалка внутри компонента */}
      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}