import { Component, OnInit } from '@angular/core';
import { CobroService } from '../service/cobro.service';



@Component({
  selector: 'app-cobro',
  templateUrl: '../templates/cobro.component.html',
  styleUrls: ['../styles/cobro.component.scss']
})
export class CobroComponent implements OnInit {


  
  constructor(public cobroService:CobroService) { }

  ngOnInit(): void {
  }


}
