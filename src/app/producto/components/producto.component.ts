import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { GlobalMessage } from 'src/app/class/global-message';

@Component({
  selector: 'app-producto',
  templateUrl: '../templates/producto.component.html',
  styleUrls: ['../styles/producto.component.scss']
})
export class ProductoComponent implements OnInit {


  
  constructor(public productoService:ProductoService) { }
  esAdmin:string|null = localStorage.getItem('role');
  admin = GlobalMessage.administrador;

  ngOnInit(): void {
   
  }

  linkActivateChange(){
    this.productoService.editForm = false;
    this.productoService.detalleForm =false;
  }


}