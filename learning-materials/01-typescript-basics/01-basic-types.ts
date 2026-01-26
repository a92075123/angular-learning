/**
 * ============================================
 * TypeScript 基礎類型 (Basic Types)
 * ============================================
 *
 * 執行方式：
 * 1. 安裝 ts-node: npm install -g ts-node
 * 2. 執行: ts-node 01-basic-types.ts
 *
 * 或使用 TypeScript Playground: https://www.typescriptlang.org/play
 */

// ============================================
// 1. 基本類型宣告
// ============================================

// string - 字串
let userName: string = "小明";
let greeting: string = `你好，${userName}！`; // 模板字串

// number - 數字（整數和浮點數都是 number）
let age: number = 25;
let price: number = 99.99;
let hexNumber: number = 0xff; // 十六進位

// boolean - 布林值
let isActive: boolean = true;
let hasPermission: boolean = false;

console.log("=== 基本類型 ===");
console.log(`姓名: ${userName}, 年齡: ${age}, 啟用: ${isActive}`);


// ============================================
// 2. 陣列 (Array)
// ============================================

// 方式一：類型[]
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["蘋果", "香蕉", "橘子"];

// 方式二：Array<類型> (泛型語法)
let scores: Array<number> = [85, 90, 78];

console.log("\n=== 陣列 ===");
console.log("數字陣列:", numbers);
console.log("水果陣列:", fruits);


// ============================================
// 3. 元組 (Tuple) - 固定長度和類型的陣列
// ============================================

let person: [string, number] = ["小華", 30];
let coordinate: [number, number, number] = [10, 20, 30]; // x, y, z

console.log("\n=== 元組 ===");
console.log(`人員: ${person[0]}, 年齡: ${person[1]}`);


// ============================================
// 4. 列舉 (Enum)
// ============================================

// 數字列舉
enum Direction {
    Up = 1,
    Down,    // 自動為 2
    Left,    // 自動為 3
    Right    // 自動為 4
}

// 字串列舉
enum Status {
    Pending = "PENDING",
    Approved = "APPROVED",
    Rejected = "REJECTED"
}

let currentDirection: Direction = Direction.Up;
let orderStatus: Status = Status.Pending;

console.log("\n=== 列舉 ===");
console.log("方向:", currentDirection, Direction[currentDirection]);
console.log("訂單狀態:", orderStatus);


// ============================================
// 5. any 與 unknown
// ============================================

// any - 任意類型（盡量避免使用，會失去型別檢查）
let anything: any = "hello";
anything = 123;
anything = true;

// unknown - 更安全的 any，使用前需要類型檢查
let unknownValue: unknown = "這是未知類型";

// 使用 unknown 前需要類型檢查
if (typeof unknownValue === "string") {
    console.log("\n=== any 與 unknown ===");
    console.log("unknown 字串長度:", unknownValue.length);
}


// ============================================
// 6. void, null, undefined
// ============================================

// void - 沒有返回值的函式
function logMessage(message: string): void {
    console.log(message);
}

// null 和 undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// 可選屬性常用 undefined
let optionalName: string | undefined = undefined;


// ============================================
// 7. 聯合類型 (Union Types)
// ============================================

// 變數可以是多種類型之一
let id: string | number;
id = "ABC123";
id = 12345;

// 函式參數使用聯合類型
function formatId(id: string | number): string {
    if (typeof id === "string") {
        return id.toUpperCase();
    }
    return id.toString().padStart(6, "0");
}

console.log("\n=== 聯合類型 ===");
console.log("格式化 ID (字串):", formatId("abc"));
console.log("格式化 ID (數字):", formatId(123));


// ============================================
// 8. 類型斷言 (Type Assertion)
// ============================================

let someValue: unknown = "這是一個字串";

// 方式一：as 語法（推薦）
let strLength1: number = (someValue as string).length;

// 方式二：<> 語法（在 JSX 中會有問題）
let strLength2: number = (<string>someValue).length;

console.log("\n=== 類型斷言 ===");
console.log("字串長度:", strLength1);


// ============================================
// 練習題
// ============================================

/*
練習 1: 宣告變數
- 建立一個 string 類型的變數 productName，值為 "iPhone"
- 建立一個 number 類型的變數 productPrice，值為 35900
- 建立一個 boolean 類型的變數 inStock，值為 true

練習 2: 陣列操作
- 建立一個 string 陣列 colors，包含三種顏色
- 使用 push() 新增一個顏色
- 印出陣列長度

練習 3: 聯合類型
- 建立一個函式 displayValue，接受 string | number | boolean 參數
- 根據類型印出不同的訊息

解答在下方（先自己嘗試！）
*/

// ============================================
// 練習解答
// ============================================

// 練習 1
const productName: string = "iPhone";
const productPrice: number = 35900;
const inStock: boolean = true;

// 練習 2
const colors: string[] = ["紅色", "藍色", "綠色"];
colors.push("黃色");
console.log("\n=== 練習解答 ===");
console.log("顏色陣列長度:", colors.length);

// 練習 3
function displayValue(value: string | number | boolean): void {
    if (typeof value === "string") {
        console.log(`這是字串: "${value}"`);
    } else if (typeof value === "number") {
        console.log(`這是數字: ${value}`);
    } else {
        console.log(`這是布林值: ${value}`);
    }
}

displayValue("Hello");
displayValue(42);
displayValue(true);
