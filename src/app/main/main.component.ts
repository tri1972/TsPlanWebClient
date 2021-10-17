import { Component, OnInit,NgZone } from '@angular/core';
import {RouterOutputService} from '../service/router-output/router-output.service'
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import {AppComponentOutputService} from '../service/appComponent/app-component-output.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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

  constructor(ngZone:NgZone,private routerService :RouterOutputService,private appComponetService:AppComponentOutputService) {
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

    let headerRow:number=this.rowNumberCalcByPixel(this.fontSize,this.lineHeight,200);
    this.MinRows=(this.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
    this.MaxRows=(this.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
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
}
