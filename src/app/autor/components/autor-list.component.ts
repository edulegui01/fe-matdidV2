import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent, MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { NavigationExtras, Router } from "@angular/router";
import { Observable } from "rxjs";
import { GlobalMessage } from "src/app/class/global-message";
import { ProductoData } from "src/app/class/productoData";
import { PaginatorEs } from "src/app/utils/paginatorEs";
import { Settings } from "src/app/class/settings";
import { CustomDialogComponent } from "src/app/components/custom-dialog/components/custom-dialog.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutorService } from "../service/autor.service";








@Component({
    selector: 'app-autor-list',
    templateUrl: '../templates/autor-list.component.html',
    styleUrls: ['../styles/autor-list.component.scss'],
    
  })

  export class AutorListComponent implements OnInit{
    dataSource!:any;
    clienteToEdit!:any;
    params:any=null;
    routerInstant!:Router;
    paginatorRange = GlobalMessage.PAGINATOR_RANGE_PRODUCTS;
    resultsLength!: Observable<number>;
    pageEvent!:PageEvent;
    filterForm!:FormGroup;
    viewText = GlobalMessage.VIEW_LABELS;
    deleteDefaultMessage = 'EL REGISTRO';
    paginatorRef!: MatPaginator;
    @ViewChild(MatPaginator) paginatorf!: MatPaginator;
    urlBase = Settings.URL_BASE+'/autor/imagen?searchImagen='
    cicloList!:any
    categoriaList!:any
    materiaList!:any
    editorialList!:any
    esAdmin:string = GlobalMessage.administrador;
    rol:string|null = localStorage.getItem('role');


    constructor(private autorService:AutorService, private paginator: MatPaginatorIntl, private fb:FormBuilder, 
      private routerInstance: Router, private dialogInstance: MatDialog,  private  snackbarInstance: MatSnackBar) {
        if (this.routerInstance.getCurrentNavigation()) {
          this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
              ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;
        }
    }

    

    ngOnInit(): void {
      
      this.initDataSource(this.params.idAutor);
      
      
      
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
  
  
  
    initDataSource(idAutor:string){
      this.autorService.getProductos('0','12','','','','','',idAutor).subscribe( (productoData:any) => {
        this.dataSource = productoData
      })

      
    }


    onPaginateChange(event:PageEvent){
      let page = event.pageIndex;
      let size = event.pageSize;
  
      let idAutor:string=this.params.idAutor;
      
  
      
  
  
      this.autorService.getProductos(page,size,'','','','','',idAutor).subscribe((productoData:any) => {
        
        
        this.dataSource = productoData
      });
    }

    OnClickDetailCliente(element:any){
      const extraParams: NavigationExtras = {
        state: element,
     };
     this.autorService.detalleForm=true;
     this.autorService
     this.routerInstance.navigate(['producto/detalle-producto'],extraParams);
      
      
  
    }


    onClickEditProducto(element:any){
      //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))
  
      const extraParams: NavigationExtras = {
         state: element,
      };
      this.autorService.editForm=true;
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
  
  
                        this.autorService.deleteProducto(element.idProducto).subscribe({
                          next: (resp) => {
                            this.paginatorf.pageIndex = 0;
                            this.autorService.getProductos().subscribe( (productoData:ProductoData) => this.dataSource = productoData)
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
      
      this.autorService.getProductos('0','12',nombre,idCiclo,idCategoria,idMateria,idEditorial,'').subscribe((
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