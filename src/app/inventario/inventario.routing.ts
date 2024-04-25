import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { InventarioListComponent } from './components/inventario-list.component';
import { MovimientoFormComponent } from './components/movimiento-from.component';
import { MovimientoListComponent } from './components/movimiento-list.component';





export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.INVENTARIO.LISTAR_INVENTARIO.URL, pathMatch: 'full' },
    { path: MENU_URLS.INVENTARIO.LISTAR_INVENTARIO.URL, component: InventarioListComponent },
    { path: MENU_URLS.INVENTARIO.NUEVO_MOVIMIENTO.URL, component: MovimientoFormComponent },
    { path: MENU_URLS.INVENTARIO.LISTAR_MOVIMIENTO.URL, component: MovimientoListComponent },
    
];