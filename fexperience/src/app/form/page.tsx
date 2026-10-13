import type { Metadata } from 'next';
import { LeadForm } from '@/components/shared/LeadForm';

// Служебная страница ТОЛЬКО для QR-ссылки: в навигации, sitemap и robots её нет.
// Попасть можно лишь по прямой ссылке https://fexperience.forbes.ru/form
export const metadata: Metadata = {
  title: 'Оставить заявку',
  description: 'Заявка на участие в бизнес-экспедиции FExperience',
  robots: { index: false, follow: false },
};

export default function FormPage() {
  return (
    <section className="form-page" aria-label="Форма заявки">
      <div className="form-page__card">
        <LeadForm />
      </div>
    </section>
  );
}
