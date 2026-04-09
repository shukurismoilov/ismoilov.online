# Performance & Testing Setup Guide

## 📊 PERFORMANCE OPTIMIZATION

### 1. ADD BUNDLE ANALYSIS

**Install**:
```bash
npm install -D rollup-plugin-visualizer
```

**File: vite.config.ts (add)**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";  // NEW

export default defineConfig({
  // ... existing config
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    })
  ],
  // ... rest of config
});
```

**Usage**:
```bash
npm run build
# Opens dist/stats.html showing bundle composition
```

### 2. IMAGE OPTIMIZATION

**Install**:
```bash
npm install -D sharp
```

**Create: build-images.js**

```js
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcDir = './src/assets';
const outDir = './public/img';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(srcDir).filter(f => 
    /\.(png|jpg|jpeg|webp)$/i.test(f)
  );

  for (const file of files) {
    const input = path.join(srcDir, file);
    const name = path.parse(file).name;

    // WebP version
    await sharp(input)
      .webp({ quality: 80 })
      .toFile(path.join(outDir, `${name}.webp`));

    // Optimized original
    await sharp(input)
      .resize(2000, 2000, { withoutEnlargement: true })
      .toFile(path.join(outDir, `${name}-optimized.${path.parse(file).ext}`));

    console.log(`✓ Optimized ${file}`);
  }
}

optimizeImages().catch(console.error);
```

**Add to package.json**:
```json
{
  "scripts": {
    "optimize-images": "node build-images.js"
  }
}
```

**Update Navbar component** (example):
```tsx
// OLD
<img src={logoWide} alt="Ismoilov Online" className="h-8 w-auto" />

// NEW
<picture>
  <source srcSet={logoWide_webp} type="image/webp" />
  <img src={logoWide_opt} alt="Ismoilov Online" className="h-8 w-auto" />
</picture>
```

### 3. LIGHTHOUSE CI SETUP

**Create: .github/workflows/lighthouse.yml**

```yaml
name: Lighthouse CI

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### 4. REMOVE UNUSED DEPENDENCIES

Check for unused packages:
```bash
npx depcheck
```

### 5. OPTIMIZE FRAMER MOTION USAGE

Since Framer Motion is only used for animations, consider:

**Option A**: Keep it (57KB gzipped for smooth animations)
```tsx
// Benefits: Smooth scroll animations, scroll velocity
// Cost: +57KB bundle
```

**Option B**: Replace with CSS animations (5KB)
```tsx
// CSS-only scroll animations
<style>{`
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`}</style>
```

### 6. OPTIMIZE TAILWIND CSS

**File: tailwind.config.ts**

```ts
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // Purge unused styles in production
  safelist: {
    greedy: [/^(bg|text|border)-(primary|secondary|destructive)/],
  },
  
  theme: {
    // ... existing theme
  },
  
  plugins: [],
};
```

---

## 🧪 TESTING SETUP

### 1. EXPAND TEST CONFIGURATION

**File: vite.config.ts (update)**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // ... existing server config
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/index.ts',
        '**/*.test.{js,ts}',
      ],
      lines: 60,
      functions: 60,
      branches: 60,
      statements: 60,
    },
  },
});
```

### 2. UPDATE TEST SETUP

**File: src/test/setup.ts**

```ts
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;
```

### 3. CREATE TEST UTILITIES

**File: src/test/test-utils.tsx**

```tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LangProvider } from '@/context/LangContext';
import { TooltipProvider } from '@/components/ui/tooltip';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LangProvider>
      <TooltipProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </TooltipProvider>
    </LangProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### 4. CREATE COMPONENT TESTS

**File: src/components/__tests__/Navbar.test.tsx**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText(/Design/i)).toBeInTheDocument();
    expect(screen.getByText(/Labs/i)).toBeInTheDocument();
    expect(screen.getByText(/Academy/i)).toBeInTheDocument();
  });

  it('renders logo', () => {
    render(<Navbar />);
    
    const logo = screen.getByAltText('Ismoilov Online');
    expect(logo).toBeInTheDocument();
  });

  it('toggles language', () => {
    render(<Navbar />);
    
    const langToggle = screen.getByRole('button', { name: /EN.*RU/i });
    expect(langToggle).toBeInTheDocument();
  });

  it('has mobile menu button', () => {
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });
});
```

**File: src/context/__tests__/LangContext.test.tsx**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { useLang, LangProvider } from '@/context/LangContext';

const TestComponent = () => {
  const { lang, setLang } = useLang();
  return (
    <div>
      <span>{lang}</span>
      <button onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}>
        Toggle
      </button>
    </div>
  );
};

describe('LangContext', () => {
  it('provides default language as EN', () => {
    render(
      <LangProvider>
        <TestComponent />
      </LangProvider>
    );
    
    expect(screen.getByText('en')).toBeInTheDocument();
  });

  it('toggles language', () => {
    render(
      <LangProvider>
        <TestComponent />
      </LangProvider>
    );
    
    const toggle = screen.getByText('Toggle');
    fireEvent.click(toggle);
    
    expect(screen.getByText('ru')).toBeInTheDocument();
  });
});
```

**File: src/lib/__tests__/utils.test.ts**

```ts
import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('combines class names', () => {
    const result = cn('px-2', 'py-1');
    expect(result).toBe('px-2 py-1');
  });

  it('handles conditional classes', () => {
    const result = cn('px-2', false && 'py-1', true && 'text-center');
    expect(result).toBe('px-2 text-center');
  });

  it('merges tailwind classes correctly', () => {
    const result = cn('px-2', 'px-4');
    expect(result).toBe('px-4'); // Later class wins
  });

  it('handles objects', () => {
    const result = cn({
      'px-2': true,
      'py-1': false,
    });
    expect(result).toBe('px-2');
  });
});
```

### 5. UPDATE package.json SCRIPTS

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint . --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "type-check": "tsc --noEmit",
    "optimize-images": "node build-images.js"
  }
}
```

### 6. CREATE GITHUB ACTIONS CI/CD

**File: .github/workflows/ci.yml**

```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Test
        run: npm run test:coverage
      
      - name: Build
        run: npm run build
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json
          fail_ci_if_error: false

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### 7. ADD COVERAGE BADGE

**File: README.md** (add):

```markdown
[![codecov](https://codecov.io/gh/YOUR_USERNAME/ismoilov.online/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/ismoilov.online)

## Test Coverage

- Lines: 60%+
- Functions: 60%+
- Branches: 60%+

Run locally: `npm run test:coverage`
```

---

## PERFORMANCE CHECKLIST

- [ ] Bundle analysis configured
- [ ] Images optimized (WebP + originals)
- [ ] Lighthouse CI integrated
- [ ] Route-based code splitting enabled
- [ ] Unused dependencies removed
- [ ] CSS purging optimized
- [ ] Performance budget set

## TESTING CHECKLIST

- [ ] Test setup configured
- [ ] Utilities and helpers tested
- [ ] Components tested
- [ ] Context tested
- [ ] Coverage > 60%
- [ ] CI/CD pipeline active
- [ ] Codecov integrated

## VERIFICATION

```bash
# Performance
npm run build
# Check dist/stats.html

# Testing
npm run test:coverage
# Check coverage report - should be 60%+

# CICD
git push origin your-branch
# Check GitHub Actions tab for results
```
