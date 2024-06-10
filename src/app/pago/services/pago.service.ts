import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { Settings } from "src/app/class/settings";




@Injectable({
    providedIn: 'root'
  })
  export class PagoService {

    httpUrls={
      urlListar:'/pago/listar',
      urlGuardar:'/pago/guardar',
      urlAnularPago:'/pago/borrar/'
    }

    editForm:boolean=false;

    constructor(private http: HttpClient, private router: Router) { }

    options = {
      headers: this.createHeader(),
  
    }

    public getPagos(idCompra:any='0'): Observable<any>{
    
      let params = new HttpParams();
  
      params = params.append('idCompra',String(idCompra));

      //params = params.append('esCliente',Boolean(true));
  
  
      return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListar,{...this.options,params:params}).pipe(
        map((pagos:any) => pagos)
      )
  
    }

    public savePago(pago:any):Observable<any>{
      return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuardar,pago,this.options);
    }

    public anularPago(id:any):Observable<any>{
      return this.http.delete(Settings.URL_BASE+this.httpUrls.urlAnularPago+id,this.options);
    }

    createHeader(){
      return new HttpHeaders({
          'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            
        })
      
    }
  


  }