import { Component, OnInit,NgZone, ViewChild} from '@angular/core';
import {RouterOutputService} from '../service/router-output/router-output.service'
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import {AppComponentOutputService} from '../service/appComponent/app-component-output.service'
import { WarningDialog } from '../lib/waringDialog/WarningDialog'
import { Router } from '@angular/router'; 
import {MatDialog} from '@angular/material/dialog';


/*Tableテスト用実装ここまで*/


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  sidenavMode: MatDrawerMode= 'side';
  sidenavOpened:boolean;
  //showFiller = false;

  
  //AppComponentとのバインディング用
  Obs:Observable<boolean>;
  Subs:Subscription;

  constructor
    (
      private ngZone: NgZone,
      private routerService: RouterOutputService,
      private appComponetService: AppComponentOutputService,
      private router:Router,
      private dialog: MatDialog
    ) {
      window.onresize = (e) => {
        ngZone.run(() => {
          this.handleResizeWindow(window.innerWidth);
        })
      }
  }

  ngOnInit(): void {
    this.routerService.isHiddenTitleAndSideMenu.next(true);

    this.handleResizeWindow(window.innerWidth);

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
  }
  
  ngOnDestroy() {
    if (this.Subs) {
      this.Subs.unsubscribe();
    }
  }

  showCalculation(){
    this.router.navigateByUrl('/main/calculate');
  }

  showCircuitNetwork(){
    this.router.navigateByUrl('/main/network');
    let warningDialog=new WarningDialog(this.dialog);
    warningDialog.Open('警告','未実装です');
  }
}
