import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, debounceTime, distinctUntilChanged, map, observable, throwError } from 'rxjs';
import { Cliente } from 'src/app/class/cliente';
import { ClienteData } from 'src/app/class/clienteData';
import { ClienteToSave } from 'src/app/class/clienteToSave';
import { Producto2 } from 'src/app/class/producto2';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class CompraService {

  httpUrls={
    urlListar:'/persona/listar',
    urlGuarda:'/persona/guardar',
    urlBuscarId:'/persona/buscar/',
    urlModificar:'/persona/actualizar/',
    urlBuscarDocu:'/persona/buscar-docu',
    urlLocalidadListar:'/localidad_select/listar',
    urlActualiazr:'/persona/actualizar/',
    urlEliminar:'/persona/borrar/',
    urlProductoListar:'/producto/listar_select',
    urlPersonaListar:'/persona/listar_select'
  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }


  public getClientes(page:any='0',size:any='10',cedulaFilter:string='',nombreFilter:string=''): Observable<ClienteData>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('cedulaFilter',String(cedulaFilter));
    params = params.append('nombreFilter',String(nombreFilter));
    params = params.append('esCliente',Boolean(true));


    return this.http.get<ClienteData>(Settings.URL_BASE+this.httpUrls.urlListar,{params}).pipe(
      map((clienteData:ClienteData) => clienteData)
    )

  }


  public searchProductsToSelect(search:string=''):Observable<any>{
    let params = new HttpParams();

    params = params.append('search',String(search));

    console.log(Settings.URL_BASE+this.httpUrls.urlProductoListar)

    return this.http.get(Settings.URL_BASE+this.httpUrls.urlProductoListar,{params}).pipe(
      debounceTime(4000),
      distinctUntilChanged(),
      
     
      

      
    );

  }

  public searchClienteToSelect(search:string=''):Observable<any>{
    let params = new HttpParams();

    params = params.append('search',String(search));

    console.log(Settings.URL_BASE+this.httpUrls.urlPersonaListar)

    return this.http.get(Settings.URL_BASE+this.httpUrls.urlPersonaListar,{params}).pipe(
      debounceTime(4000),
      distinctUntilChanged(),
      
     
      

      
    );

  }

  public searchClienteById(id:string):Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlBuscarId+id);

  }


  public getLocalidades(): Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlLocalidadListar)
  }


  public saveClientes(cliente:ClienteToSave):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,cliente);
  }



  public updateCliente(id:string,cliente:ClienteToSave){
    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualiazr+id,cliente);
  }

  public deleteCliente(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlEliminar+id)
  }




}
