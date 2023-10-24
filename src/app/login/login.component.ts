import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/class/settings';
import { LoginService } from './services/login.service';
//import { GlobalService } from 'src/app/global-service/global.service';
import { GlobalMessage } from 'src/app/class/global-message';
import { GlobalService } from '../global-service/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  viewText = GlobalMessage.VIEW_LABELS;
  appName = GlobalMessage.APP_LABELS.APP_NAME;
  hidePass = false; // controla la visibilidad del contenido del campo password

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar,
      private loginService: LoginService,
      private globalService: GlobalService,
  ) {
      this.createLoginForm();
  }

  /**
   * construye un formulario con validaciones para
   * enlazarlo al tag form del html.
   */
  createLoginForm() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
      });
  }

  /**
   * routing al acceder al sistema
   */
  dologin() {

      if (!this.loginForm.valid) {
          this.snackBar.open(this.viewText.INVALID_FORM, 'OK',
              { duration: Settings.SHORT_TIME, panelClass: Settings.FAILED_MESSAGE_CLASS });
      }

      const userData = {
          alias: this.loginForm.controls['username'].value.toUpperCase(),
          clave: this.loginForm.controls['password'].value,
      };

      this.loginService.login(userData.alias, userData.clave).subscribe(result => {
          this.globalService.setSession(result);
          this.snackBar.open('BIENVENIDO/A ' + result.alias, 'OK',
              { duration: Settings.LONG_TIME, panelClass: Settings.LOGIN_SUCCES_MESSAGE_CLASS });
          this.router.navigate(['']); // redirect al home
      });

  }

  onKeydown() {
      this.dologin();
  }

  getErrorMessage(controlName: string | number) {
      return this.loginForm.controls[controlName].hasError('required') ? 'El campo no puede estar vacio' : '';
  }

}