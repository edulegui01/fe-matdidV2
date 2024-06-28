import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { EstadisticaComponent } from './components/estadistica.component';




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.LOCALIDAD.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.LOCALIDAD.LISTAR.URL, component: EstadisticaComponent },

];