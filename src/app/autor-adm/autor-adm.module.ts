import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { AutorAdmComponent } from './components/autor-adm.component';
import { AutorAdmListComponent } from './components/autor-adm-list.component';
import { AutorAdmFormComponent } from './components/autor-adm-form.component';











@NgModule({
  declarations: [
    AutorAdmComponent,
    AutorAdmListComponent,
    AutorAdmFormComponent
   
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
export class AutorAdmModule { }