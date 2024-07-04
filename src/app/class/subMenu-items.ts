import { MENU_URLS } from "../components/navbar/routes"



export class subMenu{

    static subMenuProducto:Array<any>=[
        {nombre:'LIBROS',menus:[],icono:'', url:MENU_URLS.PRODUCTO.URL_BASE},
        {nombre:'MATERIA',menus:[],icono:'',url:MENU_URLS.PROVEEDOR.URL_BASE},
        {nombre:'CICLO',menus:[],icono:'',url:MENU_URLS.CICLO.URL_BASE},
        {nombre:'CATEGORIA',menus:[],icono:'',url:MENU_URLS.FUNCIONARIO.URL_BASE},
        {nombre:'EDITORIAL',menus:[],icono:'',url:MENU_URLS.FUNCIONARIO.URL_BASE},
    ]

    static menuListAcciones:Array<any>=[
       
        {nombre:'COMPRAS',menus:[],icono:'shopping_cart', url:MENU_URLS.COMPRA.URL_BASE,permiso:'CAJERO',permiso2:'ADMIN'},
        {nombre:'VENTAS',menus:[],icono:'point_of_sale',url:MENU_URLS.VENTA.URL_BASE,permiso:'CAJERO',permiso1:'VENDEDOR',permiso2:'ADMIN'},
        {nombre:'CAJA',menus:[],icono:'monetization_on',url:MENU_URLS.CAJA.URL_BASE,permiso:'CAJERO',permiso2:'ADMIN'},
        {nombre:'INVENTARIO',menus:[],icono:'assignment',url:MENU_URLS.INVENTARIO.URL_BASE,permiso:'CAJERO',permiso1:'VENDEDOR',permiso2:'ADMIN'},
        {nombre:'LIBROS',menus:[],icono:'library_books',url:MENU_URLS.PRODUCTO.URL_BASE,permiso:'CAJERO',permiso1:'VENDEDOR',permiso2:'ADMIN'},
        {nombre:'REPORTES',menus:[],icono:'picture_as_pdf',url:MENU_URLS.REPORTE.URL_BASE,permiso:'CAJERO',permiso2:'ADMIN',permiso1:'VENDEDOR'},
        {nombre:'ESTADISTICAS',menus:[],icono:'bar_chart',url:MENU_URLS.ESTADISTICA.URL_BASE,permiso:'CAJERO',permiso2:'ADMIN',permiso1:'VENDEDOR'},
    ]

    static menuListAdministracion:Array<any>=[
        {nombre:'CLIENTES',menus:[],icono:'groups',url:MENU_URLS.CLIENTE.URL_BASE,permiso:'ADMIN'},
        {nombre:'PROVEEDORES',menus:[],icono:'local_shipping',url:MENU_URLS.PROVEEDOR.URL_BASE,permiso:'ADMIN'},
        {nombre:'FUNCIONARIOS',menus:[],icono:'contacts',url:MENU_URLS.FUNCIONARIO.URL_BASE,permiso:'ADMIN'},
        {nombre:'LOCALIDADES',menus:[],icono:'location_on', url:MENU_URLS.LOCALIDAD.URL_BASE,permiso:'ADMIN'},
        {nombre:'AUTOR',menus:[],icono:'contacts', url:MENU_URLS.AUTORADM.URL_BASE,permiso:'ADMIN'},
    ]




   


}