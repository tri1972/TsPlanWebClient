import { Component, OnInit } from '@angular/core';
import {CalcWindowSize} from '../lib/CalcWindowSize'
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarCopyClipboardComponent} from './SnackbarCopyClipboardComponent'

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
value=`* D:\sakai\OneDrive\ドキュメント\LTspiceXVII\lib\sym\SpecialFunctions\CaseSurface.asc
XX1 test N001 heatresistancesurfacetooutsideair params: width=0.2 depth=0.3 WindDirection=x PositionSurface=top VelocityWind=0.01 Radiation=0.85 ThermalResistance=0 PositiveNode=test
XX2 N001 N002 heatresistancesurfacetoinside params: width=0.2 depth=0.3 thick=0.005 thermalConductivity=0.278
R1 N003 N002 0.1
R2 N003 N002 0.18
R3 0 N004 0.1
B1 test 0 basetemperature=40 PositiveNode=test
XX3 N003 N004 currentpole params: Value=2.3 PositiveNode=N003

* block symbol definitions
.subckt heatresistancesurfacetooutsideair INPUT OUTPUT
R1 N001 INPUT {WindDirection}
R2 N002 N001 {PositionSurface}
R3 N003 N002 {Width}
R4 N004 N003 {Depth}
R5 N005 N004 {VelocityWind}
R6 N006 N005 {Radiation}
R7 N007 N006 {ThermalResistance}
R8 OUTPUT N007 {PositiveNode}
.ends heatresistancesurfacetooutsideair

.subckt heatresistancesurfacetoinside VIN VOUT
R1 N001 VIN {thermalConductivity}
R2 N001 N002 {width}
R3 N002 N003 {depth}
R4 N003 VOUT {thick}
.param {width}=5 {thermalConductivity}=8 {depth}=9 {thick}=10
.ends heatresistancesurfacetoinside

.subckt currentpole  
I1 INPUT N001 {Value}
R1 N001 OUTPUT {PositiveNode}
.ends currentpole

.tran 0 1 0.5 0.01
.physicalTable DEN=0.0278
.backanno
.end
`
MinRows:string;
MaxRows:string;

fontSize="8pt";
lineHeight="1.2";

  constructor(private _snackBar: MatSnackBar)
  {
  }

  ngOnInit(): void {
    
    let calcWindow=new CalcWindowSize(); 
    let headerRow:number=calcWindow.rowNumberCalcByPixel(this.fontSize,this.lineHeight,200);
    this.MinRows=(calcWindow.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
    this.MaxRows=(calcWindow.rowNumberCalc(this.fontSize,this.lineHeight)-headerRow).toString();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarCopyClipboardComponent, {
      duration: 1 * 1000,
    });
  }

}
