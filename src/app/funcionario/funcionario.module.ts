import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { FuncionarioComponent } from './components/funcionario.component';
import { FuncionarioListComponent } from './components/funcionario-list.component';
import { FuncionarioFormComponent } from './components/funcionario-form.component';
import {  FuncionarioDetalleComponent } from './components/funcionario-detalle.component';






@NgModule({
  declarations: [
    FuncionarioComponent,
    FuncionarioListComponent,
    FuncionarioDetalleComponent,
    FuncionarioFormComponent,
   
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
export class FuncionarioModule { }