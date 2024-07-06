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
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: '../templates/usuario-form.component.html',
  styleUrls: ['../styles/usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  entityForm!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  usuario!:any;
  routerInstance:Router;
  createDefaultMessage = 'EL REGISTRO';

  funcionarioList:any;

  roleList = [
    'ADMIN',
    'CAJERO',
    'VENDEDOR'
  ]





  constructor(public usuarioService:UsuarioService, private formBuilder:FormBuilder, router: Router, 
    private dialogInstance: MatDialog, private  snackbarInstance: MatSnackBar, ) { 

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
    this.usuarioService.listarFuncionario().subscribe(result => {
      this.funcionarioList = result;
    })
    
  }

  buildForm(entity: any) {
    this.entityForm = this.formBuilder.group({
        id: [entity ? entity.id : ''],
        username: [entity ? entity.username : '', Validators.required],
        password: [entity ? entity.password : '', Validators.required],
        idFuncionario:[entity ? entity.idFuncionario : '', Validators.required],
        role:[entity ? entity.role : '', Validators.required],

        
        

    });
  }

  saveProducto(){
    this.usuario = {
      username:this.entityForm.controls['username'].value,
      password:this.entityForm.controls['password'].value,
      funcionario:{
        idFuncionario:this.entityForm.controls['idFuncionario'].value 
      },
      role:this.entityForm.controls['role'].value,
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
              

              this.usuarioService.saveUsuario(this.usuario).subscribe(result => {
                this.snackbarInstance.open(this.viewText.SUCCESS_OPERATION,'ACEPTAR',{
                  duration:3000
                })
                this.entityForm.reset();
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
    this.entityForm.reset();
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

}


 


