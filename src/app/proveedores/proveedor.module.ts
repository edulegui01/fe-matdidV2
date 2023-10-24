import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { ProveedorFormComponent } from './components/proveedor-form.component';
import { ProveedorListComponent } from './components/proveedor-list.component';
import { ProveedorComponent } from './components/proveedor.component';






@NgModule({
  declarations: [
    ProveedorFormComponent,
    ProveedorListComponent,
    ProveedorComponent,
   
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
export class ProveedorModule { }