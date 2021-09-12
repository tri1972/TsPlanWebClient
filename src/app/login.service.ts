import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from './interfaces/login-user';
import { AuthParam } from './interfaces/auth-param';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as shajs from 'sha.js';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginUrl: string = 'http://localhost/login.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  login(strUser: string, strPassword: string): Observable<LoginUser> {

    const authParam: AuthParam = { user: strUser, password: shajs('sha256').update(strPassword).digest('hex') };

    return this.http.post<LoginUser>(this.loginUrl, authParam, this.httpOptions);
  }

  constructor(private http: HttpClient) { }
}
