import { Component,ElementRef,OnInit, ViewChild, } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { Persona } from 'src/app/class/clienteToSave';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { registerCompraInit } from 'src/app/class/registerCompraInit';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, fromEvent, map, of, take, } from 'rxjs';
import { Producto2 } from 'src/app/class/producto2';
import { VentaService } from '../services/venta.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-venta-form',
  templateUrl: '../templates/venta-form.component.html',
  styleUrls: ['../styles/venta-form.component.scss']
})
export class VentaFormComponent implements OnInit {

  entityForm!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  listadoLocalidad!:any[];
  ventaToSave!:any;
  routerInstance:Router;
  clienteToUpdate:any;
 
  createDefaultMessage = 'EL REGISTRO';
  dataSource:any=registerCompraInit.arrayInit;
  currentValues:any={};
  
  Products$!:Observable<Producto2[]>;

  Clientes$!:Observable<any[]>;

  timbrado:any=0;

  numeracion$:BehaviorSubject<String> = new BehaviorSubject<String>('fasfsda')

  folio:number=0;

  numeracion!:string;

  Products!:Producto2[];

  Clientes!:any[];

  Funcionarios!:any[];


  productoIdSeleccionado!:number;


  total:number=0;
  maxInputDescuento:number=0;




  @ViewChild('searchInputFuncionario')
  inputSearchFun?:ElementRef


  @ViewChild('searchInputCliente')
  inputSearchProve?:ElementRef

