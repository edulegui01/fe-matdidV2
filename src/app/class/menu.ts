

/**
 * Clase que representa el menu de navegacion
 */
export class Menu {

    id!: string;
    nombre!: string;
    secuencia!: number;
    url!: string;
    icono!: string;
    menuPadreId!: string;
    moduloId!: string;
    moduloNombre!: string;
    usuarioModificacionId!: string;
    fechaModificacion!: string;
    //permisos: Array<Permission>; // lista de permisos
    menus!: Array<Menu>;

    constructor(
        id: string = "",
        nombre: string = "",
        secuencia: number = 0,
        url: string = "",
        icono: string = "",
        menuPadreId: string = "",
        moduloId: string = "",
        moduloNombre: string = "",
        usuarioModificacionId: string = "",
        fechaModificacion: string = "",
        //permisos: Array<Permission> = [],
        menus: Array<Menu> = [],
    ) {

        // nombre = nombre ? nombre.toUpperCase() : null;

        Object.assign(this, {
            id,
            nombre,
            secuencia,
            url,
            icono,
            menuPadreId,
            moduloId,
            moduloNombre,
            usuarioModificacionId,
            fechaModificacion,
            //permisos,
            menus,
        });

    }

}

export class MenuNavigation {
    id!: string;
    nombre!: string;
    icono!: string;
    secuencia!: number;
    url!: string;
    permisos!: Array<any>;
    menus!: Array<MenuNavigation>;

    constructor(id: string, nombre: string, icono: string, secuencia: number,
        url: string, permisos: Array<any>, menus: Array<MenuNavigation> = []) {

        Object.assign(this, { id, nombre, icono, secuencia, url, permisos, menus });
    }
}

export interface MenuConfigUrl{
    menuUrl: string;
    listar: string;
    editar: string;
    nuevo: string;
    eliminar: string;
    menuDict: string;
}
