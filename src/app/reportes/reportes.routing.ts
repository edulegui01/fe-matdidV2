import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { GenerarReportesListComponent } from './components/generar-reportes.component';





export const routes: Routes = [
    { path: MENU_URLS.REPORTE.NUEVO.URL, component: GenerarReportesListComponent },
   
];