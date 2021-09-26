//参考url：https://tsubakicraft.wordpress.com/2019/09/02/angular-material%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B7%E3%83%96%E5%AF%BE%E5%BF%9C%E3%81%AE%E3%83%8A%E3%83%93%E3%82%B2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  showFiller = false;
  isExpanded = false;
  constructor() { 
    
  }

  ngOnInit(): void {
  }
}
