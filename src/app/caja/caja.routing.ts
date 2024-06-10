import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { CajaListComponent } from './components/caja-list.component';






export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.CICLO.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.CICLO.LISTAR.URL, component: CajaListComponent },

];