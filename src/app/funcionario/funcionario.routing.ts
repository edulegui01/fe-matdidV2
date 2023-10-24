import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { FuncionarioListComponent } from './components/funcionario-list.component';
import { FuncionarioFormComponent } from './components/funcionario-form.component';




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.FUNCIONARIO.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.FUNCIONARIO.LISTAR.URL, component: FuncionarioListComponent },
    { path: MENU_URLS.FUNCIONARIO.NUEVO.URL, component: FuncionarioFormComponent },
    { path: MENU_URLS.FUNCIONARIO.EDITAR.URL, component: FuncionarioFormComponent },
];