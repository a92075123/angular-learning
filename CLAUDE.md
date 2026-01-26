# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 21 學習專案，使用現代 Standalone Components 架構、Signal API 進行狀態管理，以及 Vitest 測試框架。所有程式碼註解使用繁體中文。

## Common Commands

```bash
npm start          # 啟動開發伺服器 (localhost:4200)
npm run build      # 生產環境建置
npm test           # 執行 Vitest 單元測試
npm run watch      # 監聽模式建置
```

## Architecture

### Component Structure
- **Standalone Components**: 所有元件皆為獨立元件，無 NgModules
- **Signal API**: 使用 `signal()` 和 `computed()` 進行響應式狀態管理
- **New Control Flow**: 使用 `@if`、`@for`、`@switch` 取代傳統 `*ngIf`、`*ngFor`
- **inject() Function**: 使用函式式依賴注入而非建構子注入

### Routing
路由設定位於 `src/app/app.routes.ts`，採用懶載入 (`loadComponent`) 模式：
- `/` → Home
- `/data-binding` → Data Binding Demo
- `/directives` → Directives Demo
- `/todo` → Todo App

### Services
服務位於 `src/app/services/`，使用 `providedIn: 'root'` 單例模式，搭配 Signal 進行狀態管理。

### File Naming
元件檔案使用簡化命名：`component-name.ts`、`component-name.html`、`component-name.css`（非 `.component.ts` 格式）。

## Code Style

- 縮排：2 空格
- 引號：單引號
- 行寬：100 字元
- 元件選擇器前綴：`app`
- TypeScript 嚴格模式啟用
