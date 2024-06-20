import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Settings } from 'src/app/class/settings';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { FuncionarioData } from 'src/app/class/funcionarioData';
import { CobroService } from '../service/cobro.service';

@Component({
  selector: 'app-cobro-list',
  templateUrl: '../templates/cobro-list.component.html',
  styleUrls: ['../styles/cobro-list.component.scss']
})
export class CobroListComponent  implements OnInit {
  
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
  
  
  
  

  constructor(private cobroService:CobroService, private paginator: MatPaginatorIntl, private fb:FormBuilder, 
    private routerInstance: Router, private dialogInstance: MatDialog,
    public dialogRef: MatDialogRef<CobroListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initDataSource();
    
    this.filterForm = this.fb.group({
      name: [''],
      cedula: ['']
    })
  }

  ngAfterViewInit() {
        this.paginatorRef = this.paginatorf;
        
  }



  initDataSource(){
    this.cobroService.getCobro(this.data.element.idFactura).subscribe( (cobroData:any) => this.dataSource = cobroData)
  }


  OnClickAnularCobro(element:any){
    
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
                    this.cobroService.anularCobro(element.idPago).subscribe(resp => {
                        this.cobroService.getCobro(this.data.element.idCompra).subscribe((pagoData:any) => this.dataSource = pagoData)
                      });
                  }
              });
  }

  OnClickEditCliente(element:any){
    //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))

    const extraParams: NavigationExtras = {
       state: element,
    };
    this.cobroService.editForm=true;
    this.routerInstance.navigate(['funcionario/editar-funcionario'],extraParams);
    
    

  }

  formatearNumero(number:number){
    return new Intl.NumberFormat("es-CL").format(number);
  }

  formatFechaToList(fecha:any){
    if(!fecha){
      return '';
    }
    
    const fechaFormat = new Date(fecha).toLocaleDateString('es-PY')


    return fechaFormat;
  }

  closeList(){
    this.dialogRef.close()
  }




  

  displayedColumns: string[] = ['nroDocumento', 'fecha', 'tipoPago', 'monto', 'options'];
  displayedFilters: string[] = ['cedula-filter', 'name-filter'];

  
}

