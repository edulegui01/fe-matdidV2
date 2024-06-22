import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { permissionProductGuard } from '../utils/guards/permission-product.guard';
import { AutorListComponent } from './components/autor-list.component';


export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.AUTOR.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.AUTOR.LISTAR.URL, component: AutorListComponent },
    // { path: MENU_URLS.PRODUCTO.NUEVO.URL, component: ProductoFormComponent, canActivate:[permissionProductGuard] },
    // { path: MENU_URLS.PRODUCTO.EDITAR.URL, component: ProductoFormComponent, canActivate:[permissionProductGuard] },
    // { path: MENU_URLS.PRODUCTO.DETALLE.URL, component: ProductoDetalleComponent }
];