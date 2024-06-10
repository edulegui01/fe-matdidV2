import { Routes } from "@angular/router";
import { MENU_URLS } from "../components/navbar/routes";
import { PagoFormComponent } from "./components/pago-form.component";
import { PagoListComponent } from "./components/pago-list.component";




export const routes: Routes = [
    { path: '', redirectTo: MENU_URLS.PAGO.NUEVO.URL, pathMatch: 'full' },
    { path: MENU_URLS.PAGO.NUEVO.URL, component: PagoFormComponent},
    { path: MENU_URLS.PAGO.LISTAR.URL, component: PagoListComponent}
]