import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../interface/global";
import {Router} from "@angular/router";


// ============================================
// 服務實作
// ============================================
@Injectable({
  providedIn: 'root'  // 全域單例服務
})
export class UserService {

  private router = inject(Router);

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/user/';

  //初始化localStorage
  private _currentUser = signal<string | null>(
      window.localStorage.getItem('auth-user')
  )

  //提供取得當下User的值
  readonly currentUser = this._currentUser.asReadonly();

  //設定User是否有登入
  readonly isLoggedIn = computed(() => this._currentUser() !== null);

  //檢查email是否重複
  checkEmail(email: string) {
    return this.http.get<{ exists: boolean }>(this.apiUrl + 'checkEmail?email=' + email)
  };

  //登入帳號
  login(data: User) {
    return this.http.post(this.apiUrl + 'login', data);
  }

  //註冊帳號
  create(data: User) {
    return this.http.post(this.apiUrl + 'create', data);
  }

  //設定登入狀態
  setLoggedIn(account: string) {
    window.localStorage.setItem('auth-user', account);
    this._currentUser.update(() => account);
  }

  //登出
  logout() {
    window.localStorage.removeItem('auth-user');
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }


}