export interface Service {
  icon: string;
  name: string;
  desc: string;
  duration: string;
  price: number;
}

export interface Barber {
  name: string;
  role: string;
  img: string;
  specialties: string[];
  instagram: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export interface PricingItem {
  name: string;
  price: number;
  popular?: boolean;
}

export interface NavLink {
  label: string;
  sectionId?: string;
  route?: string;
  isCta?: boolean;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href?: string;
  isLink?: boolean;
}

export * from './employee.model';
export * from './barber-service.model';

