import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap, catchError } from 'rxjs';
import { CompanyData, DEFAULT_COMPANY_DATA } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly apiUrl = 'https://barber-api.omega-studio.tech/api/company';

  // State Signals
  private readonly _company = signal<CompanyData>(DEFAULT_COMPANY_DATA);
  private readonly _loading = signal<boolean>(false);
  private readonly _loaded = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Readonly Signals exposed to consumers
  readonly company = this._company.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();

  private inFlightRequest$: Observable<CompanyData> | null = null;

  constructor() {
    // Si no está cargado, iniciamos la petición
    if (!this._loaded() && !this._loading()) {
      this.loadCompany().subscribe();
    }
  }

  /**
   * Carga la información de la empresa desde el endpoint GET /api/company
   * Se ejecuta nada más iniciar la aplicación (APP_INITIALIZER)
   */
  loadCompany(forceRefresh = false): Observable<CompanyData> {
    if (!forceRefresh && this._loaded()) {
      return of(this._company());
    }

    if (this.inFlightRequest$) {
      return this.inFlightRequest$;
    }

    this._loading.set(true);
    this._error.set(null);

    this.inFlightRequest$ = this.http.get<CompanyData>(this.apiUrl).pipe(
      tap({
        next: (data) => {
          if (data && data.name) {
            this._company.set(data);
          }
          this._loaded.set(true);
          this._loading.set(false);
          this.inFlightRequest$ = null;
        },
        error: (err) => {
          console.warn('Advertencia al cargar datos de /api/company:', err);
          this._error.set(err?.message || 'Error al obtener datos de la empresa');
          this._loading.set(false);
          this.inFlightRequest$ = null;
        },
      }),
      catchError(() => {
        // Fallback seguro a los datos predeterminados en caso de desconexión
        return of(this._company());
      }),
      shareReplay(1)
    );

    return this.inFlightRequest$;
  }
}
