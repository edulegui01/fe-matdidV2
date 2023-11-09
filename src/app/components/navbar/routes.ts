export const URLS_EXCLUDE = [
    '/',
    '/login',
    '/cuenta/recuperar',
    '/perfil',
    '/gestion',
    '/administracion',
];

export const MENU_URLS = {
    HOME: '',
    PERFIL: {
        URL_BASE: 'usuario',
    },
    HORARIO: {
        URL_BASE: 'horario',
        ROOT: {
            URL: 'listar-horario',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-horario',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-horario',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-horario',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-horario',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    CLIENTE: {
        URL_BASE: 'cliente',
        ROOT: {
            URL: 'listar-cliente',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-cliente',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-cliente',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-cliente',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-cliente',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    PROVEEDOR: {
        URL_BASE: 'proveedor',
        ROOT: {
            URL: 'listar-proveedor',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-proveedor',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-proveedor',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-proveedor',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-proveedor',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    PRODUCTO: {
        URL_BASE: 'producto',
        ROOT: {
            URL: 'listar-producto',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-producto',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-producto',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-producto',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        DETALLE: {
            URL: 'detalle-producto',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-producto',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    FUNCIONARIO: {
        URL_BASE: 'funcionario',
        ROOT: {
            URL: 'listar-funcionario',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-funcionario',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-funcionario',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-funcionario',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-funcionario',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    LOCALIDAD: {
        URL_BASE: 'localidad',
        ROOT: {
            URL: 'listar-localidad',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-localidad',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-localidad',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-localidad',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-localidad',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    COMPRA: {
        URL_BASE: 'compra',
        ROOT: {
            URL: 'listar-compra',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-compra',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-compra',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-compra',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-compra',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    VENTA: {
        URL_BASE: 'venta',
        ROOT: {
            URL: 'listar-venta',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-venta',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-venta',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-venta',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-venta',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    
};
