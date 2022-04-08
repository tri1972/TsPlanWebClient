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
  value=`* D:\sakai\OneDrive\ドキュメント\LTspiceXVII\lib\sym\SpecialFunctions\CuboidCaseUnitAir.asc
  XX1 InnerAir InnerSerface_top heatresistancesurfacetoinside params: Width=0.2 Depth=0.3 ThermalResistanceSurface=0.3 VelocityWind=0.3 WindDirection=x PositionSurface=top PositiveNode=InnerSerface_top
  XX2 InnerAir InnerSerface_bottom heatresistancesurfacetoinside params: Width=0.2 Depth=0.3 VelocityWind=0.3 WindDirection=x PositionSurface=bottom PositiveNode=InnerSerface_bottom
  XX3 InnerAir InnerSerface_side1 heatresistancesurfacetoinside params: Width=0.2 Depth=0.3 VelocityWind=0.3 WindDirection=x PositionSurface=side PositiveNode=InnerSerface_side1
  XX4 InnerAir InnerSerface_side2 heatresistancesurfacetoinside params: Width=0.2 Depth=0.3 VelocityWind=0.3 WindDirection=x PositionSurface=side PositiveNode=InnerSerface_side2
  XX5 InnerAir InnerSerface_side3 heatresistancesurfacetoinside params: Width=0.2 Depth=0.3 VelocityWind=0.3 WindDirection=x PositionSurface=side PositiveNode=InnerSerface_side3
  XX6 InnerAir InnerSerface_side4 heatresistancesurfacetoinside params: Width=0.2 Depth=0.3 VelocityWind=0.3 WindDirection=x PositionSurface=side PositiveNode=InnerSerface_side4
  XX7 OuterSurface_top Air heatresistancesurfacetooutsideair params: Width=0.2 Depth=0.3 WindDirection=x PositionSurface=top VelocityWind=0.01 Radiation=0.85 ThermalResistanceSurface=0.9 PositiveNode=Air
  XX8 OuterSurface_bottom Air heatresistancesurfacetooutsideair params: Width=0.2 Depth=0.3 WindDirection=x PositionSurface=bottom VelocityWind=0.01 Radiation=0.85 PositiveNode=Air
  XX9 OuterSurface_side_1 Air heatresistancesurfacetooutsideair params: Width=0.2 Depth=0.3 WindDirection=x PositionSurface=side VelocityWind=0.01 Radiation=0.85 PositiveNode=Air
  XX10 OuterSurface_side_2 Air heatresistancesurfacetooutsideair params: Width=0.2 Depth=0.3 WindDirection=x PositionSurface=side VelocityWind=0.01 Radiation=0.85 PositiveNode=Air
  XX11 OuterSurface_side_3 Air heatresistancesurfacetooutsideair params: Width=0.2 Depth=0.3 WindDirection=x PositionSurface=side VelocityWind=0.01 Radiation=0.85 PositiveNode=Air
  XX12 OuterSurface_side_4 Air heatresistancesurfacetooutsideair params: Width=0.2 Depth=0.3 WindDirection=x PositionSurface=side VelocityWind=0.01 Radiation=0.85 PositiveNode=Air
  XX13 N002 unit1 currentpole params: Value=150 PositiveNode=unit1
  R7 OuterSurface_top InnerSerface_top 57.3422
  R8 OuterSurface_bottom InnerSerface_bottom 128.58396
  R9 OuterSurface_side_1 InnerSerface_side1 192.58396
  R10 OuterSurface_side_2 InnerSerface_side2 128.5839
  R11 OuterSurface_side_3 InnerSerface_side3 192.8766
  R12 OuterSurface_side_4 InnerSerface_side4 103.8726
  B1 DuctAir 0 basetemperature=40 PositiveNode=DuctAir
  B2 Air 0 basetemperature=40 PositiveNode=Air
  R14 N002 0 10000000000
  XX14 unit1_top InnerAir heatresistancesurfaceunit params: width=0.02 depth=0.03 thick=0.0005 thermalConductivity=0.278 WindVelocity=0.3 wind=x PositiveNode=InnerAir PositionSurface=top
  XX15 unit1 unit1_top heatresistancethermalconduction params: width=0.2 depth=0.3 length=0.1 thermalConductivity=0.278
  XX16 unit1 unit1_right heatresistancethermalconduction params: width=0.2 depth=0.3 length=0.1 thermalConductivity=0.278
  XX17 unit1 unit1_back heatresistancethermalconduction params: width=0.2 depth=0.3 length=0.1 thermalConductivity=0.278
  XX18 unit1 unit1_left heatresistancethermalconduction params: width=0.2 depth=0.3 length=0.1 thermalConductivity=0.278
  XX19 unit1 unit1_front heatresistancethermalconduction params: width=0.2 depth=0.3 length=0.1 thermalConductivity=0.278
  XX20 unit1 unit1_bottom heatresistancethermalconduction params: width=0.2 depth=0.3 length=0.1 thermalConductivity=0.278
  XX21 unit1_right InnerAir heatresistancesurfaceunit params: width=0.02 depth=0.03 thick=0.0005 thermalConductivity=0.278 WindVelocity=0.3 wind=x PositiveNode=InnerAir PositionSurface=side
  XX22 unit1_back InnerAir heatresistancesurfaceunit params: width=0.02 depth=0.03 thick=0.0005 thermalConductivity=0.278 WindVelocity=0.3 wind=x PositiveNode=InnerAir PositionSurface=side
  XX23 unit1_left InnerAir heatresistancesurfaceunit params: width=0.02 depth=0.03 thick=0.0005 thermalConductivity=0.278 WindVelocity=0.3 wind=x PositiveNode=InnerAir PositionSurface=side
  XX24 unit1_front InnerAir heatresistancesurfaceunit params: width=0.02 depth=0.03 thick=0.0005 thermalConductivity=0.278 WindVelocity=0.3 wind=x PositiveNode=InnerAir PositionSurface=side
  XX25 unit1_bottom InnerAir heatresistancesurfaceunit params: width=0.02 depth=0.03 thick=0.0005 thermalConductivity=0.278 WindVelocity=0.3 wind=x PositiveNode=InnerAir PositionSurface=bottom
  XX26 InnerAir DuctAir heatresistanceexhaust params: AreaIntake=0.0091 AreaExhaust=0.0091 PositiveNode=InnerAir PositionCenter=0.05 WidthInstallSurface=0.2 DepthInstallSurface=0.1
  XX27 unit1_top InnerSerface_top heatresistancesurfaceradiation params: Width=0.2 Depth=0.3 PositiveNode=InnerSerface_top Radiation=0.85
  XX28 OuterSurface_side_4 Air heatresistanceconvectionplatebottom params: Width=0.2 Depth=0.3 PositiveNode=Air
  XX29 unit1_top InnerSerface_top heatresistanceconvectionplatetop params: Width=0.2 Depth=0.3 PositiveNode=InnerSerface_top
  XX30 N001 Air heatresistanceconvectionplateside params: Width=0.2 Depth=0.3 PositiveNode=Air
  XX31 unit1 InnerAir heatresistanceconvectionplateflowback params: Width=0.2 Depth=0.3 VelocityWind=0.3 PositiveNode=InnerAir
  XX32 unit1 InnerAir heatresistanceconvectionplateflowfront params: Width=0.2 Depth=0.3 VelocityWind=0.3 PositiveNode=InnerAir
  XX33 OuterSurface_top Air heatresistanceconvectionplateflowside params: Width=0.2 Depth=0.3 LengthFlow=0.2 VelocityWind=0.3 PositiveNode=Air
  
  * block symbol definitions
  .subckt heatresistancesurfacetoinside VIN VOUT
  R1 N001 VIN {ThermalResistanceSurface}
  R2 N001 N002 {Width}
  R3 N002 N003 {Depth}
  R4 N004 N003 {Thick}
  R5 N005 N004 {VelocityWind}
  R6 N006 N005 {PositionSurface}
  R7 N007 N006 {WindDirection}
  R8 VOUT N007 {PositiveNode}
  .param {Width}=5 {ThermalResistanceSurface}=8 {Depth}=9 [VelocityWind]=11 [PositionSurface]=12 [WindDirection]=13 [PositiveNode]=14
  .ends heatresistancesurfacetoinside
  
  .subckt heatresistancesurfacetooutsideair INPUT OUTPUT
  R1 N001 INPUT {WindDirection}
  R2 N002 N001 {PositionSurface}
  R3 N003 N002 {Width}
  R4 N004 N003 {Depth}
  R5 N005 N004 {VelocityWind}
  R6 N006 N005 {Radiation}
  R7 N007 N006 {ThermalResistanceSurface}
  R8 OUTPUT N007 {PositiveNode}
  .param {Width}=5 {ThermalResistanceSurface}=8 {Depth}=9 [VelocityWind]=11 [PositionSurface]=12 [WindDirection]=13 [PositiveNode]=14 [Radiation]=15
  .ends heatresistancesurfacetooutsideair
  
  .subckt currentpole  
  I1 INPUT N001 {Value}
  R1 N001 OUTPUT {PositiveNode}
  .ends currentpole
  
  .subckt heatresistancesurfaceunit VIN VOUT
  R1 N001 VIN {thermalConductivity}
  R2 N001 N002 {width}
  R3 N002 N003 {depth}
  R4 N003 N004 {thick}
  R5 N005 N004 {wind}
  R6 N006 N005 {VelocityWind}
  R7 N007 N006 {PositiveNode}
  R8 VOUT N007 {PositionSurface}
  .param {wind}=5 {VelocityWind}=8 {width}=9 {depth}=10 {thick}=11 {PositiveNode}=12 {thermalConductivity}=13 {PositionSurface}=15
  .ends heatresistancesurfaceunit
  
  .subckt heatresistancethermalconduction VIN VOUT
  R1 N001 VIN {thermalConductivity}
  R2 N001 N002 {width}
  R3 N002 N003 {depth}
  R4 VOUT N003 {length}
  .param {width}=5 {thermalConductivity}=8 {depth}=9 {length}=10
  .ends heatresistancethermalconduction
  
  .subckt heatresistanceexhaust VIN VOUT
  R1 N001 VIN {AreaIntake}
  R2 N001 N002 {AreaExhaust}
  R3 N002 N003 {PositiveNode}
  R4 N003 N004 {PositionCenter}
  R5 N004 N005 {WidthInstallSurface}
  R6 N005 VOUT {DepthInstallSurface}
  .param {AreaIntake}=9 {AreaExhaust}=10 {PositiveNode}=12 [PositionCenter]=13 [DepthInstallSurface]=14 {WidthInstallSurface}=15
  .ends heatresistanceexhaust
  
  .subckt heatresistancesurfaceradiation VIN VOUT
  R2 N001 N002 {Width}
  R3 N002 N003 {Depth}
  R8 VOUT N003 {PositiveNode}
  R1 N001 VIN {Radiation}
  .param {Width}=5 {Depth}=9 [PositiveNode]=14 {Radiation}=15
  .ends heatresistancesurfaceradiation
  
  .subckt heatresistanceconvectionplatebottom VIN VOUT
  R2 N001 N002 {Width}
  R3 N002 N003 {Depth}
  R8 VOUT N003 {PositiveNode}
  R1 N001 VIN {Radiation}
  .param {Width}=5 {Depth}=9 [PositiveNode]=14 {Radiation}=15
  .ends heatresistanceconvectionplatebottom
  
  .subckt heatresistanceconvectionplatetop VIN VOUT
  R2 N001 N002 {Width}
  R3 N002 N003 {Depth}
  R8 VOUT N003 {PositiveNode}
  R1 N001 VIN {Radiation}
  .param {Width}=5 {Depth}=9 [PositiveNode]=14 {Radiation}=15
  .ends heatresistanceconvectionplatetop
  
  .subckt heatresistanceconvectionplateside VIN VOUT
  R2 N001 N002 {Width}
  R3 N002 N003 {Depth}
  R8 VOUT N003 {PositiveNode}
  R1 N001 VIN {Radiation}
  .param {Width}=5 {Depth}=9 [PositiveNode]=14 {Radiation}=15
  .ends heatresistanceconvectionplateside
  
  .subckt heatresistanceconvectionplateflowback VIN VOUT
  R1 VIN N001 {Width}
  R2 N001 N002 {Depth}
  R4 VOUT N003 {PositiveNode}
  R3 N002 N003 {VelocityWind}
  .param {Width}=5 {Depth}=9 [PositiveNode]=14 {VelocityWind}=16
  .ends heatresistanceconvectionplateflowback
  
  .subckt heatresistanceconvectionplateflowfront VIN VOUT
  R1 VIN N001 {Width}
  R2 N001 N002 {Depth}
  R4 VOUT N003 {PositiveNode}
  R3 N002 N003 {VelocityWind}
  .param {Width}=5 {Depth}=9 [PositiveNode]=14 {VelocityWind}=16
  .ends heatresistanceconvectionplateflowfront
  
  .subckt heatresistanceconvectionplateflowside VIN VOUT
  R2 N001 N002 {Width}
  R3 N002 N003 {Depth}
  R8 VOUT N004 {PositiveNode}
  R1 N001 VIN {LengthFlow}
  R4 N003 N004 {VelocityWind}
  .param {Width}=5 {Depth}=9 [PositiveNode]=14 {VelocityWind}=16 {LengthFlow}=17
  .ends heatresistanceconvectionplateflowside
  
  .backanno
  .end  
  `
/*
value=`* D:\sakai\OneDrive\ドキュメント\LTspiceXVII\lib\sym\SpecialFunctions\CaseSurface2.asc
XX1 test N001 heatresistancesurfacetooutsideair params: width=0.2 depth=0.3 WindDirection=x PositionSurface=top VelocityWind=0.01 Radiation=0.85 ThermalResistance=0 PositiveNode=test
XX2 N001 N002 heatresistancesurfacetoinside params: width=0.2 depth=0.3 thick=0.005 thermalConductivity=0.278
R1 N003 N002 0.1
R2 N003 N002 0.18
R3 0 N004 0.1
B1 test 0 basetemperature=40 PositiveNode=test
XX3 N003 N004 currentpole params: Value=2.3 PositiveNode=N003
R4 N003 N001 100

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
*/
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
