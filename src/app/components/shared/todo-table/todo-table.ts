import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Todo } from '../../../services/todo';

/**
 * 共用待辦事項表格元件
 *
 * 透過 input 接收資料，可在多個頁面重複使用
 */
@Component({
  selector: 'app-todo-table',
  imports: [CommonModule, MatTableModule],
  templateUrl: './todo-table.html',
  styleUrl: './todo-table.css'
})
export class TodoTable {
  // 待辦事項資料（由父元件傳入）
  todos = input<Todo[]>([]);

  // 表格欄位定義
  displayedColumns = ['id','todoTitle', 'todoContent'];
}
