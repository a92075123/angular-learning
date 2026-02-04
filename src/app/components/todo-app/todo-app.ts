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
import {TodoTable} from '../shared/todo-table/todo-table';
import {TodoDialog} from '../shared/dialog/todo-dialog';
import {MatDialog} from '@angular/material/dialog';
import {TodoService} from '../../services/todo-service';
import {Todo} from '../../interface/global';

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

  // 初始化彈跳視窗
  private dialog = inject(MatDialog);


  todos = signal<Todo[]>([]);

  //初始化
  constructor() {
    this.getTodoList();
  }

  //取得代辦事項資料
  getTodoList() {
    this.todoService.getAll().subscribe(result => {
      this.todos.set(result.data);
    });
  }

  //搜尋代辦事項
  searchTodoGetOne(value: string) {
    this.todoService.getOne(value).subscribe(result => {
      this.todos.set(result.data);
    });
  }

  //刪除代辦事項
  deleteTodo(id: string): void {
    const isDelete = window.confirm("是否要刪除");
    if (!isDelete) return;
    this.todoService.deleteTodo(id).subscribe({
      complete: () => {
        alert("刪除成功!!")
        this.getTodoList();
      }
    });
  }

  editTodo(todo: Todo) {
    this.openTodoDiaLog(todo, "edit");
  }

  //更新代辦事項的項次
  updateLocation(list: Todo[]) {
    this.todoService.updateTodoLocation(list).subscribe({
      complete: () => {
        alert("更新成功!!")
        this.getTodoList();
      }
    });
  }

  //開啟新增彈跳視窗
  openTodoDiaLog(todo?: Todo, mode: string = "create"): void {
    const dialogRef = this.dialog.open(TodoDialog, {
      width: '800px',
      height: '500px',
      data: {
        jsonData: todo,
        mode: mode
      }
    });

    dialogRef.afterClosed().subscribe({
      complete: () => {
        this.getTodoList();
      }
    })
  }
}
