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
  email: string,
  password: string,
  account: string
}

//Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}