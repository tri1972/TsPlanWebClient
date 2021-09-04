import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'main',component:MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],//Webリロードについての対応　<参考>　https://christina04.hatenablog.com/entry/2017/02/10/004253
  exports: [RouterModule]
})
export class AppRoutingModule { }
