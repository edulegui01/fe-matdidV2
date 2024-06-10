import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { InventarioComponent } from './components/inventario.component';
import { InventarioListComponent } from './components/inventario-list.component';
import { MovimientoFormComponent } from './components/movimiento-from.component';
import { MovimientoListComponent } from './components/movimiento-list.component';
import { MovimientoDetalleComponent } from './components/movimiento-detalle.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';











@NgModule({
  declarations: [
    InventarioComponent,
    InventarioListComponent,
    MovimientoFormComponent,
    MovimientoListComponent,
    MovimientoDetalleComponent,

   
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    NgxMaskDirective,
    NgxMaskPipe,
    
    
    
  ]
})
export class InventarioModule { }