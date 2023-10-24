import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { Producto } from 'src/app/class/producto';
import { ProductoData } from 'src/app/class/productoData';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  httpUrls={
    urlListar:'/localidad/listar',
    urlGuarda:'/localidad/guardar',
    urlBuscarId:'/localidad/buscar/',
    urlModificar:'/localidad/actualizar/',
    urlBuscarDocu:'/localidad/buscar-docu',
    urlLocalidadListar:'/localidad/listar',
    urlActualiazr:'/localidad/actualizar/',
    urlEliminar:'/localidad/borrar/'
  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }


  public getLocalidades(page:any='0',size:any='10',nombre:string=''): Observable<any>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('nombre',String(nombre));
    


    return this.http.get<ProductoData>(Settings.URL_BASE+this.httpUrls.urlListar,{params}).pipe(
      map((productoData:ProductoData) => productoData)
    )

  }

  public saveLocalidad(localidad:any):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,localidad);
  }


  public updateProducto(id:string,producto:any){
    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualiazr+id,producto);
  }

  public deleteProducto(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlEliminar+id)
  }

  

  


}
