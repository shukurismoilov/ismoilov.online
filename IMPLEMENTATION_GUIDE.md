# Implementation Guide: Critical Fixes

## 1️⃣ FIX CONTEXT PROVIDER NESTING (15 min)

### Current Problem
LangProvider only wraps the Index page, causing language state to reset on navigation.

### Solution

**File: src/App.tsx**
```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LangProvider } from "@/context/LangContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import DesignPage from "./pages/DesignPage.tsx";
import AcademyPage from "./pages/AcademyPage.tsx";
import LabsPage from "./pages/LabsPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <LangProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/design" element={<DesignPage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/labs" element={<LabsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </LangProvider>
);

export default App;
```

**File: src/pages/Index.tsx**
```tsx
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AcademySection from '@/components/AcademySection';
import LabsSection from '@/components/LabsSection';
import DesignSection from '@/components/DesignSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Global noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <DesignSection />
        <LabsSection />
        <AcademySection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
```

---

## 2️⃣ ENABLE TYPESCRIPT STRICT MODE (30 min)

### Current tsconfig.json (Too Loose)
```json
{
  "noImplicitAny": false,
  "noUnusedLocals": false,
  "noUnusedParameters": false,
  "strictNullChecks": false
}
```

### Updated: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Strict Type Checking */
    "strict": true,                        // New: Enables all strict options
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    /* Code Quality */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "exactOptionalPropertyTypes": true,

    /* Module Resolution */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Path Aliases */
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### Handle Unused Variables Pattern

When you have intentionally unused parameters, use the underscore pattern:

```tsx
// ✅ Instead of this:
// const handler = (event, unused) => {  // ESLint error

// ✅ Do this:
const handler = (event: React.ChangeEvent<HTMLInputElement>, _unused: string) => {
  console.log(event.target.value);
}
```

---

## 3️⃣ FIX ESLINT CONFIGURATION (10 min)

### File: eslint.config.js

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [
      js.configs.recommended, 
      ...tseslint.configs.strict,           // NEW: Strict TS rules
      ...tseslint.configs.stylistic,        // NEW: Code style
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      
      /* React Refresh */
      "react-refresh/only-export-components": ["error", { 
        allowConstantExport: true 
      }],  // CHANGED: warn → error
      
      /* TypeScript */
      "@typescript-eslint/no-unused-vars": [
        "error",  // CHANGED: off → error
        { 
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/explicit-function-return-types": [
        "warn",
        { 
          allowExpressions: true,
          allowTypedFunctionExpressions: true
        }
      ],
      
      /* General */
      "no-console": ["warn", { allow: ["warn", "error"] }],  // NEW
      "no-debugger": "error",                                // NEW
      "eqeqeq": ["error", "always"],                         // NEW
    },
  }
);
```

---

## 4️⃣ ADD SECURITY HEADERS (20 min)

### File: vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    // NEW: Security headers
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:;",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          animations: ["framer-motion"],
          ui: ["sonner"],
        },
      },
    },
  },
});
```

### For Production Deployment (with Nginx)

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:;" always;
```

---

## 5️⃣ IMPLEMENT ROUTE-BASED CODE SPLITTING (30 min)

### File: src/App.tsx (Updated)

```tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LangProvider } from "@/context/LangContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Static import - used immediately
import Index from "./pages/Index.tsx";

// Lazy load - loaded only when needed
const DesignPage = lazy(() => import("./pages/DesignPage.tsx"));
const AcademyPage = lazy(() => import("./pages/AcademyPage.tsx"));
const LabsPage = lazy(() => import("./pages/LabsPage.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse">
      <div className="h-12 w-12 bg-primary rounded-full"></div>
    </div>
  </div>
);

const App = () => (
  <LangProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route 
            path="/design" 
            element={
              <Suspense fallback={<PageLoader />}>
                <DesignPage />
              </Suspense>
            } 
          />
          
          <Route 
            path="/academy" 
            element={
              <Suspense fallback={<PageLoader />}>
                <AcademyPage />
              </Suspense>
            } 
          />
          
          <Route 
            path="/labs" 
            element={
              <Suspense fallback={<PageLoader />}>
                <LabsPage />
              </Suspense>
            } 
          />
          
          <Route 
            path="/about" 
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            } 
          />
          
          <Route 
            path="/contact" 
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            } 
          />
          
          <Route 
            path="*" 
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            } 
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </LangProvider>
);

export default App;
```

---

## 6️⃣ SETUP ENVIRONMENT CONFIGURATION (15 min)

### File: .env

```env
# Development
VITE_API_URL=http://localhost:3000
VITE_APP_ENV=development
VITE_APP_NAME=Ismoilov Online

# Monitoring (optional)
VITE_SENTRY_DSN=
VITE_ANALYTICS_ID=
```

### File: .env.production

```env
VITE_API_URL=https://api.ismoilov.online
VITE_APP_ENV=production
VITE_APP_NAME=Ismoilov Online

VITE_SENTRY_DSN=your_sentry_dsn_here
VITE_ANALYTICS_ID=your_analytics_id_here
```

### File: src/lib/config.ts (NEW)

```ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  appEnv: (import.meta.env.VITE_APP_ENV || 'development') as 'development' | 'production',
  appName: import.meta.env.VITE_APP_NAME || 'Ismoilov Online',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  analyticsId: import.meta.env.VITE_ANALYTICS_ID,
};
```

### File: tsconfig.json (Add)

```json
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

---

## ROLLOUT CHECKLIST

- [ ] Fix Context Provider (commit 1)
- [ ] Enable TypeScript Strict (commit 2)  
- [ ] Fix ESLint Rules (commit 3)
- [ ] Add Security Headers (commit 4)
- [ ] Setup Route Code Splitting (commit 5)
- [ ] Add Environment Config (commit 6)
- [ ] Run `npm run build` - verify no errors
- [ ] Run tests: `npm run test`
- [ ] Test locally: `npm run dev`
- [ ] Test navigation between pages

---

## VERIFICATION COMMANDS

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Run linting
npm run lint

# Build for production
npm run build

# Check bundle size
npm run build -- --outDir dist

# Test
npm run test
```

**Expected Results**:
- ✅ Zero TypeScript errors
- ✅ Zero linting errors  
- ✅ Build succeeds
- ✅ All tests pass
- ✅ Security headers present in network tab
