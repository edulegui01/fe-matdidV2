import { Routes } from "@angular/router";
import { MENU_URLS } from "../components/navbar/routes";
import { CobroFormComponent } from "./components/cobro-form.component";
import { CobroListComponent } from "./components/cobro-list.component";




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.PAGO.NUEVO.URL, pathMatch: 'full' },
    { path: MENU_URLS.COBRO.LISTAR.URL, component: CobroListComponent},
    { path: MENU_URLS.COBRO.NUEVO.URL, component: CobroFormComponent},
  
]