import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginUser } from '../service/login/interfaces/login-user';
import { AuthParam } from '../service/auth-param';
import { LoginService } from '../service/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import applConfig from '../../ApplicationConfig.json'
//import { AccountDataService} from '../service/accoutData/account-data.service'
import {RouterOutputService} from '../service/router-output/router-output.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "ログインページ";

  blnPassVisible: boolean = true;
  blnLoading: boolean = false;
  strNextPage: string = '';
  strLoadingMsg: string = "ログイン処理中です";
  errors: string[] = [];


  loginForm = this.fb.group({
    user: [''],
    password: [''],
  });

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private loginService: LoginService, 
    private fb: FormBuilder,
    //private accountService:AccountDataService,
    private routerService :RouterOutputService) { }

  ngOnInit(): void {

    //ActivatedRouteを使ってログイン成功時の移動先を取得します。
    if (this.route.snapshot.queryParams.hasOwnProperty('url')) {
      this.strNextPage = this.route.snapshot.queryParams.url;
    } else {
      this.strNextPage = "/home";
    }
    this.routerService.isHiddenTitleAndSideMenu.next(false);
  }

  login(): void {

    //エラー配列クリア
    this.errors = [];

    if (this.loginForm.value.user === '') this.errors.push("ユーザー名を空白にはできません");

    if (this.loginForm.value.password === '') this.errors.push("パスワードを空白にはできません");

    //この段階でエラーなら戻る
    if (0 < this.errors.length) {
      return;
    }

    //サービスからObservableを取得
    const user: Observable<any> = this.loginService.login(this.loginForm.value.user, this.loginForm.value.password);


    //Wait画面の表示
    this.blnLoading = true;

    //処理実行
    user.subscribe(
      (auth) => {
        let loginUser: LoginUser
          = {
          user: this.loginForm.value.user,
          password: this.loginForm.value.password,
          login: false,
        }

        if (auth.token != undefined) {
          loginUser.login = true;

        } else {
          loginUser.login = false;
        }
        let token = auth.token;
        //Wait画面を消す
        this.blnLoading = false;

        if (loginUser.login) {
          //ログインの有効期限をlocalStorageにセットします。loginTokenLimit
          var test=applConfig.loginTokenLimit ;
          localStorage.setItem('tokenlimit', String(Date.now() + applConfig.loginTokenLimit * 1000));
          localStorage.setItem('user',loginUser.user);
          localStorage.setItem('pass',loginUser.password);
          localStorage.setItem('token',token);

          //this.accountService.setId(loginUser.user);
          //this.accountService.setToken(token);
          //ログインページを呼び出した元へ戻る
          this.router.navigateByUrl(this.strNextPage);
        } else {
          //認証失敗時はローカルストレージのデータもクリアします。
          localStorage.removeItem('tokenlimit');
          this.errors.push("Tokenが取得できませんでした");
        }
      },
      (error) => {
        //エラーは通信エラー時に返ようにします。
        //リトライ時の整合性を崩さないようにステータスはなにも変えません。

        //Wait画面を消す
        this.blnLoading = false;

        if(error="User name or password is incorrect." ){
          //認証失敗時はローカルストレージのデータもクリアします。
          localStorage.removeItem('tokenlimit');
          this.errors.push("ユーザーIDまたはパスワードが不正です");
        }else{
          console.log(error);
          this.errors.push("通信エラーが発生しました");

        }
      }
    );
  }
}
