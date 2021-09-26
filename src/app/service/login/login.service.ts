import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { LoginUser } from './interfaces/login-user';
import { AuthParam } from './interfaces/auth-param';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as shajs from 'sha.js';
import { AccountService, Configuration, RegisterAccount, TsService } from '../../tsplanApi';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginUrl: string = 'http://localhost/login.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  login(strUser: string, strPassword: string): Observable<any> {

    return this.postAuthPsPlanServer(strUser, strPassword);
    /*
    return new Observable<LoginUser>((observer) => {
      observer.next({ user: strUser, login: true });//ここでloginメンバをtrueで初期化すれば認証OK
    */
    /*
    //パスワードの暗号化
    const authParam: AuthParam = { user: strUser, password: shajs('sha256').update(strPassword).digest('hex') };
    //ここで、認証サーバにPostする
    return this.http.post<LoginUser>(this.loginUrl, authParam, this.httpOptions);
    */
  }

  private postAuthPsPlanServer(username: string, passwd: string): Observable<any> {
    //swaggerApi使用
    let auth;
    var config = new Configuration();
    config.username = username;
    config.password = passwd;
    config.basePath = 'https://tsplanning.azurewebsites.net';
    //config.basePath='http://localhost:54248';
    try {
      var bodyAccountPost: RegisterAccount =
      {
        password: passwd,
        userName: username,
      };
      var instanceAccountService = new AccountService(this.http, null, config);
      var localHttpInstance: HttpClient = this.http;
      auth = instanceAccountService.apiAccountPost(bodyAccountPost, 'body', true);
    }
    catch (err) {
      console.log(err);
    }
    return auth;
  }

  constructor(private http: HttpClient) { }
}
