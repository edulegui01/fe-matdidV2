import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';



@Component({
  selector: 'app-usuario',
  templateUrl: '../templates/usuario.component.html',
  styleUrls: ['../styles/usuario.component.scss']
})
export class UsuarioComponent implements OnInit {


  
  constructor(public usuarioService:UsuarioService) { }

  ngOnInit(): void {
   
  }


}