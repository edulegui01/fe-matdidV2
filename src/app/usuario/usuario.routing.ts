import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { UsuarioFormComponent } from './components/usuario-form.component';





export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.USUARIO.NUEVO.URL, pathMatch: 'full' },
    // { path: MENU_URLS.USUARIO.LISTAR.URL, component: USUARIOListComponent },
    { path: MENU_URLS.USUARIO.NUEVO.URL, component: UsuarioFormComponent },
    { path: MENU_URLS.USUARIO.EDITAR.URL, component: UsuarioFormComponent },
];