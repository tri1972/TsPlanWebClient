import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppComponentOutputService {

  isOpenSideNav=new Subject<boolean>();

  constructor() { }

  get IsOpenSideNav$() {
    return this.isOpenSideNav.asObservable();
  }
}
