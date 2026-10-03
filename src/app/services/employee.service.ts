import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap, catchError } from 'rxjs';
import { Employee } from '../shared/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly apiUrl = 'https://barber-api.omega-studio.tech/api/barbers/public';

  // API State Signals
  private readonly _apiEmployees = signal<Employee[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _loaded = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Readonly Signals exposed to consumers
  readonly employees = computed<Employee[]>(() => {
    const list = this._apiEmployees();
    if (list && list.length > 0) {
      return list;
    }
    return [
      {
        id: 'a897e820-10f3-4c46-b59a-b2a631baae41',
        first_name: 'Jackson',
        last_name: 'Echevarria',
        avatar: '',
        active: true,
        services: [{ id: 1, name: 'Corte de Pelo', price: 13.0, duration: 30 }],
        schedules: []
      },
      {
        id: '9466ace3-1dc1-4861-a0a6-9382fe49b444',
        first_name: 'Juan',
        last_name: 'Ballesteros',
        avatar: '',
        active: true,
        services: [{ id: 1, name: 'Corte de Pelo', price: 13.0, duration: 30 }],
        schedules: []
      }
    ];
  });

  readonly barbers = this.employees; // Alias
  readonly loading = this._loading.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly activeEmployees = computed(() =>
    this.employees().filter((emp) => emp.active)
  );

  readonly totalEmployees = computed(() => this.employees().length);

  private inFlightRequest$: Observable<Employee[]> | null = null;

  constructor() {
    if (this.isBrowser && !this._loaded() && !this._loading()) {
      this.loadEmployees().subscribe();
    }
  }

  /**
   * Carga los empleados desde la API pública
   */
  loadEmployees(forceRefresh = false): Observable<Employee[]> {

    if (!forceRefresh && this._loaded()) {
      return of(this._apiEmployees());
    }

    if (this.inFlightRequest$) {
      return this.inFlightRequest$;
    }

    this._loading.set(true);
    this._error.set(null);

    this.inFlightRequest$ = this.http.get<Employee[]>(this.apiUrl).pipe(
      tap({
        next: (data) => {
          this._apiEmployees.set(data ?? []);
          this._loaded.set(true);
          this._loading.set(false);
          this.inFlightRequest$ = null;
        },
        error: (err) => {
          console.error('Error al cargar la lista de empleados:', err);
          this._error.set(err?.message || 'Error al obtener los datos de los empleados');
          this._loading.set(false);
          this.inFlightRequest$ = null;
        },
      }),
      catchError(() => {
        return of([] as Employee[]);
      }),
      shareReplay(1)
    );

    return this.inFlightRequest$;
  }

  /**
   * Alias method for loadEmployees
   */
  loadBarbers(forceRefresh = false): Observable<Employee[]> {
    return this.loadEmployees(forceRefresh);
  }

  /**
   * Retrieve an employee by ID from current local state
   */
  getEmployeeById(id: string): Employee | undefined {
    return this.employees().find((emp) => emp.id === id);
  }

  /**
   * Format employee's full name
   */
  getFullName(employee: Employee): string {
    return `${employee.first_name} ${employee.last_name}`.trim();
  }
}

// Alias export for compatibility
export { EmployeeService as BarberService };
