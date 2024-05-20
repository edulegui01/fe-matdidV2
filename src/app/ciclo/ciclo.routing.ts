import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { CicloListComponent } from './components/ciclo-list.component';
import { CicloFormComponent } from './components/ciclo-form.component';





export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.CICLO.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.CICLO.LISTAR.URL, component: CicloListComponent },
    { path: MENU_URLS.CICLO.NUEVO.URL, component: CicloFormComponent },
    { path: MENU_URLS.CICLO.EDITAR.URL, component: CicloFormComponent },
];