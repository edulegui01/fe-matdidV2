import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProveedorService } from '../services/proveedor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { Persona } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { fromEvent, map } from 'rxjs';


@Component({
  selector: 'app-proveedor-form',
  templateUrl: '../templates/proveedor-form.component.html',
  styleUrls: ['../styles/proveedor-form.component.scss']
})
export class ProveedorFormComponent implements OnInit {

  entityFormEmpresa!:FormGroup;
  entityFormPersona!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  listadoLocalidad!:any[];
  proveedorToSave!:any;
  routerInstance:Router;
  proveedorToUpdate:any;
  createDefaultMessage = 'EL REGISTRO';
  @ViewChild('selectionAtipePersona')
  selectTipe?:ElementRef

  esPersona:boolean = false;





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

    if(this.entity?.nombre){
      this.esPersona = true;
      this.buildFormPersona(this.entity);
      
    }else{
      this.buildFormEmpresa(this.entity);
    }

  }

  ngOnInit(): void {

    
  }

  ngAfterViewInit(): void {
    this.selectTipeEvent();

  }

  selectTipeEvent(){
    fromEvent<any>(this.selectTipe?.nativeElement,'change')
    .pipe(
      map(event => event.target.value)
    ).subscribe(res => {
      
      
      this.esPersona =  res == 'true' ? true : false;
      this.buildFormPersona(this.entity);

      
    })
  }

  buildFormEmpresa(entity: any) {
    this.entityFormEmpresa = this.formBuilder.group({
        id: [entity ? entity.idPersona : ''],
        nombreEmpresa: [entity ? entity.empresa : ''],
        nombreEncargado: [entity ? entity.nombreEncargado : ''],
        ruc: [entity ? entity.ruc : ''],
        direccion: [entity ? entity.direccion : '', Validators.required],
        telefono: [entity ? entity.telefono : '', Validators.required],
        razonSocial:[entity ? entity.razonSocial : ''],
        email: [entity ? entity.email : '', Validators.required],
        localidad: [entity ? entity.localidad.id : '', Validators.required],
        sector: [entity ? entity.sector : '', Validators.required]

    });
  }

  buildFormPersona(entity: any) {
    this.entityFormPersona = this.formBuilder.group({
        id: [entity ? entity.idPersona : ''],
        nombre: [entity ? entity.nombre : '', Validators.required],
        apellido: [entity ? entity.apellido : '', Validators.required],
        cedula: [entity ? entity.cedula : '', Validators.required],
        direccion: [entity ? entity.direccion : '', Validators.required],
        telefono: [entity ? entity.telefono : '', Validators.required],
        email: [entity ? entity.email : '', Validators.required],
        localidad: [entity ? entity.localidad.id : '', Validators.required]

    });
  }

  saveProveedorEmpresa(){
    this.proveedorToSave = {
      cedula:this.entityFormEmpresa.controls['ruc'].value,
      esCliente:true,
      localidad:{
        id:this.entityFormEmpresa.controls['localidad'].value
      },
      nombre:null,
      apellido:null,
      nombreEncargado:this.entityFormEmpresa.controls['nombreEncargado'].value,
      empresa:this.entityFormEmpresa.controls['nombreEmpresa'].value,
      direccion:this.entityFormEmpresa.controls['direccion'].value,
      email:this.entityFormEmpresa.controls['email'].value,
      razonSocial:this.entityFormEmpresa.controls['razonSocial'].value,
      ruc:this.entityFormEmpresa.controls['ruc'].value,
      telefono:this.entityFormEmpresa.controls['telefono'].value,
      sector:this.entityFormEmpresa.controls['sector'].value
    }




    if (this.entityFormEmpresa.invalid) {
      this._snackBar.open(this.viewText.INVALID_FORM
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

  saveProveedorPersona(){
    this.proveedorToSave = {
      cedula:this.entityFormPersona.controls['cedula'].value,
      esCliente:true,
      localidad:{
        id:this.entityFormPersona.controls['localidad'].value
      },
      empresa:null,
      nombreEncargado:null,
      nombre:this.entityFormPersona.controls['nombre'].value,
      apellido:this.entityFormPersona.controls['apellido'].value,
      direccion:this.entityFormPersona.controls['direccion'].value,
      email:this.entityFormPersona.controls['email'].value,
      razonSocial:this.entityFormPersona.controls['nombre'].value+ ' '+this.entityFormPersona.controls['apellido'].value,
      ruc:this.entityFormPersona.controls['cedula'].value,
      telefono:this.entityFormPersona.controls['telefono'].value,
      sector:null
    }



    if (this.entityFormPersona.invalid) {
      this._snackBar.open(this.viewText.INVALID_FORM
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


  updateProveedorEmpresa(){
    this.proveedorToUpdate = {
      id:this.entity.idPersona,
      cedula:this.entityFormEmpresa.controls['ruc'].value,
      esCliente:true,
      localidad:{
        id:this.entityFormEmpresa.controls['localidad'].value
      },
      nombre:null,
      apellido:null,
      nombreEncargado:this.entityFormEmpresa.controls['nombreEncargado'].value,
      empresa:this.entityFormEmpresa.controls['nombreEmpresa'].value,
      direccion:this.entityFormEmpresa.controls['direccion'].value,
      email:this.entityFormEmpresa.controls['email'].value,
      razonSocial:this.entityFormEmpresa.controls['razonSocial'].value,
      ruc:this.entityFormEmpresa.controls['ruc'].value,
      telefono:this.entityFormEmpresa.controls['telefono'].value,
      sector:this.entityFormEmpresa.controls['sector'].value
    }

    if (this.entityFormEmpresa.invalid) {
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

            this._snackBar.open(this.viewText.SUCCESS_UPDATE,'ACEPTAR',{
              duration:3000
            })
          }
      });

    

  }

  updateProveedorPersona(){
    this.proveedorToUpdate = {
      id:this.entity.idPersona,
      cedula:this.entityFormPersona.controls['cedula'].value,
      esCliente:true,
      localidad:{
        id:this.entityFormPersona.controls['localidad'].value
      },
      empresa:null,
      nombreEncargado:null,
      nombre:this.entityFormPersona.controls['nombre'].value,
      apellido:this.entityFormPersona.controls['apellido'].value,
      direccion:this.entityFormPersona.controls['direccion'].value,
      email:this.entityFormPersona.controls['email'].value,
      razonSocial:this.entityFormPersona.controls['nombre'].value+ ' '+this.entityFormPersona.controls['apellido'].value,
      ruc:this.entityFormPersona.controls['cedula'].value,
      telefono:this.entityFormPersona.controls['telefono'].value,
      sector:null
    }

    if (this.entityFormPersona.invalid) {
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

            this._snackBar.open(this.viewText.SUCCESS_UPDATE,'ACEPTAR',{
              duration:3000
            })
          }
      });

    

  }

  getErrorMessageEmpresa(controlName: string) {
    let msg=''
    if (this.entityFormEmpresa.controls[controlName].hasError('error')) { 
      msg = 'EL CAMPO NO PUEDE ESTAR VACIO' ;
    }
    return msg;
  }


  getErrorMessagePersona(controlName: string) {
    let msg=''
    if (this.entityFormPersona.controls[controlName].hasError('error')) { 
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


 


