import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../app/domain/home/pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
