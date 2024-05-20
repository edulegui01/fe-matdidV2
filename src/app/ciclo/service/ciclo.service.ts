import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { Producto } from 'src/app/class/producto';
import { ProductoData } from 'src/app/class/productoData';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class CicloService {

  httpUrls={
    urlListar:'/ciclo/listar',
    urlGuarda:'/ciclo/guardar',
    urlActualizar:'/ciclo/actualizar/',
    urlDelete:'/ciclo/actualizar/',

  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }

  options = {
    headers: this.createHeader(),
  }
  public getCiclos(page:any='0',size:any='10',nombre:string=''): Observable<any>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('nombre',String(nombre));

    
    


    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListar,{...this.options,params:params}).pipe(
      map((cicloData:any) => cicloData)
    )

  }

  public saveCiclo(ciclo:any):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,ciclo,this.options);
  }


  public updateCiclo(id:string,ciclo:any){

    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualizar+id,ciclo,this.options);
  }

  public deleteLocalidad(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlDelete+id,this.options)
  }

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }

  

  


}
