import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { PagoService } from "../services/pago.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GlobalMessage } from "src/app/class/global-message";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Settings } from "src/app/class/settings";
import { CustomDialogComponent } from "src/app/components/custom-dialog/components/custom-dialog.component";




@Component({
    selector: 'app-pago-form',
    templateUrl: '../templates/pago-form.component.html',
    styleUrls: ['../styles/pago-form.component.scss']
  })
  export class PagoFormComponent implements OnInit, AfterViewInit {
    
    params:any=null;
    entity:any=null;
    routerInstance:Router;
    entityForm!:FormGroup;
    colsSize=2;
    listaTipoDePago = ['EFECTIVO','TRANSFERENCIA','CHEQUE']
    viewText = GlobalMessage.VIEW_LABELS;
    pagoToSave!:any;
    createDefaultMessage = 'EL REGISTRO';
    soloLectura:boolean = false;
    
    constructor(private pagoService:PagoService,router: Router,  private formBuilder:FormBuilder, private  snackbarInstance: MatSnackBar,
        private dialogInstance: MatDialog, public dialogRef: MatDialogRef<PagoFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any  
    ){
        this.routerInstance = router;

        if (this.routerInstance.getCurrentNavigation()) {
            this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

            if (this.params) {
            this.entity = this.params;
            }
        }

        if(this.data.element.tipoFactura == 'contado'){
          this.soloLectura = true;
        }

        console.log(this.data)

        this.buildForm(this.data.element);
    }
    
    
    
    ngAfterViewInit(): void {
       
    }
    ngOnInit(): void {
       
    }


    buildForm(entity:any){
        this.entityForm = this.formBuilder.group({
            idCompra: [entity ? entity.idCompra : ''],
            tipoFactura:[entity ? entity.tipoFactura:''],
            fecha: [new Date()],
            monto: [ ''],
            saldo: [entity ? entity.saldo : ''],
            tipoPago: [entity ? entity.tipoPago : ''],
            comentario: [entity ? entity.comentario : ''],
            
        });
    }


    onResize() {
        this.colsSize = window.innerWidth <= 400 ? 1 : 2;
    }

    getErrorMessage(controlName: string) {
        const msg = this.entityForm.controls[controlName].hasError('required') ? 'EL CAMPO NO PUEDE ESTAR VACIO' : '';
        if (msg) {
            this.entityForm.controls[controlName].markAsTouched();
        }
        return msg;
    }

    savePago(){
     
        
        /*const fechaCompra = this.datePipe.transform(this.entityForm.controls['fecha'].value,'YYYY-MM-dd');
        const fechaCompraVencimiento = this.datePipe.transform(this.entityForm.controls['fechaVencimiento'].value,'YYYY-MM-dd');*/
    
        this.pagoToSave = {
          idFuncionario:localStorage.getItem('idFuncionario'),
          idCompra:this.entityForm.controls['idCompra'].value,
          fecha:this.entityForm.controls['fecha'].value,
          comentario:this.entityForm.controls['comentario'].value,
          tipoPago: this.entityForm.controls['tipoPago'].value,
          monto: this.entityForm.controls['monto'].value

        }
    
        console.log(this.pagoToSave)
        console.log(this.entityForm.controls['saldo'].value)
    
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
                    this.pagoService.savePago(this.pagoToSave).subscribe({
                      next: (result:any) => {
                        let responseToDetailCompra = {
                          monto: this.entityForm.controls['monto'].value,
                          saldo: this.entityForm.controls['saldo'].value,
                          estado: this.entityForm.controls['saldo'].value == this.entityForm.controls['monto'].value ? 'PA': 'PP'
                        }
                        this.closeForm(responseToDetailCompra);
                        this.snackbarInstance.open(this.viewText.SUCCESS_OPERATION,'ACEPTAR',{
                          duration:3000
                        })
                      },
                      error: (err) => {
                        this.snackbarInstance.open(err.error.message,'ACEPTAR',{
                          duration:4000
                        })
                      }
                    });
              }
          });
    
       
    
    }


    closeForm(item:any = null) {
        this.dialogRef.close(item);
      }




}