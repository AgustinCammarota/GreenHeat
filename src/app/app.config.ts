import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import {provideNetlifyLoader} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
          routes,
          withComponentInputBinding(),
          withPreloading(PreloadAllModules)
      ),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNetlifyLoader(),
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ]
};
