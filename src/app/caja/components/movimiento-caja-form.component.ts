import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { Persona } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { FuncionarioToSave } from 'src/app/class/funcionarioToSave';
import { CajaService } from '../service/caja.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movimiento-caja-form',
  templateUrl: '../templates/movimiento-caja-form.component.html',
  styleUrls: ['../styles/movimiento-caja-form.component.scss']
})
export class MovimientoCajaFormComponent implements OnInit {

  entityForm!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  listadoConcepto!:any[];
  movimientoCajaToSave!:any;
  routerInstance:Router;
  movimientoCajaToUpdate:any;
  createDefaultMessage = 'EL REGISTRO';
  listaTipoDePago = ['EFECTIVO','TRANSFERENCIA','DEPÓSITO']





  constructor(public cajaService:CajaService, private formBuilder:FormBuilder, router: Router, private dialogInstance: MatDialog,
    private datePipe: DatePipe, private snackbarInstance:MatSnackBar
   ) { 

    this.routerInstance = router;

    if (this.routerInstance.getCurrentNavigation()) {
        this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

        if (this.params) {
            this.entity = this.params;
        }
    }

    this.cajaService.getConcepto().subscribe(concepto => this.listadoConcepto = concepto);

    this.buildForm(this.entity);

  }

  ngOnInit(): void {

    
  }

  buildForm(entity: any) {
    this.entityForm = this.formBuilder.group({
        idMovimientoCaja: [entity ? entity.idMovimientoCaja : ''],
        fecha: [new Date(), Validators.required],
        idConcepto: [entity ? entity.idConcepto : '', Validators.required],
        comprobante: [entity ? entity.comprobante : ''],
        beneficiario: [entity ? entity.beneficiario : ''],
        tipoPago: [entity ? entity.tipoPago : ''],
        monto: [entity ? entity.monto : '', Validators.required],
        comentario: [entity ? entity.comentario : '']

    });
  }

  saveMovimientoCaja(){
    
    const fecha = this.datePipe.transform(this.entityForm.controls['fecha'].value,'YYYY-MM-ddTHH:mm:SS.sss');
    
    this.movimientoCajaToSave = {
      idFuncionario:localStorage.getItem('idFuncionario'),
      idConcepto:this.entityForm.controls['idConcepto'].value,
      fecha:this.entityForm.controls['fecha'].value,
      comprobante:this.entityForm.controls['comprobante'].value,
      beneficiario:this.entityForm.controls['beneficiario'].value,
      monto:this.entityForm.controls['monto'].value,
      comentario:this.entityForm.controls['comentario'].value
      
    }

    console.log(this.movimientoCajaToSave)


    if (this.entityForm.invalid) {
      this.snackbarInstance.open(this.viewText.INVALID_FORM
          , 'OK'
          , {
              duration: Settings.SHORT_TIME
              , panelClass: Settings.FAILED_MESSAGE_CLASS
          }
      );
      return;
    }

      this.dialogInstance.open(CustomDialogComponent, {
          width: Settings.DIALOG_MEDIUM,
          data: {
              typeDialog: 'confirm',
              title: this.viewText.ATTENTION,
              message: `${this.viewText.CONFIRM_CREATE} <b>${this.createDefaultMessage}</b>?.`,
          },
      }).afterClosed().pipe().subscribe(data => {
          if (data) {
              

              this.cajaService.saveMovimientoCaja(this.movimientoCajaToSave).subscribe(result => {
                this.routerInstance.navigate(['../caja/actual-caja'])
              });
          }
      });

   

  }


  updateMovimientoCaja(){
    this.movimientoCajaToUpdate = {
        idFuncionario:sessionStorage.getItem('idFuncionario'),
        idConcepto:this.entityForm.controls['idConcepto'].value,
        fecha:this.entityForm.controls['fecha'].value,
        comprobante:this.entityForm.controls['comprobante'].value,
        beneficiario:this.entityForm.controls['beneficiario'].value,
        monto:this.entityForm.controls['monto'].value,
        comentario:this.entityForm.controls['comentario'].value
        
    }

    if (this.entityForm.invalid) {
      this.snackbarInstance.open(this.viewText.INVALID_FORM
          , 'OK'
          , {
              duration: Settings.SHORT_TIME
              , panelClass: Settings.FAILED_MESSAGE_CLASS
          }
      );
      return;
    }

      this.dialogInstance.open(CustomDialogComponent, {
          width: Settings.DIALOG_MEDIUM,
          data: {
              typeDialog: 'confirm',
              title: this.viewText.ATTENTION,
              message: `${this.viewText.CONFIRM_EDIT} <b>${this.createDefaultMessage}</b>?.`,
          },
      }).afterClosed().pipe().subscribe(data => {
          if (data) {
            this.cajaService.updateMovimientoCaja(this.entity.idMovimientoCaja,this.movimientoCajaToUpdate).subscribe((result:any) => {
              this.routerInstance.navigate(['../caja/listar-caja']);
              this.cajaService.editForm = false;
            });
          }
      });

    

  }

  getErrorMessage(controlName: string) {
    let msg=''
    if (this.entityForm.controls[controlName].hasError('required')) { 
      msg = 'EL CAMPO NO PUEDE ESTAR VACIO' ;
    }
    return msg;
  }


  closeForm() {
    this.routerInstance.navigate(['../caja/listar-caja']);
    this.cajaService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

}


 


