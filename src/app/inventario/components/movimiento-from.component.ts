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
import { DatePipe } from '@angular/common';
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-movimiento-form',
  templateUrl: '../templates/movimiento-form.component.html',
  styleUrls: ['../styles/movimiento-form.component.scss']
})
export class MovimientoFormComponent implements OnInit {

  entityForm!:FormGroup;
  entity:any=null;
  params:any=null;
  viewText = GlobalMessage.VIEW_LABELS;
  colsSize=2;
  listadoLocalidad!:any[];
  movimientoToSave!:any;
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

  disabledToggle=false

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

  listadoMotivo!:any[];




  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'iva', 'descuento', 'subTotal'];


  

  




  constructor(public inventarioService:InventarioService, private formBuilder:FormBuilder, router: Router, 
    private dialogInstance: MatDialog, private datePipe: DatePipe, private  snackbarInstance: MatSnackBar ) { 

    this.routerInstance = router;

    if (this.routerInstance.getCurrentNavigation()) {
        this.params = this.routerInstance?.getCurrentNavigation()?.extras.state
            ? this.routerInstance?.getCurrentNavigation()?.extras.state : null;

        if (this.params) {
            this.entity = this.params;
        }
    }

    
    

  }

  ngOnInit(): void {
    this.buildForm(this.entity);
    this.inventarioService.getMotivos().subscribe(motivos => this.listadoMotivo = motivos);


    
  }

  ngAfterViewInit(): void {
    this.searchProductoEvent();
  }


  buildForm(entity: any) {
    const nombreCompletoFuncionario = localStorage.getItem('nombreFuncionario') + ' '+ localStorage.getItem('apellidoFuncionario')  
    
    this.entityForm = this.formBuilder.group({
        idMovimiento: [entity ? entity.idMovimiento : ''],
        idMotivo:[entity ? entity.motivo.idMotivo:''],
        fecha: [entity ? entity.fecha : new Date()],
        funcionario: [nombreCompletoFuncionario],
        comentario: [entity ? entity.comentario : ''],
        detalleProducts: this.formBuilder.array([], [Validators.required])
    });
  }

  createFormGroupProducts(producto:any):FormGroup{
    return this.formBuilder.group({
      idProducto:[producto.idProducto],
      producto:[producto.nombre],
      cantidad:[1],
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
    const lengthOfArrayForm = this.getFormControls.controls.length;

    productoToPush = this.createFormGroupProducts(producto);


    /*if(this.getFormControls.controls){
      this.getFormControls.push(productoToPush);
      return;
    }*/

    if(this.getFormControls.controls.length === 0){
      this.getFormControls.push(productoToPush);
      console.log("entro solo una vez")
      return;
    }


    const exist = this.productExits(producto)

    console.log(exist)

    if(!exist){
      this.getFormControls.push(productoToPush);
    }

    
    
    this.Products = [];

    



   
    
   
  }


  productExits(producto:any){
    for (let step = 0; step < this.getFormControls.controls.length; step++){

      const idProductoIterado = this.getFormControls.at(step);

      if(idProductoIterado.value['idProducto'] === producto.idProducto){
        return true;
        
      }
    }

    return false;

  }


  get getFormControls() {
    const control = this.entityForm.get('detalleProducts') as FormArray;
    return control;
  }

 

  saveMovimiento(){
    
    let listProducts = this.entityForm.controls['detalleProducts'].value;

    let detalleMovimiento = listProducts.map((detalle:any) =>{
       delete detalle.producto
       return detalle;
    });
 
    
    /*const fechaCompra = this.datePipe.transform(this.entityForm.controls['fecha'].value,'YYYY-MM-dd');
    const fechaCompraVencimiento = this.datePipe.transform(this.entityForm.controls['fechaVencimiento'].value,'YYYY-MM-dd');*/

    this.movimientoToSave = {
      idFuncionario:localStorage.getItem('idFuncionario'),
      idMotivo:this.entityForm.controls['idMotivo'].value,
      fecha:this.entityForm.controls['fecha'].value,
      comentario:this.entityForm.controls['comentario'].value,
      detalleMovimientos:detalleMovimiento
    }

    console.log(this.movimientoToSave)

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
                this.inventarioService.saveMovimiento(this.movimientoToSave).subscribe({
                  next: (result:any) => {
                  
                    this.routerInstance.navigate(['../inventario/listar-inventario'])
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






  getErrorMessage(controlName: string) {
    const msg = this.entityForm.controls[controlName].hasError('required') ? 'EL CAMPO NO PUEDE ESTAR VACIO' : '';
    if (msg) {
        this.entityForm.controls[controlName].markAsTouched();
    }
    return msg;
  }



  closeForm() {
    this.routerInstance.navigate(['../cliente/listar-cliente']);
    this.inventarioService.editForm = false;
  }



  onResize() {
    this.colsSize = window.innerWidth <= 400 ? 1 : 2;
  }


  mostrarForm(){
    console.log({detalle:this.entityForm.controls['detalleProducts'].value})
  }






 

  

  searchProducts(text:string){
    this.inventarioService.searchProductsToSelect(text).pipe(
      ).subscribe((producto:any) => this.Products = producto);

  }


  removeEmployee(index:number) {
    const control =  this.entityForm.get('detalleProducts') as FormArray;
    control.removeAt(index);


  }



}


 


