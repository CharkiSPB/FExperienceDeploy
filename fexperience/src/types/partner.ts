export type Partner = {
  name: string;
  logo: string;
  website: string;
  description: string;
  headerLabel?: string;
  mainLabel?: string;
  role?: 'general' | 'partner' | 'info';
};

export type PartnerBanner = {
  enabled: boolean;
  name: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  website: string;
  alt: string;
};
