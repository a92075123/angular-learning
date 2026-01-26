/**
 * ============================================
 * TypeScript 類別 (Classes)
 * ============================================
 *
 * 類別是 Angular 的核心，元件、服務都是類別
 */

// ============================================
// 1. 基本類別宣告
// ============================================

class Person {
    // 屬性宣告
    name: string;
    age: number;

    // 建構函式
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // 方法
    introduce(): string {
        return `我是 ${this.name}，今年 ${this.age} 歲`;
    }
}

const person = new Person("小明", 25);
console.log("=== 基本類別 ===");
console.log(person.introduce());


// ============================================
// 2. 存取修飾詞 (Access Modifiers)
// ============================================

class BankAccount {
    public accountNumber: string;    // 公開：任何地方都可存取
    protected balance: number;       // 受保護：類別和子類別可存取
    private pin: string;            // 私有：只有類別內部可存取

    constructor(accountNumber: string, initialBalance: number, pin: string) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.pin = pin;
    }

    // 公開方法
    public getBalance(): number {
        return this.balance;
    }

    // 私有方法
    private validatePin(inputPin: string): boolean {
        return this.pin === inputPin;
    }

    public withdraw(amount: number, pin: string): boolean {
        if (!this.validatePin(pin)) {
            console.log("PIN 碼錯誤");
            return false;
        }
        if (amount > this.balance) {
            console.log("餘額不足");
            return false;
        }
        this.balance -= amount;
        return true;
    }
}

const account = new BankAccount("1234-5678", 10000, "0000");
console.log("\n=== 存取修飾詞 ===");
console.log("帳號:", account.accountNumber);  // 可存取
console.log("餘額:", account.getBalance());   // 透過方法存取
// console.log(account.balance);  // 錯誤！protected
// console.log(account.pin);      // 錯誤！private


// ============================================
// 3. 簡化的建構函式語法
// ============================================

class Employee {
    // 直接在建構函式參數宣告屬性（Angular 常用）
    constructor(
        public id: string,
        public name: string,
        private salary: number,
        protected department: string = "未分配"  // 預設值
    ) {}

    getSalary(): number {
        return this.salary;
    }

    getInfo(): string {
        return `${this.name} (${this.id}) - ${this.department}`;
    }
}

const emp = new Employee("E001", "王小明", 50000, "技術部");
console.log("\n=== 簡化建構函式 ===");
console.log(emp.getInfo());


// ============================================
// 4. 繼承 (Inheritance)
// ============================================

class Animal {
    constructor(public name: string) {}

    move(distance: number = 0): void {
        console.log(`${this.name} 移動了 ${distance} 公尺`);
    }

    makeSound(): void {
        console.log("動物發出聲音");
    }
}

class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name);  // 呼叫父類別建構函式
    }

    // 覆寫父類別方法
    makeSound(): void {
        console.log(`${this.name} 說: 汪汪！`);
    }

    // 子類別專屬方法
    fetch(): void {
        console.log(`${this.name} 去撿球`);
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): void {
        console.log(`${this.name} 說: 喵喵！`);
    }
}

console.log("\n=== 繼承 ===");
const dog = new Dog("小白", "柴犬");
dog.makeSound();
dog.move(10);
dog.fetch();

const cat = new Cat("小花");
cat.makeSound();


// ============================================
// 5. 抽象類別 (Abstract Classes)
// ============================================

abstract class Shape {
    constructor(public color: string) {}

    // 抽象方法 - 子類別必須實作
    abstract getArea(): number;
    abstract getPerimeter(): number;

    // 一般方法 - 子類別可直接使用
    describe(): string {
        return `這是一個 ${this.color} 的形狀，面積: ${this.getArea()}`;
    }
}

