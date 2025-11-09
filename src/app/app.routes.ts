import { Routes } from '@angular/router';

import { HomeComponent, ContactComponent } from './pages';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
];