  @ViewChild('searchInputProducto')
  inputSearchProduc?:ElementRef




  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'iva', 'descuento', 'subTotal'];


  

  




  constructor(public ventaService:VentaService, private formBuilder:FormBuilder, router: Router, 
    private dialogInstance: MatDialog, private datePipe: DatePipe, private  snackbarInstance: MatSnackBar ) { 

    this.routerInstance = router;

    if (this.routerInstance.getCurrentNavigation()) {
        this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

        if (this.params) {
            this.entity = this.params;
        }
    }

    this.ventaService.getTimbrado().subscribe(
      (timbrado:any) =>{
        this.timbrado = timbrado[0];
        this.entityForm.controls['timbrado'].setValue(timbrado[0].numero);
      }
    );

    
    

  }

  ngOnInit(): void {

    this.buildForm(this.entity);
    
  
    




    
  }

  ngAfterViewInit(): void {
    this.searchFuncionarioEvent();
    this.searchClienteEvent();
    this.searchProductoEvent();
  }


  buildForm(entity: any) {
    
    console.log('se ejecuta primero');
    
    this.entityForm = this.formBuilder.group({
        idCompra: [entity ? entity.idCompra : ''],
        tipoFactura:[entity ? entity.tipoFactura:'contado'],
        fecha: [new Date()],
        fechaVencimiento: [new Date()],
        rucCedula: [entity ? entity.rucCedula : ''],
        folio: [entity ? entity.folio : ''],
        timbrado: [entity ? entity.timbrado :  this.timbrado],
        razonSocial: [entity ? entity.razonSocial : ''],
        funcionario: [entity ? entity.funcionario : ''],
        detalleProducts: this.formBuilder.array([], [Validators.required])
    });
  }

  createFormGroupProducts(producto:any):FormGroup{
    return this.formBuilder.group({
      idProducto:[producto.idProducto],
      producto:[producto.nombre],
      cantidad:[1],
      precioOriginal:[producto.precio],
      precio:[producto.precio],
      iva:[producto.iva],
      descuento:[0],
      subTotal:[producto.precio]
    })
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


  searchClienteEvent(){
    fromEvent<any>(this.inputSearchProve?.nativeElement,'keyup')
    .pipe(
      map(event => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(filtro => {
      if(filtro==='' || filtro.length < 3){
        this.Clientes=[];
        return;
      }
      this.searchClientes(filtro)
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


  selectioChange(producto:any,i:any){
    let productoToPush:FormGroup;

    
   
    productoToPush = this.createFormGroupProducts(producto);

    this.getFormControls.push(productoToPush);
    
    // this.getFormControls.controls.forEach(item => {
    //   console.log(item.value['nombre'].setValue)
    // })

    this.Products = [];

   this.updateTotal();

    



   
    
   
  }


  get getFormControls() {
    const control = this.entityForm.get('detalleProducts') as FormArray;
    return control;
  }

  updateTotal(){
    
    this.total = 0;
    
    this.getFormControls.controls.forEach((element) => {
      console.log(element.value)
      this.total = this.total + element.value.subTotal;
    });



  }


  changeSubTotal(event:Event,index:number){
    const target = event.target as HTMLInputElement;
    let subTotal:number = 0;

    let subTotalParaCantidad =  parseInt(target.value.replace(/\D/g,''))*parseInt(this.getFormControls.controls[index].get('precio')?.value);
    let descuento = parseInt(this.getFormControls.controls[index].get('descuento')?.value);
    let subTotalParaDescuento = parseInt(this.getFormControls.controls[index].get('cantidad')?.value)*parseInt(this.getFormControls.controls[index].get('precio')?.value);
    let precioParaDescuento = parseInt(this.getFormControls.controls[index].get('precioOriginal')?.value);
    

    if(target.value && target.name == "cantidad"){
      subTotal = subTotalParaCantidad-descuento

      
      
     

    }
    
    
    if(target.name == "descuento" && target.value){
      // subTotal =subTotalParaDescuento-parseInt(target.value);
      // subTotal = subTotal<0 ? 0 :subTotal

      this.getFormControls.controls[index].get('precio')?.setValue(this.getFormControls.controls[index].get('precioOriginal')?.value -precioParaDescuento*parseFloat(target.value))
      subTotal = this.getFormControls.controls[index].get('precio')?.value*parseInt(this.getFormControls.controls[index].get('cantidad')?.value)



    }else if(target.name == "descuento" && !target.value){
      subTotal = subTotalParaDescuento;
    }
    


     this.getFormControls.controls[index].get('subTotal')?.setValue(subTotal);



    this.updateTotal();



  }

 

  saveFactura(){
    
    let listProducts = this.entityForm.controls['detalleProducts'].value;
    let listado:any[] = [];
    

    listProducts.forEach((detalle:any) =>{
      //  delete detalle.producto
      //  delete detalle.iva
      //  delete detalle.subTotal
      //  return detalle;
      

      listado.push({
        idProducto:detalle.idProducto,
        cantidad:detalle.cantidad,
        precio:detalle.precio,
        descuento:parseFloat(detalle.descuento)

      })
    });
 
    
    const fechaCompra = this.datePipe.transform(this.entityForm.controls['fecha'].value,'YYYY-MM-ddTHH:mm:SS.sss');
    const fechaCompraVencimiento = this.datePipe.transform(this.entityForm.controls['fechaVencimiento'].value,'YYYY-MM-ddTHH:mm:SS.sss');

    console.log(this.entityForm.controls['fecha'].value)

    this.ventaToSave = {
      idFuncionario:this.currentValues.idFuncionario,
      idPersona:this.currentValues.idPersona,
      idTimbrado:this.timbrado.idTimbrado,
      idFolio: 1,
      tipoFactura:this.entityForm.controls['tipoFactura'].value,
      fecha:fechaCompra,
      fechaVencimiento:fechaCompraVencimiento,
      montoTotal:this.total,
      saldo: this.total,
      numFactura:'',
      detalleFacturas:listado
    }

    console.log(this.ventaToSave)

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
                this.ventaService.saveFactura(this.ventaToSave).subscribe({
                  next:(result:any) => {
                    this.routerInstance.navigate(['../venta/listar-venta'])
                    this.ventaService.editForm = false;
                    this.snackbarInstance.open(this.viewText.SUCCESS_OPERATION,'ACEPTAR',{
                      duration:3000
                    })
                  },
                  error: (err) => {
                    
                    this.snackbarInstance.open(err.error.message,'ACEPTAR',{
                      duration:4000
                    })
                  }
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
            this.ventaService.updateCliente(this.entity.idPersona,this.clienteToUpdate).subscribe(result => {
              this.routerInstance.navigate(['../cliente/listar-cliente']);
              this.ventaService.editForm = false;
            });
          }
      });

    

  }

  formatFolioToSend(){

    let indexOfLastCero,folio;

    indexOfLastCero = this.entityForm.controls['folio'].value.lastIndexOf("0");

    folio = this.entityForm.controls['folio'].value.substr(indexOfLastCero);

    return folio;
    

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

  buildTimbrado(){
    this.ventaService.getTimbrado().subscribe(
      (timbrado:any) =>{
        this.timbrado = timbrado[0].numero;
        console.log(this.timbrado);
      }
    );
  }

  closeForm() {
    this.routerInstance.navigate(['../cliente/listar-cliente']);
    this.ventaService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }


  mostrarForm(){
    console.log({detalle:this.entityForm.controls['detalleProducts'].value})
  }

  searchFuncionario(text:string){

    //const target = e.target as HTMLInputElement;

    this.ventaService.searchFuncionarioToSelect(text).pipe(
    ).subscribe((funcionario:any) => this.Funcionarios = funcionario);

  }

  searchProveedores(text:string){

    this.ventaService.searchClienteToSelect(text).pipe(
      ).subscribe((cliente:any) => this.Clientes = cliente);

  }


 

  

  searchProducts(text:string){
    


    
    
    this.ventaService.searchProductsToSelect(text).pipe(
      ).subscribe((producto:any) => this.Products = producto);



    

  }

  searchClientes(text:string){
    this.ventaService.searchClienteToSelect(text).pipe(
      ).subscribe((cliente:any) => this.Clientes = cliente);

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




  onFechaSelection(value:any=null):number{
    let valueToSwitch:any;

    
    if(value){
      console.log(value);
      valueToSwitch = value;
    }else{
      console.log(value);
      valueToSwitch = this.entityForm.controls['tipoFactura'].value;
    }



    switch (valueToSwitch){

      case 'contado':
        console.log(valueToSwitch) 
        this.entityForm.controls['fechaVencimiento'].setValue(this.entityForm.controls['fecha'].value);
        break;

      case 'creditoTreinta':
        console.log(valueToSwitch) 
        this.sumFecha(new Date(this.entityForm.controls['fecha'].value),30);
        
        break;

      case 'creditoSesenta':
        console.log(valueToSwitch) 
        this.sumFecha(new Date(this.entityForm.controls['fecha'].value),60);
        break;
      
      case 'creditoNoventa':
        console.log(valueToSwitch) 
        this.sumFecha(new Date(this.entityForm.controls['fecha'].value),90);
        break;
      
      case 'creditoCientoVeinte':
        console.log(valueToSwitch)  
        this.sumFecha(new Date(this.entityForm.controls['fecha'].value),120);
        break;

    }

    return 1;
  }


  sumFecha(fecha:any,cantidad:number){
    fecha.setDate(fecha.getDate() + cantidad);

    this.entityForm.controls['fechaVencimiento'].setValue(fecha);
  }




  saveCompra(){

    console.log(this.entityForm);
  }

  removeEmployee(index:number) {
    const control =  this.entityForm.get('detalleProducts') as FormArray;
    control.removeAt(index);

    this.updateTotal();

  }



}


 


