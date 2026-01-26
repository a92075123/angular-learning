/**
 * ============================================
 * TypeScript 泛型 (Generics)
 * ============================================
 *
 * 泛型讓你可以建立可重用的元件，支援多種類型
 * Angular 中大量使用泛型，例如 Observable<T>
 */

// ============================================
// 1. 泛型函式基礎
// ============================================

// 不使用泛型的問題
function identityAny(arg: any): any {
    return arg;
}
// 失去類型資訊！回傳的是 any

// 使用泛型
function identity<T>(arg: T): T {
    return arg;
}

console.log("=== 泛型函式 ===");
// 明確指定類型
const str = identity<string>("Hello");
const num = identity<number>(42);

// 類型推斷（自動推斷）
const bool = identity(true);

console.log("字串:", str);
console.log("數字:", num);
console.log("布林:", bool);


// ============================================
// 2. 泛型陣列
// ============================================

function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

function getLastElement<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

// 交換陣列中兩個元素
function swap<T>(arr: T[], i: number, j: number): T[] {
    const newArr = [...arr];
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    return newArr;
}

console.log("\n=== 泛型陣列 ===");
const numbers = [1, 2, 3, 4, 5];
console.log("第一個:", getFirstElement(numbers));
console.log("最後一個:", getLastElement(numbers));
console.log("交換 0,4:", swap(numbers, 0, 4));


// ============================================
// 3. 多個泛型參數
// ============================================

function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

function mapObject<K extends string | number, V, R>(
    obj: Record<K, V>,
    fn: (value: V) => R
): Record<K, R> {
    const result = {} as Record<K, R>;
    for (const key in obj) {
        result[key] = fn(obj[key]);
    }
    return result;
}

console.log("\n=== 多個泛型參數 ===");
const p = pair("name", 42);
console.log("Pair:", p);

const prices = { apple: 30, banana: 20, orange: 25 };
const discounted = mapObject(prices, (price) => price * 0.9);
console.log("打折後:", discounted);


// ============================================
// 4. 泛型約束 (Generic Constraints)
// ============================================

// 約束泛型必須有 length 屬性
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(`長度: ${arg.length}`);
    return arg;
}

console.log("\n=== 泛型約束 ===");
logLength("Hello");      // 字串有 length
logLength([1, 2, 3]);    // 陣列有 length
logLength({ length: 10 }); // 物件有 length 屬性
// logLength(123);  // 錯誤！數字沒有 length

// 約束泛型必須是物件的鍵
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "小明", age: 25, email: "ming@example.com" };
console.log("取得 name:", getProperty(user, "name"));
console.log("取得 age:", getProperty(user, "age"));
// getProperty(user, "address");  // 錯誤！"address" 不是 user 的鍵


// ============================================
// 5. 泛型介面
// ============================================

// API 回應的通用介面
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    timestamp: Date;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
}

// 模擬 API 回應
const userResponse: ApiResponse<User> = {
    success: true,
    data: { id: 1, name: "小明", email: "ming@example.com" },
    timestamp: new Date()
};

const productResponse: ApiResponse<Product[]> = {
    success: true,
    data: [
        { id: "P001", name: "筆電", price: 35000 },
        { id: "P002", name: "手機", price: 25000 }
    ],
    timestamp: new Date()
};

console.log("\n=== 泛型介面 ===");
console.log("用戶回應:", userResponse);
console.log("產品回應:", productResponse);


// ============================================
// 6. 泛型類別
// ============================================

class DataStore<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return [...this.items];
    }

    getById(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }

    remove(predicate: (item: T) => boolean): boolean {
        const index = this.items.findIndex(predicate);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    count(): number {
        return this.items.length;
    }
}

console.log("\n=== 泛型類別 ===");

const userStore = new DataStore<User>();
userStore.add({ id: 1, name: "小明", email: "ming@example.com" });
userStore.add({ id: 2, name: "小華", email: "hua@example.com" });

console.log("所有用戶:", userStore.getAll());
console.log("找 id=1:", userStore.getById((u) => u.id === 1));
console.log("用戶數量:", userStore.count());


