import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../home/pages/home/home.component').then(m => m.HomeComponent)
    }
];
