import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Data } from '@angular/router';
import { Network, DataSet} from 'vis';
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
 private networkInstance: any;

  ngAfterViewInit() {
    const container = this.el.nativeElement;
    let nodes: DataSet<any>;
    let edges: DataSet<any>;
    let element:elementType = this.calcResult.getCalculateResult().element;
   
    Object.keys(element).forEach((key)=>{
      Object.keys(key).forEach((x)=>{
        let number=x;
      })
    })
    element.length
    if (this.isCalculated) {

    }
    else {
      nodes = new DataSet<any>([
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
      ]);
      
      edges = new DataSet<any>([
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]);
    }
   
    const data = { nodes, edges };

    this.networkInstance = new Network(container, data, {});
 }

}
