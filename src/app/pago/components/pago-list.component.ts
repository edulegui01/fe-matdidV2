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
import { PagoService } from '../services/pago.service';

@Component({
  selector: 'app-pago-list',
  templateUrl: '../templates/pago-list.component.html',
  styleUrls: ['../styles/pago-list.component.scss']
})
export class PagoListComponent  implements OnInit {
  
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
  
  
  
  

  constructor(private pagoService:PagoService, private paginator: MatPaginatorIntl, private fb:FormBuilder, 
    private routerInstance: Router, private dialogInstance: MatDialog,
    public dialogRef: MatDialogRef<PagoListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      console.log(this.data.element.idCompra)
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
    this.pagoService.getPagos(this.data.element.idCompra).subscribe( (pagoData:any) => this.dataSource = pagoData)
  }


  OnClickAnularPago(element:any){
    
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
                    this.pagoService.anularPago(element.idPago).subscribe(resp => {
                        this.pagoService.getPagos(this.data.element.idCompra).subscribe((pagoData:any) => this.dataSource = pagoData)
                      });
                  }
              });
  }

  OnClickEditCliente(element:any){
    //this.clienteService.searchClienteById('4').subscribe(cliente => (this.clienteToEdit = cliente))

    const extraParams: NavigationExtras = {
       state: element,
    };
    this.pagoService.editForm=true;
    console.log(element);
    this.routerInstance.navigate(['funcionario/editar-funcionario'],extraParams);
    
    

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

  closeList(){
    this.dialogRef.close()
  }




  

  displayedColumns: string[] = ['nroDocumento', 'fecha', 'tipoPago', 'monto', 'options'];
  displayedFilters: string[] = ['cedula-filter', 'name-filter'];
  
}

