import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { CompraFormComponent } from './components/compra-form.component';
import { CompraComponent } from './components/compra.component';
import { CompraListComponent } from './components/compra-list.component';
import { CompraDetalleComponent } from './components/compra-detalle.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';





@NgModule({
  declarations: [
    CompraComponent,
    CompraFormComponent,
    CompraListComponent,
    CompraDetalleComponent

   
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
export class CompraModule { }