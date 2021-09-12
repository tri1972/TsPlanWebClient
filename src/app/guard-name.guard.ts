import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardNameGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    //return false;
    let limit: any = localStorage.getItem('token');
    if (!isNaN(limit) && Date.now() < limit) {
      return true;//認証OK正常実行
    } else {
      return this.router.parseUrl('login-page?url=' + state.url);//login画面に戻る
    }
  }
  /*
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return true;
  }
  */

}
