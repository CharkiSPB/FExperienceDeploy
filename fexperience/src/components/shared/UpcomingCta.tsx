'use client';

import { useState } from 'react';
import { FlipText } from '@/components/ui/FlipText';
import { ParticipantModal } from '@/components/shared/ParticipantModal';

type UpcomingCtaProps = {
  /** slug экспедиции, на странице которой находится кнопка */
  expeditionSlug?: string;
};

export function UpcomingCta({ expeditionSlug }: UpcomingCtaProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="text-center mt-6 md:mt-8">
        <p className="text-sm md:text-base text-white/80 font-bold leading-relaxed mb-4 md:whitespace-nowrap">
          Вам интересна локация? Оставьте заявку — и эта точка может стать следующей на карте FExperience.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="group px-6 py-3 text-sm md:text-base bg-[#FF8800] text-white font-bold rounded-[10px] hover:bg-[#FFA733] hover:shadow-xl hover:shadow-[#FF8800]/30 transition-all duration-300 shadow-lg whitespace-nowrap mb-16 cursor-pointer"
        >
          <FlipText className="flex items-center justify-center">Стать участником</FlipText>
        </button>
      </div>

      <ParticipantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultExpeditionSlug={expeditionSlug}
      />
    </>
  );
}
