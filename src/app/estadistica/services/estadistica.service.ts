import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { ProductoData } from 'src/app/class/productoData';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  httpUrls={
    urlListar:'/localidad/listar',
    urlCantidadProductos:'/estadistica/cantidad/producto',
    urlMontoPorVenta:'/estadistica/cantidad/ventas'
  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }

  options = {
    headers: this.createHeader(),
  }
  public getLocalidades(page:any='0',size:any='10',nombre:string=''): Observable<any>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('nombre',String(nombre));

    
    


    return this.http.get<ProductoData>(Settings.URL_BASE+this.httpUrls.urlListar,{...this.options,params:params}).pipe(
      map((productoData:ProductoData) => productoData)
    )

  }

  public getCantidadProductoVendidos(fechaDesde:any,fechaHasta:any):Observable<any>{

    let params = new HttpParams();

    params = params.append('fechaDesde',String(fechaDesde));
    params = params.append('fechaHasta',String(fechaHasta));
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlCantidadProductos,{...this.options,params:params});
  }


  public getMontosPorVentas(fechaDesde:any,fechaHasta:any):Observable<any>{

    let params = new HttpParams();

    params = params.append('fechaDesde',String(fechaDesde));
    params = params.append('fechaHasta',String(fechaHasta));
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlMontoPorVenta,{...this.options,params:params});
  }


//   public updateLocalidad(id:string,localidad:any){

//     return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualiazr+id,localidad,this.options);
//   }

//   public deleteLocalidad(id:string){
//     return this.http.delete(Settings.URL_BASE+this.httpUrls.urlEliminar+id,this.options)
//   }

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }

  

  


}
