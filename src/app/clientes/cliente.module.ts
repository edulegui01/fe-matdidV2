import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../components/navigation.module';
import { ClienteComponent } from './components/cliente.component';
import { ClienteListComponent } from './components/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form.component';
import { ClienteDetailsComponent } from './components/cliente-detalle.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from '../login/services/jwt-interceptor.service';





@NgModule({
  declarations: [
    ClienteComponent,
    ClienteListComponent,
    ClienteFormComponent,
    ClienteDetailsComponent
   
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
  ],
  providers:[
    
  ]
})
export class ClienteModule { }