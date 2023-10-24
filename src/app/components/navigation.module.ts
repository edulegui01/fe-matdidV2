import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { MenuNavigationComponent } from "./menu-navigation/menu-navigation.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { AppRoutingModule } from "../app-routing.module";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";





@NgModule({
    declarations: [
        NavbarComponent,
        MenuNavigationComponent,
        SidenavComponent,
        
        
    ],
    imports: [
        AppRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,

    ],
    exports: [
        NavbarComponent,
        MenuNavigationComponent,

    ],
    providers: [
        
    ],
   
})
export class NavigationModule{}

