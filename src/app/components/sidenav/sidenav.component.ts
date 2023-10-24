import { Component, Input, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuNavigationComponent } from '../menu-navigation/menu-navigation.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  mobileQuery!: MediaQueryList;
  @Input() menuList: Array<any> = [];
  @Input() preview = false;
  @Input() marginTop: any = null;
  @Input() mode: any = null;
  @Input() fixedInViewport: any = null;
  @Input() fixedToGap: any = null;
  @ViewChild(MatSidenav, { read: false, static: false }) sidenav!: MatSidenav;
  @ViewChild(MenuNavigationComponent, { read: false, static: false }) menuNav!: MenuNavigationComponent;

  constructor() { }

}
