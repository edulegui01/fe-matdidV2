import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { ClienteToSave } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { ProductoService } from '../services/producto.service';
import { Producto } from 'src/app/class/producto';

@Component({
  selector: 'app-producto-form',
  templateUrl: '../templates/producto-form.component.html',
  styleUrls: ['../styles/producto-form.component.scss']
})
export class ProductoFormComponent implements OnInit {

  entityForm!:FormGroup;
  entity:any=null;
  params:any=null;
  readOnlyDetalle=false;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  productoToSave!:any;
  routerInstance:Router;
  productoToUpdate:any;
  snackbarInstance!: MatSnackBar;
  createDefaultMessage = 'EL REGISTRO';





  constructor(public productoService:ProductoService, private formBuilder:FormBuilder, router: Router,
     private dialogInstance: MatDialog, 
     public dialogRef: MatDialogRef<ProductoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { 

    this.routerInstance = router;

    if (this.routerInstance.getCurrentNavigation()) {
        this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

        if (this.params) {
            this.entity = this.params;
            this.readOnlyDetalle = this.params.readOndly;
        }

        if (this.data){
          console.log(data)

        }

    }

    

    this.buildForm(this.entity);

  }

  ngOnInit(): void {

    
  }

  buildForm(entity: any) {
    this.entityForm = this.formBuilder.group({
        id: [entity ? entity.id : ''],
        nombre: [entity ? entity.nombre : '', Validators.required],
        descripcion: [entity ? entity.descripcion : '', Validators.required],
        autor: [entity ? entity.autor : '', Validators.required],
        editorial: [entity ? entity.editorial : ''],
        isbn: [entity ? entity.isbn : '', Validators.required],
        materia: [entity ? entity.materia : '', Validators.required],
        gradoCurso: [entity ? entity.gradoCurso : '', Validators.required],
        costo: [entity ? entity.costo : '', Validators.required],
        precio: [entity ? entity.precio : '', Validators.required],
        iva: [entity ? entity.iva : '', Validators.required],
        
        
        

    });



  }

  saveProducto(){
    this.productoToSave = {
      idProducto:this.entityForm.controls['id'].value,
      nombre:this.entityForm.controls['nombre'].value,
      descripcion:this.entityForm.controls['descripcion'].value,
      autor:this.entityForm.controls['autor'].value,
      editorial:this.entityForm.controls['editorial'].value,
      isbn:this.entityForm.controls['isbn'].value,
      materia:this.entityForm.controls['materia'].value,
      gradoCurso:this.entityForm.controls['gradoCurso'].value,
      costo:this.entityForm.controls['costo'].value,
      precio:this.entityForm.controls['precio'].value,
      iva:this.entityForm.controls['iva'].value
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
              

              this.productoService.saveProducto(this.productoToSave).subscribe(result => {
                this.routerInstance.navigate(['../producto/listar-producto'])
              });
          }
      });

   

  }


  updateProducto(){
    this.productoToUpdate = {
      nombre:this.entityForm.controls['nombre'].value,
      precioCosto:this.entityForm.controls['precioCosto'].value,
      precioVenta:this.entityForm.controls['precioVenta'].value,
      iva:this.entityForm.controls['iva'].value,
      cantidadMinima:this.entityForm.controls['cantidadMinima'].value,
      cantidad:this.entityForm.controls['cantidad'].value
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
            this.productoService.updateProducto(this.entity.idProducto,this.productoToUpdate).subscribe(result => {
              this.routerInstance.navigate(['../producto/listar-producto']);
              this.productoService.editForm = false;
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
    this.routerInstance.navigate(['../producto/listar-producto']);
    this.productoService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

}


 


