/**
 * ============================================
 * 根元件 (App Component)
 * ============================================
 *
 * 這是 Angular 應用程式的根元件
 * 負責整體佈局和導航
 */

import {Component, computed, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavItem} from "./interface/global";
import {UserService} from "./services/user-service";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private userService = inject(UserService);

  title = 'Angular 學習專案';

  // 基礎導航項目（私有）
  private baseNavItems: NavItem[] = [
    {label: '首頁', route: '/', exact: true},
    {label: '資料綁定', route: '/data-binding', exact: false},
    {label: '指令', route: '/directives', exact: false},
    {label: '代辦事項清單', route: '/todo', exact: false},
    {label: '登入', route: '/login', exact: false},
  ]

  // 導航項目
  navItems = computed(() => {
    let loginStatus = this.userService.isLoggedIn();
    //如果是登入狀態，登入 => 登出
    if (loginStatus) {
      return [
        ...this.baseNavItems.slice(0, -1)!,
        {label: '登出', route: '', exact: false, action: 'logout'}
      ]
    }
    return this.baseNavItems;
  })

  // 行動版選單開關
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  handleNavAction(action: string): void {
    if (action === 'logout') {
      this.userService.logout();
    }
  }
}
