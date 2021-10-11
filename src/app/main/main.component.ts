import { Component, OnInit,NgZone } from '@angular/core';
import { nextTick } from 'process';
import {RouterOutputService} from '../service/router-output/router-output.service'

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

  constructor(ngZone:NgZone,private routerService :RouterOutputService) {
    /*
    window.onresize = (e) => {
      ngZone.run(() => {
        this.handleResizeWindow();
      })
    }
    */
  }
   
  ngOnInit(): void {
    this.handleResizeWindow();
    this.routerService.isHiddenTitleAndSideMenu.next(false);
  }

  handleResizeWindow(){
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


}
