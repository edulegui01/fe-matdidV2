import { HttpClient, HttpParams } from '@angular/common/http';
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
    urlListarMovimiento:'/movimiento/listar'
    
  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }


  public getProducto(page:any='0',size:any='10',nombre:string=''): Observable<any>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('nombre',String(nombre));

    

    


    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListarProducto,{params}).pipe(
      map((productoData:any) => productoData)
    )

  }


  public searchProductsToSelect(search:string=''):Observable<any>{
    let params = new HttpParams();

    params = params.append('search',String(search));

    return this.http.get(Settings.URL_BASE+this.httpUrls.urlProductoListar,{params}).pipe(
      debounceTime(4000),
      distinctUntilChanged(),
      
     
      

      
    );

  }

  public saveMovimiento(movimiento:any):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuardarMovimiento,movimiento);
  }

  public getMovimiento(page:any='0',size:any='10',motivo:string=''):Observable<any>{

    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('motivo',String(motivo));

    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListarMovimiento,{params}).pipe(
      map((movimientoData:any) => movimientoData)
    )

  }



  

  


}
