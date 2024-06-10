import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { CajaListComponent } from './components/caja-list.component';
import { MovimientoCajaFormComponent } from './components/movimiento-caja-form.component';






export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.CAJA.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.CAJA.LISTAR.URL, component: CajaListComponent },
    { path: MENU_URLS.CAJA.NUEVO.URL, component: MovimientoCajaFormComponent },

];