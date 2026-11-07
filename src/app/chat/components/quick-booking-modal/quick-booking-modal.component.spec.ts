import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { QuickBookingModalComponent } from './quick-booking-modal.component';

describe('QuickBookingModalComponent', () => {
  let component: QuickBookingModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickBookingModalComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(QuickBookingModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start closed by default and not confirmed', () => {
    expect(component.isOpen).toBe(false);
    expect(component.confirmedBooking()).toBeNull();
  });

  it('should emit closeModal event on handleClose', () => {
    let closed = false;
    component.closeModal.subscribe(() => (closed = true));
    component.handleClose();
    expect(closed).toBe(true);
    expect(component.confirmedBooking()).toBeNull();
  });

  it('should emit bookingConfirmed and close modal immediately on submit', () => {
    let emittedBooking: any = null;
    let closed = false;
    component.bookingConfirmed.subscribe((b) => (emittedBooking = b));
    component.closeModal.subscribe(() => (closed = true));

    const mockBooking = { name: 'Juan', phone: '123456789' } as any;
    component.handleBookingSubmit(mockBooking);

    expect(emittedBooking).toBe(mockBooking);
    expect(closed).toBe(true);
  });
});
