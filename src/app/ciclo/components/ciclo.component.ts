import { Component, OnInit } from '@angular/core';
import { CicloService } from '../service/ciclo.service';



@Component({
  selector: 'app-ciclo',
  templateUrl: '../templates/ciclo.component.html',
  styleUrls: ['../styles/ciclo.component.scss']
})
export class CicloComponent implements OnInit {


  
  constructor(public cicloService:CicloService) { }

  ngOnInit(): void {
   
  }


}