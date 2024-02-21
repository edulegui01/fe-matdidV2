import { AfterViewInit, Component,ElementRef,OnInit, ViewChild, } from '@angular/core';
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
import { Observable, debounceTime, distinctUntilChanged, fromEvent, map, of, } from 'rxjs';
import { Producto2 } from 'src/app/class/producto2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-compra-form',
  templateUrl: '../templates/compra-form.component.html',
  styleUrls: ['../styles/compra-form.component.scss']
})
export class CompraFormComponent implements OnInit, AfterViewInit {

  entityForm!:FormGroup;
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
  dataSource:any=registerCompraInit.arrayInit;

  tiposFactura = GlobalMessage.TIPOS_FACTURA;
  initTipoFacturaSelect = 0;
  
  Products!:Producto2[];

  Proveedores!:any[];

  Funcionarios!:any[];


  productoIdSeleccionado!:number;

  currentValues:any={};
  detalleCompras:any=[];


  total:number=0;
  maxInputDescuento:number=0;


  @ViewChild('searchInputFuncionario')
  inputSearchFun?:ElementRef


  @ViewChild('searchInputProveedor')
  inputSearchProve?:ElementRef

  @ViewChild('searchInputProducto')
  inputSearchProduc?:ElementRef




  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'iva', 'descuento', 'subTotal'];


  

  




  constructor(public compraService:CompraService, private formBuilder:FormBuilder, router: Router, private dialogInstance: MatDialog, private datePipe: DatePipe, private _snackBar: MatSnackBar ) { 

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
  ngAfterViewInit(): void {
    this.searchFuncionarioEvent();
    this.searchProveedorEvent();
    this.searchProductoEvent();
  }

  ngOnInit(): void {

    
  }


  searchFuncionarioEvent(){
    fromEvent<any>(this.inputSearchFun?.nativeElement,'keyup')
    .pipe(
      map(event => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(filtro => {
      if(filtro==='' || filtro.length < 3){
        this.Funcionarios=[];
        return;
      }
      this.searchFuncionario(filtro)
    })
  }


  searchProveedorEvent(){
    fromEvent<any>(this.inputSearchProve?.nativeElement,'keyup')
    .pipe(
      map(event => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(filtro => {
      if(filtro==='' || filtro.length < 3){
        this.Proveedores=[];
        return;
      }
      this.searchProveedores(filtro)
    })
  }


  searchProductoEvent(){
    fromEvent<any>(this.inputSearchProduc?.nativeElement,'keyup')
    .pipe(
      map(event => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(filtro => {
      if(filtro==='' || filtro.length < 3){
        this.Products=[];
        return;
      }
      this.searchProducts(filtro)
    })
  }
  


  buildForm(entity: any) {
   
    let rucCedula='';

    if(entity){
      rucCedula = entity.ruc ? entity.ruc : entity.cedula;
    }

   
    
    this.entityForm = this.formBuilder.group({
        idCompra: [entity ? entity.idCompra : ''],
        tipoFactura:[entity ? entity.tipoFactura:'contado'],
        fecha: [entity ? entity.fecha : ''],
        fechaVencimiento: [entity ? entity.fechaVencimiento : ''],
        rucCedula: [entity ? rucCedula : ''],
        folio: [entity ? entity.numFolio : ''],
        timbrado: [entity ? entity.timbrado : ''],
        razonSocial: [entity ? entity.nombrePersona : ''],
        funcionario: [entity ? `${entity.nombreFuncionario + ' '+ entity.apellidoFuncionario}` : ''],
        detalleProducts: this.formBuilder.array([], [Validators.required])
    });


     
    entity?.detalleCompra.forEach((detalle:any) =>{
     
      let productoToPush:FormGroup;

      const productTransformet = {
        ...detalle,
        costo:detalle.precio
      }


      productoToPush = this.createFormGroupProducts(productTransformet);

      this.getFormControls.push(productoToPush);


    })

    if(entity){
      this.total = entity.montoTotal;

    }
    

  }

  createFormGroupProducts(producto:any):FormGroup{
   
    return this.formBuilder.group({
      idProducto:[producto.idProducto],
      producto:[producto.nombre],
      cantidad:[producto.cantidad ? producto.cantidad:1],
      precio:[producto.costo],
      iva:[producto.iva],
      descuento:[producto.descuento ? producto.descuento:0],
      subTotal:[producto.cantidad ? (producto.cantidad*producto.costo)-producto.descuento : producto.costo]
    })
  }


  selectioChange(producto:any,i:any){
    let productoToPush:FormGroup;

    
   
    productoToPush = this.createFormGroupProducts(producto);

    this.getFormControls.push(productoToPush);

    this.Products = [];

    this.updateTotal();

    



   
    
   
  }


  selectionChangeFuncionario(funcionario:any,index:any){

    this.currentValues = {...this.currentValues,idFuncionario:funcionario.idFuncionario}


  }

  selectioChangeCliente(cliente:any, index:any){
    
    let formItemRuc = this.entityForm.get('rucCedula')

    const rucOrCedula = cliente.ruc ? cliente.ruc : cliente.cedula;

    formItemRuc?.setValue(rucOrCedula);


    this.currentValues = {...this.currentValues,idPersona:cliente.idPersona};
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
    
   let listProducts = this.entityForm.controls['detalleProducts'].value;

   let detalleCompra = listProducts.map((detalle:any) =>{
      delete detalle.producto
      delete detalle.iva
      delete detalle.subTotal
      return detalle;
   });

   
   const fechaCompra = this.datePipe.transform(this.entityForm.controls['fecha'].value,'YYYY-MM-dd');
   const fechaCompraVencimiento = this.datePipe.transform(this.entityForm.controls['fechaVencimiento'].value,'YYYY-MM-dd');



    
    
    this.clienteToSave = {
      idFuncionario:this.currentValues.idFuncionario,
      idPersona:this.currentValues.idPersona,
      tipoFactura:this.entityForm.controls['tipoFactura'].value,
      fecha:fechaCompra,
      fechaVencimiento:fechaCompraVencimiento,
      montoTotal:this.total,
      numFolio:this.entityForm.controls['folio'].value,
      timbrado:this.entityForm.controls['timbrado'].value,
      detalleCompra:detalleCompra
    }



    console.log(this.clienteToSave)

    

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
              this.compraService.saveCompra(this.clienteToSave)
              this.closeForm();
              this._snackBar.open(this.viewText.SUCCESS_OPERATION,'ACEPTAR',{
                duration:3000
              })
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

  formatearNumero(number:number){
    return new Intl.NumberFormat("es-CL").format(number);
  }

  getErrorMessage(controlName: string) {
    const msg = this.entityForm.controls[controlName].hasError('required') ? 'EL CAMPO NO PUEDE ESTAR VACIO' : '';
    if (msg) {
        this.entityForm.controls[controlName].markAsTouched();
    }
    return msg;
  }

  closeForm() {
    this.routerInstance.navigate(['../compra/listar-compra']);
    this.compraService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }


  mostrarForm(){
    console.log({detalle:this.entityForm.controls['detalleProducts'].value})
  }


 

  

  searchProducts(text:string){
    
    this.compraService.searchProductsToSelect(text).pipe(
      ).subscribe((producto:any) => this.Products = producto);



    

  }

  searchProveedores(text:string){

    this.compraService.searchProveedorToSelect(text).pipe(
      ).subscribe((proveedor:any) => this.Proveedores = proveedor);

  }


  searchFuncionario(text:string){

    //const target = e.target as HTMLInputElement;

    this.compraService.searchFuncionarioToSelect(text).pipe(
    ).subscribe((funcionario:any) => this.Funcionarios = funcionario);

  }

  saveCompra(){

    console.log(this.entityForm);
  }

  removeEmployee(index:number) {
    const control =  this.entityForm.get('detalleProducts') as FormArray;
    control.removeAt(index);


    this.updateTotal();

  }



  onFechaSelection():number{


    switch (this.entityForm.controls['tipoFactura'].value){

      case 'contado':
        this.entityForm.controls['fechaVencimiento'].setValue(this.entityForm.controls['fecha'].value);
        break;

      case 'ceredito30':
        console.log((new Date().setDate(new Date('10/09/2024').getDate()+4)));
        this.entityForm.controls['fechaVencimiento'].setValue(new Date().setDate(new Date('10/09/2024').getDate()+4));

    }

    return 1;
  }






}


 


