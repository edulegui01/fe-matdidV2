import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { MENU_URLS } from 'src/app/components/navbar/routes';
import { ClientesService } from '../services/clientes.service';
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
import { ClienteDetailsComponent } from './cliente-detalle.component';

@Component({
  selector: 'app-cliente-list',
  templateUrl: '../templates/cliente-list.component.html',
  styleUrls: ['../styles/cliente-list.component.scss']
})
export class ClienteListComponent  implements OnInit {
  
  dataSource!:ClienteData;
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
  
  
  
  

  constructor(private clienteService:ClientesService, private paginator: MatPaginatorIntl, private fb:FormBuilder, private routerInstance: Router, private dialogInstance: MatDialog) {
  }

  ngOnInit(): void {
    this.initDataSource();
    this.ChangePaginatorEspa();
    
    this.filterForm = this.fb.group({
      name: [''],
      cedula: ['']
    })
  }

  ngAfterViewInit() {
        this.paginatorRef = this.paginatorf;
        
  }



  initDataSource(){
    this.clienteService.getClientes().subscribe( (clienteData:ClienteData) => this.dataSource = clienteData)
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


    this.clienteService.getClientes(page,size,cedula,name).subscribe((clienteData:ClienteData) => this.dataSource = clienteData);
  }


  doFilter(){
    
    let cedula = this.filterForm.value.cedula;
    let name = this.filterForm.value.name;

    console.log(cedula);
    
    this.clienteService.getClientes('0','10',cedula,name).subscribe((clienteData:ClienteData) => this.dataSource = clienteData);
  }

  onClickDetailsCliente(element:any){
    this.dialogInstance.open(ClienteDetailsComponent, {
      width: Settings.DIALOG_SMALL,
      data: {
          typeDialog: 'confirm',
          title: this.viewText.ATTENTION,
          message: `${this.viewText.CONFIRM_REMOVE} <b>${this.deleteDefaultMessage}</b>?
         ¿DESEA ELIMINAR DE MANERA PERMANENTE?`,
         element:element
      },

    }).afterClosed().subscribe(res => {//DESPUES DE CERRAR LA VENTANA DE CONFIMACIÓN.

      if (res) {
        
      }
    });
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


                      this.clienteService.deleteCliente(element.idPersona).subscribe(resp => {
                        this.paginatorf.pageIndex = 0;
                        this.clienteService.getClientes().subscribe( (clienteData:ClienteData) => this.dataSource = clienteData)
                      });
                  }
              });
  }

  OnClickEditCliente(element:any){
    //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))

    const extraParams: NavigationExtras = {
       state: element,
    };
    this.clienteService.editForm=true;
    console.log(element);
    this.routerInstance.navigate(['cliente/editar-cliente'],extraParams);
    
    

  }

  ChangePaginatorEspa(){
    this.paginator.itemsPerPageLabel = PaginatorEs.itemsPaginatorEs.itemsPerPage;
    this.paginator.firstPageLabel = PaginatorEs.itemsPaginatorEs.firstPageLabel;
    this.paginator.lastPageLabel = PaginatorEs.itemsPaginatorEs.lastPageLabel;
    this.paginator.nextPageLabel = PaginatorEs.itemsPaginatorEs.nextPageLabel;
    this.paginator.previousPageLabel = PaginatorEs.itemsPaginatorEs.previousPageLabel;
  }


  

  displayedColumns: string[] = ['nombre', 'cedula', 'ruc', 'direccion', 'options'];
  displayedFilters: string[] = ['cedula-filter', 'name-filter'];
  
}

