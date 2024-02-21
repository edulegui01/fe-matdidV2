import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { CompraFormComponent } from './components/compra-form.component';
import { CompraListComponent } from './components/compra-list.component';




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.COMPRA.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.COMPRA.LISTAR.URL, component: CompraListComponent },
    { path: MENU_URLS.COMPRA.NUEVO.URL, component: CompraFormComponent },
    { path: MENU_URLS.COMPRA.EDITAR.URL, component: CompraFormComponent },
];