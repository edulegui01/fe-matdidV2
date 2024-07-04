import { MENU_URLS } from "../components/navbar/routes";
import { subMenu } from "./subMenu-items";



export class menu{


    static menuList:Array<any>=[
        {nombre:'INICIO',menus:[],icono:'home',url:MENU_URLS.HOME,permiso:'CAJERO',permiso1:'VENDEDOR',permiso2:'ADMIN'},
        {nombre:'ACCIONES', menus:subMenu.menuListAcciones,permiso:'CAJERO',permiso1:'VENDEDOR',permiso2:'ADMIN'},
        {nombre:'ADMINISTRACION',menus:subMenu.menuListAdministracion, permiso:'ADMIN'},
        
    ]


}