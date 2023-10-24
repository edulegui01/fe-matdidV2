/**
 * Clase que posee datos estaticos de configuraciones globales,
 * conexion al BE y parametros para definidos para componentes.
 */
 export class Settings {

    /**
     * CONFIGURACIONES DEL SITIO/SEGURIDAD
     */

    // dominio del server donde se encuentran los servicios
    static URL_BASE = 'http://localhost:8090';


    // key de acceso al sistema
    static MODULE_KEY = 'SEGURIDAD';

    // authorization type
    static AUTHORIZATION_TYPE = 'Bearer ';

    /**
     * CONFIGURACIONES GENERALES
     */


    // 3 segundos
    static SHORT_TIME = 3000;

    // 5 segundos
    static MEDIUM_TIME = 5000;

    // 10 segundos
    static LONG_TIME = 10000;

    // nombre de las clases utilizadas en los snackbar
    static FAILED_MESSAGE_CLASS = 'red-snackbar';
    static SUCCESSFUL_MESSAGE_CLASS = 'green-snackbar';
    static LOGIN_SUCCES_MESSAGE_CLASS = 'blue-snackbar';

    // tamanho del dialog en pantalla
    static DIALOG_SMALL = '40vw';
    static DIALOG_MEDIUM = '60vw';
    static DIALOG_LARGE = '90vw';

}
