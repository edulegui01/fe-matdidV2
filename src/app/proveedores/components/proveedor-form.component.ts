import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../services/proveedor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { Persona } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';


@Component({
  selector: 'app-proveedor-form',
  templateUrl: '../templates/proveedor-form.component.html',
  styleUrls: ['../styles/proveedor-form.component.scss']
})
export class ProveedorFormComponent implements OnInit {

  entityForm!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  listadoLocalidad!:any[];
  proveedorToSave!:Persona;
  routerInstance:Router;
  proveedorToUpdate:any;
  createDefaultMessage = 'EL REGISTRO';





  constructor(public proveedorService:ProveedorService, private formBuilder:FormBuilder, router: Router, private dialogInstance: MatDialog, private  snackbarInstance: MatSnackBar, private _snackBar: MatSnackBar ) { 

    this.routerInstance = router;

    if (this.routerInstance.getCurrentNavigation()) {
        this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

        if (this.params) {
            this.entity = this.params;
        }
    }

    this.proveedorService.getLocalidades().subscribe(localidad => this.listadoLocalidad = localidad);

    this.buildForm(this.entity);

  }

  ngOnInit(): void {

    
  }

  buildForm(entity: any) {
    this.entityForm = this.formBuilder.group({
        id: [entity ? entity.id : ''],
        razonSocial: [entity ? entity.razonSocial : '', Validators.required],
        ruc: [entity ? entity.ruc : ''],
        nombreEncargado: [entity ? entity.nombreEncargado : '', Validators.required],
        cedula: [entity ? entity.cedula : ''],
        direccion: [entity ? entity.direccion : '', Validators.required],
        telefono: [entity ? entity.telefono : '', Validators.required],
        email: [entity ? entity.email : '', Validators.required],
        localidad: [entity ? entity.localidad.id : '', Validators.required],
        sector: [entity ? entity.sector : '', Validators.required],

    });
  }

  saveProveedor(){
    this.proveedorToSave = {
      cedula:this.entityForm.controls['cedula'].value,
      esCliente:false,
      localidad:{
        id:this.entityForm.controls['localidad'].value
      },
      nombreEncargado:this.entityForm.controls['nombreEncargado'].value,
      direccion:this.entityForm.controls['direccion'].value,
      email:this.entityForm.controls['email'].value,
      ruc:this.entityForm.controls['ruc'].value,
      telefono:this.entityForm.controls['telefono'].value,
      razonSocial:this.entityForm.controls['razonSocial'].value,
      sector:this.entityForm.controls['sector'].value,
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
              

              this.proveedorService.saveProveedor(this.proveedorToSave).subscribe(result => {
                this.routerInstance.navigate(['../proveedor/listar-proveedor'])
              });

              this._snackBar.open(this.viewText.SUCCESS_OPERATION,'ACEPTAR',{
                duration:3000
              })
          }
      });

   

  }


  updateCliente(){
    this.proveedorToUpdate = {
      cedula:this.entityForm.controls['cedula'].value,
      esCliente:false,
      localidad:{
        id:this.entityForm.controls['localidad'].value
      },
      nombreEncargado:this.entityForm.controls['nombreEncargado'].value,
      direccion:this.entityForm.controls['direccion'].value,
      email:this.entityForm.controls['email'].value,
      ruc:this.entityForm.controls['ruc'].value,
      telefono:this.entityForm.controls['telefono'].value,
      razonSocial:this.entityForm.controls['razonSocial'].value,
      sector:this.entityForm.controls['sector'].value
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
            this.proveedorService.updateCliente(this.entity.idPersona,this.proveedorToUpdate).subscribe(result => {
              this.routerInstance.navigate(['../proveedor/listar-proveedor']);
              this.proveedorService.editForm = false;
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
    this.routerInstance.navigate(['../proveedor/listar-proveedor']);
    this.proveedorService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

}


 


