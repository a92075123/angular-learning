/**
 * ============================================
 * Angular 指令示範 (Directives Demo)
 * ============================================
 *
 * Angular 指令分為三種類型：
 * 1. 結構型指令 (Structural Directives): *ngIf, *ngFor, *ngSwitch
 *    - 會改變 DOM 結構（新增/移除元素）
 *    - Angular 17+ 新語法: @if, @for, @switch
 *
 * 2. 屬性型指令 (Attribute Directives): ngClass, ngStyle
 *    - 改變元素的外觀或行為
 *
 * 3. 自訂指令 (Custom Directives)
 *    - 可建立自己的指令
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 定義介面
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface User {
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
}

@Component({
  selector: 'app-directives-demo',
  imports: [CommonModule, FormsModule],
  templateUrl: './directives-demo.html',
  styleUrl: './directives-demo.css'
})
export class DirectivesDemo {
  // ============================================
  // @if / *ngIf 範例
  // ============================================
  isLoggedIn = signal(false);
  showDetails = signal(false);
  currentUser: User | null = null;
  loginTime = new Date();

  toggleLogin(): void {
    this.isLoggedIn.update(v => !v);
    if (this.isLoggedIn()) {
      this.currentUser = {
        name: '王小明',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
      };
    } else {
      this.currentUser = null;
    }
  }

  toggleDetails(): void {
    this.showDetails.update(v => !v);
  }

  // ============================================
  // @for / *ngFor 範例
  // ============================================
  products: Product[] = [
    { id: 1, name: 'MacBook Pro', price: 59900, category: '電腦', inStock: true },
    { id: 2, name: 'iPhone 15', price: 35900, category: '手機', inStock: true },
    { id: 3, name: 'AirPods Pro', price: 7490, category: '配件', inStock: false },
    { id: 4, name: 'iPad Air', price: 19900, category: '平板', inStock: true },
    { id: 5, name: 'Apple Watch', price: 12900, category: '穿戴', inStock: true }
  ];

  colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];

  // 追蹤函式（優化效能）
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  addProduct(): void {
    const newId = this.products.length + 1;
    this.products.push({
      id: newId,
      name: `新產品 ${newId}`,
      price: Math.floor(Math.random() * 10000) + 1000,
      category: '其他',
      inStock: Math.random() > 0.5
    });
  }

  removeProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }

  // ============================================
  // @switch / *ngSwitch 範例
  // ============================================
  selectedView: 'grid' | 'list' | 'table' = 'grid';
  userRole: 'admin' | 'editor' | 'viewer' = 'viewer';

  setView(view: 'grid' | 'list' | 'table'): void {
    this.selectedView = view;
  }

  setRole(role: 'admin' | 'editor' | 'viewer'): void {
    this.userRole = role;
  }

  // ============================================
  // ngClass / ngStyle 範例
  // ============================================
  isActive = false;
  isPrimary = true;
  isLarge = false;

  dynamicStyles = {
    'font-size': '16px',
    'color': '#333',
    'background-color': '#f5f5f5'
  };

  fontSize = 14;
  bgColor = '#ffffff';
  textColor = '#333333';

  toggleActive(): void {
    this.isActive = !this.isActive;
  }

  toggleSize(): void {
    this.isLarge = !this.isLarge;
    this.fontSize = this.isLarge ? 24 : 14;
  }

  // ============================================
  // @empty 和 @else 範例 (Angular 17+)
  // ============================================
  searchTerm = '';
  emptyList: string[] = [];

  get filteredProducts(): Product[] {
    if (!this.searchTerm.trim()) return this.products;
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
