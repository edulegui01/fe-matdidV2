import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { Persona } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { Producto } from 'src/app/class/producto';
import { ConceptoService } from '../services/concepto.service';


@Component({
  selector: 'app-concepto-form',
  templateUrl: '../templates/concepto-form.component.html',
  styleUrls: ['../styles/concepto-form.component.scss']
})
export class ConceptoFormComponent implements OnInit {

  entityForm!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  localidad!:any;
  routerInstance:Router;
  snackbarInstance!: MatSnackBar;
  createDefaultMessage = 'EL REGISTRO';


  esIngresoList = [
    {
      name:'INGRESO',
      value:'I'
    },
    {
      name:'EGRESO',
      value:'E'
    }
  ]




  constructor(public conceptoService:ConceptoService, private formBuilder:FormBuilder, router: Router, private dialogInstance: MatDialog ) { 

    this.routerInstance = router;

    if (this.routerInstance.getCurrentNavigation()) {
        this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

        if (this.params) {
            this.entity = this.params;
        }
    }

    

    this.buildForm(this.entity);

  }

  ngOnInit(): void {

    
  }

  buildForm(entity: any) {
    this.entityForm = this.formBuilder.group({
        idConcepto: [entity ? entity.idConcepto : ''],
        nombre: [entity ? entity.nombre : '', Validators.required],
        esIngreso: [entity ? entity.esIngreso : '', Validators.required]
        
        

    });
  }

  saveProducto(){
    this.localidad = {
      nombre:this.entityForm.controls['nombre'].value,
      esIngreso:this.entityForm.controls['esIngreso'].value,
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
              message: `${this.viewText.CONFIRM_CREATE} <b>${this.createDefaultMessage}</b>?.`,
          },
      }).afterClosed().pipe().subscribe(data => {
          if (data) {
              

              this.conceptoService.saveConcepto(this.localidad).subscribe(result => {
                this.routerInstance.navigate(['../concepto/listar-concepto'])
              });
          }
      });

   

  }


  updateLocalidad(){
    this.localidad = {
      idConcepto:this.entityForm.controls['idConcepto'].value,
      nombre:this.entityForm.controls['nombre'].value,
      esIngreso:this.entityForm.controls['esIngreso'].value,
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
            this.conceptoService.saveConcepto(this.localidad).subscribe((result:any) => {
              this.routerInstance.navigate(['../concepto/listar-concepto'])
              this.conceptoService.editForm = false;
            });
          }
      });

    

  }

  getErrorMessage(controlName: string) {
    const msg = this.entityForm.controls[controlName].hasError('required') ? 'EL CAMPO NO PUEDE ESTAR VACIO' : '';
    if (msg) {
        this.entityForm.controls[controlName].markAsTouched();
    }
    return msg;
  }

  closeForm() {
    this.routerInstance.navigate(['../concepto/listar-concepto']);
    this.conceptoService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

}


 


