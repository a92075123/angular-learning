/**
 * ============================================
 * 首頁元件 (Home Component)
 * ============================================
 *
 * 文章部落格首頁，顯示最新文章和平台介紹
 */

import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ArticleService} from '../../services/article-service';
import {UserService} from '../../services/user-service';
import {Article, Todo} from '../../interface/global';
import {TodoService} from "../../services/todo-service";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private articleService = inject(ArticleService);
  private todoService = inject(TodoService);
  private userService = inject(UserService);

  /** 最新文章列表 */
  latestArticles = signal<Article[]>([]);
  /** 個人代辦事項列表 */
  todoList = signal<Todo[]>([]);
  isLoggedIn = this.userService.isLoggedIn;

  /** 平台特色 */
  features = [
    {icon: '📝', title: 'Markdown 撰寫', desc: '使用 Markdown 語法輕鬆撰寫文章，即時預覽效果'},
    {icon: '🔍', title: '自由瀏覽', desc: '所有文章公開瀏覽，無需登入即可閱讀'},
    {icon: '🔒', title: '安全發文', desc: '登入後即可發布、編輯和管理自己的文章'},
    {icon: '📊', title: '瀏覽統計', desc: '每篇文章自動記錄瀏覽次數'}
  ];

  ngOnInit() {
    this.loadLatestArticles();
    if (this.isLoggedIn()) {
      this.loadLatestTodoList();
    }

  }

  /** 文章 */
  loadLatestArticles() {
    this.articleService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          // 只取前 6 篇最新文章
          this.latestArticles.set(res.data.slice(0, 6));
        }
      }
    });
  }

  /** 代辦事項 */
  loadLatestTodoList() {
    this.todoService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          // 只取前 6 篇最新文章
          this.todoList.set(res.data.slice(0, 6));
        }
      }
    });
  }

  /** 格式化日期 */
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}
