import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse, Todo} from "../interface/global";


// ============================================
// 服務實作
// ============================================
@Injectable({
  providedIn: 'root'  // 全域單例服務
})
export class TodoService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/todos';


  // ============================================
  // Computed Signals（衍生狀態）
  // ============================================

  // 查詢全部
  getAll() {
    // // 從 localStorage 拿到登入時存起來的 token
    // const token = localStorage.getItem('user-token');
    //
    // // 建立 Headers，注意格式通常是 "Bearer " + token
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });
    return this.http.get<ApiResponse<Todo[]>>(this.apiUrl + "/getAll");
  }

  getOne(value: string) {
    if (!value.trim()) return this.getAll();
    return this.http.get<ApiResponse<Todo[]>>(this.apiUrl + `/getOne/${value}`);
  }

  // 新增代辦事項
  createTodo(todo: Object) {
    return this.http.post<Todo[]>(this.apiUrl + "/create", todo);
  }

  //編輯代辦事項
  editTodo(todo: Object) {
    return this.http.post(this.apiUrl + `/update`, todo);
  }

  //刪除代辦事項
  deleteTodo(id: string) {
    console.log("刪除代辦事項第" + id + "筆");
    return this.http.post(this.apiUrl + `/delete`, id);
  }

  //更新待辦事項項次
  updateTodoLocation(list: Todo[]) {
    return this.http.post(this.apiUrl + `/updateTodoLocation`, list);
  }


}
