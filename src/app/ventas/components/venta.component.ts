import { Component, OnInit } from '@angular/core';
import { VentaService } from '../services/venta.service';



@Component({
  selector: 'app-venta',
  templateUrl: '../templates/venta.component.html',
  styleUrls: ['../styles/venta.component.scss']
})
export class VentaComponent implements OnInit {


  
  constructor(public ventaService:VentaService) { }

  ngOnInit(): void {
  }


}
