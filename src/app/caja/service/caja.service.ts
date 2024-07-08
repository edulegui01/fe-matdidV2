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
    urlListarConcepto:'/concepto_select/listar',
    urlGuardar:'/movimiento-caja/guardar',
    urlActualizar:'/ciclo/actualizar/',
    urlDelete:'/ciclo/actualizar/',
    urlSaldoDisponible:'/movimiento-caja/saldo-disponible',
    urlCerrarCaja:'/movimiento-caja/cerrar-caja',
    urlListarActual:'/movimiento-caja/listar-actual'

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

  public getCajaListActual():Observable<any>{
    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListarActual,{...this.options}).pipe(
      map((cajaList:any) => cajaList)
    )
  }


  public getConcepto():Observable<any>{

    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListarConcepto,{...this.options})

  }

  public saveMovimientoCaja(movimientoCaja:any):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuardar,movimientoCaja,this.options);
  }

  public cerrarCaja(movimientoCaja:any){
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlCerrarCaja,movimientoCaja,this.options)
  }


  public updateMovimientoCaja(id:string,movimientoCaja:any){

    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualizar+id,movimientoCaja,this.options);
  }

  public deleteLocalidad(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlDelete+id,this.options)
  }

  public getSaldoDisponible(){
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlSaldoDisponible,this.options)
  }

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }

  

  


}
