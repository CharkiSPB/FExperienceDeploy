'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLenis } from '@/components/providers/LenisProvider';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const { pause, resume } = useLenis();

  useEffect(() => {
    if (isOpen) {
      pause();
      document.body.style.overflow = 'hidden';
    } else {
      resume();
      document.body.style.overflow = '';
    }
    return () => {
      resume();
      document.body.style.overflow = '';
    };
  }, [isOpen, pause, resume]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-1/2 -translate-y-1/2 max-w-lg mx-auto bg-[#110F0D] border border-[#2A2A2A] rounded-xl p-6 z-[70] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              {title && <h2 className="text-xl font-serif font-bold">{title}</h2>}
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Закрыть">
                <X className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}