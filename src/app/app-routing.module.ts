import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { GuardNameGuard } from './guard-name.guard';
import {ExplainComponent} from './explain/explain.component';
import { ExampleComponent } from './example/example.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, canActivate: [GuardNameGuard] },
  { path: 'login-page', component: LoginComponent },
  { path: 'explain', component: ExplainComponent },
  { path: 'example', component: ExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],//Webリロードについての対応 　<参考>　https://christina04.hatenablog.com/entry/2017/02/10/004253
  exports: [RouterModule]
})
export class AppRoutingModule { }
