import { Component } from '@angular/core';
import { GlobalService } from './global-service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private globalService: GlobalService,
  ) {
    this.globalService.initLocalSession();
  }
}