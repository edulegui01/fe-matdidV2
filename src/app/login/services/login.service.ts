import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Settings } from 'src/app/class/settings';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginURL = Settings.URL_BASE + '/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  login(userName: string, userPassword: string): Observable<any> {
    const body = {
      username: userName,
      password: userPassword,
    };

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
      }),
      
      
    );
  }



  isAuth(){

    let authVerify = sessionStorage.getItem('token') ? true : false;

    if(!authVerify){
      this.router.navigate(['/login']);
    }

    return authVerify;
    

  }

}
