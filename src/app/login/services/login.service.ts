import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Settings } from 'src/app/class/settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginURL = Settings.URL_BASE + '/auth/login';

  constructor(
    private http: HttpClient,
  ) { }

  login(userName: string, userPassword: string): Observable<any> {
    const body = {
      username: userName,
      password: userPassword,
    };

    console.log(body)
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.post(this.loginURL, body, options).pipe(
      tap((userData:any) =>{
        sessionStorage.setItem("token",userData.token)
        localStorage.setItem("idFuncionario",userData.idFuncionario)
        localStorage.setItem("nombreFuncionario",userData.nombreFuncionario)
        localStorage.setItem("apellidoFuncionario",userData.apellidoFuncionario)
        localStorage.setItem("role",userData.role)
      })
    );
  }

}
