import { Component, EventEmitter, Input, Output, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { AppointmentBooking } from '../../models/appointment.model';

@Component({
  selector: 'app-quick-booking-modal',
  standalone: true,
  imports: [CommonModule, BookingFormComponent],
  templateUrl: './quick-booking-modal.component.html',
  styleUrl: './quick-booking-modal.component.css',
})
export class QuickBookingModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() bookingConfirmed = new EventEmitter<AppointmentBooking>();

  confirmedBooking = signal<AppointmentBooking | null>(null);

  @HostListener('document:keydown.escape')
  onEscapePress() {
    if (this.isOpen) {
      this.handleClose();
    }
  }

  handleBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.handleClose();
    }
  }

  handleBookingSubmit(booking: AppointmentBooking) {
    this.bookingConfirmed.emit(booking);
    this.handleClose();
  }

  handleClose() {
    this.confirmedBooking.set(null);
    this.closeModal.emit();
  }
}
