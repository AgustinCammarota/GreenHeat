import { Routes } from '@angular/router';
import { homeRoutes } from '@home/home.routes';

export const routes: Routes = [
    {
        path: 'home',
        children: homeRoutes
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
