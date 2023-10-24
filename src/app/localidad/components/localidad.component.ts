import { Component, OnInit } from '@angular/core';
import { LocalidadService } from '../services/localidad.service';


@Component({
  selector: 'app-localidad',
  templateUrl: '../templates/localidad.component.html',
  styleUrls: ['../styles/localidad.component.scss']
})
export class LocalidadComponent implements OnInit {


  
  constructor(public localidadService:LocalidadService) { }

  ngOnInit(): void {
   
  }


}