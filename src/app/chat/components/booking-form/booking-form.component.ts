import { Component, EventEmitter, Output, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarberServicesService } from '../../../services/barber-services.service';
import { EmployeeService } from '../../../services/employee.service';
import { AppointmentBooking } from '../../models/appointment.model';
import { BookingSummaryComponent } from '../booking-summary/booking-summary.component';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule, BookingSummaryComponent],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css',
})
export class BookingFormComponent {
  readonly servicesService = inject(BarberServicesService);
  readonly employeeService = inject(EmployeeService);

  @Output() submitBooking = new EventEmitter<AppointmentBooking>();
  @Output() cancel = new EventEmitter<void>();

  // Signals for form controls
  name = signal('');
  phone = signal('');
  peopleCount = signal(1);
  selectedServiceId = signal<number | null>(null);
  selectedBarberId = signal<string>('any');
  date = signal('');
  time = signal('');
  notes = signal('');

  // Available time slots
  readonly timeSlots: string[] = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  // Min date is today
  readonly minDate: string = new Date().toISOString().split('T')[0];

  // Computed data
  readonly services = this.servicesService.services;
  readonly employees = this.employeeService.employees;
  readonly isServicesLoading = this.servicesService.loading;
  readonly isEmployeesLoading = this.employeeService.loading;

  readonly selectedService = computed(() =>
    this.services().find(s => s.id === this.selectedServiceId())
  );

  readonly selectedBarber = computed(() => {
    const id = this.selectedBarberId();
    if (!id || id === 'any') return null;
    return this.employees().find(e => e.id === id) || null;
  });

  readonly barberDisplayName = computed(() => {
    const barber = this.selectedBarber();
    return barber ? this.employeeService.getFullName(barber) : 'Cualquier barbero disponible';
  });

  readonly isFormValid = computed(() => {
    return (
      this.name().trim().length >= 2 &&
      this.phone().trim().length >= 6 &&
      this.selectedServiceId() !== null &&
      this.date().trim().length > 0 &&
      this.time().trim().length > 0
    );
  });

  constructor() {
    // Automatically select the first service once loaded if none is chosen
    const checkService = () => {
      const list = this.services();
      if (list.length > 0 && this.selectedServiceId() === null) {
        this.selectedServiceId.set(list[0].id);
      }
    };
    checkService();
    // Default date to tomorrow if after 18:00, or today
    const now = new Date();
    if (now.getHours() >= 19) {
      now.setDate(now.getDate() + 1);
    }
    this.date.set(now.toISOString().split('T')[0]);
  }

  selectService(id: number) {
    this.selectedServiceId.set(id);
  }

  selectTime(slot: string) {
    this.time.set(slot);
  }

  incrementPeople() {
    if (this.peopleCount() < 6) {
      this.peopleCount.update(c => c + 1);
    }
  }

  decrementPeople() {
    if (this.peopleCount() > 1) {
      this.peopleCount.update(c => c - 1);
    }
  }

  onSubmit() {
    if (!this.isFormValid()) return;

    const s = this.selectedService();
    const b = this.selectedBarber();

    const booking: AppointmentBooking = {
      name: this.name().trim(),
      phone: this.phone().trim(),
      peopleCount: this.peopleCount(),
      serviceId: s ? s.id : 0,
      serviceName: s ? s.name : 'Servicio general',
      servicePrice: s ? s.price : 0,
      barberId: b ? b.id : 'any',
      barberName: b ? this.employeeService.getFullName(b) : 'Cualquier barbero disponible',
      date: this.date(),
      time: this.time(),
      notes: this.notes().trim(),
    };

    this.submitBooking.emit(booking);
  }
}
