import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ArticleService} from '../../services/article-service';
import {UserService} from '../../services/user-service';
import {Article} from '../../interface/global';
import {marked} from 'marked';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.css'
})
export class ArticleDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articleService = inject(ArticleService);
  private userService = inject(UserService);
  private sanitizer = inject(DomSanitizer);

  article = signal<Article | null>(null);
  renderedContent = signal<SafeHtml>('');
  isLoggedIn = this.userService.isLoggedIn;
  currentUser = this.userService.currentUser;

  /** 判斷是否為文章作者 */
  get isAuthor(): boolean {
    const article = this.article();
    return !!article && this.currentUser() === article.author;
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadArticle(id);
    }
  }

  loadArticle(id: number) {
    this.articleService.getById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.article.set(res.data);
          this.renderMarkdown(res.data.content);
        }
      },
      error: () => this.router.navigate(['/articles'])
    });
  }

  /** 將 Markdown 轉為 HTML */
  async renderMarkdown(content: string) {
    const html = await marked(content);
    this.renderedContent.set(this.sanitizer.bypassSecurityTrustHtml(html));
  }

  /** 刪除文章 */
  deleteArticle() {
    const article = this.article();
    if (!article) return;
    if (!confirm('確定要刪除這篇文章嗎？')) return;

    this.articleService.delete(article.id).subscribe({
      next: () => this.router.navigate(['/articles']),
      error: (err) => console.error('刪除失敗', err)
    });
  }

  /** 格式化日期 */
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
