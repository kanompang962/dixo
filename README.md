# 🚀 Dixo Stack — ERP Platform

[![Build](https://img.shields.io/badge/build-pipeline-blue)]()
[![Coverage](https://img.shields.io/badge/coverage---yellow)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![Tech](https://img.shields.io/badge/frontend-Angular%2020-red)]()
[![Tech](https://img.shields.io/badge/backend-.NET%208-007ACC)]()

**Dixo Stack** คือระบบ ERP แบบโมดูลาร์ ออกแบบมาให้ใช้งานได้จริง (Inventory, Sales, Accounting, HR ฯลฯ) โดยใช้เทคโนโลยีสมัยใหม่ — Angular 20 (frontend), .NET 8 (backend), ใช้ TiDB Cloud เป็นฐานข้อมูลหลัก และมี observability + CI/CD เต็มรูปแบบ

---

## 📌 สารบัญ
- [Highlights](#-highlights)
- [Architecture](#-architecture)
- [Folder structure (ตัวอย่าง)](#-folder-structure-ตัวอย่าง)
- [Quick start (สำหรับ dev)](#-quick-start-สำหรับ-dev)
- [Environment & Configuration](#-environment--configuration)
- [CI / CD](#-ci--cd)
- [Monitoring & Logging](#-monitoring--logging)
- [Jest & Testing](#-jest--testing)
- [Pre-commit / Lint (Husky)](#-pre-commit--lint-husky)
- [Deployment (Docker + Nginx + Ubuntu)](#-deployment-docker--nginx--ubuntu)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [New Project](#-new-project)
- [Install Project](#-install-project)
- [License](#-license)

---

## ✨ Highlights
- Modular ERP (โมดูลแยก: Inventory, Sales, Accounting, HR)
- SPA frontend ด้วย **Angular 20**
- Backend API ด้วย **ASP.NET Core 8**
- Database: **TiDB Cloud** (Postgres-compatible/MySQL-compatible config แล้วแต่เลือก)
- Containerized: **Docker** + Compose
- CI/CD: **GitHub Actions**
- Observability: **Prometheus** + **Grafana**
- Unit & E2E tests: **Jest** (frontend), **dotnet test** (backend)
- Pre-commit hooks: **Husky**

---
## 📄 Pre-commit / Lint (Husky)
| Type         | ใช้ทำอะไร                                                        | ตัวอย่าง                                     |
| ------------ | --------------------------------------------------------------- | ------------------------------------------ |
| **feat**     | เพิ่ม **feature ใหม่**                                             | `feat(auth): add JWT login`                |
| **fix**      | แก้ **bug**                                                      | `fix(api): correct HTTP status code`       |
| **docs**     | เปลี่ยน **documentation** (README, wiki)                          | `docs(readme): update setup instructions`  |
| **style**    | **รูปแบบ code** (formatting, spacing, semicolons) ไม่กระทบ logic  | `style(frontend): fix indentation`         |
| **refactor** | เปลี่ยน **โค้ดแต่ behavior ไม่เปลี่ยน**                                | `refactor(api): restructure user service`  |
| **test**     | เพิ่ม/แก้ **unit test / e2e test**                                 | `test(auth): add login unit tests`         |
| **chore**    | งานอื่น ๆ เช่น **config, package update**                          | `chore(frontend): upgrade Angular to 20.1` |

ตัวอย่าง scope:
- frontend → Angular UI
- backend → .NET API
- auth → ระบบ login / JWT
- api → service / endpoint
- ui → layout, component, style

---
## 🚩 New Project
- [RootProject]
    - **Install Husky v9** 
    - ไปที่ root ของ repo (โฟลเดอร์รวม Angular + .NET)
    ```
    cd dixo
    ```

    - สร้าง package.json (ถ้าไม่มี)
    ```
    npm init -y 
    ```

    - ติดตั้ง dependencies
    ```
    npm install --save-dev husky commitlint @commitlint/config-conventional commitizen cz-conventional-changelog
    ``` 

    - สร้างไฟล์ commitlint.config.js ที่ root:
    ```
    module.exports = {
        extends: ['@commitlint/config-conventional']
    };
    ```

    - เพิ่ม config ใน package.json:
    ```
    "config": {
        "commitizen": {
            "path": "cz-conventional-changelog"
        }
    }
    ```

    - เปิดใช้งาน Husky (คำสั่งนี้จะสร้างโฟลเดอร์ .husky/ และเพิ่ม script "prepare": "husky" ให้อัตโนมัติใน package.json)
    ```
    npx husky init
    ```

    - สร้างไฟล์ .husky/commit-msg
    ```
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    npx commitlint --edit "$1"
    ```

    - แล้วให้สิทธิ์รัน:
    ```
    chmod +x .husky/commit-msg
    ```

    - วิธีใช้งาน Commitizen
    ```
    npx cz
    ```

    - หรือเพิ่ม script ใน package.json:
    ```
    "scripts": {
        "commit": "cz",
        "prepare": "husky"
    }
    ```

    - จากนั้นรัน: 
    ```
    npm run commit
    ```

    - รายละเอียดการ commit 👉👉[Pre-commit / Lint (Husky)](#-pre-commit--lint-husky)

- <img src="https://github.com/devicons/devicon/blob/master/icons/angular/angular-original.svg" title="Angular" alt="Angular" width="28" height="28"/> &nbsp;
    - สร้าง Project Angular (ver ล่าสุดตอนนี้ 20)
    ```
    ng new <project name>

    # ถ้าต้องการกำหนด version
    npx -p @angular/cli@16 ng new <project name>
    ```
    
- <img src="https://github.com/devicons/devicon/blob/master/icons/dotnetcore/dotnetcore-original.svg" title="dotnetcore" alt="dotnetcore" width="28" height="28"/> &nbsp;
    - สร้าง Project .NET แบบมี Controllers (ver 8)
    ```
    dotnet new webapi --use-controllers -o <project name>
    ```

---
## 🏗️ Jest & Testing

This project uses **Jest** instead of Karma for testing, providing faster test execution and better developer experience.

### 🚀 Quick Start

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### 📦 Dependencies

The following packages are required for Jest testing:

```json
{
  "devDependencies": {
    "jest": "30.0.0",
    "@types/jest": "30.0.0",
    "jest-preset-angular": "15.0.1",
    "@angular-builders/jest": "20.0.0"
  }
}
```

### ⚙️ Configuration Files

### jest.config.js
```javascript
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary', 'lcov'],
  testMatch: ['**/*.spec.ts'],
  transformIgnorePatterns: ['node_modules/(?!@angular|@ngrx|rxjs)']
};
```

### src/setup-jest.ts
```typescript
import 'jest-preset-angular/setup-env/zone';
```

### tsconfig.spec.json
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "module": "CommonJS",
    "types": ["jest", "node"],
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```

### 🧪 Writing Tests

### Basic Test Structure
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent] // For standalone components
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Jest vs Jasmine Matchers

When migrating from Karma/Jasmine, update these matchers:

```typescript
// ❌ Jasmine (old)
expect(value).toBeTrue();
expect(value).toBeFalse();
expect(value).toBeNull();
expect(value).toBeUndefined();

// ✅ Jest (new)
expect(value).toBe(true);
expect(value).toBe(false);
expect(value).toBeNull();
expect(value).toBeUndefined();
```

### 📊 Coverage Reports

Coverage reports are automatically generated in the `coverage/` directory when running:

```bash
npm test -- --coverage
```

Coverage thresholds:
- **Statements**: > 80%
- **Branches**: > 80%
- **Functions**: > 80%
- **Lines**: > 80%

### 🔧 Available Scripts

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs when files change)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test -- user.spec.ts

# Run tests matching pattern
npm test -- --testNamePattern="should create"

# Run tests in verbose mode (shows individual test results)
npm test -- --verbose

# Run tests and update snapshots
npm test -- --updateSnapshot
```

### 🐛 Common Issues

### 1. Dependency Conflicts
If you encounter `ERESOLVE` errors during installation:
```bash
npm install --legacy-peer-deps
```

### 2. Module Resolution Errors
Ensure `transformIgnorePatterns` includes necessary packages:
```javascript
transformIgnorePatterns: ['node_modules/(?!@angular|@ngrx|rxjs|other-package)']
```

### 3. Async Testing
For testing async operations:
```typescript
it('should handle async operations', async () => {
  const result = await service.getData();
  expect(result).toBeDefined();
});
```

### 4. Mocking Services
```typescript
const mockService = {
  getData: jest.fn().mockReturnValue(of(mockData))
};

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      { provide: DataService, useValue: mockService }
    ]
  });
});
```

### 📈 Performance Benefits

Compared to Karma, Jest provides:

- **5-10x faster** test execution
- **Built-in coverage** reports
- **Better watch mode** with intelligent re-running
- **Parallel test execution**
- **Lower memory usage**
- **Snapshot testing** capabilities

### 🔄 Migration from Karma

If migrating from Karma to Jest:

1. **Remove Karma files**: `karma.conf.js`, `src/test.ts`
2. **Update angular.json**: Change test builder to `@angular-builders/jest:run`
3. **Update test syntax**: Replace Jasmine-specific matchers
4. **Install dependencies**: Follow the setup steps above

### 📝 Best Practices

1. **Group related tests** using `describe()` blocks
2. **Use descriptive test names** that explain what's being tested
3. **Keep tests isolated** - each test should be independent
4. **Mock external dependencies** to avoid side effects
5. **Test both positive and negative cases**
6. **Use `beforeEach()` for common setup**
7. **Clean up after tests** if needed using `afterEach()`

---

### 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Jest Preset Angular](https://github.com/thymikee/jest-preset-angular)
- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Angular Builders Jest](https://github.com/angular-builders/jest)


