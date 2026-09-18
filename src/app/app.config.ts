import {
  ApplicationConfig,
  LOCALE_ID,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { forkJoin } from 'rxjs';

import { routes } from './app.routes';
import { EmployeeService } from './services/employee.service';
import { BarberServicesService } from './services/barber-services.service';

// Registrar datos de localización en español para pipes como CurrencyPipe y DatePipe
registerLocaleData(localeEs, 'es-ES');
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => {
      const employeeService = inject(EmployeeService);
      const barberServicesService = inject(BarberServicesService);
      return forkJoin([
        employeeService.loadEmployees(),
        barberServicesService.loadServices(),
      ]);
    }),
  ],
};
