import { OnInit, Component, ChangeDetectorRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global-service/global.service';
import { GlobalMessage } from 'src/app/class/global-message';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { menu } from 'src/app/class/menu-items';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  menuList: Array<any> = [];
  username = null;
  @ViewChild(SidenavComponent, { static: true, read: false}) nav!: SidenavComponent;
  appLabels = GlobalMessage.APP_LABELS;

  // true si se pulson un boton del menu
  menuCliked = true;

  constructor(
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      private router: Router,
      private globalService: GlobalService,
      // private userService: UserService,
  ) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void {
      this.username = this.globalService.getUser();
      this.menuList = menu.menuList;
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
      this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  toggle() {
      this.nav.sidenav.toggle();
  }

  openMenu(menu: MatMenu) {
      console.log(menu);
  }

  logout() {
      this.globalService.clearSession();
      this.router.navigate(['login']);

      // se remueven los permisos del servicio de usuario
      // this.userService.permissions = [];
  }

  clearMenuSelected() {
      this.nav.menuNav.resetChecked();
  }

}
