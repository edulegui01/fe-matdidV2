import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { ClienteToSave } from 'src/app/class/clienteToSave';
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


  public getFuncionario(page:any='0',size:any='10',cedulaFilter:string='',nombreFilter:string=''): Observable<FuncionarioData>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('cedulaFilter',String(cedulaFilter));
    params = params.append('nombreFilter',String(nombreFilter));


    return this.http.get<FuncionarioData>(Settings.URL_BASE+this.httpUrls.urlListar,{params}).pipe(
      map((funcionarioData:FuncionarioData) => funcionarioData)
    )

  }


  public getLocalidades(): Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlLocalidadListar)
  }


  public saveFuncionario(cliente:ClienteToSave):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,cliente);
  }



  public updateFuncionario(id:string,cliente:ClienteToSave){
    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualiazr+id,cliente);
  }

  public deleteFuncionario(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlEliminar+id)
  }


}