export type Expedition = {
  slug: string;
  title: string;
  country: string;
  dates: string;
  status: 'active' | 'completed' | 'upcoming';
  description: string;
  image: string;
  videoUrl?: string;
  speakersCount?: number;
  programSlug?: string;
  rubrics?: { enabled?: boolean };
  additionalInfo?: string;
  duration?: string;
  participantsCount?: string;
  participantsDescription?: string;
  showDatesInMenu?: boolean;
  includes?: string[];
  fullDescription?: string;
  price?: string;
  spots?: number;

  timer?: {
    enabled: boolean;
    targetDate: string;
    label: string;     
  };
};