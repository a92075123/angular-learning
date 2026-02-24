import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse, Article} from '../interface/global';

/**
 * 文章服務
 * 處理文章 CRUD API 呼叫
 */
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/articles';

  /** 取得所有文章列表 */
  getAll() {
    return this.http.get<ApiResponse<Article[]>>(this.apiUrl);
  }

  /** 取得單篇文章 */
  getById(id: number) {
    return this.http.get<ApiResponse<Article>>(`${this.apiUrl}/${id}`);
  }

  /** 新增文章 */
  create(article: Partial<Article>) {
    return this.http.post<ApiResponse<string>>(this.apiUrl, article);
  }

  /** 更新文章 */
  update(id: number, article: Partial<Article>) {
    return this.http.put<ApiResponse<string>>(`${this.apiUrl}/${id}`, article);
  }

  /** 刪除文章 */
  delete(id: number) {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
  }
}
