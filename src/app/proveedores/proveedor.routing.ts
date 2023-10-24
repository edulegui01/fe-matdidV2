import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { ProveedorListComponent } from './components/proveedor-list.component';
import { ProveedorFormComponent } from './components/proveedor-form.component';




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.PROVEEDOR.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.PROVEEDOR.LISTAR.URL, component: ProveedorListComponent },
    { path: MENU_URLS.PROVEEDOR.NUEVO.URL, component: ProveedorFormComponent },
    { path: MENU_URLS.PROVEEDOR.EDITAR.URL, component: ProveedorFormComponent },
];