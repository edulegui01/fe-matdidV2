import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { AutorListComponent } from './components/autor-list.component';









@NgModule({
  declarations: [
    AutorListComponent
   
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    
  ],
  providers:[CurrencyPipe]
})
export class AutorModule { }