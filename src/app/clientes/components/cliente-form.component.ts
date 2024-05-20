import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { Persona } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-cliente-form',
  templateUrl: '../templates/cliente-form.component.html',
  styleUrls: ['../styles/cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  entityFormEmpresa!:FormGroup;
  entityFormPersona!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  listadoLocalidad!:any[];
  clienteToSave!:any;
  routerInstance:Router;
  clienteToUpdate:any;
  snackbarInstance!: MatSnackBar;
  createDefaultMessage = 'EL REGISTRO';
  esPersona:boolean = false;

  @ViewChild('selectionAtipePersona')
  selectTipe?:ElementRef





  constructor(public clienteService:ClientesService, private formBuilder:FormBuilder, router: Router, private dialogInstance: MatDialog, private _snackBar: MatSnackBar  ) { 

    this.routerInstance = router;

    if (this.routerInstance.getCurrentNavigation()) {
        this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

        if (this.params) {
            this.entity = this.params;
        }
    }

    this.clienteService.getLocalidades().subscribe(localidad => this.listadoLocalidad = localidad);
    console.log("render")

    if(this.entity?.nombre){
      console.log("entra en persona")
      this.esPersona = true;
      this.buildFormPersona(this.entity);
      
    }else{
      console.log("entra en empresa")
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

  saveClienteEmpresa(){
    this.clienteToSave = {
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


    console.log(this.clienteToSave)

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
              

              this.clienteService.saveClientes(this.clienteToSave).subscribe(result => {
                this.routerInstance.navigate(['../cliente/listar-cliente'])
              });

              this._snackBar.open(this.viewText.SUCCESS_OPERATION,'ACEPTAR',{
                duration:3000
              })
          }
      });

   

  }

  saveClientePersona(){
    this.clienteToSave = {
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

    console.log(this.clienteToSave)


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
              

              this.clienteService.saveClientes(this.clienteToSave).subscribe(result => {
                this.routerInstance.navigate(['../cliente/listar-cliente'])
              });

              this._snackBar.open(this.viewText.SUCCESS_OPERATION,'ACEPTAR',{
                duration:3000
              })
          }
      });

   

  }


  updateClienteEmpresa(){
    this.clienteToUpdate = {
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
            this.clienteService.updateCliente(this.entity.idPersona,this.clienteToUpdate).subscribe(result => {
              this.routerInstance.navigate(['../cliente/listar-cliente']);
              this.clienteService.editForm = false;
            });

            this._snackBar.open(this.viewText.SUCCESS_UPDATE,'ACEPTAR',{
              duration:3000
            })
          }
      });

    

  }

  updateClientePersona(){
    this.clienteToUpdate = {
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
            this.clienteService.updateCliente(this.entity.idPersona,this.clienteToUpdate).subscribe(result => {
              this.routerInstance.navigate(['../cliente/listar-cliente']);
              this.clienteService.editForm = false;
            });

            this._snackBar.open(this.viewText.SUCCESS_UPDATE,'ACEPTAR',{
              duration:3000
            })
          }
      });

    

  }

  closeForm() {
    this.routerInstance.navigate(['../cliente/listar-cliente']);
    this.clienteService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

  onSelectionEmpresaOpersona(tipo:boolean){
    this.esPersona = tipo;
  }



  

}





