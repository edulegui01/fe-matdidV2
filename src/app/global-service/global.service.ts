import { formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { filter } from 'rxjs/operators';
import { GlobalMessage } from '../class/global-message';
import { URLS_EXCLUDE } from '../components/navbar/routes';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  session!: SessionInterface;
  // observable string para visualizar la gestion actual
  gestion = new BehaviorSubject('- - -');
  // observable de administracion de menu []
  aux: any = [];
  administracionMenu = new BehaviorSubject(this.aux);
  administracionName = new BehaviorSubject('- - -');
  oldMapFilter = {};

  constructor(private router: Router) { 
    this.router.events.pipe(filter(evt => {
      return (evt instanceof NavigationStart);
    })
  ).subscribe((evnt: any) => {
      let urlPath = evnt.url.substr((evnt.url.indexOf('/') + 1)).split('/');
      const isUrlExclude = URLS_EXCLUDE.includes(evnt.url);
      const menuBase = this.changeDashToUnderscore(urlPath[0].trim().toUpperCase())[0];
    });
  }


  changeDashToUnderscore(urls: any) {

    const newArrayWithUnderscore: any[] = [];

    if (typeof urls === 'string') {
        return [urls.toUpperCase().split('-').join('_')];
    } else {
        urls.forEach((elm: string) => {
            elm = elm.toUpperCase();
            if (elm.indexOf('-')) {
                elm = elm.split('-').join('_');
                newArrayWithUnderscore.push(elm);
            } else {
                newArrayWithUnderscore.push(elm);
            }
        });
        return newArrayWithUnderscore;
    }
}

  //METODO DE REMPLAZAR EL GION MEDIO(-) A LA BARRA(/).
  changeDashToBackSlash(url: string) {
    const urls = url.split('-').join('/');
    return urls;
  }

  changeUnderscoreToDash(url: string) {
      const urls = url.split('_').join('-');
      return urls;
  }


private checkIsHasProperty(obj: { hasOwnProperty: (arg0: any) => any; }, property: string) {
  return obj.hasOwnProperty(property);
}

/**
* Retorna el token del usuario actual
*/
getToken(): any {
  if (this.session) {
      return this.session.token;
  }
  return null;
}

setToken(token: string) {
  if (this.session) {
      this.session.token = token;
  }
}

    /**
     * Retorna el nombre del usuario actual
     */
     getUser(): any {
      if (this.session) {
          return this.session.alias;
      }
      return null;
  }

  getUsuarioExterno(){
      if (this.session) {
          return this.session.proveedores_ids[0];
      }
      return null;
  }

  /**
   * Retorna el menu del usuario actual
   */
  getMenu(): Array<any> {
      if (this.session) {
          return this.session.menus;
      }
      return [];
  }


saveSessionInStorage() {
    localStorage.setItem('session', JSON.stringify(this.session));
}

/**
 * Retorna la gestion actual del usuario
 */
getGestionActual() {
    if (this.session) {
        return this.session.gestion;
    }
    return null;
}

setGestionActual(gestion: any) {
    this.session.gestion = gestion;
    //this.setSession(this.session);
}

    /**
     * Agrega a la aplicación datos de la sesión del usuario actual para operar el sistema
     * @param newSession datos de sesión provenientes del BE con la siguiente estructura:
     * {
     *     nombre: string,
     *     token: string,
     *     menu: Array,
     * }
     */
     setSession(newSession: SessionInterface) {
      this.session = newSession;
      localStorage.setItem('session', JSON.stringify(newSession));
      this.gestion.next(this.session.gestion.nombre);
      this.administracionMenu.next(this.session.menus);
      if (this.session.administracion) {
          this.administracionName.next(this.session.administracion.nombre);
      }
  }

      /**
     * Obtiene la sesión guardada en el storage y la setea en memoria para su uso
     */
       initLocalSession() {
        const storageSession = JSON.parse(localStorage.getItem('session') || '{}');
        if (!storageSession) {
            this.router.navigate(['login']);
        }
        this.session = storageSession;
  
        if (this.session) {
            // this.gestion.next(this.session.gestion.nombre);
            // this.administracionName.next(this.session.administracion.nombre);
        }
  
    }

  /**
  * Elimina datos de la sesion del usuario
  */
  clearSession() {
    localStorage.clear();
    this.session = <SessionInterface>{};
  }

  // retorna el path del permiso
  checkPermission(mURL: string, pName: any) {

      const mURLUpper = '/' + mURL.toUpperCase();
      mURL = '/' + mURL;

      if (this.session.permisos_menus[mURL] || this.session.permisos_menus[mURLUpper]) {
          return this.session.permisos_menus[mURL][pName] ? this.session.permisos_menus[mURL][pName] : false;
      }
  }

    /**
     * Cuenta la cantidad de permisos para el menu recibido como parametro
     * @param mURL el menu recibido como parametro
     */
     countPermission(mURL: string) {
      mURL = '/' + mURL;

      if (!this.session.permisos_menus[mURL]) {
          return 0;
      }

      // se retorna la longitud del objeto (cantidad de atributos)
      return Object.keys(this.session.permisos_menus[mURL]).length;
  }
  
    /**
     * Compara dos objetos con atributos comunes, identificando cambios en los mismos
     * @param source el Objeto original a comparar
     * @param target el Objeto modificado a comparar
     */
     /*compareTwoObjectIsSame(source: string, target: string) {

      let isSame = true;

      for (const key in target) {
          if (target.hasOwnProperty(key) && source.hasOwnProperty(key)) {
              if (Array.isArray(source[key]) && Array.isArray(target[key])) {
                  const sourceElement = source[key];
                  const targetElement = target[key];

                  if (sourceElement.length !== targetElement.length) {
                      isSame = false;
                      break;
                  }

                  for (let index = 0; index < targetElement.length; index++) {
                      const checkIsSame = this.compareTwoObjectIsSame(sourceElement[index], targetElement[index]);
                      if (!checkIsSame) {
                          isSame = false;
                          break;
                      }
                  }
                  if (!isSame) { break; }

              } else {

                  let sourceElement = null;
                  let targetElement = null;

                  if (typeof source === 'string' && typeof target === 'string') {
                      sourceElement = source.toLocaleUpperCase().trim();
                      targetElement = target.toLocaleUpperCase().trim();
                  } else {
                      sourceElement = String(source[key]).toLocaleUpperCase().trim();
                      targetElement = String(target[key]).toLocaleUpperCase().trim();
                  }

                  if (sourceElement !== targetElement) {
                      isSame = false;
                      break;
                  }
              }

          }
      }

      if (isSame) {
          this.snackbar.openSnackBar(GlobalMessage.VIEW_LABELS.SUCCESS_OPERATION, 'OK', Settings.SUCCESSFUL_MESSAGE_CLASS, Settings.SHORT_TIME);
      }

      return isSame;
  }*/
  
  getNumberWithFormat(val: any) {
    val = String(val).replace(/[,]/g, '.');
    if (isNaN(val)) {
        return '';
    } else {
        return formatNumber(val, 'py', '1.0-2');
    }
  }

  getNumberWithoutFormat(val: any) {
    const valorSinFormato = String(val).replace(/[.]/g, '');
    return valorSinFormato;
  }  

  readOnlyPermission(mURL: string) {
    mURL = '/' + mURL;

    if (!this.session.permisos_menus[mURL]) {
      return false;
    }

    let listCount = 0;

    // se retorna la longitud del objeto (cantidad de atributos)
    Object.keys(this.session.permisos_menus[mURL]).forEach((e: string) => {
        if (e.includes('LISTAR') || e.includes('MOSTRAR')) {
          listCount++;
        }
    });

    return Object.keys(this.session.permisos_menus[mURL]).length === listCount;
  }

 

}


/**
 * Interface que representa una sesion de usuario
 */
 export interface SessionInterface {
  alias: string;
  token: string;
  menus: Array<any>;
  permisos_menus: any; // objeto de permisos map/diccionario
  gestion: any;
  administracion: any;
  proveedores_ids:Array<any>;
}