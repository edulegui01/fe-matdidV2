import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { CicloComponent } from './components/ciclo.component';
import { CicloListComponent } from './components/ciclo-list.component';
import { CicloFormComponent } from './components/ciclo-form.component';











@NgModule({
  declarations: [
    CicloComponent,
    CicloListComponent,
    CicloFormComponent
   
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
export class CicloModule { }