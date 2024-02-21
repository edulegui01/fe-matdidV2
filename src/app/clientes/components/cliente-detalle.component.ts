import { Component, Inject, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { ClienteToSave } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';

@Component({
  selector: 'app-cliente-details',
  templateUrl: '../templates/cliente-details.component.html',
  styleUrls: ['../styles/cliente-detalle.component.scss']
})
export class ClienteDetailsComponent implements OnInit {

  entityForm!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  listadoLocalidad!:any[];
  clienteToSave!:ClienteToSave;
  routerInstance:Router;
  clienteToUpdate:any;
  snackbarInstance!: MatSnackBar;
  createDefaultMessage = 'EL REGISTRO';





  constructor(public clienteService:ClientesService, private formBuilder:FormBuilder, router: Router, private dialogInstance: MatDialog,
    public dialogRef: MatDialogRef<ClienteDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any )  { 

    this.routerInstance = router;

    if (this.routerInstance.getCurrentNavigation()) {
        this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

        if (this.params) {
            this.entity = this.params;
        }
    }

    this.clienteService.getLocalidades().subscribe(localidad => this.listadoLocalidad = localidad);

    this.buildForm(this.entity);

  }

  ngOnInit(): void {

    
  }

  buildForm(entity: any) {
    this.entityForm = this.formBuilder.group({
        id: [entity ? entity.id : ''],
        nombre: [entity ? entity.nombre : '', Validators.required],
        nombreEncargado: [entity ? entity.nombreEncargado : '', Validators.required],
        cedula: [entity ? entity.cedula : '', Validators.required],
        ruc: [entity ? entity.ruc : ''],
        direccion: [entity ? entity.direccion : '', Validators.required],
        telefono: [entity ? entity.telefono : '', Validators.required],
        razonSocial:[entity ? entity.razonSocial : '', Validators.required],
        email: [entity ? entity.email : '', Validators.required],
        localidad: [entity ? entity.localidad.id : '', Validators.required],
        sector: [entity ? entity.localidad.sector : '', Validators.required]

    });
  }




  closeForm() {
    this.routerInstance.navigate(['../cliente/listar-cliente']);
    this.clienteService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

}


 