// ============================================
// 7. 預設泛型類型
// ============================================

interface PaginatedResult<T = any> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}

// 可以不指定類型，使用預設的 any
const result1: PaginatedResult = {
    items: ["a", "b", "c"],
    total: 100,
    page: 1,
    pageSize: 10
};

// 也可以明確指定
const result2: PaginatedResult<User> = {
    items: [{ id: 1, name: "小明", email: "ming@example.com" }],
    total: 50,
    page: 1,
    pageSize: 10
};


// ============================================
// 8. 常見的內建泛型類型
// ============================================

console.log("\n=== 內建泛型類型 ===");

// Partial<T> - 所有屬性變成可選
type PartialUser = Partial<User>;
const partialUser: PartialUser = { name: "只有名字" };

// Required<T> - 所有屬性變成必要
// Readonly<T> - 所有屬性變成唯讀
const readonlyUser: Readonly<User> = {
    id: 1,
    name: "小明",
    email: "ming@example.com"
};
// readonlyUser.name = "新名字";  // 錯誤！唯讀

// Pick<T, K> - 選擇特定屬性
type UserBasic = Pick<User, "id" | "name">;
const basic: UserBasic = { id: 1, name: "小明" };

// Omit<T, K> - 排除特定屬性
type UserWithoutEmail = Omit<User, "email">;
const noEmail: UserWithoutEmail = { id: 1, name: "小明" };

// Record<K, T> - 建立物件類型
type UserMap = Record<string, User>;
const users: UserMap = {
    user1: { id: 1, name: "小明", email: "ming@example.com" }
};

console.log("Partial:", partialUser);
console.log("Pick:", basic);
console.log("Record:", users);


// ============================================
// 9. 條件泛型類型
// ============================================

// 根據條件決定類型
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"

// 實用的條件類型
type NonNullable<T> = T extends null | undefined ? never : T;
type StringOrNumber = string | number | null | undefined;
type SafeType = NonNullable<StringOrNumber>;  // string | number

// 提取函式回傳類型
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

function greet(name: string): string {
    return `Hello, ${name}`;
}

type GreetReturn = ReturnTypeOf<typeof greet>;  // string


// ============================================
// 練習題
// ============================================

/*
練習 1: 泛型函式
建立一個 filterArray<T> 函式：
- 接受陣列和判斷函式
- 回傳符合條件的元素陣列

練習 2: 泛型類別
建立一個 Stack<T> 類別（堆疊）：
- push(item): 新增元素
- pop(): 移除並回傳頂端元素
- peek(): 回傳頂端元素（不移除）
- isEmpty(): 是否為空

練習 3: 泛型介面
建立一個 Cache<T> 介面：
- get(key): T | undefined
- set(key, value): void
- has(key): boolean
- delete(key): boolean

解答在下方
*/

// ============================================
// 練習解答
// ============================================

console.log("\n=== 練習解答 ===");

// 練習 1
function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
    return arr.filter(predicate);
}

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = filterArray(nums, (n) => n % 2 === 0);
console.log("偶數:", evens);

// 練習 2
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Stack peek:", stack.peek());
console.log("Stack pop:", stack.pop());
console.log("Stack size:", stack.size());

// 練習 3
interface Cache<T> {
    get(key: string): T | undefined;
    set(key: string, value: T): void;
    has(key: string): boolean;
    delete(key: string): boolean;
}

class MemoryCache<T> implements Cache<T> {
    private store = new Map<string, T>();

    get(key: string): T | undefined {
        return this.store.get(key);
    }

    set(key: string, value: T): void {
        this.store.set(key, value);
    }

    has(key: string): boolean {
        return this.store.has(key);
    }

    delete(key: string): boolean {
        return this.store.delete(key);
    }
}

const cache = new MemoryCache<User>();
cache.set("user1", { id: 1, name: "小明", email: "ming@example.com" });
console.log("Cache has user1:", cache.has("user1"));
console.log("Cache get user1:", cache.get("user1"));
