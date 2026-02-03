import {Component, effect, input, output, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {Todo} from '../../../services/todo';

/**
 * 共用待辦事項表格元件
 *
 * 透過 input 接收資料，可在多個頁面重複使用
 */
@Component({
  selector: 'app-todo-table',
  imports: [CommonModule, MatTableModule, MatIconModule, DragDropModule],
  templateUrl: './todo-table.html',
  styleUrl: './todo-table.css'
})
export class TodoTable {

  // 表格欄位定義
  displayedColumns = ['action', 'sort_no', 'todotitle', 'todocontent'];

  //刪除
  deleteRequest = output<string>();
  //修改
  editRequest = output<Todo>();
  // 儲存時通知父元件
  saveOrder = output<Todo[]>();
  // 待辦事項資料（由父元件傳入）
  todos = input<Todo[]>([]);
  // 內部可修改的排序副本
  orderedTodos = signal<Todo[]>([]);
  // 資料順序是否有被改變
  isShowButton: boolean = false;

  constructor() {
    effect(() => {
      this.orderedTodos.set([...this.todos()]);
    });
  }

  //刪除按鈕事件
  onDeleteClick(id: string): void {
    this.deleteRequest.emit(id);
  }

  //修改按鈕事件
  onEditClick(todo: Todo): void {
    this.editRequest.emit(todo);
  }

  // 拖曳排序
  onChangeLocation(event: CdkDragDrop<Todo[]>): void {
    const data = [...this.orderedTodos()];
    moveItemInArray(data, event.previousIndex, event.currentIndex);
    data.flatMap((item, index) => {
      item.sort_no = index + 1;
    });

    this.orderedTodos.set(data);
    // 比對排序後的資料與原始資料順序是否一致
    const original = this.todos();
    this.isShowButton = data.some((todo, index) => todo.id !== original[index].id);
  }

  // 儲存按鈕事件
  onSave(): void {
    this.saveOrder.emit(this.orderedTodos());
  }

}
