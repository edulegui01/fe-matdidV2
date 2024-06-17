import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { HomeComponent } from './components/home.component';






export const routes: Routes = [
    { path: MENU_URLS.HOME, component: HomeComponent },

    
];