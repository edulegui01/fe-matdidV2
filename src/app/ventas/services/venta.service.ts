import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, debounceTime, distinctUntilChanged, map, observable, throwError } from 'rxjs';
import { Cliente } from 'src/app/class/cliente';
import { ClienteData } from 'src/app/class/clienteData';
import { Persona } from 'src/app/class/clienteToSave';
import { Producto2 } from 'src/app/class/producto2';
import {Settings} from 'src/app/class/settings';


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  httpUrls={
    urlListar:'/persona/listar',
    urlGuarda:'/persona/guardar',
    urlBuscarId:'/persona/buscar/',
    urlModificar:'/persona/actualizar/',
    urlBuscarDocu:'/persona/buscar-docu',
    urlLocalidadListar:'/localidad_select/listar',
    urlActualiazr:'/persona/actualizar/',
    urlEliminar:'/persona/borrar/',
    urlProductoListar:'/producto/listar_select',
    urlPersonaListar:'/persona/listar_select',
    urlTimbradoValido:'/timbrado/valido',
    urlFuncionarioListar:'/funcionario/listar_select',
    urlFacturaFolio:'/factura/folio',
    urlFacturaNumeracion:'/factura/numeracion',
    urlFacturaGuardar:'/factura/guardar',
    urlFacturaListar:'/factura/listar',
    urlFacturaBorrar:'/factura/anular/',
    urlImprimirFactura:'/factura/imprimir'
  }

  editForm:boolean=false;
  detalleForm:boolean=false;

  constructor(private http: HttpClient) { }


  options = {
    headers: this.createHeader()
  }

  public getVentas(page:any='0',size:any='10',numFactura:string='',nombrePersona:string=''): Observable<any>{
    
    let params = new HttpParams();

    params = params.append('page',String(page));
    params = params.append('size',String(size));
    params = params.append('numFactura',String(numFactura));
    params = params.append('nombrePersona',String(nombrePersona));


    return this.http.get(Settings.URL_BASE+this.httpUrls.urlFacturaListar,{...this.options,params:params}).pipe(
      map((facturaData:any) => facturaData)
    )

  }


  public searchProductsToSelect(search:string=''):Observable<any>{
    let params = new HttpParams();

    params = params.append('search',String(search));

    console.log(Settings.URL_BASE+this.httpUrls.urlProductoListar)

    return this.http.get(Settings.URL_BASE+this.httpUrls.urlProductoListar,{...this.options,params:params}).pipe(
      debounceTime(4000),
      distinctUntilChanged(),
      
     
      

      
    );

  }


  public searchFuncionarioToSelect(search:string=''):Observable<any>{
    let params = new HttpParams();


    params = params.append('search',String(search));


    return this.http.get(Settings.URL_BASE+this.httpUrls.urlFuncionarioListar,{...this.options,params:params})

  }

  public searchClienteToSelect(search:string=''):Observable<any>{
    let params = new HttpParams();

    params = params.append('search',String(search));

    console.log(Settings.URL_BASE+this.httpUrls.urlPersonaListar)

    return this.http.get(Settings.URL_BASE+this.httpUrls.urlPersonaListar,{...this.options,params:params})
    

  }


  public getLocalidades(): Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlLocalidadListar,this.options)
  }


  public saveFactura(factura:any):Observable<any>{
    console.log(factura)
    return this.http.post(Settings.URL_BASE+this.httpUrls.urlFacturaGuardar,factura,this.options);
  }



  public updateCliente(id:string,cliente:Persona){
    return this.http.put(Settings.URL_BASE+this.httpUrls.urlActualiazr+id,cliente,this.options);
  }

  public deleteCliente(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlEliminar+id,this.options)
  }

  public getTimbrado(): Observable<any>{

 
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlTimbradoValido,this.options);

  }

  public getFolio():Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlFacturaFolio,this.options);
  }

  public getNumeracion():Observable<any>{
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlFacturaNumeracion,this.options);
  }

  public deleteVenta(id:string){
    return this.http.delete(Settings.URL_BASE+this.httpUrls.urlFacturaBorrar+id,this.options)
  }

  public facturaImprimir(idFactura:any):Observable<any>{
    let params = new HttpParams();


    params = params.append('idFactura',Number(idFactura));
    return this.http.get(Settings.URL_BASE+this.httpUrls.urlImprimirFactura,{...this.options,params:params,observe:'response',responseType:'blob'})
  }

  createHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          
      })
    
  }


}
