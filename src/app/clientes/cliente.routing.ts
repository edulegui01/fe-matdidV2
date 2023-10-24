import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { ClienteListComponent } from './components/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form.component';



export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.CLIENTE.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.CLIENTE.LISTAR.URL, component: ClienteListComponent },
    { path: MENU_URLS.CLIENTE.NUEVO.URL, component: ClienteFormComponent },
    { path: MENU_URLS.CLIENTE.EDITAR.URL, component: ClienteFormComponent },
];