export class CalcWindowSize{
  /**
   * ブラウザ画面いっぱいの場合の行数を計算します
   * @param fontSize Styleから取得したフォントサイズ(pt)
   * @param lineHeight Styleから取得した行高
   * @returns 行数
   */
   public rowNumberCalc(fontSize:string,lineHeight:string):number
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
  public rowNumberCalcByPixel(fontSize:string,lineHeight:string,numberPixel:number):number{
    let font=fontSize.replace(/[pt]+/,"");
    let height=numberPixel;//*Number(lineHeight);
    let ptPerPx=72/96;
    let output=Math.floor( (ptPerPx*height)/Number(font));
    return output;
  }


}