import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { LocalidadComponent } from './components/localidad.component';
import { LocalidadFormComponent } from './components/localidad-form.component';
import { LocalidadListComponent } from './components/localidad-list.component';










@NgModule({
  declarations: [
    LocalidadComponent,
    LocalidadFormComponent,
    LocalidadListComponent
   
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    
    
    
  ]
})
export class LocalidadModule { }