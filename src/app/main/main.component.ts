import { Component, OnInit,NgZone , ViewChild} from '@angular/core';
import {RouterOutputService} from '../service/router-output/router-output.service'
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import {AppComponentOutputService} from '../service/appComponent/app-component-output.service'
import {CalcWindowSize} from '../lib/CalcWindowSize'
import {MatDialog} from '@angular/material/dialog';
import { WarningDialog } from '../lib/waringDialog/WarningDialog'
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import {TsPlanService } from '../service/tsPlan/ts-plan.service'
import {MatTable} from '@angular/material/table';
import { identifierModuleUrl } from '@angular/compiler';

/*Tableテスト用実装 */
export interface PeriodicElement {
  name: string;
  position: number;
  temperature: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'new', temperature: 1.0079}
];

/*Tableテスト用実装ここまで*/


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  /*Tableテスト用実装 */

  displayedColumns: string[] = ['position', 'name', 'temperature'];
  dataSource = [...ELEMENT_DATA];
  //dataSource:PeriodicElement = [...ELEMENT_DATA];//この...はスプレッド変数と呼ばれる。ここではdatasourceにELEMENTのクローン(shallow copy)を与えている
  @ViewChild(MatTable) table: MatTable<PeriodicElement>;//template側のMatTableクラスインスタンスを参照する
  /*Tableテスト用実装ここまで*/

  MinRows:string;
  MaxRows:string;

  bgcolor='#FF7F50';
  fontSize="8pt";
  lineHeight="1.2";

  sidenavMode: MatDrawerMode= 'side';
  sidenavOpened:boolean;
  showFiller = false;

  //AppComponentとのバインディング用
  Obs:Observable<boolean>;
  Subs:Subscription;

  constructor
    (
      ngZone: NgZone,
      private routerService: RouterOutputService,
      private appComponetService: AppComponentOutputService,
      private dialog: MatDialog,
      private httpInstance:HttpClient,
      private http: HttpClient
    ) {
    window.onresize = (e) => {
      ngZone.run(() => {
        this.handleResizeWindow(window.innerWidth);
      })
    }
  }

  ngOnInit(): void {
    this.handleResizeWindow(window.innerWidth);
    this.routerService.isHiddenTitleAndSideMenu.next(true);

    this.Obs =this.appComponetService.IsOpenSideNav$;
    this.Subs=this.Obs.subscribe(bool=>{
      if(bool){
        this.sidenavOpened=!this.sidenavOpened;
      }
    })
  }

  /**
   * sideNavのmodeとOpenedを入力された画面幅より選択します 
   * @param width 画面幅
   */
  handleResizeWindow(width: number){
    if (800 < width) {
      this.sidenavOpened = true;
      this.sidenavMode = 'side';
    } else {
      this.sidenavOpened = false;
      this.sidenavMode = 'over';
    }
    let calcWindow=new CalcWindowSize(); 
    let headerRow:number=calcWindow.rowNumberCalcByPixel(this.fontSize,this.lineHeight,200);
    this.MinRows=(calcWindow.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
    this.MaxRows=(calcWindow.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
    /*
    let headerRow:number=this.rowNumberCalcByPixel(this.fontSize,this.lineHeight,200);
    this.MinRows=(this.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
    this.MaxRows=(this.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
    */
  }
  /**
   * ブラウザ画面いっぱいの場合の行数を計算します
   * @param fontSize Styleから取得したフォントサイズ(pt)
   * @param lineHeight Styleから取得した行高
   * @returns 行数
   */
  rowNumberCalc(fontSize:string,lineHeight:string):number
  {
    return this.rowNumberCalcByPixel(fontSize,lineHeight,window.innerHeight);
  }

  /**
   * pixelよりブラウザいっぱいの場合の行数を計算します
   * @param fontSize  Styleから取得したフォントサイズ(pt)
   * @param lineHeight  Styleから取得した行高
   * @param numberPixel 
   * @returns 行数 
   */
  rowNumberCalcByPixel(fontSize:string,lineHeight:string,numberPixel:number):number{
    let font=fontSize.replace(/[pt]+/,"");
    let height=numberPixel*Number(lineHeight);
    let ptPerPx=72/96;
    return Math.floor( (ptPerPx*height)/Number(font));
  }
  
  ngOnDestroy() {
    if (this.Subs) {
      this.Subs.unsubscribe();
    }
  }

  calculation(spiceNetList: string) {
    try {
      if (spiceNetList != '') {
        let calcServerService: TsPlanService = new TsPlanService();
        //swaggerApi使用
        let username = localStorage.getItem('user');
        let password = localStorage.getItem('pass');
        let basePath = 'https://tsplanning.azurewebsites.net';
        let token: string = localStorage.getItem('token');

        calcServerService.CallTsPost(this.httpInstance, username, password, basePath, token, spiceNetList)
          .subscribe((x) => {
            console.log('Current Position: ', x);
            this.dataSource=new Array;
            for (var i = 0; i < x.temperature.length; i++) {
              let tmpdata: PeriodicElement = {
                name: i.toString(),
                position: i,
                temperature: x.temperature[i]
              }
              this.dataSource.push(tmpdata);
            }
            this.table.renderRows();//tableの再描画
          });
      } else {
        let warningDialog = new WarningDialog(this.dialog);
        warningDialog.Open('警告', 'TextAreaにSpiceNetList文字列が入力されていません');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  showCircuitNetwork(){
    let warningDialog=new WarningDialog(this.dialog);
    warningDialog.Open('警告','未実装です');
  }
}
