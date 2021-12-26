import { Component, OnInit,NgZone , ViewChild} from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { WarningDialog } from '../../lib/waringDialog/WarningDialog'
import {TsPlanService } from '../../service/tsPlan/ts-plan.service'
import {MatTable} from '@angular/material/table';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import {CalcWindowSize} from '../../lib/CalcWindowSize'
import {CalculateResultService} from '../../service/CalculateResult/calculate-result.service'


/*Tableテスト用実装 */
export interface PeriodicElement {
  name: string;
  position: number;
  temperature: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'new', temperature: 1.0079}
];

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})

export class CalculateComponent implements OnInit {


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

  //計算中watispinを表示
  blnLoading: boolean = false;
  strLoadingMsg: string = "計算中です";
  
  //tableの表示
  isTableLoad:boolean=false;

  constructor(
    private ngZone: NgZone,
    private dialog: MatDialog,
    private httpInstance:HttpClient,
    private calcResult:CalculateResultService
  ) 
  { 
  }

  ngOnInit(): void {
    this.handleResizeWindow(window.innerWidth);
  }

  /**
   * sideNavのmodeとOpenedを入力された画面幅より選択します 
   * @param width 画面幅
   */
   handleResizeWindow(width: number){
    let calcWindow=new CalcWindowSize(); 
    let headerRow:number=calcWindow.rowNumberCalcByPixel(this.fontSize,this.lineHeight,200);
    this.MinRows=(calcWindow.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
    this.MaxRows=(calcWindow.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
  }

  async calculation(spiceNetList: string) {
    try {
      if (spiceNetList != '') {
        //Wait画面の表示
        this.blnLoading = true;
        let calcServerService: TsPlanService = new TsPlanService();
        //swaggerApi使用
        let username = localStorage.getItem('user');
        let password = localStorage.getItem('pass');
        let basePath = 'https://tsplanning.azurewebsites.net';
        let token: string = localStorage.getItem('token');

        calcServerService.CallTsPost(this.httpInstance, username, password, basePath, token, spiceNetList)
          .subscribe((x) => {
            console.log('Current Position: ', x);
            
            this.calcResult.calculateResult=x;//計算結果をServiceに渡す

            this.isTableLoad=true;
            this.dataSource=new Array;
            let counter:number=0;
            Object.entries(x.nodeTempareture).forEach(([key, value]) => {
              let tmpdata: PeriodicElement = {
                name: key,
                position: counter,
                temperature: value
              }
              this.dataSource.push(tmpdata);
              counter++;
            });
            this.blnLoading = false;
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

  async resize(){
    let calcWindow=new CalcWindowSize(); 
    let headerRow:number=calcWindow.rowNumberCalcByPixel(this.fontSize,this.lineHeight,100);
    this.MinRows=(calcWindow.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
    this.MaxRows=(calcWindow.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();

  }
}
