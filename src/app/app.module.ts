import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationModule } from './components/navigation.module';
import { ClienteModule } from './clientes/cliente.module';
import { CustomDialogModule } from './components/custom-dialog/custom-dialog.module';
import { ProveedorModule } from './proveedores/proveedor.module';
import { ProductoModule } from './producto/producto.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { LocalidadModule } from './localidad/localidad.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { CompraModule } from './compra/compra.module';
import { VentaModule } from './ventas/venta.module';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import localePy from '@angular/common/locales/es-PY';
import { DatePipe, registerLocaleData } from '@angular/common';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
registerLocaleData(localePy);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NavigationModule,
    ClienteModule,
    CustomDialogModule,
    ProveedorModule,
    ProductoModule,
    FuncionarioModule,
    LocalidadModule,
    CompraModule,
    VentaModule
  ],
  providers: [{
    provide: MAT_DATE_LOCALE,
    useValue: 'es-PY'
  },DatePipe,
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
