/**
 * ============================================
 * Todo 服務 (Service)
 * ============================================
 *
 * 服務是 Angular 中用於處理業務邏輯和資料的類別
 * 使用 @Injectable 裝飾器，可以被注入到元件中
 *
 * 這個服務示範：
 * 1. 基本的 CRUD 操作
 * 2. 使用 LocalStorage 持久化資料
 * 3. 使用 Signal 進行狀態管理
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// ============================================
// 介面定義 (Interface)
// ============================================
export interface Todo {
  id : Number;
  todoTitle: string;
  todoContent: string;
  sort_no: Number;
  create_at:string;
  update_at:string;
}


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
    return this.http.get<Todo[]>(this.apiUrl + "/getAll");
  }

  getOne(value:string) {
    if(!value.trim()) return this.getAll();
    return this.http.get<Todo[]>(this.apiUrl + `/getOne/${value}`);
  }

  // 新增代辦事項
  createTodo(todo: Object) {
    return this.http.post<Todo[]>(this.apiUrl + "/create", todo);
  }

  //編輯代辦事項
  editTodo(todo: Object) {
    return this.http.post(this.apiUrl + `/update`,todo);
  }

  //刪除代辦事項
  deleteTodo(id:string) {
    console.log("刪除代辦事項第" + id + "筆");
    return this.http.post(this.apiUrl + `/delete`,id);
  }

  //更新待辦事項項次
  updateTodoLocation(list:Todo[]) {
    return this.http.post(this.apiUrl + `/updateTodoLocation`,list);
  }


}
