import { Injectable } from '@angular/core';

import { TsCalcContainerSpiceList } from '../../tsplanApi/model/tsCalcContainerSpiceList'

@Injectable({
  providedIn: 'root'
})

/**
 * 計算結果受け渡しService
 */
export class CalculateResultService {

  
  calculateResult:TsCalcContainerSpiceList

  constructor() { }

  /**
   * 計算結果を設定します
   * @param input 計算結果
   */
  setCalculateResult(input:TsCalcContainerSpiceList):void{
    this.calculateResult=input;
  }
  /**
   * 計算結果を取得します
   * @returns 計算結果
   */
  getCalculateResult():TsCalcContainerSpiceList{
    return this.calculateResult;
  }
}
