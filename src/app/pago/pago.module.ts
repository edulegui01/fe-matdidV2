import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { PagoFormComponent } from './components/pago-form.component';
import { PagoComponent } from './components/pago.component';
import { PagoListComponent } from './components/pago-list.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';






@NgModule({
  declarations: [
    PagoComponent,
    PagoFormComponent,
    PagoListComponent

   
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
export class PagoModule { }