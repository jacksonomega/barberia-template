import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap, catchError } from 'rxjs';
import { PublicService } from '../shared/models/barber-service.model';

export const DEFAULT_PUBLIC_SERVICES: PublicService[] = [
  { id: 1, name: 'Corte degradado a Navaja', service: 'Corte degradado a Navaja (20–30 min)', price: 10.0 },
  { id: 2, name: 'Corte degradado a cero', service: 'Corte degradado a cero (20–30 min)', price: 9.0 },
  { id: 3, name: 'Corte de pelo con forma', service: 'Corte de pelo con forma (20–30 min)', price: 9.0 },
  { id: 4, name: 'Corte rapado a maquina', service: 'Corte rapado a maquina (20–30 min)', price: 6.0 },
  { id: 5, name: 'Afeitar la barba', service: 'Afeitar la barba (20–30 min)', price: 6.0 },
  { id: 6, name: 'Formar la barba', service: 'Formar la barba (20–30 min)', price: 7.0 },
  { id: 7, name: 'Corte degradado y afeitar barba', service: 'Corte degradado y afeitar barba (20–30 min)', price: 15.0 },
  { id: 8, name: 'Corte degradado y formar barba', service: 'Corte degradado y formar barba (20–30 min)', price: 15.0 },
  { id: 9, name: 'Solo peinar', service: 'Solo peinar (20–30 min)', price: 3.0 },
  { id: 10, name: 'Afeitar la barba a maquina', service: 'Afeitar la barba a maquina (20–30 min)', price: 4.0 },
  { id: 11, name: 'Lavar cabeza', service: 'Lavar cabeza (20–30 min)', price: 2.0 },
  { id: 12, name: 'Alisado de pelo', service: 'Alisado de pelo (20–30 min)', price: 12.0 },
  { id: 13, name: 'Corte de pelo a tijera', service: 'Corte de pelo a tijera (20–30 min)', price: 9.0 },
  { id: 14, name: 'Niños menores de 10 años', service: 'Niños menores de 10 años (20–30 min)', price: 8.0 },
];

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
    // Si la API devuelve un stub no configurado de 1 elemento ('barba') o está vacía, usamos el catálogo completo de 14 servicios
    if (list && list.length > 0 && !(list.length === 1 && list[0].name.toLowerCase() === 'barba')) {
      return list;
    }
    return DEFAULT_PUBLIC_SERVICES;
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
