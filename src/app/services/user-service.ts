import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../interface/global";


// ============================================
// 服務實作
// ============================================
@Injectable({
  providedIn: 'root'  // 全域單例服務
})
export class UserService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/user/';

  //檢查email是否重複
  checkEmail(email: string) {
    return this.http.get<{ exists: boolean }>(this.apiUrl + 'checkEmail?email=' + email)
  };

  //註冊帳號
  create(data: User) {
    return this.http.post(this.apiUrl + 'create', data);
  }

}