import { Component, OnInit, NgZone, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AccountDataService } from './service/accoutData/account-data.service';
import { RouterOutputService } from './service/router-output/router-output.service'

import { AppComponentOutputService } from './service/appComponent/app-component-output.service'
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TsPlanWebClient';

  showFiller = false;
  isExpanded = false;
  isHiddenMenu: boolean;
  isDisplayMenu: string;
  user = 'test';

  hiddenPath: string[] = ['login'];
  hidden: boolean;
  /**
   * 各RoutingComponetからのバインディング用変数
   */
  Obs: Observable<boolean>;
  Subs: Subscription;
  /**
   * SideNavのOpen切り替え
   */
  isToggleSideNav: boolean = false;

  /**
   * コンストラクタ
   * @param ngZone 
   */
  constructor
    (
      private ngZone: NgZone,
      private accountData: AccountDataService,
      private routerService: RouterOutputService,
      private appOutputServece: AppComponentOutputService,
      public router: Router
    ) {
  }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(f => f instanceof NavigationEnd)
    )
      .subscribe((s: any) => {
        this.hidden = this.hiddenPath.some(e => s.url.includes(e));

        if (this.hidden) {
          this.isDisplayMenu = "none";
        } else {
          this.isDisplayMenu = "block";
        }
      });
    /*

    this.user  = localStorage.getItem('user');
    this.Obs =this.routerService.IsHiddenTitleAndSideMenu$;
    this.Subs=this.Obs.subscribe(bool=>{
      if(bool){
        this.isDisplayMenu="block";
      }else{
        this.isDisplayMenu="none";
      }
    })
    */
  }

  /**
   * Menuボタンクリックイベントハンドラ
   */
  onClickMenuButton() {
    this.isToggleSideNav = true;
    this.appOutputServece.isOpenSideNav.next(this.isToggleSideNav);
    this.isToggleSideNav = false;
  }

  ngOnDestroy() {
    if (this.Subs) {
      this.Subs.unsubscribe();
    }
  }
}
