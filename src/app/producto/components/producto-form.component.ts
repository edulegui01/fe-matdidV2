import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { Persona } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { ProductoService } from '../services/producto.service';
import { Producto } from 'src/app/class/producto';
import { CurrencyPipe } from '@angular/common';

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
  createDefaultMessage = 'EL REGISTRO';
  fileName = '';
  formData = new FormData();
  cicloList!:any
  categoriaList!:any
  materiaList!:any
  editorialList!:any





  constructor(public productoService:ProductoService, private formBuilder:FormBuilder, 
    router: Router,  private  snackbarInstance: MatSnackBar,  private dialogInstance: MatDialog,
    private currencyPipe:CurrencyPipe) { 

    this.routerInstance = router;

    if (this.routerInstance.getCurrentNavigation()) {
        this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

        if (this.params) {
            this.entity = this.params;
            this.fileName = this.entity.image ? this.getImageName() : '';
            this.readOnlyDetalle = this.params.readOndly;
        }


    }

    

    this.buildForm(this.entity);

  }

  ngOnInit(): void {
    this.productoService.listarSelectCiclo().subscribe((cicloList:any) => this.cicloList = cicloList)
    //this.productoService.listarSelectCategoria().subscribe((categoriaList:any) => this.categoriaList = categoriaList)
    this.productoService.listarSelectMateria().subscribe((materiaList:any) => this.materiaList = materiaList)
    this.productoService.listarSelectEditorial().subscribe((editorialList:any) => this.editorialList = editorialList)

    this.entityForm.valueChanges.subscribe( form =>{
      if(form.precio){
        this.entityForm.patchValue({
          precio: this.currencyPipe.transform(form.precio.replace(/\D/g,'').replace(/^0+/,''),'','','1.0-1','es-PY')
        },{emitEvent:false})
      }
      if(form.costo){
        this.entityForm.patchValue({
          costo: this.currencyPipe.transform(form.costo.replace(/\D/g,'').replace(/^0+/,''),'','','1.0-1','es-PY')
        },{emitEvent:false})
      }
    });
    
  }

  buildForm(entity: any) {
    this.entityForm = this.formBuilder.group({
        idProducto: [entity ? entity.idProducto : ''],
        nombre: [entity ? entity.nombre : '', Validators.required],
        descripcion: [entity ? entity.descripcion : '', Validators.required],
        autor: [entity ? entity.autor : '', Validators.required],
        editorial: [entity ? entity.editorial?.idEditorial : '', Validators.required],
        isbn: [entity ? entity.isbn : '', Validators.required],
        materia: [entity ? entity.materia?.idMateria : '', Validators.required],
        ciclo: [entity ? entity.ciclo?.idCiclo : '', Validators.required],
        costo: [entity ? entity.costo : '', Validators.required],
        precio: [entity ? entity.precio : '', Validators.required],
        iva: [entity ? entity.iva : '', Validators.required],
        categoria: [entity ? entity.categoria?.idCategoria : '', Validators.required],
       
        
        
        

    });



  }

  getImageName(){
    
    
    
    let imageName = this.entity.image.slice(this.entity.image.indexOf("=")+1);

    return imageName;

  }

  saveProducto(){
    
    const costo = parseInt(this.entityForm.controls['costo'].value.replace('.',''));
    const precio = parseInt(this.entityForm.controls['precio'].value.replace('.',''));
    
    this.productoToSave = {
      nombre:this.entityForm.controls['nombre'].value,
      descripcion:this.entityForm.controls['descripcion'].value,
      autor:this.entityForm.controls['autor'].value,
      idEditorial:this.entityForm.controls['editorial'].value,
      isbn:this.entityForm.controls['isbn'].value,
      idMateria:this.entityForm.controls['materia'].value,
      idCiclo:this.entityForm.controls['ciclo'].value,
      idCategoria:this.entityForm.controls['categoria'].value,
      costo:costo,
      precio:precio,
      iva:this.entityForm.controls['iva'].value,
    }

    console.log(this.productoToSave)


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

    if(!this.fileName){
      this.snackbarInstance.open(this.viewText.SELECT_IMAGE
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
      
          if(result){
            this.formData.append('idProducto',result.idProducto)
    
            this.productoService.uploadImage(this.formData).subscribe( result => {
              this.routerInstance.navigate(['../producto/listar-producto']);
            });

            
    
          }
    
        })
          

          this.snackbarInstance.open(this.viewText.SUCCESS_OPERATION,'ACEPTAR',{
            duration:3000
          })
      }
      }
  );

 

   

  }


  updateProducto(){
    this.productoToUpdate = {
      idProducto:this.entityForm.controls['idProducto'].value,
      nombre:this.entityForm.controls['nombre'].value,
      descripcion:this.entityForm.controls['descripcion'].value,
      autor:this.entityForm.controls['autor'].value,
      editorial:this.entityForm.controls['editorial'].value,
      isbn:this.entityForm.controls['isbn'].value,
      materia:this.entityForm.controls['materia'].value,
      gradoCurso:this.entityForm.controls['gradoCurso'].value,
      costo:this.convertirStringAnumerico(this.entityForm.controls['costo'].value),
      precio:this.convertirStringAnumerico(this.entityForm.controls['precio'].value),
      iva:this.entityForm.controls['iva'].value,
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

    if(!this.fileName){
      this.snackbarInstance.open(this.viewText.SELECT_IMAGE
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
        this.productoService.updateProducto(this.entity.idProducto,this.productoToUpdate).subscribe(result => {
      
          if(result && this.formData.get('image')){
            this.formData.append('idProducto',this.entity.idProducto)
            this.productoService.uploadImage(this.formData).subscribe(result => {
              this.routerInstance.navigate(['../producto/listar-producto']);
            });
    
            
            

            
    
          }else[
            this.routerInstance.navigate(['../producto/listar-producto'])
          ]
    
        })
        
       
          
          
        this.productoService.editForm = false;
        this.snackbarInstance.open(this.viewText.SUCCESS_OPERATION,'ACEPTAR',{
          duration:3000
        })

          
      }
      }
  );


    

  }

  getErrorMessage(controlName: string) {
    const msg = this.entityForm.controls[controlName].hasError('required') ? 'EL CAMPO NO PUEDE ESTAR VACIO' : '';
    if (msg) {
        this.entityForm.controls[controlName].markAsTouched();
    }
    return msg;
  }

  convertirStringAnumerico(numeroFormateado:string){

    return parseInt(numeroFormateado.replace('.',''))

  }

  onCicloSelect(element:any){
    this.productoService.listarSelectCategoria().subscribe((categoriaList:any) => this.categoriaList = categoriaList)
  }

  closeForm() {
    this.routerInstance.navigate(['../producto/listar-producto']);
    this.productoService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }

  onFileSelected(event:any) {
    

    const file:File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      this.formData.append("image", file);


        
    }
  }

  validateFormat(event:any) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
    }

}


 


