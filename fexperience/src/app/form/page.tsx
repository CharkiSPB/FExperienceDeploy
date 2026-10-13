import type { Metadata } from 'next';
import { LeadForm } from '@/components/shared/LeadForm';
import { ModalAside } from '@/components/shared/ModalAside';
import { expeditions, getNearestExpedition } from '@/data/expeditions';

// Служебная страница ТОЛЬКО для QR-ссылки: в навигации, sitemap и robots её нет.
// Попасть можно лишь по прямой ссылке https://fexperience.forbes.ru/form
export const metadata: Metadata = {
  title: 'Оставить заявку',
  description: 'Заявка на участие в бизнес-экспедиции FExperience',
  robots: { index: false, follow: false },
};

export default function FormPage() {
  // То же фото, что в попапе: ближайшее активное направление
  const activeExpeditions = expeditions.filter((e) => e.status === 'active');
  const nearest = getNearestExpedition(expeditions);
  const photo = nearest?.image ?? activeExpeditions[0]?.image;

  return (
    <section className="form-page" aria-label="Форма заявки">
      <div className="form-page__grid">
        <ModalAside photo={photo} eyebrow="Стать участником" />
        <div className="form-page__panel">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
