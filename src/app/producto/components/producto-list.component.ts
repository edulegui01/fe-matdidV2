import { Component, OnInit, Version, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { NavigationExtras, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { PaginatorEs } from 'src/app/utils/paginatorEs';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from 'src/app/class/settings';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { ProductoService } from '../services/producto.service';
import { ProductoData } from 'src/app/class/productoData';

@Component({
  selector: 'app-producto-list',
  templateUrl: '../templates/producto-list.component.html',
  styleUrls: ['../styles/producto-list.component.scss'],
  
})
export class ProductoListComponent  implements OnInit {
  
  dataSource!:ProductoData;
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
  
  
  
  

  constructor(private productoService:ProductoService, private paginator: MatPaginatorIntl, private fb:FormBuilder, private routerInstance: Router, private dialogInstance: MatDialog) {
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
    this.productoService.getProductos().subscribe( (productoData:ProductoData) => this.dataSource = productoData)
  }


  onPaginateChange(event:PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    let nombre:string='';
    

    if (this.filterForm.value.cedula || this.filterForm.value.name){
      nombre = this.filterForm.value.nombre;
      

    }


    this.productoService.getProductos(page,size,nombre).subscribe((productoData:ProductoData) => this.dataSource = productoData);
  }


  doFilter(){
    
   
    let nombre = this.filterForm.value.nombre;

    
    this.productoService.getProductos('0','10',nombre).subscribe((productoData:ProductoData) => this.dataSource = productoData);
  }


  OnClickDeleteProducto(element:any){
    
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


                      this.productoService.deleteProducto(element.idProducto).subscribe(resp => {
                        this.paginatorf.pageIndex = 0;
                        this.productoService.getProductos().subscribe( (productoData:ProductoData) => this.dataSource = productoData)
                      });
                  }
              });
  }

  OnClickEditCliente(element:any){
    //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))

    const extraParams: NavigationExtras = {
       state: element,
    };
    this.productoService.editForm=true;
    console.log(element);
    this.routerInstance.navigate(['producto/editar-producto'],extraParams);
    
    

  }

  ChangePaginatorEspa(){
    this.paginator.itemsPerPageLabel = PaginatorEs.itemsPaginatorEs.itemsPerPage;
    this.paginator.firstPageLabel = PaginatorEs.itemsPaginatorEs.firstPageLabel;
    this.paginator.lastPageLabel = PaginatorEs.itemsPaginatorEs.lastPageLabel;
    this.paginator.nextPageLabel = PaginatorEs.itemsPaginatorEs.nextPageLabel;
    this.paginator.previousPageLabel = PaginatorEs.itemsPaginatorEs.previousPageLabel;
  }


  

  displayedColumns: string[] = ['descripcion', 'precioCosto', 'precioVenta', 'iva', 'cantidad', 'options'];
  displayedFilters: string[] = ['nombre-filter'];
  
}

