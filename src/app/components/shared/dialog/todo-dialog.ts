import {Component, inject, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {Todo, TodoService} from '../../../services/todo';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

// 定義傳入資料的型別
interface DialogData {
  jsonData: Todo;
  mode: string;
}

@Component({
  selector: 'app-create-todo-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  styleUrl: './todo-dialog.css',
  template: `
    <div class="dialog-wrapper">
      <h2 mat-dialog-title>{{ mode() === 'edit' ? '修改' : '新增' }}代辦事項</h2>
      <mat-dialog-content class="dialog-content">
        <br>
        <mat-form-field appearance="outline">
          <mat-label>標題</mat-label>
          <input matInput [(ngModel)]="todotitle" placeholder="輸入代辦事項標題">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>內容</mat-label>
          <textarea matInput [(ngModel)]="todocontent" placeholder="輸入代辦事項內容"
                    rows="4"></textarea>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-flat-button color="primary" (click)="save()">儲存</button>
        <button mat-button mat-dialog-close>取消</button>
      </mat-dialog-actions>
    </div>
  `
})

export class TodoDialog {

  //初始化
  private dialogRef = inject(MatDialogRef<TodoDialog>);

  //代辦事項後端
  private todoService = inject(TodoService);

  //傳進來的資料
  private data = inject<DialogData>(MAT_DIALOG_DATA);

  //判斷 編輯/新增
  mode = signal(this.data.mode);

  //代辦事項標題
  todotitle: string = this.data.jsonData?.todotitle ?? '';

  //代辦事項內容
  todocontent: string = this.data.jsonData?.todocontent ?? '';


  save(): void {
    const data = {
      id: this.data.jsonData?.id,
      todotitle: this.todotitle,
      todocontent: this.todocontent,
    };
    const request = this.mode() === 'edit'
        ? this.todoService.editTodo(data)
        : this.todoService.createTodo(data);

    request.subscribe({
      error: () => console.error('呼叫API失敗'),
      complete: () => this.dialogRef.close(),
    });
  }

}
