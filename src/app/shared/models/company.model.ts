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
  name: 'HIS Barbería Urban 2',
  address: 'C. de San Marcos, 1, Centro, 28004 Madrid',
  phone: '+34632779183',
  business_hours: 'Lunes: Cerrado\nMartes a Viernes: 09:30 a 14:00 y 16:30 a 20:30\nSábados: 09:00 a 14:00',
  annual_calendar: 'Varones de cualquier edad · Martes a Sábado (Lunes y Domingos cerrado)',
  instagram: 'www.instagram.com/hisbarberia/',
  youtube: 'https://youtube.com/@canal',
  facebook: 'https://facebook.com/hisbarberia',
  google_maps_url: 'https://www.google.com/maps/search/?api=1&query=C.+de+San+Marcos%2C+1%2C+Centro%2C+28004+Madrid',
  created_at: '2026-09-27T14:33:38.929327',
  updated_at: '2026-10-31T16:00:00.000000',
};
