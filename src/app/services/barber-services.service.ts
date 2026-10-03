import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap, catchError } from 'rxjs';
import { PublicService } from '../shared/models/barber-service.model';

@Injectable({
  providedIn: 'root',
})
export class BarberServicesService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly apiUrl = 'https://barber-api.omega-studio.tech/api/services/public';

  // API State Signals
  private readonly _apiServices = signal<PublicService[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _loaded = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Readonly Signals exposed to consumers
  readonly services = computed<PublicService[]>(() => {
    const list = this._apiServices();
    if (list && list.length > 0) {
      return list;
    }
    return [
      { id: 1, name: 'Corte de Pelo', service: 'Corte de Pelo', price: 13.0 },
      { id: 2, name: 'Cejas', service: 'Cejas', price: 2.0 },
      { id: 3, name: 'Barba', service: 'Barba', price: 5.0 },
    ];
  });

  readonly loading = this._loading.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly totalServices = computed(() => this.services().length);

  private inFlightRequest$: Observable<PublicService[]> | null = null;

  constructor() {
    if (this.isBrowser && !this._loaded() && !this._loading()) {
      this.loadServices().subscribe();
    }
  }

  /**
   * Carga los servicios desde la API pública
   */
  loadServices(forceRefresh = false): Observable<PublicService[]> {
    if (!forceRefresh && this._loaded()) {
      return of(this._apiServices());
    }

    if (this.inFlightRequest$) {
      return this.inFlightRequest$;
    }

    this._loading.set(true);
    this._error.set(null);

    this.inFlightRequest$ = this.http.get<PublicService[]>(this.apiUrl).pipe(
      tap({
        next: (data) => {
          this._apiServices.set(data ?? []);
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
      catchError(() => {
        return of([] as PublicService[]);
      }),
      shareReplay(1)
    );

    return this.inFlightRequest$;
  }

  /**
   * Obtiene un servicio por su ID desde el estado actual
   */
  getServiceById(id: number): PublicService | undefined {
    return this.services().find((item) => item.id === id);
  }
}

// Alias exports
export { BarberServicesService as ServicesService, BarberServicesService as PublicServicesService };
