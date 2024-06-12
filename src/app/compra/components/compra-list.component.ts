import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { MENU_URLS } from 'src/app/components/navbar/routes';
import { Cliente } from 'src/app/class/cliente';
import { NavigationExtras, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteData } from 'src/app/class/clienteData';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { ThisReceiver } from '@angular/compiler';
import { PaginatorEs } from 'src/app/utils/paginatorEs';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from 'src/app/class/settings';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { FuncionarioData } from 'src/app/class/funcionarioData';
import { CompraService } from '../services/compra.service';
import { PagoListComponent } from 'src/app/pago/components/pago-list.component';

@Component({
  selector: 'app-compra-list',
  templateUrl: '../templates/compra-list.component.html',
  styleUrls: ['../styles/compra-list.component.scss']
})
export class CompraListComponent  implements OnInit {
  
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


  estados:any = {
    PP:"PAGO PARCIAL",
    SP: "SIN PAGO",
    PA: "PAGADO",
    A : "ANULADO"
  }
  
  
  
  

  constructor(private compraService:CompraService, private paginator: MatPaginatorIntl, private fb:FormBuilder, private routerInstance: Router, private dialogInstance: MatDialog) {
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
    this.compraService.getCompras().subscribe( (compraData:any) => this.dataSource = compraData)
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


    this.compraService.getCompras(page,size,cedula,name).subscribe((compraData:any) => this.dataSource = compraData);
  }


  doFilter(){
    
    let numFolio = this.filterForm.value.numFolio;
    let proveedor = this.filterForm.value.proveedor;
    
    this.compraService.getCompras('0','10',numFolio,proveedor).subscribe((compraData:any) => this.dataSource = compraData);
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


                      this.compraService.deleteCompra(element.idCompra).subscribe(resp => {
                        this.paginatorf.pageIndex = 0;
                        this.compraService.getCompras().subscribe( (compraData:any) => this.dataSource = compraData)
                      });
                  }
              });
  }



  OnClickEditCliente(element:any){
    //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))

    const extraParams: NavigationExtras = {
       state: element,
    };
    this.compraService.editForm=true;
    console.log(element);
    this.routerInstance.navigate(['compra/editar-compra'],extraParams);
    
    

  }

  formatFechaToList(fecha:any){
    if(!fecha){
      return '';
    }
    
    const fechaFormat = new Date(fecha).toLocaleDateString('es-PY')


    return fechaFormat;
  }

  formatearNumero(number:number){
    return new Intl.NumberFormat("es-CL").format(number);
  }

  separarString(str:string) {
    let result = "";
    let size = 3;
    for (let i = 0; i < str.length; i += size) {
        result += str.substring(i, i + size) + "-";
        if(i==3){
          result += str.substring(i+size,str.length)
          break;
        }
    }
    return result;
  }
  
  

  OnDetailsCliente(element:any){
    //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))

    const extraParams: NavigationExtras = {
       state: element,
    };
    this.compraService.detalleForm=true;
    console.log(element);
    this.routerInstance.navigate(['compra/detalle-compra'],extraParams);
    
    

  }

  openPagoList(element:any){
    this.dialogInstance.open(PagoListComponent, {
      width: Settings.DIALOG_PAGOS,
      data: {
          typeDialog: 'confirm',
          title: this.viewText.ATTENTION,
          message: `${this.viewText.CONFIRM_REMOVE} <b>${this.deleteDefaultMessage}</b>?
         ¿DESEA ELIMINAR DE MANERA PERMANENTE?`,
         element:element
      },

    }).afterClosed().subscribe(res => {//DESPUES DE CERRAR LA VENTANA DE CONFIMACIÓN.
      this.ngOnInit();
    });
}

  ChangePaginatorEspa(){
    this.paginator.itemsPerPageLabel = PaginatorEs.itemsPaginatorEs.itemsPerPage;
    this.paginator.firstPageLabel = PaginatorEs.itemsPaginatorEs.firstPageLabel;
    this.paginator.lastPageLabel = PaginatorEs.itemsPaginatorEs.lastPageLabel;
    this.paginator.nextPageLabel = PaginatorEs.itemsPaginatorEs.nextPageLabel;
    this.paginator.previousPageLabel = PaginatorEs.itemsPaginatorEs.previousPageLabel;
  }


  

  displayedColumns: string[] = ['numFolio', 'proveedor', 'fecha', 'montoTotal', 'estado','options'];
  displayedFilters: string[] = ['numFolio-filter', 'proveedor-filter'];
  
}

