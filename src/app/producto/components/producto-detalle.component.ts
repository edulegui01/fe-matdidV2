import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { Persona } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { ProductoService } from '../services/producto.service';


@Component({
  selector: 'app-producto-details',
  templateUrl: '../templates/producto-detalle.component.html',
  styleUrls: ['../styles/producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit, OnDestroy {

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
  urlBase = Settings.URL_BASE+'/producto/imagen?searchImagen='

  





  constructor(public productoService:ProductoService, private formBuilder:FormBuilder, router: Router, private dialogInstance: MatDialog )  { 

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
  ngOnDestroy(): void {
    this.productoService.detalleForm = false;
  }

  ngOnInit(): void {

    
  }

  buildForm(entity: any) {
    console.log(entity)
    
  }








  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

}


 


