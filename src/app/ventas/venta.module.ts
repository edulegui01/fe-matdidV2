import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { VentaFormComponent } from './components/venta-form.component';
import { VentaComponent } from './components/venta.component';
import { VentaListComponent } from './components/venta-list.component';
import { VentaDetalleComponent } from './components/venta-detalle.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';





@NgModule({
  declarations: [
    VentaComponent,
    VentaFormComponent,
    VentaListComponent,
    VentaDetalleComponent

   
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
export class VentaModule { }