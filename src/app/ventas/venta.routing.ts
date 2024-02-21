import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { VentaFormComponent } from './components/venta-form.component';
import { VentaListComponent } from './components/venta-list.component';




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.VENTA.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.VENTA.LISTAR.URL, component: VentaListComponent },
    { path: MENU_URLS.VENTA.NUEVO.URL, component: VentaFormComponent },
    { path: MENU_URLS.VENTA.EDITAR.URL, component: VentaFormComponent },
];