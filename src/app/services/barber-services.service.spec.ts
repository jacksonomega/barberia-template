import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { BarberServicesService } from './barber-services.service';
import { PublicService } from '../shared/models/barber-service.model';

describe('BarberServicesService', () => {
  let service: BarberServicesService;
  let httpMock: HttpTestingController;

  const mockServices: PublicService[] = [
    { id: 1, name: 'Corte de Pelo', service: 'Corte de Pelo', price: 13.0 },
    { id: 2, name: 'Cejas', service: 'Cejas', price: 2.0 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BarberServicesService,
      ],
    });

    service = TestBed.inject(BarberServicesService);
    httpMock = TestBed.inject(HttpTestingController);

    // Flush constructor request
    const req = httpMock.expectOne('https://barber-api.omega-studio.tech/api/services/public');
    req.flush(mockServices);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and populate services signal', () => {
    expect(service).toBeTruthy();
    expect(service.services().length).toBe(2);
    expect(service.services()[0].name).toBe('Corte de Pelo');
    expect(service.services()[1].price).toBe(2.0);
    expect(service.totalServices()).toBe(2);
  });

  it('should get service by id', () => {
    const s = service.getServiceById(2);
    expect(s).toBeDefined();
    expect(s?.name).toBe('Cejas');
    expect(s?.price).toBe(2.0);
  });

  it('should return undefined for non-existent service id', () => {
    const s = service.getServiceById(999);
    expect(s).toBeUndefined();
  });
});
