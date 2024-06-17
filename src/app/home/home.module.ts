import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { HomeComponent } from './components/home.component';
import { ChartModule } from 'angular-highcharts';











@NgModule({
  declarations: [
    HomeComponent

   
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ChartModule 
    
    
    
  ]
})
export class HomeModule { }