import { Component, OnInit, NgZone, Output } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import {AccountDataService} from './service/accoutData/account-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TsPlanWebClient';

  showFiller = false;
  isExpanded = false;

  user='test';

  sidenavOpened: boolean = true;
  sidenavMode: MatDrawerMode= 'side';
  /**
   * コンストラクタ
   * @param ngZone 
   */
  constructor(private ngZone: NgZone,private accountData:AccountDataService) {
    window.onresize = (e) => {
      ngZone.run(() => {
        this.handleResizeWindow(window.innerWidth);
      })
    }
  } 

  ngOnInit(): void {
    this.handleResizeWindow(window.innerWidth);
    this.user  = localStorage.getItem('user');

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

}
