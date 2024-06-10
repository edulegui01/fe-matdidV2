import { Component, OnInit } from '@angular/core';
import { PagoService } from '../services/pago.service';



@Component({
  selector: 'app-pago',
  templateUrl: '../templates/pago.component.html',
  styleUrls: ['../styles/pago.component.scss']
})
export class PagoComponent implements OnInit {


  
  constructor(public pagoService:PagoService) { }

  ngOnInit(): void {
  }


}
