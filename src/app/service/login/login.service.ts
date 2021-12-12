import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { LoginUser } from './interfaces/login-user';
import { AuthParam } from '../auth-param';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as shajs from 'sha.js';
import { AccountService, Configuration, RegisterAccount, TsService } from '../../tsplanApi';
import * as crypto from 'crypto';//
import { write } from 'fs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginUrl: string = 'http://localhost/login.php';

  private salt: string = 'testesttest1';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  private password: string;

  constructor(private http: HttpClient) {

  }

  stringToUint8Array(str) {
    return new TextEncoder().encode(str);
  }

  uint8ArrayToString(buffer) {
    return new TextDecoder("utf-8").decode(buffer);
  }


  async pbkdf2Key(pass, salt, iterations = 1000, length = 256) {
    const ec = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      ec.encode(pass),
      'PBKDF2',
      false,
      ['deriveBits']);
    const key = await window.crypto.subtle.deriveKey(
      {
      name: 'PBKDF2',
      hash: 'SHA-512',
      salt: ec.encode(salt),
      iterations
    }, keyMaterial, {
      name: 'AES-GCM',
      length: 256
    }, true, ['encrypt', 'decrypt']);
    return key;
  }

  async computeSystem_Security_CryptographyHMAC256(apiKey: string, apiSecret: string) {


    let password = 'testtest';
    this.salt = 'xrgB0wr6EqfeyR4rNV3YhQ==';
    let calchash="pd0ASY6zS0tr/RqvdlXb3Tsl5vV9vjpKWPqG6tfx6LU=";

    // 文字列をTyped Arrayに変換する。
    let passwordUint8Array =(new TextEncoder()).encode( window.btoa(password));
    let base64salt=window.btoa(this.salt);
    let saltUint8Array = (new TextEncoder()).encode(base64salt);
    var encodedData = window.btoa(unescape(encodeURIComponent('こんにちは')));
    /*
    let passwordUint8Array = (new TextEncoder()).encode(password);
    let saltUint8Array = (new TextEncoder()).encode(this.salt);
    // パスワードのハッシュ値を計算する。
    */
    window.crypto.subtle.importKey(
      'raw',
      passwordUint8Array,
      { name: 'PBKDF2' },
      // 鍵のエクスポートを許可するかどうかの指定。falseでエクスポートを禁止する。
      false,
      // 鍵の用途。ここでは、「鍵の変換に使う」と指定している。
      ['deriveBits']
    ).then((keyMaterial) => {
      // 乱数でsaltを作成する。
      //let salt = window.crypto.getRandomValues(new Uint8Array(16));
      window.crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: saltUint8Array,
          iterations: 10000, // ストレッチングの回数。
          hash: 'SHA-512'
        },
        keyMaterial,
        512
      ).then((buffer) => {
        var bytes = new Uint8Array(buffer);
        console.log(window.btoa(String.fromCharCode.apply(String, Array.from(bytes))));

      });

    });

    /*
    // 文字列をTyped Arrayに変換する。
    let passwordUint8Array = (new TextEncoder()).encode(password);
    let saltUint8Array=(new TextEncoder()).encode(this.salt);
    // パスワードのハッシュ値を計算する。
    await window.crypto.subtle.digest(
      // ハッシュ値の計算に用いるアルゴリズム。
      { name: 'SHA-256' },
      passwordUint8Array
    ).then((digest) => {
      window.crypto.subtle.importKey(
        'raw',
        digest,
        { name: 'PBKDF2' },
        // 鍵のエクスポートを許可するかどうかの指定。falseでエクスポートを禁止する。
        false,
        // 鍵の用途。ここでは、「鍵の変換に使う」と指定している。
        ['deriveBits']
      ).then((keyMaterial) => {

        // 乱数でsaltを作成する。
        //let salt = window.crypto.getRandomValues(new Uint8Array(16));
        window.crypto.subtle.deriveBits(
          {
            name: 'PBKDF2',
            salt:saltUint8Array,
            iterations: 10000, // ストレッチングの回数。
            hash: 'SHA-512'
          },
          keyMaterial,
          512
        ).then((buffer) => {
          var bytes = new Uint8Array(buffer);
          console.log(window.btoa(String.fromCharCode.apply(String, Array.from(bytes))));

        });

      });
    });
    */
  }

  login(strUser: string, strPassword: string): Observable<any> {
    let hash = this.computeSystem_Security_CryptographyHMAC256(strPassword, this.salt);
    console.log(hash);
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

}
