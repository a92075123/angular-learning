import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Todo, TodoService} from '../../services/todo';
import {MatDialog} from '@angular/material/dialog';
import {CreateTodoDialog} from './create-todo-dialog';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-create-todo',
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule],
  templateUrl: './create-todo.html',
  styleUrl: './create-todo.css',
})
export class CreateTodo {
  // 初始化彈跳視窗
  private dialog = inject(MatDialog);
  // 引入 todoService
  private todoService = inject(TodoService);

  // 表格欄位定義
  displayedColumns = ['id','todoTitle', 'todoContent'];

  // 待辦事項列表
  todos = signal<Todo[]>([]);

  // ID 計數器
  private nextId = 1;


  constructor() {
    this.todoService.getAll().subscribe({
      next:(result)=>{
        console.log(result)
        this.todos.set(result);
      },
    });
  }

  openCreateTodoDiaLog(): void {
    const dialogRef = this.dialog.open(CreateTodoDialog, {
      width: '800px',
      height: '500px'
    });

    // 關閉後新增待辦事項
    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   const newTodo: Todo = {
      //     id: this.nextId++,
      //     title: result.todoTitle(),
      //     content: result.todoContent()
      //   };
      //   //... 展開運算子，要產出新的陣列，Angular是用記憶體位置判斷是否要更新
      //   this.todos.update(list => [...list, newTodo]);
      // }
    });
  }

  // 刪除待辦事項
  deleteTodo(id: number): void {
    // this.todos.update(list => list.filter(todo => todo.id !== id));
  }
}
