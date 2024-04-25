import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { Persona } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { ProveedorService } from '../services/proveedor.service';

@Component({
  selector: 'app-proveedor-detalle',
  templateUrl: '../templates/proveedor-detalle.component.html',
  styleUrls: ['../styles/proveedor-detalle.component.scss']
})
export class ProveedorDetalleComponent implements OnInit {

  entityForm!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  listadoLocalidad!:any[];
  clienteToSave!:Persona;
  routerInstance:Router;
  clienteToUpdate:any;
  snackbarInstance!: MatSnackBar;
  createDefaultMessage = 'EL REGISTRO';





  constructor(public proveedorServicec:ProveedorService, private formBuilder:FormBuilder, router: Router, private dialogInstance: MatDialog,
    public dialogRef: MatDialogRef<ProveedorDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any )  { 

    this.routerInstance = router;

    if (this.routerInstance.getCurrentNavigation()) {
        this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

        if (this.params) {
            this.entity = this.params;
        }
    }


    this.buildForm(this.data.element);

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
        localidad: [entity ? entity.localidad.nombre : '', Validators.required],
        sector: [entity ? entity.sector : '', Validators.required]

    });
  }




  closeForm() {
    this.dialogRef.close();
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

}


 


