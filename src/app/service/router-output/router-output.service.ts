import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouterOutputService {

  isHiddenTitleAndSideMenu=new Subject<boolean>();

  constructor() { }

  get IsHiddenTitleAndSideMenu$() {
    return this.isHiddenTitleAndSideMenu.asObservable();
  }
}
