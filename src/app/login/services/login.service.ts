import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/class/settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginURL = Settings.URL_BASE + '/login';

  constructor(
    private http: HttpClient,
  ) { }

  login(userName: string, userPassword: string): Observable<any> {
    const body = {
      alias: userName,
      clave: userPassword,
      moduloKey: Settings.MODULE_KEY,
    };

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.post(this.loginURL, body, options);
  }

}
