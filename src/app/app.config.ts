import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { PRECONNECT_CHECK_BLOCKLIST, provideCloudinaryLoader } from '@angular/common';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
          routes,
          withComponentInputBinding(),
          withPreloading(PreloadAllModules)
      ),
    provideClientHydration(
        withEventReplay(),
        withHttpTransferCacheOptions({
          includePostRequests: true
        })
    ),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideCloudinaryLoader('https://res.cloudinary.com/ddkyg5hdq/'),
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://res.cloudinary.com' }
  ]
};
