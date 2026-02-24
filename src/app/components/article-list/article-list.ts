import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {ArticleService} from '../../services/article-service';
import {UserService} from '../../services/user-service';
import {Article} from '../../interface/global';

@Component({
  selector: 'app-article-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css'
})
export class ArticleList implements OnInit {

  private articleService = inject(ArticleService);
  private userService = inject(UserService);

  /** 所有文章原始資料 */
  allArticles = signal<Article[]>([]);
  isLoggedIn = this.userService.isLoggedIn;

  /** 篩選條件 */
  searchKeyword = signal('');
  selectedCategory = signal('');
  selectedVisibility = signal('');

  /** 從文章資料中動態取得所有分類選項 */
  categories = computed(() => {
    const cats = this.allArticles()
      .map(a => a.category)
      .filter(c => !!c);
    return [...new Set(cats)].sort();
  });

  /** 篩選後的文章列表 */
  articles = computed(() => {
    let list = this.allArticles();
    const keyword = this.searchKeyword().trim().toLowerCase();
    const category = this.selectedCategory();
    const visibility = this.selectedVisibility();

    // 模糊查詢：標題
    if (keyword) {
      list = list.filter(a => a.title?.toLowerCase().includes(keyword));
    }

    // 分類篩選
    if (category) {
      list = list.filter(a => a.category === category);
    }

    // 可見性篩選
    if (visibility) {
      list = list.filter(a => a.visibility === visibility);
    }

    return list;
  });

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.allArticles.set(res.data);
        }
      },
      error: (err) => console.error('載入文章失敗', err)
    });
  }

  /** 清除所有篩選條件 */
  clearFilters() {
    this.searchKeyword.set('');
    this.selectedCategory.set('');
    this.selectedVisibility.set('');
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
