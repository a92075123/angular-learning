/**
 * ============================================
 * 根元件 (App Component)
 * ============================================
 *
 * 這是 Angular 應用程式的根元件
 * 負責整體佈局和導航
 */

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Angular 學習專案';

  // 導航項目
  navItems = [
    { label: '首頁', route: '/', exact: true },
    { label: '資料綁定', route: '/data-binding', exact: false },
    { label: '指令', route: '/directives', exact: false },
    { label: '代辦事項清單', route: '/todo', exact: false },
    { label: '登入', route: '/login', exact: false },
  ];

  // 行動版選單開關
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
