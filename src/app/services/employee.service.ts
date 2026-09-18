import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap, catchError } from 'rxjs';
import { Employee } from '../shared/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly http = inject(HttpClient);
  readonly apiUrl = 'https://barber-api.omega-studio.tech/api/barbers/public';

  // State Signals
  private readonly _employees = signal<Employee[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _loaded = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Readonly Signals exposed to consumers
  readonly employees = this._employees.asReadonly();
  readonly barbers = this._employees.asReadonly(); // Alias
  readonly loading = this._loading.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly activeEmployees = computed(() =>
    this._employees().filter((emp) => emp.active)
  );

  readonly totalEmployees = computed(() => this._employees().length);

  private inFlightRequest$: Observable<Employee[]> | null = null;

  constructor() {
    // Automatically trigger fetch on service instantiation if not already loaded or loading
    if (!this._loaded() && !this._loading()) {
      this.loadEmployees().subscribe();
    }
  }

  /**
   * Loads employees from the API and stores them in state.
   * Caches in-flight requests to prevent duplicate network calls.
   *
   * @param forceRefresh Force a network reload even if already loaded.
   */
  loadEmployees(forceRefresh = false): Observable<Employee[]> {
    if (!forceRefresh && this._loaded()) {
      return of(this._employees());
    }

    if (this.inFlightRequest$) {
      return this.inFlightRequest$;
    }

    this._loading.set(true);
    this._error.set(null);

    this.inFlightRequest$ = this.http.get<Employee[]>(this.apiUrl).pipe(
      tap({
        next: (data) => {
          this._employees.set(data ?? []);
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
      catchError((err) => {
        // Return empty array to prevent failing application bootstrap / hydration
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
    return this._employees().find((emp) => emp.id === id);
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
