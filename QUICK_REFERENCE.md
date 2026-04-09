# QUICK REFERENCE: TOP 10 ISSUES

## 🔴 CRITICAL P0 (Fix This Week)

### 1️⃣ Context Provider Broken
- **File**: `src/App.tsx`
- **Problem**: LangProvider only wraps Index page
- **Impact**: Language resets on navigation
- **Fix Time**: 15 min
- **Severity**: 🔴 Medium
```tsx
// Move LangProvider to TOP of App.tsx before BrowserRouter
<LangProvider>
  <TooltipProvider>
    <BrowserRouter>
      <Routes>...</Routes>
    </BrowserRouter>
  </TooltipProvider>
</LangProvider>
```

### 2️⃣ TypeScript Loose Mode
- **File**: `tsconfig.json`
- **Problems**: 
  - `noImplicitAny: false`
  - `strictNullChecks: false`
  - `noUnusedLocals: false`
- **Impact**: Runtime errors possible, dead code hidden
- **Fix Time**: 1 hour
- **Severity**: 🔴 HIGH
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noUnusedLocals": true
}
```

### 3️⃣ Missing Security Headers
- **File**: `vite.config.ts`
- **Missing**:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
- **Impact**: 🔴 XSS + clickjacking attacks
- **Fix Time**: 20 min
```ts
server: {
  headers: {
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'self'"
  }
}
```

### 4️⃣ ESLint Rules Disabled
- **File**: `eslint.config.js`
- **Issues**: `"@typescript-eslint/no-unused-vars": "off"`
- **Impact**: Can't detect dead code
- **Fix Time**: 10 min
- **Severity**: 🟡 Medium
```js
"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
```

---

## 🟡 IMPORTANT P1 (Next Sprint)

### 5️⃣ No Route Code Splitting
- **Files**: Routes in `App.tsx`
- **Problem**: All pages load even if not visited
- **Impact**: ~200KB extra JS
- **Fix Time**: 1 hour
```tsx
const DesignPage = lazy(() => import('./pages/DesignPage'));
// Wrap in Suspense
```

### 6️⃣ No Environment Config
- **Issues**: Hard-coded API URLs, no .env
- **Impact**: Can't switch between dev/prod
- **Fix Time**: 30 min
```env
VITE_API_URL=http://localhost:3000
VITE_APP_ENV=development
```

### 7️⃣ Minimal Test Coverage
- **Status**: Only example.test.ts exists
- **Coverage**: ~2%
- **Target**: 60%+
- **Fix Time**: 4 hours
```bash
npm run test:coverage
```

### 8️⃣ No CI/CD Pipeline
- **Missing**: GitHub Actions
- **Impact**: No automated checks on PR
- **Fix Time**: 2 hours
```yaml
# .github/workflows/ci.yml
```

---

## 🟢 NICE-TO-HAVE P2

### 9️⃣ No Bundle Analysis
- **Issue**: Can't see what's in bundles
- **Tool**: `rollup-plugin-visualizer`
- **Impact**: Don't know what costs money
- **Fix Time**: 30 min

### 🔟 No Image Optimization
- **Issue**: Full-res logos loaded
- **Tool**: `sharp`
- **Impact**: Slower load times
- **Fix Time**: 1.5 hours

---

## 📊 IMPACT MATRIX

```
SEVERITY vs EFFORT

             Easy    Medium    Hard
