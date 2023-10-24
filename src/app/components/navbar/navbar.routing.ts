import { Routes } from '@angular/router';
import { MENU_URLS } from './routes';
import { ClienteComponent } from 'src/app/clientes/components/cliente.component';
import { routes as routeCliente } from 'src/app/clientes/cliente.routing';
import { ProveedorComponent } from 'src/app/proveedores/components/proveedor.component';
import { routes as routeProveedor } from 'src/app/proveedores/proveedor.routing';
import {routes as routeProducto} from 'src/app/producto/producto.routing'
import { ProductoComponent } from 'src/app/producto/components/producto.component';
import { FuncionarioComponent } from 'src/app/funcionario/components/funcionario.component';
import {routes as routerFuncionario} from 'src/app/funcionario/funcionario.routing'
import { LocalidadComponent } from 'src/app/localidad/components/localidad.component';
import {routes as routerLocalidad} from 'src/app/localidad/localidad.routing'
import { routes as routerCompra } from 'src/app/compra/compra.routing';
import { CompraComponent } from 'src/app/compra/components/compra.component';

export const routes: Routes = [
    {
        path: MENU_URLS.CLIENTE.URL_BASE,
        component: ClienteComponent,
        children: routeCliente
    },
    {
        path: MENU_URLS.PROVEEDOR.URL_BASE,
        component: ProveedorComponent,
        children: routeProveedor
    },
    {
        path: MENU_URLS.PRODUCTO.URL_BASE,
        component: ProductoComponent,
        children: routeProducto
    },
    {
        path: MENU_URLS.FUNCIONARIO.URL_BASE,
        component: FuncionarioComponent,
        children: routerFuncionario
    },
    {
        path: MENU_URLS.LOCALIDAD.URL_BASE,
        component: LocalidadComponent,
        children: routerLocalidad
    },
    {
        path: MENU_URLS.COMPRA.URL_BASE,
        component: CompraComponent,
        children: routerCompra
    },
   

];
