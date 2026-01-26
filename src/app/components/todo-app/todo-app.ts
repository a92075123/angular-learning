/**
 * ============================================
 * Todo App 元件 (Component)
 * ============================================
 *
 * 這是學習計劃中的第一個實戰專案
 * 學習目標：元件、資料綁定、指令、服務與依賴注入
 *
 * 功能：
 * - 新增/刪除/編輯待辦事項
 * - 標記完成/未完成
 * - 篩選（全部/進行中/已完成）
 * - LocalStorage 持久化
 */

import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TodoService, Todo} from '../../services/todo';
import {TodoTable} from '../shared/todo-table/todo-table';

@Component({
  selector: 'app-todo-app',
  imports: [CommonModule, FormsModule, TodoTable],
  templateUrl: './todo-app.html',
  styleUrl: './todo-app.css'
})
export class TodoApp {
  // ============================================
  // 依賴注入 (Dependency Injection)
  // ============================================
  // 使用 inject() 函式注入服務（Angular 14+ 推薦方式）
  private todoService = inject(TodoService);

  todos = signal<Todo[]>([]);

  constructor() {
    this.getTodoList();
  }

  getTodoList() {
     this.todoService.getAll().subscribe(result=>{
       this.todos.set(result);
     });
  }

  searchTodoGetOne(value: string) {
    this.todoService.getOne(value).subscribe(result =>{
      this.todos.set(result);
    });
  }

}
