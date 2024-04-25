import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { Persona } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { FuncionarioService } from '../services/funcionario.service';

@Component({
  selector: 'app-funcionario-details',
  templateUrl: '../templates/funcionario-detalle.component.html',
  styleUrls: ['../styles/funcionario-detalle.component.scss']
})
export class FuncionarioDetalleComponent implements OnInit {

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





  constructor(public funcionarioService:FuncionarioService, private formBuilder:FormBuilder, router: Router, private dialogInstance: MatDialog,
    public dialogRef: MatDialogRef<FuncionarioDetalleComponent>,
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
        apellido: [entity ? entity.apellido : '', Validators.required],
        cedula: [entity ? entity.cedula : '', Validators.required],
        direccion: [entity ? entity.direccion : '', Validators.required],
        telefono: [entity ? entity.telefono : '', Validators.required],
        localidad: [entity ? entity.localidad.nombre : '', Validators.required],
        activo: [entity ? entity.activo : '', Validators.required],
        fechaNac: [entity ? entity.fechaNac : '', Validators.required],
        email: [entity ? entity.email : '', Validators.required],
        rol: [entity ? entity.rol : '', Validators.required],

    });
  }




  closeForm() {
    this.dialogRef.close();
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

}


 


