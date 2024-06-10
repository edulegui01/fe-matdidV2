import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { CajaComponent } from './components/caja.component';
import { CajaListComponent } from './components/caja-list.component';











@NgModule({
  declarations: [
    CajaComponent,
    CajaListComponent
   
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
export class CajaModule { }