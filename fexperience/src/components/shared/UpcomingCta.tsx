'use client';

import { useState } from 'react';
import { ParticipantModal } from '@/components/shared/ParticipantModal';

export function UpcomingCta() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="text-center mt-6 md:mt-8">
        <p className="text-sm md:text-base text-white/80 font-bold leading-relaxed mb-4 whitespace-nowrap">
          Вам интересна локация? Оставьте заявку — и эта точка может стать следующей на карте FExperience.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 text-sm md:text-base bg-[#FF8800] text-white font-bold rounded-[10px] hover:bg-[#E8850F] transition-all shadow-lg whitespace-nowrap mb-16"
        >
          Стать участником
        </button>
      </div>

      <ParticipantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
