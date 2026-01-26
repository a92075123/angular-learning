/**
 * ============================================
 * Angular 路由設定 (Routes Configuration)
 * ============================================
 *
 * 路由用於定義應用程式的導航結構
 * 每個路由對應一個 URL 路徑和要顯示的元件
 */

import { Routes } from '@angular/router';
import {CreateTodo} from './components/create-todo/create-todo';

// 使用延遲載入 (Lazy Loading) 來優化效能
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/home/home').then(m => m.Home)
  },
  {
    path: 'data-binding',
    loadComponent: () =>
      import('./components/data-binding-demo/data-binding-demo').then(m => m.DataBindingDemo)
  },
  {
    path: 'directives',
    loadComponent: () =>
      import('./components/directives-demo/directives-demo').then(m => m.DirectivesDemo)
  },
  {
    path: 'todo',
    loadComponent: () =>
      import('./components/todo-app/todo-app').then(m => m.TodoApp)
  },
  {
    path: 'create-todo',
    loadComponent: () =>
      import('./components/create-todo/create-todo').then(m => m.CreateTodo)
  },
  // 萬用路由 - 處理找不到的頁面
  {
    path: '**',
    redirectTo: ''
  }
];
