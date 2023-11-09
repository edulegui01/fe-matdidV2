import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { VentaFormComponent } from './components/venta-form.component';




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.COMPRA.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.COMPRA.LISTAR.URL, component: VentaFormComponent },
    { path: MENU_URLS.COMPRA.NUEVO.URL, component: VentaFormComponent },
    { path: MENU_URLS.COMPRA.EDITAR.URL, component: VentaFormComponent },
];