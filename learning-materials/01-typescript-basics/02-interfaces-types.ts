/**
 * ============================================
 * TypeScript 介面與類型別名
 * (Interfaces & Type Aliases)
 * ============================================
 */

// ============================================
// 1. 介面 (Interface) 基礎
// ============================================

// 定義物件的結構
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;        // 可選屬性（?）
    readonly createdAt: string;  // 唯讀屬性
}

// 使用介面
const user1: User = {
    id: 1,
    name: "小明",
    email: "ming@example.com",
    createdAt: "2024-01-01"
};

// age 是可選的，可以不提供
const user2: User = {
    id: 2,
    name: "小華",
    email: "hua@example.com",
    age: 25,
    createdAt: "2024-01-02"
};

console.log("=== 介面基礎 ===");
console.log("User 1:", user1);
console.log("User 2:", user2);


// ============================================
// 2. 介面擴展 (Interface Extension)
// ============================================

interface Person {
    name: string;
    age: number;
}

// 擴展 Person 介面
interface Employee extends Person {
    employeeId: string;
    department: string;
    salary: number;
}

const employee: Employee = {
    name: "王大明",
    age: 30,
    employeeId: "EMP001",
    department: "技術部",
    salary: 50000
};

console.log("\n=== 介面擴展 ===");
console.log("員工:", employee);

// 多重繼承
interface Manager extends Employee {
    teamSize: number;
    responsibilities: string[];
}


// ============================================
// 3. 類型別名 (Type Alias)
// ============================================

// 基本類型別名
type ID = string | number;
type Nullable<T> = T | null;

// 物件類型別名
type Product = {
    id: ID;
    name: string;
    price: number;
    description?: string;
};

const product: Product = {
    id: "PROD-001",
    name: "無線滑鼠",
    price: 599
};

console.log("\n=== 類型別名 ===");
console.log("產品:", product);


// ============================================
// 4. Interface vs Type 比較
// ============================================

// Interface - 可以重複宣告（自動合併）
interface Animal {
    name: string;
}
interface Animal {
    age: number;
}
// 現在 Animal 有 name 和 age 兩個屬性

const dog: Animal = {
    name: "小白",
    age: 3
};

// Type - 不能重複宣告
type Car = {
    brand: string;
};
// type Car = { model: string; }  // 錯誤！不能重複宣告

console.log("\n=== Interface vs Type ===");
console.log("動物 (Interface 合併):", dog);


// ============================================
// 5. 函式類型
// ============================================

// 使用 Interface
interface MathOperation {
    (a: number, b: number): number;
}

// 使用 Type
type MathFunc = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathFunc = (a, b) => a - b;

console.log("\n=== 函式類型 ===");
console.log("10 + 5 =", add(10, 5));
console.log("10 - 5 =", subtract(10, 5));


// ============================================
// 6. 索引簽名 (Index Signatures)
// ============================================

interface StringDictionary {
    [key: string]: string;
}

const translations: StringDictionary = {
    hello: "你好",
    goodbye: "再見",
    thanks: "謝謝"
};

// 混合索引簽名與具名屬性
interface Configuration {
    version: string;                    // 必須的具名屬性
    [setting: string]: string | number; // 其他設定
}

const config: Configuration = {
    version: "1.0.0",
    timeout: 3000,
    apiUrl: "https://api.example.com",
    maxRetries: 3
};

console.log("\n=== 索引簽名 ===");
console.log("翻譯:", translations);
console.log("設定:", config);


// ============================================
// 7. 交叉類型 (Intersection Types)
// ============================================

type HasName = {
    name: string;
};

type HasAge = {
    age: number;
};

type HasEmail = {
    email: string;
};

// 組合多個類型
type ContactInfo = HasName & HasAge & HasEmail;

const contact: ContactInfo = {
    name: "李小龍",
    age: 28,
    email: "lee@example.com"
};

console.log("\n=== 交叉類型 ===");
console.log("聯絡人:", contact);


// ============================================
// 8. 實用工具類型 (Utility Types)
// ============================================

// interface Todo {
//     id: number;
//     title: string;
//     completed: boolean;
//     createdAt: Date;
// }

// Partial<T> - 所有屬性變成可選
// type PartialTodo = Partial<Todo>;

// const updateData: PartialTodo = {
//     completed: true  // 只更新部分欄位
// };

// Required<T> - 所有屬性變成必須
// Pick<T, K> - 選擇特定屬性
// type TodoPreview = Pick<Todo, "id" | "title">;
//
// const preview: TodoPreview = {
//     id: 1,
//     title: "學習 TypeScript"
// };
//
// // Omit<T, K> - 排除特定屬性
// type TodoWithoutDates = Omit<Todo, "createdAt">;
//
// // Readonly<T> - 所有屬性變成唯讀
// type ReadonlyTodo = Readonly<Todo>;

// console.log("\n=== 實用工具類型 ===");
// console.log("部分更新:", updateData);
// console.log("預覽:", preview);


// ============================================
// 9. 條件類型與字面量類型
// ============================================

// 字面量類型 (Literal Types)
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type StatusCode = 200 | 201 | 400 | 404 | 500;

function makeRequest(method: HttpMethod, url: string): void {
    console.log(`發送 ${method} 請求到 ${url}`);
}

makeRequest("GET", "/api/users");
// makeRequest("PATCH", "/api/users"); // 錯誤！

// 模板字面量類型
type EventName = `on${Capitalize<"click" | "hover" | "focus">}`;
// 結果: "onClick" | "onHover" | "onFocus"


// ============================================
// 練習題
// ============================================

/*
練習 1: 定義介面
建立一個 Book 介面，包含：
- id: number
- title: string
- author: string
- publishedYear: number
- isbn?: string (可選)

練習 2: 介面擴展
建立 EBook 介面，擴展 Book，新增：
- fileSize: number
- format: "PDF" | "EPUB" | "MOBI"

練習 3: 類型別名
建立一個 ApiResponse 類型：
- success: boolean
- data: T (泛型)
- error?: string

解答在下方
*/

// ============================================
// 練習解答
// ============================================

// 練習 1
interface Book {
    id: number;
    title: string;
    author: string;
    publishedYear: number;
    isbn?: string;
}

// 練習 2
interface EBook extends Book {
    fileSize: number;
    format: "PDF" | "EPUB" | "MOBI";
}

const ebook: EBook = {
    id: 1,
    title: "TypeScript 入門",
    author: "程式大師",
    publishedYear: 2024,
    fileSize: 2048,
    format: "PDF"
};

// 練習 3
type ApiResponse<T> = {
    success: boolean;
    data: T;
    error?: string;
};

const userResponse: ApiResponse<User> = {
    success: true,
    data: {
        id: 1,
        name: "測試用戶",
        email: "test@example.com",
        createdAt: "2024-01-01"
    }
};

console.log("\n=== 練習解答 ===");
console.log("電子書:", ebook);
console.log("API 回應:", userResponse);
