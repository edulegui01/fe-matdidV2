import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../services/funcionario.service';


@Component({
  selector: 'app-funcionario',
  templateUrl: '../templates/funcionario.component.html',
  styleUrls: ['../styles/funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {


  
  constructor(public funcionarioService:FuncionarioService) { }

  ngOnInit(): void {
  }


}
