import { MENU_URLS } from "../components/navbar/routes";
import { subMenu } from "./subMenu-items";



export class menu{


    static menuList:Array<any>=[
        {nombre:'INICIO',menus:[],icono:'home'},
        {nombre:'ACCIONES', menus:subMenu.menuListAcciones},
        {nombre:'ADMINISTRACION',menus:subMenu.menuListAdministracion},
        
    ]


}