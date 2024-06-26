import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { Cliente } from 'src/app/class/cliente';
import { ClienteData } from 'src/app/class/clienteData';
import { Persona } from 'src/app/class/clienteToSave';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  httpUrls={
    //urlPdfInventario:'/inventario/report',
    
  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }
  options = {
    headers: this.createHeader(),

  }



  public getPdfInventario(urlPdfInventario:string, fechaDesde:any, fechaHasta:any){

    let params = new HttpParams();

    params = params.append('des',String(fechaDesde));
    params = params.append('has',String(fechaHasta));
    return this.http.get(Settings.URL_BASE+urlPdfInventario,{...this.options,params:params,observe:'response',responseType:'blob'})
  }
 

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }


}
