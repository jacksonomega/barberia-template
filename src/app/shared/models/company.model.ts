export interface CompanyData {
  id: number;
  name: string;
  address: string;
  phone?: string | null;
  business_hours: string;
  annual_calendar: string;
  instagram: string;
  youtube: string;
  facebook: string;
  google_maps_url: string;
  created_at?: string;
  updated_at?: string;
}

export const DEFAULT_COMPANY_DATA: CompanyData = {
  id: 1,
  name: 'Barbería Shop',
  address: 'Av. de Marcial Llorente, 114 LC 6, 28696 Pelayos de la Presa, Madrid',
  phone: '632779183',
  business_hours: 'Martes a Domingo de 09:30 a 14:00 y de 16:30 a 20:30\nLunes Descanso',
  annual_calendar: 'Todo el año salvo festivos',
  instagram: 'www.instagram.com/goldbarbery/',
  youtube: 'https://youtube.com/@goldbarbery',
  facebook: 'https://facebook.com/goldbarbery',
  google_maps_url: 'https://maps.app.goo.gl/f4jM1hR9sZawkeFe8',
  created_at: '2026-11-01T16:11:26.260129',
  updated_at: '2026-11-01T16:12:56.953140',
};
