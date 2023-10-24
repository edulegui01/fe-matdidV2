import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { ClienteData } from 'src/app/class/clienteData';
import { Producto } from 'src/app/class/producto';
import { ProductoData } from 'src/app/class/productoData';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  httpUrls={
    urlListar:'/producto/listar',
    urlGuarda:'/producto/guardar',
    urlBuscarId:'/producto/buscar/',
    urlModificar:'/producto/actualizar/',
    urlBuscarDocu:'/producto/buscar-docu',
    urlLocalidadListar:'/localidad/listar',
    urlActualiazr:'/producto/actualizar/',
    urlEliminar:'/producto/borrar/'
  }

  editForm:boolean=false;
  detalleForm:boolean=false;

  constructor(private http: HttpClient) { }


  public getProductos(page:any='0',size:any='10',nombre:string=''): Observable<any>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('nombre',String(nombre));
    


    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListar,{params}).pipe(
      map((productoData:any) => productoData)
    )

  }

  public saveProducto(producto:Producto):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,producto);
  }


  public updateProducto(id:string,producto:any){
    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualiazr+id,producto);
  }

  public deleteProducto(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlEliminar+id)
  }

  

  


}
