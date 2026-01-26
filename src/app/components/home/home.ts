/**
 * ============================================
 * 首頁元件 (Home Component)
 * ============================================
 *
 * 學習專案的首頁，提供導航和學習進度總覽
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface LearningModule {
  title: string;
  description: string;
  icon: string;
  route: string;
  status: 'available' | 'coming-soon';
  topics: string[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // 學習模組列表
  modules: LearningModule[] = [
    {
      title: '資料綁定 (Data Binding)',
      description: '學習 Angular 的四種資料綁定方式',
      icon: '🔗',
      route: '/data-binding',
      status: 'available',
      topics: ['插值綁定', '屬性綁定', '事件綁定', '雙向綁定', 'Signal']
    },
    {
      title: '指令 (Directives)',
      description: '掌握結構型和屬性型指令',
      icon: '📋',
      route: '/directives',
      status: 'available',
      topics: ['@if/@for/@switch', 'ngClass', 'ngStyle', '條件渲染', '迴圈渲染']
    },
    {
      title: 'Todo App 實戰',
      description: '第一個完整的 Angular 應用程式',
      icon: '✅',
      route: '/todo',
      status: 'available',
      topics: ['元件', '服務', '依賴注入', 'LocalStorage', 'CRUD 操作']
    },
    {
      title: '表單處理 (Forms)',
      description: '模板驅動與響應式表單',
      icon: '📝',
      route: '/forms',
      status: 'coming-soon',
      topics: ['模板驅動表單', '響應式表單', '表單驗證', '自訂驗證器']
    },
    {
      title: 'HTTP 通訊',
      description: '與後端 API 互動',
      icon: '🌐',
      route: '/http',
      status: 'coming-soon',
      topics: ['HttpClient', 'GET/POST 請求', '攔截器', '錯誤處理']
    },
    {
      title: 'RxJS 入門',
      description: '響應式程式設計基礎',
      icon: '🔄',
      route: '/rxjs',
      status: 'coming-soon',
      topics: ['Observable', '常用運算子', 'Subject', '訂閱管理']
    }
  ];

  // 學習資源連結
  resources = [
    { title: 'Angular 官方文件', url: 'https://angular.dev/', icon: '📖' },
    { title: 'Angular 教學', url: 'https://angular.dev/tutorials', icon: '🎓' },
    { title: 'TypeScript 文件', url: 'https://www.typescriptlang.org/docs/', icon: '📘' },
    { title: 'StackBlitz', url: 'https://stackblitz.com/', icon: '⚡' }
  ];

  // 取得可用模組數量
  get availableCount(): number {
    return this.modules.filter(m => m.status === 'available').length;
  }

  // 取得總模組數量
  get totalCount(): number {
    return this.modules.length;
  }
}
