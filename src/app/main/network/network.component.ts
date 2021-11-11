import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Network, DataSet } from 'vis';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  } /**
  * 以下、参考url
  * https://stackoverflow.com/questions/51418587/how-to-make-network-visualization-work-in-vis-js-with-angular
  */
 @ViewChild('network') el: ElementRef;
 private networkInstance: any;

 ngAfterViewInit() {
    const container = this.el.nativeElement;
    const nodes = new DataSet<any>([
       {id: 1, label: 'Node 1'},
       {id: 2, label: 'Node 2'},
       {id: 3, label: 'Node 3'},
       {id: 4, label: 'Node 4'},
       {id: 5, label: 'Node 5'}
   ]);

   const edges = new DataSet<any>([
       {from: 1, to: 3},
       {from: 1, to: 2},
       {from: 2, to: 4},
       {from: 2, to: 5}
   ]);
   const data = { nodes, edges };

   this.networkInstance = new Network(container, data, {});
 }

}
