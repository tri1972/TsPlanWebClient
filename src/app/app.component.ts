import { Component, OnInit, NgZone, Output } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import {AccountDataService} from './service/accoutData/account-data.service';
import {RouterOutputService} from './service/router-output/router-output.service'

import {AppComponentOutputService} from './service/appComponent/app-component-output.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TsPlanWebClient';

  showFiller = false;
  isExpanded = false;
  isHiddenMenu:boolean;
  isDisplayMenu:string;
  user='test';

  /**
   * 各RoutingComponetからのバインディング用変数
   */
  Obs:Observable<boolean>;
  Subs:Subscription;
  /**
   * SideNavのOpen切り替え
   */
  isToggleSideNav:boolean=false;

  /**
   * コンストラクタ
   * @param ngZone 
   */
  constructor(private ngZone: NgZone,private accountData:AccountDataService,private routerService:RouterOutputService,private appOutputServece:AppComponentOutputService) {
  } 

  ngOnInit(): void {
    this.user  = localStorage.getItem('user');
    this.Obs =this.routerService.IsHiddenTitleAndSideMenu$;
    this.Subs=this.Obs.subscribe(bool=>{
      if(bool){
        this.isDisplayMenu="block";
      }else{
        this.isDisplayMenu="none";
      }
      /*
      if(bool){
        this.isHiddenMenu=false;
      }else{
        this.isHiddenMenu=true;
      }*/
    })
  }

  /**
   * Menuボタンクリックイベントハンドラ
   */
  onClickMenuButton(){
    this.isToggleSideNav=true;
    this.appOutputServece.isOpenSideNav.next(this.isToggleSideNav);
    this.isToggleSideNav=false;
  }

  ngOnDestroy() {
    if (this.Subs) {
      this.Subs.unsubscribe();
    }
  }
}
