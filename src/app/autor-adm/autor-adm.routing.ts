import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { AutorAdmFormComponent } from './components/autor-adm-form.component';
import { AutorAdmListComponent } from './components/autor-adm-list.component';




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.AUTORADM.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.AUTORADM.LISTAR.URL, component: AutorAdmListComponent },
    { path: MENU_URLS.AUTORADM.NUEVO.URL, component: AutorAdmFormComponent },
    { path: MENU_URLS.AUTORADM.EDITAR.URL, component: AutorAdmFormComponent },
  
];