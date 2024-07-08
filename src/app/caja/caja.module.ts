import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { CajaComponent } from './components/caja.component';

import { MovimientoCajaFormComponent } from './components/movimiento-caja-form.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CajaHistoricoComponent } from './components/caja-historico.component';
import { CajaActualComponent } from './components/caja-actual.component';












@NgModule({
  declarations: [
    CajaComponent,
    MovimientoCajaFormComponent,
    CajaHistoricoComponent,
    CajaActualComponent
   
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
export class CajaModule { }