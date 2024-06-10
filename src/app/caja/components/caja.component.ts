import { Component, OnInit } from '@angular/core';
import { CajaService } from '../service/caja.service';



@Component({
  selector: 'app-caja',
  templateUrl: '../templates/caja.component.html',
  styleUrls: ['../styles/caja.component.scss']
})
export class CajaComponent implements OnInit {


  
  constructor(public cajaService:CajaService) { }

  ngOnInit(): void {
   
  }


}