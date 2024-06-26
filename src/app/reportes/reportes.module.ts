import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { GenerarReportesListComponent } from './components/generar-reportes.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';















@NgModule({
  declarations: [
    GenerarReportesListComponent
   
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    NgxExtendedPdfViewerModule
    
    
    
  ]
})
export class ReportesModule { }