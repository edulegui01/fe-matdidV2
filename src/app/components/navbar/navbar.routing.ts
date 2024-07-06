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
import { VentaComponent } from 'src/app/ventas/components/venta.component';
import { routes as routerVenta } from 'src/app/ventas/venta.routing'
import { InventarioComponent } from 'src/app/inventario/components/inventario.component';
import { routes as routerInventario} from 'src/app/inventario/inventario.routing'
import { authGuard } from 'src/app/utils/guards/auth.guard';
import { CicloComponent } from 'src/app/ciclo/components/ciclo.component';
import { routes as routerCiclo } from 'src/app/ciclo/ciclo.routing';
import { PagoComponent } from 'src/app/pago/components/pago.component';
import {routes as routerPago } from 'src/app/pago/pago.routing';
import { CobroComponent } from 'src/app/cobro/components/cobro.component';
import {routes as routerCobro } from 'src/app/cobro/cobro.routing';
import { CajaComponent } from 'src/app/caja/components/caja.component';
import {routes as routerCaja } from 'src/app/caja/caja.routing';
import { HomeComponent } from 'src/app/home/components/home.component';
import {routes as routerHome } from 'src/app/home/home.routing';
import { AutorListComponent } from 'src/app/autor/components/autor-list.component';
import {routes as routerAutor } from 'src/app/autor/autor.routing';
import { GenerarReportesListComponent } from 'src/app/reportes/components/generar-reportes.component';
import {routes as routerReporte } from 'src/app/reportes/reportes.routing';
import { AutorAdmComponent } from 'src/app/autor-adm/components/autor-adm.component';
import {routes as routerAutorAdm } from 'src/app/autor-adm/autor-adm.routing';
import { EstadisticaComponent } from 'src/app/estadistica/components/estadistica.component';
import {routes as routerEstadistica } from 'src/app/estadistica/estadistica.routing';
import { UsuarioComponent } from 'src/app/usuario/components/usuario.component';
import {routes as routerUsuario } from 'src/app/usuario/usuario.routing';
import { ConceptoComponent } from 'src/app/concepto/components/concepto.component';
import {routes as routerConcepto } from 'src/app/concepto/concepto.routing';

export const routes: Routes = [
    {
        path: MENU_URLS.CLIENTE.URL_BASE,
        component: ClienteComponent,
        children: routeCliente,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.PROVEEDOR.URL_BASE,
        component: ProveedorComponent,
        children: routeProveedor,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.PRODUCTO.URL_BASE,
        component: ProductoComponent,
        children: routeProducto,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.FUNCIONARIO.URL_BASE,
        component: FuncionarioComponent,
        children: routerFuncionario,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.LOCALIDAD.URL_BASE,
        component: LocalidadComponent,
        children: routerLocalidad,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.COMPRA.URL_BASE,
        component: CompraComponent,
        children: routerCompra,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.VENTA.URL_BASE,
        component: VentaComponent,
        children: routerVenta,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.INVENTARIO.URL_BASE,
        component: InventarioComponent,
        children: routerInventario,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.CICLO.URL_BASE,
        component: CicloComponent,
        children: routerCiclo,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.PAGO.URL_BASE,
        component: PagoComponent,
        children: routerPago,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.COBRO.URL_BASE,
        component: CobroComponent,
        children: routerCobro,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.CAJA.URL_BASE,
        component: CajaComponent,
        children: routerCaja,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.HOME,
        component: HomeComponent,
        children: routerHome,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.AUTOR.URL_BASE,
        component: AutorListComponent,
        children: routerAutor,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.REPORTE.URL_BASE,
        component: GenerarReportesListComponent,
        children: routerReporte,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.AUTORADM.URL_BASE,
        component: AutorAdmComponent,
        children: routerAutorAdm,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.ESTADISTICA.URL_BASE,
        component: EstadisticaComponent,
        children: routerEstadistica,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.USUARIO.URL_BASE,
        component: UsuarioComponent,
        children: routerUsuario,
        canActivate:[authGuard]
    },
    {
        path: MENU_URLS.CONCEPTO.URL_BASE,
        component: ConceptoComponent,
        children: routerConcepto,
        canActivate:[authGuard]
    },
   
   

];
