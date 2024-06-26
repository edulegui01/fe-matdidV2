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
        DETALLE: {
            URL: 'detalle-compra',
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
        DETALLE: {
            URL: 'detalle-venta',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-venta',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    INVENTARIO: {
        URL_BASE: 'inventario',
        ROOT: {
            URL: 'listar-inventario',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR_INVENTARIO: {
            URL: 'listar-inventario',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO_MOVIMIENTO: {
            URL: 'nuevo-movimiento',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        LISTAR_MOVIMIENTO: {
            URL: 'listar-movimiento',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-venta',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    CICLO: {
        URL_BASE: 'ciclo',
        ROOT: {
            URL: 'listar-ciclo',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-ciclo',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-ciclo',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-ciclo',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-ciclo',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    PAGO: {
        URL_BASE: 'pago',
        ROOT: {
            URL: 'listar-pago',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-pago',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-pago',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-pago',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-pago',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    COBRO: {
        URL_BASE: 'cobro',
        ROOT: {
            URL: 'listar-cobro',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-cobro',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-cobro',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-cobro',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-cobro',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    CAJA: {
        URL_BASE: 'caja',
        ROOT: {
            URL: 'listar-caja',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-caja',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-caja',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-caja',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-caja',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    AUTOR: {
        URL_BASE: 'autor',
        ROOT: {
            URL: 'listar-autor',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-autor',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-autor',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-autor',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-autor',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    REPORTE: {
        URL_BASE: 'reporte',
        ROOT: {
            URL: 'listar-reporte',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-reporte',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-reporte',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-reporte',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-reporte',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    AUTORADM: {
        URL_BASE: 'autor-adm',
        ROOT: {
            URL: 'listar-autor-adm',
            PERMISO: 'LISTAR_HORARIO'
        },
        LISTAR: {
            URL: 'listar-autor-adm',
            PERMISO: 'LISTAR_HORARIO'
        },
        NUEVO: {
            URL: 'nuevo-autor-adm',
            PERMISO: 'REGISTRAR_HORARIO'
        },
        EDITAR: {
            URL: 'editar-autor-adm',
            PERMISO: 'MODIFICAR_HORARIO'
        },
        ELIMINAR: {
            URL: 'eliminar-autor-adm',
            PERMISO: 'ELIMINAR_HORARIO'
        },
    },
    
};
