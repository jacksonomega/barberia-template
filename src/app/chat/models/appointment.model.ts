export interface SelectedServiceItem {
  id: number;
  name: string;
  price: number;
}

export interface AppointmentBooking {
  name: string;
  phone: string;
  peopleCount: number;
  serviceId: number;
  serviceName: string;
  servicePrice: number;
  services?: SelectedServiceItem[];
  barberId: string;
  barberName: string;
  date: string;
  time: string;
  notes?: string;
}
