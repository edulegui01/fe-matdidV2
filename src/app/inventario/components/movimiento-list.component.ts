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
import { InventarioService } from '../services/inventario.service';
import { MovimientoDetalleComponent } from './movimiento-detalle.component';


@Component({
  selector: 'app-movimiento-list',
  templateUrl: '../templates/movimiento-list.component.html',
  styleUrls: ['../styles/movimiento-list.component.scss']
})
export class MovimientoListComponent  implements OnInit {
  
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
  listadoMotivo!:any[];
  
  
  
  

  constructor(private inventarioService:InventarioService, private paginator: MatPaginatorIntl, private fb:FormBuilder, private routerInstance: Router, private dialogInstance: MatDialog) {
  }

  ngOnInit(): void {
    this.initDataSource();
    this.ChangePaginatorEspa();
    this.inventarioService.getMotivos().subscribe(motivos => this.listadoMotivo = motivos);
    
    this.filterForm = this.fb.group({
      nombre: [''],
      idMotivo:['']
      
    })
  }

  ngAfterViewInit() {
        this.paginatorRef = this.paginatorf;
        
  }



  initDataSource(){
    this.inventarioService.getMovimiento().subscribe( (movimientoData:any) => this.dataSource = movimientoData)
  }


  onPaginateChange(event:PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    let nombre:string='';
    

    if (this.filterForm.value.cedula || this.filterForm.value.name){
      nombre = this.filterForm.value.nombre;
      

    }


    this.inventarioService.getProducto(page,size,nombre).subscribe((inventarioData:any) => this.dataSource = inventarioData);
  }




  doFilter(){
    
   
    let nombre = this.filterForm.value.nombre;
    let idMotivo = this.filterForm.value.idMotivo;

    
    this.inventarioService.getMovimiento('0','10',nombre,idMotivo).subscribe((inventarioData:any) => this.dataSource = inventarioData);
  }

  onClickDetailsMovimiento(element:any){
    this.dialogInstance.open(MovimientoDetalleComponent, {
      width: Settings.DIALOG_MEDIUM,
      data: {
          typeDialog: 'confirm',
          title: this.viewText.ATTENTION,
         element:element
      },

    }).afterClosed().subscribe(res => {//DESPUES DE CERRAR LA VENTANA DE CONFIMACIÓN.

      if (res) {
        
      }
    });
  }


 

  ChangePaginatorEspa(){
    this.paginator.itemsPerPageLabel = PaginatorEs.itemsPaginatorEs.itemsPerPage;
    this.paginator.firstPageLabel = PaginatorEs.itemsPaginatorEs.firstPageLabel;
    this.paginator.lastPageLabel = PaginatorEs.itemsPaginatorEs.lastPageLabel;
    this.paginator.nextPageLabel = PaginatorEs.itemsPaginatorEs.nextPageLabel;
    this.paginator.previousPageLabel = PaginatorEs.itemsPaginatorEs.previousPageLabel;
  }


  

  displayedColumns: string[] = ['fecha','funcionario','motivo','comentario','options'];
  displayedFilters: string[] = ['nombre-filter'];
  
}

