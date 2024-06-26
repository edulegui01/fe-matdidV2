import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { Producto } from 'src/app/class/producto';
import { ProductoData } from 'src/app/class/productoData';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class AutorAdmService {

  httpUrls={
    urlListar:'/autor/listar',
    urlGuarda:'/autor/guardar',
    urlBuscarId:'/localidad/buscar/',
    urlModificar:'/localidad/actualizar/',
    urlBuscarDocu:'/localidad/buscar-docu',
    urlLocalidadListar:'/localidad/listar',
    urlActualiazr:'/localidad/actualizar/',
    urlEliminar:'/localidad/borrar/',
    urlImage:'/autor/imagen'
  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }

  options = {
    headers: this.createHeader(),
  }
  public getAutores(page:any='0',size:any='10',nombre:string=''): Observable<any>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('nombre',String(nombre));

    
    


    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListar,{...this.options,params:params}).pipe(
      map((productoData:any) => productoData)
    )

  }

  public saveAutor(autor:any):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,autor,this.options);
  }


  public updateLocalidad(id:string,localidad:any){

    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualiazr+id,localidad,this.options);
  }

  public deleteLocalidad(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlEliminar+id,this.options)
  }

  public uploadImage(imageData:FormData){

    return this.http.post(Settings.URL_BASE+this.httpUrls.urlImage,imageData)
  }

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }

  

  


}
