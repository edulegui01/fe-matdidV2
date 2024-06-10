import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { Producto } from 'src/app/class/producto';
import { ProductoData } from 'src/app/class/productoData';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class CajaService {

  httpUrls={
    urlListar:'/movimiento-caja/listar-total',
    urlGuarda:'/ciclo/guardar',
    urlActualizar:'/ciclo/actualizar/',
    urlDelete:'/ciclo/actualizar/',

  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }

  options = {
    headers: this.createHeader(),
  }
  public getCajaList(): Observable<any>{

    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListar,{...this.options}).pipe(
      map((cajaList:any) => cajaList)
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
