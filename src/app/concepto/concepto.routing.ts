import { Routes } from '@angular/router';
import { MENU_URLS } from '../components/navbar/routes';
import { ConceptoListComponent} from './components/concepto-list.component';
import { ConceptoFormComponent } from './components/concepto-form.component';




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.CONCEPTO.LISTAR.URL, pathMatch: 'full' },
    { path: MENU_URLS.CONCEPTO.LISTAR.URL, component: ConceptoListComponent },
    { path: MENU_URLS.CONCEPTO.NUEVO.URL, component: ConceptoFormComponent },
    { path: MENU_URLS.CONCEPTO.EDITAR.URL, component: ConceptoFormComponent },
];