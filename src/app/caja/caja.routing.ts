import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { MovimientoCajaFormComponent } from './components/movimiento-caja-form.component';
import { CajaHistoricoComponent } from './components/caja-historico.component';
import { CajaActualComponent } from './components/caja-actual.component';






export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.CAJA.ACTUAL.URL, pathMatch: 'full' },
    { path: MENU_URLS.CAJA.LISTAR.URL, component: CajaHistoricoComponent },
    { path: MENU_URLS.CAJA.NUEVO.URL, component: MovimientoCajaFormComponent },
    { path: MENU_URLS.CAJA.ACTUAL.URL, component: CajaActualComponent },

];