import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent, MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { NavigationExtras, Router } from "@angular/router";
import { Observable } from "rxjs";
import { GlobalMessage } from "src/app/class/global-message";
import { ProductoData } from "src/app/class/productoData";
import { ProductoService } from "../services/producto.service";
import { PaginatorEs } from "src/app/utils/paginatorEs";
import { ProductoFormComponent } from "./producto-form.component";
import { Settings } from "src/app/class/settings";
import { ProductoDetalleComponent } from "./producto-detalle.component";








@Component({
    selector: 'app-producto-list-card',
    templateUrl: '../templates/producto-list-card.component.html',
    styleUrls: ['../styles/producto-list.component.scss'],
    
  })

  export class ProductoListCardComponent implements OnInit{
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
    urlBase = Settings.URL_BASE+'/producto/imagen?searchImagen='


    constructor(private productoService:ProductoService, private paginator: MatPaginatorIntl, private fb:FormBuilder, private routerInstance: Router, private dialogInstance: MatDialog) {
      this.initDataSource();
    }

    

    ngOnInit(): void {
      
      this.ChangePaginatorEspa();
      
      this.filterForm = this.fb.group({
        nombre: [''],
        
      })
    }
  
    ngAfterViewInit() {
          this.paginatorRef = this.paginatorf;
          
    }
  
  
  
    initDataSource(){
      this.productoService.getProductos().subscribe( (productoData:any) => {
        this.dataSource = productoData
        console.log(productoData);
      })
    }


    onPaginateChange(event:PageEvent){
      let page = event.pageIndex;
      let size = event.pageSize;
  
      let nombre:string='';
      
  
      if (this.filterForm.value.cedula || this.filterForm.value.name){
        nombre = this.filterForm.value.nombre;
        
  
      }
  
  
      this.productoService.getProductos(page,size,nombre).subscribe((productoData:any) => {
        
        
        this.dataSource = productoData
      });
    }

    OnClickDetailCliente(element:any){
      //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))
      // element = {...element,readOndly:true}
      // const extraParams: NavigationExtras = {
      //    state: element,
         
      // };
      // this.productoService.detalleForm=true;
      // this.routerInstance.navigate(['producto/detalle-producto'],extraParams);


      this.dialogInstance.open(ProductoDetalleComponent, {
        width: Settings.DIALOG_SMALL,
        data: {
            typeDialog: 'confirm',
            title: this.viewText.ATTENTION,
            message: `${this.viewText.CONFIRM_REMOVE} <b>${this.deleteDefaultMessage}</b>?
           ¿DESEA ELIMINAR DE MANERA PERMANENTE?`,
           element:element
        },

    }).afterClosed().subscribe(accept => {//DESPUES DE CERRAR LA VENTANA DE CONFIMACIÓN.

        if (accept) {
          
          
          this.paginatorf.pageIndex = 0;


            // this.localidadService.deleteProducto(element.idProducto).subscribe(resp => {
            //   this.paginatorf.pageIndex = 0;
            //   this.localidadService.getLocalidades().subscribe( (localidadData:any) => this.dataSource = localidadData)
            // });
        }
    });
      
      
  
    }


    onClickEditProducto(element:any){
      //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))
  
      const extraParams: NavigationExtras = {
         state: element,
      };
      this.productoService.editForm=true;
      this.routerInstance.navigate(['producto/editar-producto'],extraParams);
      
      
  
    }

    doFilter(){
    
      let nombre = this.filterForm.value.nombre;
  
      
      this.productoService.getProductos('0','8',nombre).subscribe((funcionarioData:any) => this.dataSource = funcionarioData);
    }




    ChangePaginatorEspa(){
      this.paginator.itemsPerPageLabel = PaginatorEs.itemsPaginatorEs.itemsPerPage;
      this.paginator.firstPageLabel = PaginatorEs.itemsPaginatorEs.firstPageLabel;
      this.paginator.lastPageLabel = PaginatorEs.itemsPaginatorEs.lastPageLabel;
      this.paginator.nextPageLabel = PaginatorEs.itemsPaginatorEs.nextPageLabel;
      this.paginator.previousPageLabel = PaginatorEs.itemsPaginatorEs.previousPageLabel;
    }
  
  }