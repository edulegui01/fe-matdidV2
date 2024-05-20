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
import { ProductoData } from 'src/app/class/productoData';
import { CicloService } from '../service/ciclo.service';

@Component({
  selector: 'app-ciclo-list',
  templateUrl: '../templates/ciclo-list.component.html',
  styleUrls: ['../styles/ciclo-list.component.scss']
})
export class CicloListComponent  implements OnInit {
  
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
  smallRowSize=true;
  
  
  
  

  constructor(private cicloService:CicloService, private paginator: MatPaginatorIntl, private fb:FormBuilder, private routerInstance: Router, private dialogInstance: MatDialog) {
  }

  ngOnInit(): void {
    this.initDataSource();
    this.ChangePaginatorEspa();
    
    this.filterForm = this.fb.group({
      nombre: [''],
      
    })
  }

  ngAfterViewInit() {
        this.paginatorRef = this.paginatorf;
        
  }



  initDataSource(){
    this.cicloService.getCiclos().subscribe( (cicloData:any) => this.dataSource = cicloData)
  }


  onPaginateChange(event:PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    let nombre:string='';
    

    if (this.filterForm.value.cedula || this.filterForm.value.name){
      nombre = this.filterForm.value.nombre;
      

    }


    this.cicloService.getCiclos(page,size,nombre).subscribe((cicloData:any) => this.dataSource = cicloData);
  }


  doFilter(){
    
    console.log(this.filterForm.value.nombre)
    let nombre = this.filterForm.value.nombre;

    
    this.cicloService.getCiclos('0','10',nombre).subscribe((cicloData:any) => this.dataSource = cicloData);
  }


  OnClickDeleteCiclo(element:any){
    
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


                      this.cicloService.deleteLocalidad(element.id).subscribe(resp => {
                        this.paginatorf.pageIndex = 0;
                        this.cicloService.getCiclos().subscribe( (cicloData:any) => this.dataSource = cicloData)
                      });
                  }
              });
  }

  OnClickEditCiclo(element:any){
    //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))

    const extraParams: NavigationExtras = {
       state: element,
    };
    this.cicloService.editForm=true;
    console.log(element);
    this.routerInstance.navigate(['ciclo/editar-ciclo'],extraParams);
    
    

  }

  ChangePaginatorEspa(){
    this.paginator.itemsPerPageLabel = PaginatorEs.itemsPaginatorEs.itemsPerPage;
    this.paginator.firstPageLabel = PaginatorEs.itemsPaginatorEs.firstPageLabel;
    this.paginator.lastPageLabel = PaginatorEs.itemsPaginatorEs.lastPageLabel;
    this.paginator.nextPageLabel = PaginatorEs.itemsPaginatorEs.nextPageLabel;
    this.paginator.previousPageLabel = PaginatorEs.itemsPaginatorEs.previousPageLabel;
  }


  

  displayedColumns: string[] = ['nombre', 'options'];
  displayedFilters: string[] = ['nombre-filter'];
  
}

