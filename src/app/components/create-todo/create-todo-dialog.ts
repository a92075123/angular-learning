import {Component, inject, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {Todo, TodoService} from '../../services/todo';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-create-todo-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  styleUrl: './create-todo.css',
  template: `
    <div class="dialog-wrapper">
      <h2 mat-dialog-title>新增代辦事項</h2>

      <mat-dialog-content class="dialog-content">
        <br>
        <mat-form-field appearance="outline">
          <mat-label>標題</mat-label>
          <input matInput [(ngModel)]="todoTitle" placeholder="輸入代辦事項標題">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>內容</mat-label>
          <textarea matInput [(ngModel)]="todoContent" placeholder="輸入代辦事項內容" rows="4"></textarea>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-flat-button color="primary" (click)="create()">新增</button>
        <button mat-button mat-dialog-close>取消</button>
      </mat-dialog-actions>
    </div>
  `
})

export class CreateTodoDialog {


  //初始化
  private dialogRef = inject(MatDialogRef<CreateTodoDialog>);

  //代辦事項後端
  private todoService = inject(TodoService);

  //代辦事項標題
  todoTitle = signal('');

  //代辦事項內容
  todoContent = signal('');


  create(): void {
    // 關閉 Dialog 並回傳資料
    let data : Todo = {
      todoTitle: this.todoTitle(),
      todoContent: this.todoContent()
    }
    this.todoService.createTodo(data).subscribe({
      next:(result)=>{
        console.log(result)
      },
      error:()=>{
        console.error("呼叫API失敗");
      },
      complete:()=>{
        console.log("API已完成")
      }
    });

  }

}
