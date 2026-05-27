'use client';
import Image from 'next/image';
import { useParallax } from '@/hooks/useParallax';

export function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const { ref, offset } = useParallax(0.15); // Лёгкий сдвиг 15%
  return (
    <div ref={ref} className={`w-full h-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ transform: `translateY(${offset * 0.5}px) scale(1.02)` }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
    </div>
  );
}