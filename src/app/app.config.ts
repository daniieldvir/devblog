import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  heroCheck,
  heroMagnifyingGlass,
  heroMoon,
  heroPencil,
  heroSun,
  heroTrash,
  heroUserCircle,
} from '@ng-icons/heroicons/outline';
import { provideStore } from '@ngxs/store';

import { routes } from './app.routes';
import { ForumState } from './state/forum.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore([ForumState]),
    provideIcons({
      heroPencil,
      heroCheck,
      heroTrash,
      heroUserCircle,
      heroSun,
      heroMoon,
      heroMagnifyingGlass,
    }),
  ],
};
