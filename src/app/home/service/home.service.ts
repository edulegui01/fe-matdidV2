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
export class HomeService {

  httpUrls={
    urlEstadisticas:'/home/estadisticas',
    urlGrafico:'/home/cantidad-an/'
    
 
  }

  editForm:boolean=false;
  detalleForm:boolean=false;

  constructor(private http: HttpClient) { }


  options = {
    headers: this.createHeader()
  }


  public getEstadistica():Observable<any>{
    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlEstadisticas,this.options)
  }

  public getGraficoData(anho:number){
    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlGrafico+anho,this.options)
  }

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }




}
