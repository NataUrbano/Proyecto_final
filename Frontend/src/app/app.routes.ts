import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'epilogo',
        loadChildren:() => import('./layout/layouts.module').then(m => m.LayoutsModule)
    },

    {
        path:'',
        pathMatch: 'full',
        redirectTo: 'epilogo/home',
    },
    {
        path:'**',
        pathMatch: 'full',
        redirectTo: 'epilogo',
    },
];
