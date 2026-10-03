import { Service, Barber, Testimonial, PricingItem, PublicService, Employee } from '../shared/models';

export interface AboutCard {
  title: string;
  desc: string;
  icon: 'image' | 'cut' | 'badge' | 'paint';
}

export interface HeroStat {
  num: string;
  label: string;
}

export interface BarberBusinessData {
  id: 'real-quarter' | 'fake-apex';
  isMock: boolean;

  // Identidad de marca
  brandName: string;
  brandAccent: string;
  fullName: string;
  heroLabel: string;
  tagline: string;
  heroDescription: string;
  heroStats: HeroStat[];

  // WhatsApp y llamada a la acción
  whatsappNumber: string;
  whatsappUrl: string;

  // Sección Sobre Nosotros
  aboutLabel: string;
  aboutTitle: string;
  aboutHighlight: string;
  aboutSubtitle: string;
  aboutCards: AboutCard[];

  // Servicios
  servicesSectionSubtitle: string;
  services: Service[];

  // Vídeo Showcase
  videoTitle: string;
  videoSubtitle: string;
  videoEmbedUrl: string;
  videoWatchUrl: string;
  videoIframeTitle: string;
  videoFooterPrompt: string;
  videoFooterPhone: string;
  videoFooterInstagram: string;

  // Higiene
  hygieneSubtitle: string;

  // Precios
  pricingSubtitle: string;
  pricing: PricingItem[];

  // Equipo
  teamSubtitle: string;
  barbers: Barber[];

  // Testimonios
  testimonials: Testimonial[];

  // Redes y Contacto
  socialInstagramText: string;
  socialPhone: string;
  contactAddressHtml: string;
  contactPhone: string;
  contactPhoneClean: string;
  contactInstagramHandle: string;
  contactInstagramUrl: string;
  contactScheduleHtml: string;
  annualCalendar?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  googleMapsUrl?: string;
  googleMapsIframeUrl: string;
  googleMapsTitle: string;

  // Footer
  footerTagline: string;
  footerCopyText: string;

  // Botón flotante
  floatingButtonAriaLabel: string;

  // Asistente Virtual / Chat
  chatInitialMessage: string;
  chatAssistantName: string;
  chatSidebarLocation: string;
  chatQuickReplies: string[];

  // Datos para servicios API simulados (Booking / Chat)
  mockPublicServices: PublicService[];
  mockEmployees: Employee[];
}
