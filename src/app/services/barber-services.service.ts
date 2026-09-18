import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap, catchError } from 'rxjs';
import { PublicService } from '../shared/models/barber-service.model';

@Injectable({
  providedIn: 'root',
})
export class BarberServicesService {
  private readonly http = inject(HttpClient);
  readonly apiUrl = 'https://barber-api.omega-studio.tech/api/services/public';

  // State Signals
  private readonly _services = signal<PublicService[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _loaded = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Readonly Signals exposed to consumers
  readonly services = this._services.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly totalServices = computed(() => this._services().length);

  private inFlightRequest$: Observable<PublicService[]> | null = null;

  constructor() {
    // Automatically trigger fetch on service instantiation if not already loaded or loading
    if (!this._loaded() && !this._loading()) {
      this.loadServices().subscribe();
    }
  }

  /**
   * Loads services from the API and stores them in state.
   * Caches in-flight requests to prevent duplicate network calls.
   *
   * @param forceRefresh Force a network reload even if already loaded.
   */
  loadServices(forceRefresh = false): Observable<PublicService[]> {
    if (!forceRefresh && this._loaded()) {
      return of(this._services());
    }

    if (this.inFlightRequest$) {
      return this.inFlightRequest$;
    }

    this._loading.set(true);
    this._error.set(null);

    this.inFlightRequest$ = this.http.get<PublicService[]>(this.apiUrl).pipe(
      tap({
        next: (data) => {
          this._services.set(data ?? []);
          this._loaded.set(true);
          this._loading.set(false);
          this.inFlightRequest$ = null;
        },
        error: (err) => {
          console.error('Error al cargar la lista de servicios:', err);
          this._error.set(err?.message || 'Error al obtener los datos de los servicios');
          this._loading.set(false);
          this.inFlightRequest$ = null;
        },
      }),
      catchError((err) => {
        // Return empty array to prevent failing application bootstrap / hydration
        return of([] as PublicService[]);
      }),
      shareReplay(1)
    );

    return this.inFlightRequest$;
  }

  /**
   * Retrieve a service by its ID from current local state
   */
  getServiceById(id: number): PublicService | undefined {
    return this._services().find((item) => item.id === id);
  }
}

// Alias exports for compatibility and developer convenience
export { BarberServicesService as ServicesService, BarberServicesService as PublicServicesService };
