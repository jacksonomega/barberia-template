export interface AppointmentBooking {
  name: string;
  phone: string;
  peopleCount: number;
  serviceId: number;
  serviceName: string;
  servicePrice: number;
  barberId: string;
  barberName: string;
  date: string;
  time: string;
  notes?: string;
}
