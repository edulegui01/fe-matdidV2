import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { LocalidadFormComponent } from './components/localidad-form.component';
import { LocalidadListComponent } from './components/localidad-list.component';




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.LOCALIDAD.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.LOCALIDAD.LISTAR.URL, component: LocalidadListComponent },
    { path: MENU_URLS.LOCALIDAD.NUEVO.URL, component: LocalidadFormComponent },
    { path: MENU_URLS.LOCALIDAD.EDITAR.URL, component: LocalidadFormComponent },
];