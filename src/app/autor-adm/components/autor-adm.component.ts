import { Component, OnInit } from '@angular/core';
import { AutorAdmService } from '../services/autor-adm.service';


@Component({
  selector: 'app-autor-adm',
  templateUrl: '../templates/autor-adm.component.html',
  styleUrls: ['../styles/autor-adm.component.scss']
})
export class AutorAdmComponent implements OnInit {


  
  constructor(public autorAdmService:AutorAdmService) { }

  ngOnInit(): void {
   
  }


}