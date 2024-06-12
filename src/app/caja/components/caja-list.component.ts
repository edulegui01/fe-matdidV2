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
import { CajaService } from '../service/caja.service';

@Component({
  selector: 'app-caja-list',
  templateUrl: '../templates/caja-list.component.html',
  styleUrls: ['../styles/caja-list.component.scss']
})
export class CajaListComponent  implements OnInit {
  
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
  saldoDisponible:any;
  
  
  
  

  constructor(private cajaService:CajaService, private paginator: MatPaginatorIntl, private fb:FormBuilder, private routerInstance: Router, private dialogInstance: MatDialog) {
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
    this.cajaService.getCajaList().subscribe( (cajaData:any) => this.dataSource = cajaData)
    this.cajaService.getSaldoDisponible().subscribe((saldoDisponible:any) => this.saldoDisponible = saldoDisponible)
  }




  doFilter(){
    
    console.log(this.filterForm.value.nombre)
    let nombre = this.filterForm.value.nombre;

    
    this.cajaService.getCajaList().subscribe((cicloData:any) => this.dataSource = cicloData);
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


                      this.cajaService.deleteLocalidad(element.id).subscribe(resp => {
                        this.paginatorf.pageIndex = 0;
                        this.cajaService.getCajaList().subscribe( (cicloData:any) => this.dataSource = cicloData)
                      });
                  }
              });
  }

  OnClickEditCiclo(element:any){
    //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))

    const extraParams: NavigationExtras = {
       state: element,
    };
    this.cajaService.editForm=true;
    console.log(element);
    this.routerInstance.navigate(['caja/editar-caja'],extraParams);
    
    

  }

  formatFechaToList(fecha:any){
    if(!fecha){
      return '';
    }
    
    const fechaFormat = new Date(fecha).toLocaleDateString('es-PY')


    return fechaFormat;
  }

  formatearNumero(number:number){
    return '₲ '+new Intl.NumberFormat("es-CL").format(number);
  }


  ChangePaginatorEspa(){
    this.paginator.itemsPerPageLabel = PaginatorEs.itemsPaginatorEs.itemsPerPage;
    this.paginator.firstPageLabel = PaginatorEs.itemsPaginatorEs.firstPageLabel;
    this.paginator.lastPageLabel = PaginatorEs.itemsPaginatorEs.lastPageLabel;
    this.paginator.nextPageLabel = PaginatorEs.itemsPaginatorEs.nextPageLabel;
    this.paginator.previousPageLabel = PaginatorEs.itemsPaginatorEs.previousPageLabel;
  }


  

  displayedColumns: string[] = ['fecha', 'comprobante','concepto','debito','credito'];
  displayedFilters: string[] = ['nombre-filter'];
  
}

