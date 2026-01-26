import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Todo, TodoService} from '../../services/todo';
import {MatDialog} from '@angular/material/dialog';
import {CreateTodoDialog} from './create-todo-dialog';
import {MatButtonModule} from '@angular/material/button';
import {TodoTable} from '../shared/todo-table/todo-table';


@Component({
  selector: 'app-create-todo',
  imports: [CommonModule, FormsModule, MatButtonModule, TodoTable],
  templateUrl: './create-todo.html',
  styleUrl: './create-todo.css',
})
export class CreateTodo {
  // 初始化彈跳視窗
  private dialog = inject(MatDialog);
  // 引入 todoService
  private todoService = inject(TodoService);

  // 待辦事項列表
  todos = signal<Todo[]>([]);



  constructor() {
    this.loadTodos();
  }

  // 從後端取得待辦事項列表
  private loadTodos(): void {
    this.todoService.getAll().subscribe(result=>{
      this.todos.set(result);
    });
  }

  openCreateTodoDiaLog(): void {
    const dialogRef = this.dialog.open(CreateTodoDialog, {
      width: '800px',
      height: '500px'
    });

    // 關閉後重新取得待辦事項列表
    dialogRef.afterClosed().subscribe(() => {
      this.loadTodos();
    });
  }

  // 刪除待辦事項
  deleteTodo(id: number): void {
    // this.todos.update(list => list.filter(todo => todo.id !== id));
  }
}
