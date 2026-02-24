import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../services/article-service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-article-editor',
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule],
  templateUrl: './article-editor.html',
  styleUrl: './article-editor.css'
})
export class ArticleEditor implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articleService = inject(ArticleService);
  private sanitizer = inject(DomSanitizer);

  /** 是否為編輯模式 */
  isEditMode = false;
  articleId: number | null = null;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    summary: ['', [Validators.maxLength(500)]],
    category: [''],
    visibility: ['PUBLIC'],
    content: ['', [Validators.required]]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.articleId = Number(id);
      this.loadArticle(this.articleId);
    }
  }

  /** 載入文章資料（編輯模式） */
  loadArticle(id: number) {
    this.articleService.getById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.form.patchValue({
            title: res.data.title,
            summary: res.data.summary,
            category: res.data.category,
            visibility: res.data.visibility || 'PUBLIC',
            content: res.data.content
          });
        }
      },
      error: () => this.router.navigate(['/articles'])
    });
  }


  /** 提交表單 */
  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.isEditMode && this.articleId) {
      this.articleService.update(this.articleId, data).subscribe({
        next: () => this.router.navigate(['/articles', this.articleId]),
        error: (err) => console.error('更新失敗', err)
      });
    } else {
      this.articleService.create(data).subscribe({
        next: () => this.router.navigate(['/articles']),
        error: (err) => console.error('新增失敗', err)
      });
    }
  }

  /** 取消編輯 */
  cancel() {
    if (this.isEditMode && this.articleId) {
      this.router.navigate(['/articles', this.articleId]);
    } else {
      this.router.navigate(['/articles']);
    }
  }
}
