import { Routes } from '@angular/router';

import { HomeComponent, ContactComponent, ExperienceComponent, SkillsComponent } from './pages';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'experience',
        component: ExperienceComponent
    },
    {
        path: 'skills',
        component: SkillsComponent
    }
];
