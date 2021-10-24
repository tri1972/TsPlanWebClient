import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AccountService, Configuration, RegisterAccount, TsService } from '../../tsplanApi';
import {outputContainer} from './outputConteiner'

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
  public async CallTsPost(httpService: HttpClient,userName:string,password:string,pathCalculationServer:string, token: string, spiceNetList: string):Promise< outputContainer> {
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
      = await new TsService(httpService, null, configTsPost);

    await instance.apiTsSpiceNetListPost(bodyTsSpiceNetListPost, 'body', true)
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
          //this.parentData=true;
        }
      );
    return await new Promise((resolve)=>{
      resolve(outputData)
    })
  }
}
