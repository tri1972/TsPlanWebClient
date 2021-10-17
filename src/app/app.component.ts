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
  isHiddenMain:boolean=true;
  isHiddenLogin:boolean=false;
  user='test';

  sidenavOpened: boolean = true;
  sidenavMode: MatDrawerMode= 'side';
  Obs:Observable<boolean>;
  Subs:Subscription;

  isToggleSideNav:boolean=false;

  /**
   * コンストラクタ
   * @param ngZone 
   */
  constructor(private ngZone: NgZone,private accountData:AccountDataService,private routerService:RouterOutputService,private appOutputServece:AppComponentOutputService) {
    window.onresize = (e) => {
      ngZone.run(() => {
        this.handleResizeWindow(window.innerWidth);
      })
    }
  } 

  ngOnInit(): void {
    this.handleResizeWindow(window.innerWidth);
    this.user  = localStorage.getItem('user');
    this.Obs =this.routerService.IsHiddenTitleAndSideMenu$;
    this.Subs=this.Obs.subscribe(bool=>{
      if(bool){
        this.isHiddenLogin=true;
        this.isHiddenMain=false;
      }else{
        this.isHiddenLogin=false;
        this.isHiddenMain=true;
      }
    })
  }

  /**
   * sideNavのmodeとOpenedを入力された画面幅より選択します
   * @param width 画面幅
   */
  private handleResizeWindow(width: number) {
    if (800 < width) {
      this.sidenavOpened = true;
      this.sidenavMode = 'side';
    } else {
      this.sidenavOpened = false;
      this.sidenavMode = 'over';
    }
  }

  ngOnDestroy() {
    if (this.Subs) {
      this.Subs.unsubscribe();
    }
  }

  sidenav(){
    this.isToggleSideNav=true;
    this.appOutputServece.isOpenSideNav.next(this.isToggleSideNav);
    this.isToggleSideNav=false;
  }
}
