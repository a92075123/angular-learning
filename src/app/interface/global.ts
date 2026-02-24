//代辦事項
export interface Todo {
  id: Number;
  todotitle: string;
  todocontent: string;
  createAt: string;
  updateAt: string;
  sort_no: Number;
}

//使用者
export interface User {
  email?: string,
  password: string,
  account: string
}

//Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

//文章
export interface Article {
  id: number;
  title: string;
  content: string;
  summary: string;
  author: string;
  category: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  view_count: number;
  created_at: string;
  updated_at: string;
}

//導覽器超連結
export interface NavItem {
  label: string;
  route: string;
  exact: boolean;
  action?: string;
}
