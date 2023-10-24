import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Menu, MenuNavigation } from 'src/app/class/menu';
import { MatListItem } from '@angular/material/list';

/**
 * Componente de navegacion que renderiza un menu personalizado
 * recibe como parametro una lista de menus.
 */
@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.scss']
})
export class MenuNavigationComponent implements OnInit {

  @Input() preview = true; // true: menu real y routeable, false: preview del menu
  @Input() menuList: Array<any> = []; // menu a renderizar
  @Input() openCascade = false; // despliega todos los items del acordeon
  @Input() childAccordeon = false;
  @Input() paddingL = 0;
  paddingMenu = '';

  icons = {};
  constructor(
      private router: Router,
  ) { }

  ngOnInit() {
      this.paddingMenu = this.paddingL.toString() + 'px';
  }

  getSize() {
      return this.paddingMenu;
  }

  checked(selected: HTMLElement) {
      const btns = document.getElementsByClassName('route-link');
      for (let i = 0; i < btns.length; i++) {
          btns[i].className = btns[i].className.replace(' active', '');
          if (btns[i] === selected) {
              btns[i].className += ' active';
          } else {
              btns[i].className = btns[i].className.replace(' active', '');
          }
      }
  }

  resetChecked() {
      const btns = document.getElementsByClassName('route-link');
      for (let i = 0; i < btns.length; i++) {
          btns[i].className = btns[i].className.replace(' active', '');
      }
  }

  goRoute(menu: any, eLink: MatListItem) {
      //this.checked(eLink._getHostElement());
      console.log(menu.url)
      const extraParams: NavigationExtras = {
          state: { permisos: menu.permisos },
      };

      this.router.navigate([menu.url.toLowerCase()], extraParams);
  }

  /**
   * Actualiza los valores de previsualización del menu
   */
  updateMenu(newMenu: Array<any>) {
      this.menuList[this.menuList.length - 1] = newMenu;
  }

createObjects(list: Array<MenuNavigation>) {
      const mList = [];
      list.forEach(m => {
          mList.push(this.createMenu(m));
      });
  }

  createMenu(m: any): any {
      return new MenuNavigation(m.id, m.nombre, m.icono,
          m.secuencia, m.url, m.permisos, m.menus ? this.createMenu(m) : []);
  }
  

}
