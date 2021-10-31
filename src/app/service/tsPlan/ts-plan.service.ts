import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AccountService, Configuration, RegisterAccount, TsService } from '../../tsplanApi';
import {outputContainer} from './outputConteiner'
import { Observable, observable } from 'rxjs';

import { TsCalcContainerSpiceList } from '../../tsplanApi/model/tsCalcContainerSpiceList';
//      /model/tsCalcContainerSpiceList
@Injectable({
  providedIn: 'root'
})
export class TsPlanService {

  public containerParent:Array<outputContainer>
  constructor() { }

  /**
   * SpiceNetListを使った計算実行
   * @param httpService httpSeviceインスタンス
   * @param userName ユーザー名
   * @param password パスワード
   * @param pathCalculationServer 計算サーバーアドレス 
   * @param token 計算サーバー通信Token
   * @param spiceNetList SpiceNetList文字列
   * @returns 
   */
  public  CallTsPost(httpService: HttpClient,userName:string,password:string,pathCalculationServer:string, token: string, spiceNetList: string):Observable< TsCalcContainerSpiceList> {
    var outputData=new outputContainer();
    var configTsPost = new Configuration();
    configTsPost.username = userName;
    configTsPost.password = password;
    configTsPost.basePath = pathCalculationServer;
    //configTsPost.basePath='http://localhost:54248';
    configTsPost.accessToken = 'Bearer ' + token;
    configTsPost.apiKeys = { "Authorization": 'Bearer ' + token }
    var bodyTsSpiceNetListPost
      = {
      spiceNetList: spiceNetList,
      temperature: [40]
    };
    var instance
      = new TsService(httpService, null, configTsPost);

    return instance.apiTsSpiceNetListPost(bodyTsSpiceNetListPost, 'body', true)
    /*
      .subscribe(
        (x)=>{
          console.log('Current Position: ', x);
          this.containerParent=new Array<outputContainer>();
          for(var i=0;i<x.temperature.length;i++){
            var tmpData=new outputContainer();
            tmpData.Temperature=x.temperature[i].toString();
            tmpData.nodeNumber=i;
            this.containerParent.push(tmpData);
          }
          return
          //this.parentData=true;
        }
      );
      */
  }
}
