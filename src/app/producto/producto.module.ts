import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { ProductoFormComponent } from './components/producto-form.component';
import { ProductoListComponent } from './components/producto-list.component';
import { ProductoComponent } from './components/producto.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductoListCardComponent } from './components/producto-list-card.component';







@NgModule({
  declarations: [
    ProductoFormComponent,
    ProductoListComponent,
    ProductoComponent,
    ProductoListCardComponent
   
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
export class ProductoModule { }