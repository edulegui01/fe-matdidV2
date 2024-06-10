import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { CobroFormComponent } from './components/cobro-form.component';
import { CobroComponent } from './components/cobro.component';
import { CobroListComponent } from './components/cobro-list.component';






@NgModule({
  declarations: [
    CobroFormComponent,
    CobroComponent,
    CobroListComponent

   
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
export class CobroModule { }