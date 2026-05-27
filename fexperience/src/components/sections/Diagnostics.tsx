import { DiagnosticsForm } from './DiagnosticsForm';

const bentoItems = [
  { title: 'Бесплатная экспресс-сессия с экспертом FExperience', desc: 'За 30 минут вы получите ключевые инсайты для принятия решения о международной экспансии', highlight: true, },
  { title: 'Готовность к экспансии', desc: 'Насколько ваш бизнес готов к международной экспансии' },
  { title: 'Перспективные рынки', desc: 'Какие направления могут быть наиболее интересными для вашего бизнеса' },
  { title: 'Участие в экспедиции', desc: 'Имеет ли смысл участие в ближайшей экспедиции' },
];

export function Diagnostics() {
  return (
    <section id="diagnostics" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4">
          ЭКСПРЕСС-АНАЛИЗ С ЭКСПЕРТОМ FORBES
        </h2>
        <p className="text-lg text-[#A0A0A0] max-w-2xl mx-auto">
          Оцените перспективы вашего бизнеса для выхода на новые рынки всего за 30 минут
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Левая колонка: Форма */}
        <div className="bg-[#110F0D] border border-[#2A2A2A] rounded-xl p-6 md:p-8">
          <DiagnosticsForm />
        </div>

        {/* Правая колонка: 4 блока в стиле bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bentoItems.map((item, i) => (
            <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-5 hover:border-[#F7931A]/40 transition-all duration-300">
              <h3 className={`font-medium text-base md:text-lg mb-2 ${item.highlight ? 'text-[#F7931A]' : 'text-white'}`}> {item.title} </h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}