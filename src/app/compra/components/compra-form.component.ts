import { Component,OnInit, } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { ClienteToSave } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { CompraService } from '../services/compra.service';
import { registerCompraInit } from 'src/app/class/registerCompraInit';
import { Observable, debounceTime, distinctUntilChanged, map, of, } from 'rxjs';
import { Producto2 } from 'src/app/class/producto2';

@Component({
  selector: 'app-compra-form',
  templateUrl: '../templates/compra-form.component.html',
  styleUrls: ['../styles/compra-form.component.scss']
})
export class CompraFormComponent implements OnInit {

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
  dataSource:any=registerCompraInit.arrayInit;
  
  Products$!:Observable<Producto2[]>;

  Clientes$!:Observable<any[]>;


  productoIdSeleccionado!:number;


  total:number=0;
  maxInputDescuento:number=0;




  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'iva', 'descuento', 'subTotal'];


  

  




  constructor(public compraService:CompraService, private formBuilder:FormBuilder, router: Router, private dialogInstance: MatDialog ) { 

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
        idCompra: [entity ? entity.idCompra : ''],
        fecha: [entity ? entity.fecha : ''],
        rucCedula: [entity ? entity.rucCedula : ''],
        folio: [entity ? entity.folio : ''],
        timbrado: [entity ? entity.timbrado : ''],
        razonSocial: [entity ? entity.razonSocial : ''],
        funcionario: [entity ? entity.funcionario : ''],
        detalleProducts: this.formBuilder.array([], [Validators.required])
    });
  }

  createFormGroupProducts(producto:any):FormGroup{
    return this.formBuilder.group({
      idProducto:[{value:producto.idProducto,disabled:true}],
      producto:[producto.nombre],
      cantidad:[1],
      precio:[producto.precio],
      iva:[producto.iva],
      descuento:[0],
      subTotal:[producto.precio]
    })
  }


  selectioChange(producto:any,i:any){
    let productoToPush:FormGroup;

    
   
    productoToPush = this.createFormGroupProducts(producto);

    this.getFormControls.push(productoToPush);

    this.Products$ = of([]);

   this.updateTotal();

    



   
    
   
  }

  selectioChangeCliente(cliente:any, index:any){
    let formItemRuc = this.entityForm.get('rucCedula')

    const rucOrCedula = cliente.ruc ? cliente.ruc : cliente.cedula;

    formItemRuc?.setValue(rucOrCedula);
  }


  get getFormControls() {
    const control = this.entityForm.get('detalleProducts') as FormArray;
    return control;
  }

  updateTotal(){
    
    this.total = 0;
    this.getFormControls.controls.forEach((element) => {
      this.total = this.total + element.value.subTotal;
    });


    console.log(this.total)
  }


  changeSubTotal(event:Event,index:number){
    const target = event.target as HTMLInputElement;
    let subTotal:number = 0;

    let subTotalParaCantidad =  parseInt(target.value)*parseInt(this.getFormControls.controls[index].get('precio')?.value);
    let descuento = parseInt(this.getFormControls.controls[index].get('descuento')?.value);
    let subTotalParaDescuento = parseInt(this.getFormControls.controls[index].get('cantidad')?.value)*parseInt(this.getFormControls.controls[index].get('precio')?.value);

    
    
    if(target.value && target.name == "cantidad"){
      subTotal = subTotalParaCantidad-descuento
      console.log(subTotal);
     

    }
    
    
    if(target.name == "descuento" && target.value){
      subTotal =subTotalParaDescuento-parseInt(target.value);
      subTotal = subTotal<0 ? 0 :subTotal

    }else if(target.name == "descuento" && !target.value){
      subTotal = subTotalParaDescuento;
    }
    


     this.getFormControls.controls[index].get('subTotal')?.setValue(subTotal);



    this.updateTotal();



  }

 

  saveCliente(){
    

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
              

              this.compraService.saveClientes(this.clienteToSave).subscribe((result:any) => {
                this.routerInstance.navigate(['../cliente/listar-cliente'])
              });
          }
      });

   

  }


  updateCliente(){
    this.clienteToUpdate = {
      cedula:this.entityForm.controls['cedula'].value,
      esCliente:true,
      localidad:{
        id:this.entityForm.controls['localidad'].value
      },
      direccion:this.entityForm.controls['direccion'].value,
      email:this.entityForm.controls['email'].value,
      nombre:this.entityForm.controls['nombre'].value,
      ruc:this.entityForm.controls['ruc'].value,
      telefono:this.entityForm.controls['telefono'].value
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
            this.compraService.updateCliente(this.entity.idPersona,this.clienteToUpdate).subscribe(result => {
              this.routerInstance.navigate(['../cliente/listar-cliente']);
              this.compraService.editForm = false;
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
    this.routerInstance.navigate(['../cliente/listar-cliente']);
    this.compraService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }


  mostrarForm(){
    console.log({detalle:this.entityForm.controls['detalleProducts'].value})
  }


 

  

  searchProducts(e:Event){
    
    const target = e.target as HTMLInputElement;

    
    
    this.Products$ = this.compraService.searchProductsToSelect(target.value);



    

  }

  searchClientes(e:Event){

    const target = e.target as HTMLInputElement;

    this.Clientes$ = this.compraService.searchClienteToSelect(target.value);

  }

  saveCompra(){

    console.log(this.entityForm);
  }

  removeEmployee(index:number) {
    const control =  this.entityForm.get('detalleProducts') as FormArray;
    console.log(3213);
    control.removeAt(index);


    console.log(3213);
    this.updateTotal();

  }



}


 


