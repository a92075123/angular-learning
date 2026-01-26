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

import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



// ============================================
// 介面定義 (Interface)
// ============================================
export interface Todo {
  todoTitle: string;
  todoContent: string;
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


  // 使用 Signal 管理狀態（Angular 16+ 推薦方式）
  private todosSignal = signal<Todo[]>([]);

  // ============================================
  // Computed Signals（衍生狀態）
  // ============================================

  // 取得所有待辦事項
  readonly todos = this.todosSignal.asReadonly();



  // 查詢全部
  getAll() {
    return this.http.get<Todo[]>(this.apiUrl + "/getAll");
  }

  // 新增代辦事項
  createTodo(todo: Todo) {
    console.log(this.apiUrl + "/create")
    return this.http.post<Todo[]>(this.apiUrl + "/create", todo);
  }


}
