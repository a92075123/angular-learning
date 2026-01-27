import {Component, effect, inject, input, output, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {Todo} from '../../../services/todo';
import {single} from 'rxjs';

/**
 * 共用待辦事項表格元件
 *
 * 透過 input 接收資料，可在多個頁面重複使用
 */
@Component({
  selector: 'app-todo-table',
  imports: [CommonModule, MatTableModule,MatIconModule,DragDropModule],
  templateUrl: './todo-table.html',
  styleUrl: './todo-table.css'
})
export class TodoTable {

  // 表格欄位定義
  displayedColumns = ['action','sort_no','todoTitle', 'todoContent'];

  //刪除
  deleteRequest = output<string>();
  // 儲存時通知父元件
  saveOrder = output<Todo[]>();
  // 待辦事項資料（由父元件傳入）
  todos = input<Todo[]>([]);
  // 內部可修改的排序副本
  orderedTodos = signal<Todo[]>([]);
  // 資料順序是否有被改變
  isDataLocationChange : boolean = false;

  // input 變動時同步
  constructor() {
    effect(() => {
      this.orderedTodos.set([...this.todos()]);
    });
  }
  //刪除按鈕事件
  onDeleteClick(id: string): void {
    this.deleteRequest.emit(id);
  }

  // 拖曳排序
  onChangeLocation(event: CdkDragDrop<Todo[]>): void {
    const data = [...this.orderedTodos()];
    moveItemInArray(data, event.previousIndex, event.currentIndex);
    this.orderedTodos.set(data);
    // 比對排序後的資料與原始資料順序是否一致
    const original = this.todos();
    this.isDataLocationChange = data.some((todo, index) => todo.id !== original[index].id);
  }
  // 儲存按鈕事件
  onSave(): void{
    this.saveOrder.emit(this.orderedTodos());
  }

}
