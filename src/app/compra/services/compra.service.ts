import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscribable, catchError, debounceTime, distinctUntilChanged, map, observable, throwError } from 'rxjs';
import { Cliente } from 'src/app/class/cliente';
import { ClienteData } from 'src/app/class/clienteData';
import { Persona } from 'src/app/class/clienteToSave';
import { Producto2 } from 'src/app/class/producto2';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class CompraService {

  httpUrls={
    urlListar:'/compra/listar',
    urlGuarda:'/compra/guardar',
    urlBuscarId:'/persona/buscar/',
    urlModificar:'/persona/actualizar/',
    urlBuscarDocu:'/persona/buscar-docu',
    urlLocalidadListar:'/localidad_select/listar',
    urlActualiazr:'/persona/actualizar/',
    urlEliminar:'/persona/borrar/',
    urlProductoListar:'/producto/listar_select',
    urlPersonaListar:'/persona/listar_select',
    urlFuncionarioListar:'/funcionario/listar_select'
  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }


  options = {
    headers: this.createHeader()
  }

  public getCompras(page:any='0',size:any='10',numFolioFilter:string='',proveedorFilter:string=''): Observable<ClienteData>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('numFolio',String(numFolioFilter));
    params = params.append('nombrePersona',String(proveedorFilter));
    //params = params.append('esCliente',Boolean(true));


    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListar,{...this.options,params:params}).pipe(
      map((compraData:any) => compraData)
    )

  }


  public searchProductsToSelect(search:string=''):Observable<any>{
    let params = new HttpParams();

    params = params.append('search',String(search));

    return this.http.get(Settings.URL_BASE+this.httpUrls.urlProductoListar,{...this.options,params:params}).pipe(
      debounceTime(4000),
      distinctUntilChanged(),
      
     
      

      
    );

  }

  public searchProveedorToSelect(search:string=''):Observable<any>{
    let params = new HttpParams();

    params = params.append('search',String(search));

    console.log(Settings.URL_BASE+this.httpUrls.urlPersonaListar)

    return this.http.get(Settings.URL_BASE+this.httpUrls.urlPersonaListar,{...this.options,params:params})

  }

  public searchFuncionarioToSelect(search:string=''):Observable<any>{
    let params = new HttpParams();

    params = params.append('search',String(search));

    console.log(Settings.URL_BASE+this.httpUrls.urlFuncionarioListar)

    return this.http.get(Settings.URL_BASE+this.httpUrls.urlFuncionarioListar,{...this.options,params:params})

  }


  public getLocalidades(): Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlLocalidadListar,this.options)
  }


  public saveCompra(compra:any){
    // this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,compra).subscribe(
    //   value =>{
    //     console.log(value);
    //   }
    // );

    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,compra,this.options).subscribe();
  }



  public updateCliente(id:string,cliente:Persona){
    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualiazr+id,cliente,this.options);
  }

  public deleteCompra(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlEliminar+id,this.options)
  }

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }




}
