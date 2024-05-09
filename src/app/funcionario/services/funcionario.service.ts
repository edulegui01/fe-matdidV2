import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { Persona } from 'src/app/class/clienteToSave';
import { FuncionarioData } from 'src/app/class/funcionarioData';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  httpUrls={
    urlListar:'/funcionario/listar',
    urlGuarda:'/funcionario/guardar',
    urlModificar:'/funcionario/actualizar/',
    urlLocalidadListar:'/localidad_select/listar',
    urlActualiazr:'/funcionario/actualizar/',
    urlEliminar:'/funcionario/borrar/'
  }

  editForm:boolean=false;

  constructor(private http: HttpClient) { }

  options = {
    headers: this.createHeader(),

  }


  public getFuncionario(page:any='0',size:any='10',cedulaFilter:string='',nombreFilter:string=''): Observable<FuncionarioData>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('cedulaFilter',String(cedulaFilter));
    params = params.append('nombreFilter',String(nombreFilter));




    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListar,{...this.options,params:params}).pipe(
      map((funcionarioData:any) => funcionarioData)
    )

  }


  public getLocalidades(): Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlLocalidadListar,this.options)
  }


  public saveFuncionario(funcionario:any):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,funcionario,this.options);
  }



  public updateFuncionario(id:string,cliente:Persona){
    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualiazr+id,cliente,this.options);
  }

  public deleteFuncionario(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlEliminar+id,this.options)
  }

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }


}