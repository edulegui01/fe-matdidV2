import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { MENU_URLS } from 'src/app/components/navbar/routes';
import { Cliente } from 'src/app/class/cliente';
import { NavigationExtras, Route, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ClienteData } from 'src/app/class/clienteData';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { ThisReceiver } from '@angular/compiler';
import { PaginatorEs } from 'src/app/utils/paginatorEs';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from 'src/app/class/settings';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { FuncionarioData } from 'src/app/class/funcionarioData';
import { VentaService } from '../services/venta.service';

@Component({
  selector: 'app-venta-list',
  templateUrl: '../templates/venta-list.component.html',
  styleUrls: ['../styles/venta-list.component.scss']
})
export class VentaListComponent  implements OnInit {
  
  dataSource!:any;
  clienteToEdit!:any;
  routerInstant!:Router;
  paginatorRange = GlobalMessage.PAGINATOR_RANGE;
  resultsLength!: Observable<number>;
  pageEvent!:PageEvent;
  filterForm!:FormGroup;
  viewText = GlobalMessage.VIEW_LABELS;
  deleteDefaultMessage = 'EL REGISTRO';
  paginatorRef!: MatPaginator;
  @ViewChild(MatPaginator) paginatorf!: MatPaginator;
  
  
  
  

  constructor(private ventaService:VentaService, private paginator: MatPaginatorIntl, private fb:FormBuilder, private routerInstance: Router, private dialogInstance: MatDialog) {
  }

  ngOnInit(): void {
    this.initDataSource();
    this.ChangePaginatorEspa();
    
    this.filterForm = this.fb.group({
      numFolio: [''],
      proveedor: ['']
    })
  }

  ngAfterViewInit() {
        this.paginatorRef = this.paginatorf;
        
  }



  initDataSource(){
    this.ventaService.getVentas()
    .pipe(map(ventas =>{
      ventas.content.forEach((item:any)=>{item.numFactura = Settings.PRIMERA_PARTE_FACTURA + this.zfill(item.numFactura) })

      return ventas;
    }))
    .subscribe( (ventaData:any) => this.dataSource = ventaData)
  }

  zfill(numero:number){
    const numberOutput = Math.abs(numero); /* Valor absoluto del número */
    const length = numero.toString().length; /* Largo del número */ 
    const zero = "0"; /* String de cero */
    const longOfFolio = 7;  
    
    if (longOfFolio <= length) {
        if (numero < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (numero < 0) {
            return ("-" + (zero.repeat(longOfFolio - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(longOfFolio - length)) + numberOutput.toString()); 
        }
    }
  }


  onPaginateChange(event:PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    let cedula:string='';
    let name:string='';

    if (this.filterForm.value.cedula || this.filterForm.value.name){
      cedula = this.filterForm.value.cedula;
      name = this.filterForm.value.name;

    }


    this.ventaService.getVentas(page,size,cedula,name).subscribe((compraData:any) => this.dataSource = compraData);
  }


  doFilter(){
    
    let cedula = this.filterForm.value.cedula;
    let name = this.filterForm.value.name;

    console.log(cedula);
    
    this.ventaService.getVentas('0','10',cedula,name).subscribe((compraData:any) => this.dataSource = compraData);
  }


  OnClickDeleteCliente(element:any){
    
    this.dialogInstance.open(CustomDialogComponent, {
                  width: Settings.DIALOG_MEDIUM,
                  data: {
                      typeDialog: 'confirm',
                      title: this.viewText.ATTENTION,
                      message: `${this.viewText.CONFIRM_REMOVE} <b>${this.deleteDefaultMessage}</b>?
                     ¿DESEA ELIMINAR DE MANERA PERMANENTE?`,
                  },
      
              }).afterClosed().subscribe(accept => {//DESPUES DE CERRAR LA VENTANA DE CONFIMACIÓN.
      
                  if (accept) {
                    console.log(this.paginatorRef)
                    
                    this.paginatorf.pageIndex = 0;


                      this.ventaService.deleteVenta(element.idPersona).subscribe(resp => {
                        this.paginatorf.pageIndex = 0;
                        this.ventaService.getVentas().subscribe( (compraData:any) => this.dataSource = compraData)
                      });
                  }
              });
  }



  OnClickEditCliente(element:any){
    //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))

    const extraParams: NavigationExtras = {
       state: element,
    };
    this.ventaService.editForm=true;
    console.log(element);
    this.routerInstance.navigate(['compra/editar-compra'],extraParams);
    
    

  }

  ChangePaginatorEspa(){
    this.paginator.itemsPerPageLabel = PaginatorEs.itemsPaginatorEs.itemsPerPage;
    this.paginator.firstPageLabel = PaginatorEs.itemsPaginatorEs.firstPageLabel;
    this.paginator.lastPageLabel = PaginatorEs.itemsPaginatorEs.lastPageLabel;
    this.paginator.nextPageLabel = PaginatorEs.itemsPaginatorEs.nextPageLabel;
    this.paginator.previousPageLabel = PaginatorEs.itemsPaginatorEs.previousPageLabel;
  }


  

  displayedColumns: string[] = ['numFolio', 'proveedor', 'nombreFuncionario', 'montoTotal', 'options'];
  displayedFilters: string[] = ['numFolio-filter', 'proveedor-filter'];
  
}

