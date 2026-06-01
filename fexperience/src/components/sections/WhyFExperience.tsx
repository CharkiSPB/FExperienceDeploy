'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { whyUsItems } from '@/data/whyUs';

// 🔹 Компонент самолётика, движущегося по траектории
// const PATH_TOP_RIGHT = "M 160 -20 Q 130 50, 50 80 T -20 110";
// const PATH_BOTTOM_LEFT = "M -20 160 Q 50 130, 80 50 T 110 -20";

// // 🔹 Компонент самолётика на маршруте
// function CornerAirplane({ side, src }: { side: 'right' | 'left'; src: string }) {
//   const path = side === 'right' ? PATH_TOP_RIGHT : PATH_BOTTOM_LEFT;
//   const isRight = side === 'right';

//   return (
//     <div className={`absolute ${isRight ? 'top-0 right-0' : 'bottom-0 left-0'} w-[200px] h-[200px] overflow-visible pointer-events-none z-20`}>
//       {/* Статичная пунктирная линия */}
//       <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 200 200" fill="none">
//         <path 
//           d={path} 
//           stroke="#1A1A1A" 
//           strokeWidth="2.5" 
//           strokeDasharray="8 6" 
//           strokeLinecap="round" 
//         />
//       </svg>

//       {/* Движущийся самолётик */}
//       <motion.img
//         src={src}
//         alt="airplane"
//         className="absolute inset-0 w-12 h-12 object-contain"
//         style={{
//           offsetPath: `path('${path}')`,
//           offsetRotate: 'auto',
//           // ⚠️ Если самолётик летит хвостом вперёд, раскомментируй строку ниже:
//           // transform: 'rotate(180deg)'
//         }}
//         initial={{ offsetDistance: '0%' }}
//         animate={{ offsetDistance: '100%' }}
//         transition={{
//           duration: 5,
//           repeat: Infinity,
//           ease: "linear", // Равномерная скорость без ускорений/торможений
//           delay: isRight ? 0 : 2.5, // Сдвиг по времени для плавного цикла
//         }}
//       />
//     </div>
//   );
// }

export function WhyFExperience() {
  return (
    <section id="why" className="relative z-10 w-full py-24 px-4 sm:px-6 lg:px-8 flex justify-center items-center -mb-34">
      {/* 🔹 Основная карточка с фоном */}
      <div className="relative rounded-[44px] p-4 md:p-8 lg:p-16 overflow-hidden border-b-4 border-[#F7931A] md:h-[755px] w-full md:w-[1353px] max-w-full">
        
        {/* Фоновое изображение */}
        <div className="absolute inset-0">
          <Image
            src="/images/WhyFexperience/whyFe-bg.webp"
            alt=""
            fill
            className="object-cover"
            priority
          />
          
        </div>

        {/* Оранжевый бордер снизу */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FF8800] rounded-b-[44px] pointer-events-none"
          style={{
            // Плавное затухание снизу вверх
            maskImage: 'linear-gradient(to top, black 20%, transparent 65%)',
            WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 75%)'
          }}
        />

        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-[#000004] leading-tight mb-4 text-center relative z-10"
        >
          ПОЧЕМУ{' '}
          <span className="text-[#FF8800]">F</span>
          <span className="text-[#000004]">EXPERIENCE</span>
        </motion.h2>

        {/* 🔹 Грид-сетка 3×2 с цифрами позади */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-y-12 relative z-10">
          {whyUsItems.map((item, index) => {
            const isLastRow = index >= 3;
            const isLastCol = (index + 1) % 3 === 0;
            const cardNumber = index + 1;
            
            // Разбиваем заголовок: первое слово оранжевое, остальное белое
            const words = item.title.split(' ');
            const firstWord = words[0];
            const restOfTitle = words.slice(1).join(' ');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* 🔹 Фоновая цифра позади карточки */}
                <div className="absolute -left-1 md:left-4 -top-1 md:top-0 z-0 pointer-events-none select-none">
                  <span 
                    className="text-[130px] md:text-[120px] lg:text-[250px] font-bold text-[#FFC17B] leading-none"
                    style={{ opacity: 0.2 }}
                  >
                    {cardNumber}
                  </span>
                </div>

                {/* Карточка с контентом */}
                <div className="relative z-10 p-3 md:p-5 pl-[22px] md:pl-20 h-full">
                  {/* Заголовок с оранжевым первым словом */}
                  <h3 className="text-sm md:text-xl lg:text-2xl font-medium leading-tight mb-2">
                    <span className="text-[#FF8800]">{firstWord}</span>
                    <br />
                    {restOfTitle && <span className="text-[#000004]"> {restOfTitle}</span>}
                  </h3>

                  {/* Горизонтальная линия под заголовком */}
                  <div className="w-full h-px bg-gradient-to-r from-[#000004]/40 via-[#000004]/60 to-transparent mb-2 md:mb-4" />

                  {/* Текст */}
                  <p className="text-[10px] md:text-base text-[#000004] leading-relaxed">
                    {item.text}
                  </p>
                </div>

                
              </motion.div>
            );
          })}
        </div>

        {/* 🔹 Самолётики по углам */}
        {/* <AirplaneOnPath side="right" src="/images/WhyFexperience/plane-icon.svg" />
        <AirplaneOnPath side="left" src="/images/WhyFexperience/plane-icon.svg" /> */}
      </div>
    </section>
  );
}