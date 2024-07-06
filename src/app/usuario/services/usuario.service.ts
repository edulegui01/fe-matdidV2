import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { Producto } from 'src/app/class/producto';
import { ProductoData } from 'src/app/class/productoData';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpUrls={
    urlGuarda:'/auth/register',
    urlFuncionarioSelect:'/funcionario/listar_select'

  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }

  options = {
    headers: this.createHeader(),
  }

  public saveUsuario(localidad:any):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,localidad,this.options);
  }

  public listarFuncionario(){
    
    let params = new HttpParams();

    params = params.append('search','');
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlFuncionarioSelect,{...this.options,params:params})
  }


  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }

  

  


}
