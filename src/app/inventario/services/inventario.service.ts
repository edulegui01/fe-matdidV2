import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, debounceTime, distinctUntilChanged, map, observable, throwError } from 'rxjs';
import { Producto } from 'src/app/class/producto';
import { ProductoData } from 'src/app/class/productoData';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  httpUrls={
    urlListarProducto:'/producto/listar',
    urlProductoListar:'/producto/listar_select',
    urlGuardarMovimiento:'/movimiento/guardar',
    urlListarMovimiento:'/movimiento/listado',
    urlListarMotivos:'/motivo_select/listar',
    urlPdfInventario:'/inventario/report'
    
  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }

  options = {
    headers: this.createHeader(),

  }


  public getProducto(page:any='0',size:any='10',nombre:string=''): Observable<any>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('nombre',String(nombre));


    


    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListarProducto,{...this.options,params:params}).pipe(
      map((productoData:any) => productoData)
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

  public saveMovimiento(movimiento:any):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuardarMovimiento,movimiento,this.options);
  }

  public getMovimiento(page:any='0',size:any='10',nombreFuncionario:string='',idMotivo:string=''):Observable<any>{

    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('nombreFuncionario',String(nombreFuncionario));
    params = params.append('idMotivo',String(idMotivo));


    const options = {
      headers: this.createHeader(),
      params: params
    }

    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListarMovimiento,{...this.options,params:params}).pipe(
      map((movimientoData:any) => movimientoData)
    )

  }

  public getMotivos(): Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlListarMotivos,this.options)
  }

  public getPdfInventario(){
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlPdfInventario,{...this.options,observe:'response',responseType:'blob'})
  }

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }



  

  


}
