import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { UsuarioFormComponent } from './components/usuario-form.component';
import { UsuarioComponent } from './components/usuario.component';











@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormComponent
   
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
export class UsuarioModule { }