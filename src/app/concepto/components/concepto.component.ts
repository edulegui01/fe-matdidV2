import { Component, OnInit } from '@angular/core';
import { ConceptoService } from '../services/concepto.service';


@Component({
  selector: 'app-concepto',
  templateUrl: '../templates/concepto.component.html',
  styleUrls: ['../styles/concepto.component.scss']
})
export class ConceptoComponent implements OnInit {


  
  constructor(public conceptoService:ConceptoService) { }

  ngOnInit(): void {
   
  }


}