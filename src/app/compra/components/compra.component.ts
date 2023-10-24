import { Component, OnInit } from '@angular/core';
import { CompraService } from '../services/compra.service';



@Component({
  selector: 'app-compra',
  templateUrl: '../templates/compra.component.html',
  styleUrls: ['../styles/compra.component.scss']
})
export class CompraComponent implements OnInit {


  
  constructor(public compraService:CompraService) { }

  ngOnInit(): void {
  }


}
