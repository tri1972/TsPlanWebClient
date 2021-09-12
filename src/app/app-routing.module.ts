import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { GuardNameGuard } from './guard-name.guard';

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [GuardNameGuard] },
  { path: 'login-page', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//Webリロードについての対応 　<参考>　https://christina04.hatenablog.com/entry/2017/02/10/004253
  exports: [RouterModule]
})
export class AppRoutingModule { }