HIGH      [P0-1]   [P0-2/3]  [P1-7]
MEDIUM    [P0-4]   [P1-5]    [P2-9]
LOW               [P1-6]    [P2-10]
```

---

## ⏱️ TIME BREAKDOWN

| Task | Minutes | Difficulty |
|------|---------|------------|
| Fix context | 15 | 🟢 Easy |
| TypeScript strict | 60 | 🟡 Medium |
| Security headers | 20 | 🟢 Easy |
| ESLint rules | 10 | 🟢 Easy |
| Code splitting | 60 | 🟢 Easy |
| Env config | 30 | 🟢 Easy |
| Test setup | 120 | 🟡 Medium |
| CI/CD | 120 | 🟡 Medium |
| **TOTAL P0** | **105** | -- |
| **TOTAL P1** | **330** | -- |
| **TOTAL P0+P1** | **435** | ~7.25 hrs |

---

## ✅ VERIFICATION COMMANDS

```bash
# After each fix, run:
npm run type-check    # Should pass
npm run lint          # Should pass
npm run build         # Should succeed
npm run test          # Should pass

# Check results:
npm run build -- --outDir dist
ls -lh dist/          # Check bundle size
```

---

## 🎯 IMPLEMENTATION CHECKLIST

### Week 1 (P0 - Critical Security)
- [ ] Read IMPLEMENTATION_GUIDE.md (15 min)
- [ ] Fix context provider (15 min)
  - [ ] Move LangProvider to App.tsx
  - [ ] Remove from Index.tsx
  - [ ] Test: language persists on navigation
- [ ] Enable TypeScript strict (1 hr)
  - [ ] Update tsconfig.json
  - [ ] Fix type errors
  - [ ] Test: `npm run type-check`
- [ ] Add security headers (20 min)
  - [ ] Update vite.config.ts
  - [ ] Test: headers present in dev tools
- [ ] Fix ESLint (10 min)
  - [ ] Update eslint.config.js
  - [ ] Run `npm run lint`
  - [ ] Fix any new warnings

**Commit 1**: `chore: fix critical security and context issues`

### Week 2-3 (P1 - Stability)
- [ ] Route-based code splitting (1 hr)
  - [ ] Update App.tsx with lazy/Suspense
  - [ ] Test: network tab shows separate chunks
- [ ] Environment config (30 min)
  - [ ] Create .env files
  - [ ] Update config usage
  - [ ] Test: `VITE_API_URL` accessible
- [ ] Test setup (4 hrs)
  - [ ] Create test utilities
  - [ ] Write component tests
  - [ ] Target 60% coverage
  - [ ] CI/CD integration (2 hrs)
  - [ ] Create GitHub Actions workflow
  - [ ] Test: PR checks run automatically

**Commit 2**: `chore: add stability fixes and testing infrastructure`

---

## 🚨 ERROR MESSAGES YOU MIGHT SEE

### TypeScript Strict Errors
```
error TS2345: Argument of type 'undefined' is not assignable to parameter of type 'string'
```
**Fix**: Add type annotations or use null coalescing
```tsx
const label = item?.label ?? 'default'; // ✅
```

### ESLint Unused Vars
```
error @typescript-eslint/no-unused-vars: '_item' is declared but never used
```
**Fix**: Use underscore prefix
```tsx
const [_item, setItem] = useState(null); // ✅
```

### Build Errors
```
[ERR_REQUIRE_ESM] Must use import to load ES Module
```
**Fix**: Ensure all imports are ESM
```tsx
export const config = { /* ... */ }; // ✅
```

---

## 🎯 SUCCESS CRITERIA

When done, you should see:

✅ `npm run type-check` - 0 errors
✅ `npm run lint` - 0 errors
✅ `npm run test:coverage` - 60%+ coverage
✅ `npm run build` - Clean build, no warnings
✅ Network tab - Shows code-split chunks
✅ Security headers - Present in dev tools
✅ GitHub Actions - All checks pass on PR

---

## 📞 STILL STUCK?

1. Check the full docs:
   - IMPLEMENTATION_GUIDE.md
   - PERFORMANCE_TESTING_GUIDE.md
   - PROJECT_ANALYSIS_2026.md

2. Key files to update:
   - src/App.tsx ← Start here
   - tsconfig.json
   - vite.config.ts
   - eslint.config.js
   - .env (create new)

3. Test after each change:
   ```bash
   npm run build && npm run lint && npm run test
   ```
