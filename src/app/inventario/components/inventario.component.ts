import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/inventario.service';



@Component({
  selector: 'app-inventario',
  templateUrl: '../templates/inventario.component.html',
  styleUrls: ['../styles/inventario.component.scss']
})
export class InventarioComponent implements OnInit {


  
  constructor(public inventarioService:InventarioService) { }

  ngOnInit(): void {
   
  }


}