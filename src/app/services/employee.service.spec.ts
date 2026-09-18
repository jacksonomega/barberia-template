import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../shared/models/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const mockEmployees: Employee[] = [
    {
      id: 'a897e820-10f3-4c46-b59a-b2a631baae41',
      first_name: 'Jackson',
      last_name: 'Echevarria',
      avatar: '',
      active: true,
      services: [{ id: 1, name: 'Corte de Pelo', price: 13.0, duration: 30 }],
      schedules: [],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        EmployeeService,
      ],
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);

    // Flushes initial constructor request
    const req = httpMock.expectOne('https://barber-api.omega-studio.tech/api/barbers/public');
    req.flush(mockEmployees);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and populate employees signal', () => {
    expect(service).toBeTruthy();
    expect(service.employees().length).toBe(1);
    expect(service.employees()[0].first_name).toBe('Jackson');
  });

  it('should get employee by id', () => {
    const emp = service.getEmployeeById('a897e820-10f3-4c46-b59a-b2a631baae41');
    expect(emp).toBeDefined();
    expect(emp?.last_name).toBe('Echevarria');
  });

  it('should format full name correctly', () => {
    const fullName = service.getFullName(mockEmployees[0]);
    expect(fullName).toBe('Jackson Echevarria');
  });
});
