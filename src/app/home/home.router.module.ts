import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    }
];

export const HomeRoutingModule = RouterModule.forChild(routes);
