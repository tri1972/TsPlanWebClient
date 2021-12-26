import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Data } from '@angular/router';
import {  Network, NodeOptions, EdgeOptions, Color, Node, Edge, Options,DataSet} from 'vis';
import {CalculateResultService} from '../../service/CalculateResult/calculate-result.service'


interface elementType{
  [key: string]: { 
    [key: string]: number
  }
}

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  private isCalculated:boolean;
  constructor(private calcResult:CalculateResultService) { 
    this.isCalculated=false;
  }

  ngOnInit(): void {
  } /**
  * 以下、参考url
  * https://stackoverflow.com/questions/51418587/how-to-make-network-visualization-work-in-vis-js-with-angular
  */
 @ViewChild('network') el: ElementRef;
 private networkInstance: Network;

  ngAfterViewInit() {
    const container = this.el.nativeElement;
    let nodes: DataSet<any>;
    let edges: DataSet<any>;

    let calcNodes= this.calcResult.getCalculateResult().nodeTempareture;
    let calcElement:elementType = this.calcResult.getCalculateResult().element;

    let counter:number=0;
    nodes=new DataSet<any>();
    Object.entries(calcNodes).forEach(([key, value]) => {
      nodes.add(
        {id:counter,
          label:key
        }
      )
      counter++;
      console.log(key);
      console.log(value);
    });

    edges=new DataSet<any>();
    Object.entries(calcElement).forEach(([key1, value]) => {
      console.log(key1);
      Object.entries(value).forEach(([key2, value])=>{
        edges.add({
          from:Number(key1),
          to:Number(key2)
        });
        console.log(value);
      }) 
    });
    
    const data = { nodes, edges };

    this.networkInstance = new Network(container, data, {});
  }

}
