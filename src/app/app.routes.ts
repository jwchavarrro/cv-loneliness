import { Routes } from '@angular/router';

// Import of pages
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { SkillsComponent } from './pages/skills/skills.component';

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
