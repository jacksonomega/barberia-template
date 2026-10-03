import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CompanyService } from './company.service';
import { CompanyData } from '../shared/models/company.model';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  const mockCompany: CompanyData = {
    id: 1,
    name: 'HIS Barbería Urban 2',
    address: 'C. de San Marcos, 1, Centro, 28004 Madrid',
    phone: '722194804',
    business_hours: 'Lunes a Viernes de 09:00 a 14:00 y de 16:00 a 19:00\nSábados de 9:00 a 14:00',
    annual_calendar: 'Todo el año salvo festivos',
    instagram: 'www.instagram.com/hisbarberia/',
    youtube: 'https://youtube.com/@canal',
    facebook: 'https://facebook.com/hisbarberia',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=C.+de+San+Marcos%2C+1%2C+Centro%2C+28004+Madrid',
  };

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CompanyService,
      ],
    });

    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);

    // Flushes initial constructor request
    const req = httpMock.expectOne('https://barber-api.omega-studio.tech/api/company');
    req.flush(mockCompany);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and have company data loaded', () => {
    expect(service).toBeTruthy();
    expect(service.company()).toBeDefined();
    expect(service.company().name).toBe('HIS Barbería Urban 2');
    expect(service.company().address).toBe('C. de San Marcos, 1, Centro, 28004 Madrid');
    expect(service.company().phone).toBe('722194804');
    expect(service.loaded()).toBe(true);
  });

  it('should load company on manual forceRefresh', () => {
    service.loadCompany(true).subscribe();

    const req = httpMock.expectOne('https://barber-api.omega-studio.tech/api/company');
    expect(req.request.method).toBe('GET');
    req.flush(mockCompany);

    expect(service.company().name).toBe('HIS Barbería Urban 2');
  });
});
