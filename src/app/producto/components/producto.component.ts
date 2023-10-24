import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: '../templates/producto.component.html',
  styleUrls: ['../styles/producto.component.scss']
})
export class ProductoComponent implements OnInit {


  
  constructor(public productoService:ProductoService) { }

  ngOnInit(): void {
   
  }


}