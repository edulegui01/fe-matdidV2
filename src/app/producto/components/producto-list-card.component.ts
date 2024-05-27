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
import { CustomDialogComponent } from "src/app/components/custom-dialog/components/custom-dialog.component";
import { MatSnackBar } from '@angular/material/snack-bar';








@Component({
    selector: 'app-producto-list-card',
    templateUrl: '../templates/producto-list-card.component.html',
    styleUrls: ['../styles/producto-list-card.component.scss'],
    
  })

  export class ProductoListCardComponent implements OnInit{
    dataSource!:any;
    clienteToEdit!:any;
    routerInstant!:Router;
    paginatorRange = GlobalMessage.PAGINATOR_RANGE_PRODUCTS;
    resultsLength!: Observable<number>;
    pageEvent!:PageEvent;
    filterForm!:FormGroup;
    viewText = GlobalMessage.VIEW_LABELS;
    deleteDefaultMessage = 'EL REGISTRO';
    paginatorRef!: MatPaginator;
    @ViewChild(MatPaginator) paginatorf!: MatPaginator;
    urlBase = Settings.URL_BASE+'/producto/imagen?searchImagen='
    cicloList!:any
    categoriaList!:any
    materiaList!:any
    editorialList!:any
    esAdmin:string = GlobalMessage.administrador;
    rol:string|null = localStorage.getItem('role');


    constructor(private productoService:ProductoService, private paginator: MatPaginatorIntl, private fb:FormBuilder, 
      private routerInstance: Router, private dialogInstance: MatDialog,  private  snackbarInstance: MatSnackBar) {
      this.initDataSource();
    }

    

    ngOnInit(): void {
      
      this.ChangePaginatorEspa();
      
      this.filterForm = this.fb.group({
        nombre: [''],
        idCiclo:[''],
        idCategoria:[''],
        idMateria:[''],
        idEditorial:['']
        
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

      this.productoService.listarSelectCiclo().subscribe((cicloList:any) => this.cicloList = cicloList)
      this.productoService.listarSelectCategoria().subscribe((categoriaList:any) => this.categoriaList = categoriaList)
      this.productoService.listarSelectMateria().subscribe((materiaList:any) => this.materiaList = materiaList)
      this.productoService.listarSelectEditorial().subscribe((editorialList:any) => this.editorialList = editorialList)
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
      const extraParams: NavigationExtras = {
        state: element,
     };
     this.productoService.detalleForm=true;
     this.productoService
     this.routerInstance.navigate(['producto/detalle-producto'],extraParams);
      
      
  
    }


    onClickEditProducto(element:any){
      //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))
  
      const extraParams: NavigationExtras = {
         state: element,
      };
      this.productoService.editForm=true;
      this.routerInstance.navigate(['producto/editar-producto'],extraParams);
      
      
  
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
  
  
                        this.productoService.deleteProducto(element.idProducto).subscribe({
                          next: (resp) => {
                            this.paginatorf.pageIndex = 0;
                            this.productoService.getProductos().subscribe( (productoData:ProductoData) => this.dataSource = productoData)
                          },
                          error:(err) => {
                            this.snackbarInstance.open(err.error.message,'ACEPTAR',{
                              duration:4000
                            })
                          }
                        });
                    }
                });
    }

    doFilter(){
    
      let nombre = this.filterForm.value.nombre;
      let idCiclo = this.filterForm.value.idCiclo;
      let idCategoria = this.filterForm.value.idCategoria;
      let idMateria = this.filterForm.value.idMateria;
      let idEditorial = this.filterForm.value.idEditorial;
      
      this.productoService.getProductos('0','12',nombre,idCiclo,idCategoria,idMateria,idEditorial).subscribe((
        productoData:any) => this.dataSource = productoData);
    }




    ChangePaginatorEspa(){
      this.paginator.itemsPerPageLabel = PaginatorEs.itemsPaginatorEs.itemsPerPage;
      this.paginator.firstPageLabel = PaginatorEs.itemsPaginatorEs.firstPageLabel;
      this.paginator.lastPageLabel = PaginatorEs.itemsPaginatorEs.lastPageLabel;
      this.paginator.nextPageLabel = PaginatorEs.itemsPaginatorEs.nextPageLabel;
      this.paginator.previousPageLabel = PaginatorEs.itemsPaginatorEs.previousPageLabel;
    }
  
  }