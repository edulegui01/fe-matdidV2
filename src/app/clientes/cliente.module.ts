import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { ClienteComponent } from './components/cliente.component';
import { ClienteListComponent } from './components/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form.component';





@NgModule({
  declarations: [
    ClienteComponent,
    ClienteListComponent,
    ClienteFormComponent,
   
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
export class ClienteModule { }