class Rectangle extends Shape {
    constructor(
        color: string,
        public width: number,
        public height: number
    ) {
        super(color);
    }

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    constructor(
        color: string,
        public radius: number
    ) {
        super(color);
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

console.log("\n=== 抽象類別 ===");
const rect = new Rectangle("藍色", 10, 5);
console.log(rect.describe());
console.log("周長:", rect.getPerimeter());

const circle = new Circle("紅色", 7);
console.log(circle.describe());


// ============================================
// 6. 介面實作 (Implementing Interfaces)
// ============================================

interface Printable {
    print(): void;
}

interface Serializable {
    serialize(): string;
    deserialize(data: string): void;
}

class Document implements Printable, Serializable {
    constructor(
        public title: string,
        public content: string
    ) {}

    print(): void {
        console.log(`=== ${this.title} ===`);
        console.log(this.content);
    }

    serialize(): string {
        return JSON.stringify({ title: this.title, content: this.content });
    }

    deserialize(data: string): void {
        const obj = JSON.parse(data);
        this.title = obj.title;
        this.content = obj.content;
    }
}

console.log("\n=== 介面實作 ===");
const doc = new Document("會議記錄", "今天討論了 TypeScript...");
doc.print();
console.log("序列化:", doc.serialize());


// ============================================
// 7. 靜態成員 (Static Members)
// ============================================

class MathUtils {
    static PI: number = 3.14159;

    static add(a: number, b: number): number {
        return a + b;
    }

    static circleArea(radius: number): number {
        return MathUtils.PI * radius * radius;
    }
}

console.log("\n=== 靜態成員 ===");
console.log("PI:", MathUtils.PI);
console.log("5 + 3 =", MathUtils.add(5, 3));
console.log("半徑 5 的圓面積:", MathUtils.circleArea(5));


// ============================================
// 8. Getter 和 Setter
// ============================================

class Temperature {
    private _celsius: number = 0;

    // Getter
    get celsius(): number {
        return this._celsius;
    }

    // Setter with validation
    set celsius(value: number) {
        if (value < -273.15) {
            throw new Error("溫度不能低於絕對零度");
        }
        this._celsius = value;
    }

    // 計算屬性
    get fahrenheit(): number {
        return (this._celsius * 9) / 5 + 32;
    }

    set fahrenheit(value: number) {
        this._celsius = ((value - 32) * 5) / 9;
    }
}

console.log("\n=== Getter 和 Setter ===");
const temp = new Temperature();
temp.celsius = 25;
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F`);

temp.fahrenheit = 98.6;
console.log(`${temp.fahrenheit}°F = ${temp.celsius.toFixed(2)}°C`);


// ============================================
// 9. 單例模式 (Singleton Pattern)
// ============================================

class Database {
    private static instance: Database;
    private connectionCount: number = 0;

    // 私有建構函式，防止外部 new
    private constructor() {
        console.log("資料庫連線已建立");
    }

    // 取得唯一實例
    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    query(sql: string): void {
        this.connectionCount++;
        console.log(`執行查詢 #${this.connectionCount}: ${sql}`);
    }
}

console.log("\n=== 單例模式 ===");
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log("db1 === db2:", db1 === db2);  // true

db1.query("SELECT * FROM users");
db2.query("SELECT * FROM products");


// ============================================
// 練習題
// ============================================

/*
練習 1: 基本類別
建立一個 Product 類別：
- 屬性: id, name, price
- 方法: getDiscountedPrice(discountPercent)

練習 2: 繼承
建立 Electronics 類別，繼承 Product：
- 新增屬性: warrantyMonths
- 覆寫 getDiscountedPrice，電子產品最多打 8 折

練習 3: 介面實作
建立一個 Comparable 介面，有 compareTo(other) 方法
讓 Product 類別實作此介面

解答在下方
*/

// ============================================
// 練習解答
// ============================================

// 練習 3 的介面
interface Comparable<T> {
    compareTo(other: T): number;
}

// 練習 1 & 3
class Product implements Comparable<Product> {
    constructor(
        public id: string,
        public name: string,
        public price: number
    ) {}

    getDiscountedPrice(discountPercent: number): number {
        return this.price * (1 - discountPercent / 100);
    }

    compareTo(other: Product): number {
        return this.price - other.price;
    }
}

// 練習 2
class Electronics extends Product {
    constructor(
        id: string,
        name: string,
        price: number,
        public warrantyMonths: number
    ) {
        super(id, name, price);
    }

    // 覆寫方法，限制最多 8 折
    getDiscountedPrice(discountPercent: number): number {
        const maxDiscount = Math.min(discountPercent, 20);
        return super.getDiscountedPrice(maxDiscount);
    }
}

console.log("\n=== 練習解答 ===");

const laptop = new Electronics("E001", "筆記型電腦", 35000, 24);
console.log("原價:", laptop.price);
console.log("打 9 折:", laptop.getDiscountedPrice(10));
console.log("打 5 折 (限制為 8 折):", laptop.getDiscountedPrice(50));

const phone = new Product("P001", "手機", 25000);
console.log("比較:", laptop.compareTo(phone) > 0 ? "筆電較貴" : "手機較貴");
