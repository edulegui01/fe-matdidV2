import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, first, map, observable, throwError } from 'rxjs';
import { ClienteData } from 'src/app/class/clienteData';
import { Producto } from 'src/app/class/producto';
import { ProductoData } from 'src/app/class/productoData';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class AutorService {

  httpUrls={
    urlListar:'/producto/listar',
    urlGuarda:'/producto/guardar',
    urlBuscarId:'/producto/buscar/',
    urlModificar:'/producto/actualizar/',
    urlBuscarDocu:'/producto/buscar-docu',
    urlLocalidadListar:'/localidad/listar',
    urlActualiazr:'/producto/actualizar/',
    urlEliminar:'/producto/borrar/',
    urlImage:'/producto/imagen',
    urlCicloListar:'/ciclo_select/listar',
    urlListado: '/producto/listado',
    urlCategoriaListar:'/categoria_select/listar',
    urlMateriaListar:'/materia_select/listar',
    urlEditorialListar:'/editorial_select/listar',
    urlAutorListar:'/autor_select/listar'
  }

  editForm:boolean=false;
  detalleForm:boolean=false;

  constructor(private http: HttpClient, private router: Router) { }

  options = {
    headers: this.createHeader(),

  }

  public getProductos(page:any='0',size:any='12',nombre:string='',idCiclo:string='',
  idCategoria:string='', idMateria:string='', idEditorial:string='', idAutor:string=''): Observable<any>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('nombre',String(nombre));
    params = params.append('idCiclo',String(idCiclo));
    params = params.append('idCategoria',String(idCategoria));
    params = params.append('idMateria',String(idMateria));
    params = params.append('idEditorial',String(idEditorial));
    params = params.append('idAutor',String(idAutor));


    


    return this.http.get<any>(Settings.URL_BASE+this.httpUrls.urlListado,{...this.options,params:params}).pipe(
      map((res) => {
        res.content.map((item:any) => {
          item.precio = new Intl.NumberFormat("es-PY").format(item.precio)
          item.costo = new Intl.NumberFormat("es-PY").format(item.costo)
        })

        return res;
      })
    )

  }

  public saveProducto(producto:Producto):Observable<any>{
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlGuarda,producto,this.options);
  }

  public listarSelectCiclo():Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlCicloListar,this.options);
  }

  public listarSelectCategoria():Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlCategoriaListar,this.options);
  }

  public listarSelectMateria():Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlMateriaListar,this.options);
  }

  public listarSelectEditorial():Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlEditorialListar,this.options);
  }

  public listarSelectAutor():Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlAutorListar,this.options);
  }

  public updateProducto(id:string,producto:any){
    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualiazr+id,producto,this.options);
  }

  public deleteProducto(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlEliminar+id,this.options)
  }

  public uploadImage(imageData:FormData){

    return this.http.post(Settings.URL_BASE+this.httpUrls.urlImage,imageData)
  }

  isAdmin(){

    let authVerify = localStorage.getItem('role') == 'ADMIN' ? true : false;

    if(!authVerify){
      this.router.navigate(['/producto/listar-producto']);
    }

    return authVerify;
    

  }

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }

  

  


}
