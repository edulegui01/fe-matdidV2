import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../services/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: '../templates/proveedor.component.html',
  styleUrls: ['../styles/proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {


  
  constructor(public proveedorService:ProveedorService) { }

  ngOnInit(): void {
   console.log(this.proveedorService.editForm);
  }


}
