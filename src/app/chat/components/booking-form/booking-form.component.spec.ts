import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BookingFormComponent } from './booking-form.component';

describe('BookingFormComponent', () => {
  let component: BookingFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(BookingFormComponent);
    component = fixture.componentInstance;
  });

  it('should create and initialize default values', () => {
    expect(component).toBeTruthy();
    expect(component.peopleCount()).toBe(1);
    expect(component.isFormValid()).toBe(false);
  });

  it('should increment and decrement people count within bounds', () => {
    component.incrementPeople();
    expect(component.peopleCount()).toBe(2);
    component.decrementPeople();
    expect(component.peopleCount()).toBe(1);
    component.decrementPeople(); // should not go below 1
    expect(component.peopleCount()).toBe(1);
  });

  it('should validate form correctly when fields are filled', () => {
    component.name.set('Jackson');
    component.phone.set('+34600112233');
    component.selectedServiceId.set(1);
    component.date.set('2026-10-15');
    component.time.set('10:00');

    expect(component.isFormValid()).toBe(true);
  });
});
