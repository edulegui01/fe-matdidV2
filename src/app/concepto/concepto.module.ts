import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { ConceptoComponent } from './components/concepto.component';
import { ConceptoListComponent } from './components/concepto-list.component';
import { ConceptoFormComponent } from './components/concepto-form.component';









@NgModule({
  declarations: [
    ConceptoComponent,
    ConceptoListComponent,
    ConceptoFormComponent
   
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
export class ConceptoModule { }