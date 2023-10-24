import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: '../templates/cliente.component.html',
  styleUrls: ['../styles/cliente.component.scss']
})
export class ClienteComponent implements OnInit {


  
  constructor(public clienteService:ClientesService) { }

  ngOnInit(): void {
   console.log(this.clienteService.editForm);
  }


}
