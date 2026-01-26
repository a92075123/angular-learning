/**
 * ============================================
 * Angular 資料綁定示範 (Data Binding Demo)
 * ============================================
 *
 * Angular 有四種資料綁定方式：
 * 1. 插值 (Interpolation): {{ expression }}
 * 2. 屬性綁定 (Property Binding): [property]="expression"
 * 3. 事件綁定 (Event Binding): (event)="handler($event)"
 * 4. 雙向綁定 (Two-way Binding): [(ngModel)]="property"
 */

import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding-demo',
  imports: [CommonModule, FormsModule],
  templateUrl: './data-binding-demo.html',
  styleUrl: './data-binding-demo.css'
})
export class DataBindingDemo {
  // ============================================
  // 1. 插值綁定用的屬性
  // ============================================
  title = '資料綁定教學';
  currentDate = new Date();
  price = 2000;
  discount = 0.8;

  // 使用 Signal（Angular 16+ 推薦的響應式方式）
  counter = signal(0);

  // Computed Signal（根據其他 signal 自動計算）
  doubleCounter = computed(() => this.counter() * 2);

  // ============================================
  // 2. 屬性綁定用的屬性
  // ============================================
  imageUrl = 'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png';
  imageAlt = 'Angular Logo';
  isButtonDisabled = false;
  inputPlaceholder = '請輸入文字...';

  // ============================================
  // 3. 事件綁定用的方法
  // ============================================
  handleClick(): void {
    alert('按鈕被點擊了！');
  }

  increment(): void {
    // 更新 Signal 的值
    this.counter.update(value => value + 1);
  }

  decrement(): void {
    this.counter.update(value => value - 1);
  }

  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('輸入值:', input.value);
  }

  handleKeyup(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      console.log('按下 Enter 鍵');
    }
  }

  // ============================================
  // 4. 雙向綁定用的屬性
  // ============================================
  userName = '';
  selectedColor = 'red';
  isChecked = false;
  sliderValue = 50;

  // ============================================
  // 進階：樣式與類別綁定
  // ============================================
  isHighlighted = false;
  fontSize = 16;
  textColor = '#333';

  toggleHighlight(): void {
    this.isHighlighted = !this.isHighlighted;
  }

  toggleButton(): void {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

  // 計算屬性（getter）
  get formattedPrice(): string {
    return `NT$ ${(this.price * this.discount).toLocaleString()}`;
  }

  get counterStatus(): string {
    const value = this.counter();
    if (value > 5) return '數值偏高';
    if (value < -5) return '數值偏低';
    return '數值正常';
  }
}
