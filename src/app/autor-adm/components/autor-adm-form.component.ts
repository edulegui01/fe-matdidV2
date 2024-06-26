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
import { AutorAdmService } from '../services/autor-adm.service';


@Component({
  selector: 'app-autor-adm-form',
  templateUrl: '../templates/autor-adm-form.component.html',
  styleUrls: ['../styles/autor-adm-form.component.scss']
})
export class AutorAdmFormComponent implements OnInit {

  entityForm!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  autor!:any;
  routerInstance:Router;  
  createDefaultMessage = 'EL REGISTRO';

  formData = new FormData();
  fileName = '';





  constructor(public autorAdmService:AutorAdmService, private formBuilder:FormBuilder, router: Router, 
    private dialogInstance: MatDialog, private snackbarInstance: MatSnackBar) { 

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
        idAutor: [entity ? entity.idAutor : ''],
        nombre: [entity ? entity.nombre : '', Validators.required],
        biografia: [entity ? entity.biografia : '', Validators.required],
        image: [entity ? entity.image : '']
        
        
        

    });
  }

  saveProducto(){
    this.autor = {
      nombre:this.entityForm.controls['nombre'].value,
      biografia:this.entityForm.controls['biografia'].value,
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
              

              this.autorAdmService.saveAutor(this.autor).subscribe(result => {
                if(result){
                  this.formData.append('idAutor',result.idAutor)
          
                  this.autorAdmService.uploadImage(this.formData).subscribe( result => {
                    this.routerInstance.navigate(['../autor-adm/listar-autor-adm']);
                  });
      
                  
          
                }
              });
          }
      });

   

  }


  updateLocalidad(){
    this.autor = {
      nombre:this.entityForm.controls['nombre'].value,
      biografia:this.entityForm.controls['biografia'].value,
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
      }).afterClosed().pipe().subscribe(result => {
        if(result){
          this.formData.append('idAutor',result.idProducto)
  
          this.autorAdmService.uploadImage(this.formData).subscribe( result => {
            this.routerInstance.navigate(['../producto/listar-producto']);
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

  onFileSelected(event:any) {
    

    const file:File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      this.formData.append("image", file);


        
    }
  }

  closeForm() {
    this.routerInstance.navigate(['../autor-adm/listar-autor-adm']);
    this.autorAdmService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

}


 


