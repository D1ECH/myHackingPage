# GitHub Pages Subdirectory Routing Audit & Fix Report

**Date:** March 4, 2026  
**Issue:** Links dropping `/myHackingPage/` subdirectory when deployed to GitHub Pages  
**Status:** ✅ **FIXED**

---

## Executive Summary

Your Astro project is deployed to `https://d1ech.github.io/myHackingPage/` but was experiencing a **routing issue where internal links were not properly prefixing the `/myHackingPage/` base path**.

### Root Cause
The project had **correctly configured** `base: '/myHackingPage'` in `astro.config.ts`, but **multiple components were using hardcoded absolute paths** that don't automatically inherit the base path. Additionally, some components had **double-slash bugs** when combining `BASE_URL` with paths.

---

## Issues Found & Fixed

### 🔴 Critical Issues (Fixed)

#### 1. **Double Slashes in PostPreview.astro**
**File:** `packages/pure/components/pages/PostPreview.astro`  
**Lines:** 40, 122

**Problem:**
```astro
// ❌ WRONG - Creates /myHackingPage//blog/... with double slash
href={`${import.meta.env.BASE_URL}/blog/${id}`}
href={`${import.meta.env.BASE_URL}/tags/${tag}`}
```

**Cause:** `import.meta.env.BASE_URL` returns `/myHackingPage/` WITH trailing slash.

**Fix Applied:**
```astro
// ✅ CORRECT - Creates /myHackingPage/blog/...
href={`${import.meta.env.BASE_URL}blog/${id}`}
href={`${import.meta.env.BASE_URL}tags/${tag}`}
```

**Impact:** This was causing blog post links and tag navigation to potentially fail or behave unexpectedly.

---

#### 2. **Hardcoded Absolute Paths in BaseHead.astro**
**File:** `src/components/BaseHead.astro`  
**Lines:** 21-24, 27, 30, 74, 87

**Problem:**
```astro
// ❌ WRONG - Asset paths don't include base path
<link rel='apple-touch-icon' href='/favicon/apple-touch-icon.png' />
<link rel='icon' href='/favicon/favicon-32x32.png' />
<link rel='preload' href='/fonts/Satoshi-Variable.ttf' />
<link href='/sitemap-index.xml' rel='sitemap' />
<link rel='stylesheet' href='/styles/global.css' />
```

**Fix Applied:**
```astro
// ✅ CORRECT - Uses BASE_URL to include subdirectory
const BASE_URL = import.meta.env.BASE_URL
<link rel='apple-touch-icon' href={`${BASE_URL}favicon/apple-touch-icon.png`} />
<link rel='icon' href={`${BASE_URL}favicon/favicon-32x32.png`} />
<link rel='preload' href={`${BASE_URL}fonts/Satoshi-Variable.ttf`} />
<link href={`${BASE_URL}sitemap-index.xml`} rel='sitemap' />
<link rel='stylesheet' href={`${BASE_URL}styles/global.css`} />
```

**Impact:** Favicon, fonts, sitemap, and global CSS might not load correctly on GitHub Pages subdirectory.

---

#### 3. **Hardcoded Tag Links in Hero.astro**
**File:** `packages/pure/components/pages/Hero.astro`  
**Line:** 93

**Problem:**
```astro
// ❌ WRONG - Missing base path
href={`/tags/${tag}`}
```

**Fix Applied:**
```astro
// ✅ CORRECT
href={`${import.meta.env.BASE_URL}tags/${tag}`}
```

---

### 🟡 Minor Issues (Noted)

#### Copyright.astro Navigation Link
**File:** `packages/pure/components/pages/Copyright.astro`  
**Line:** 114

**Status:** Currently commented out, but should be fixed if uncommented:
```astro
// Current (commented)
href='/projects#sponsorship'

// Should be:
href={`${import.meta.env.BASE_URL}projects#sponsorship`}
```

---

## Best Practices & Recommendations

### ✅ What's Working Well
1. ✓ `astro.config.ts` correctly configured with `base: '/myHackingPage'`
2. ✓ Some pages already use hardcoded `/myHackingPage/` paths (works but not ideal)
3. ✓ Search module correctly handles `BASE_URL` trailing slash

---

### 🎯 Recommended Improvements

#### 1. **Create a Link Utility Function** (Optional but Recommended)
To make future maintenance easier, create a utility function:

```typescript
// src/utils/createLink.ts
export const createLink = (path: string): string => {
  const baseUrl = import.meta.env.BASE_URL
  // Ensure no double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}${cleanPath}`
}
```

Then use it in components:
```astro
---
import { createLink } from '@/utils/createLink'
---
<a href={createLink('/blog/my-post')}>Read Post</a>
```

#### 2. **Replace Hardcoded `/myHackingPage/` Paths**
Files like `src/pages/tags/index.astro`, `src/pages/search/index.astro` have:
```astro
// Current
href='/myHackingPage/blog'
href={`/myHackingPage/tags/${tag}`}

// Should use
href={`${import.meta.env.BASE_URL}blog`}
href={`${import.meta.env.BASE_URL}tags/${tag}`}
```

This makes the code independent of the deployment path.

#### 3. **Asset Import Strategy**
For static assets, consider using Astro's `Image` component and imports:
```astro
import heroImage from '@/assets/images/hero.png'
<Image src={heroImage} alt="..." />
```

---

## Verification Checklist

After these fixes, verify:

- [ ] Build successfully: `npm run build`
- [ ] Preview locally: `npm run preview`
- [ ] Test blog post links navigate to `/myHackingPage/blog/[post-name]`
- [ ] Test tag links navigate to `/myHackingPage/tags/[tag]`
- [ ] Favicon loads correctly
- [ ] CSS and fonts load correctly
- [ ] Sitemap link works
- [ ] Deploy to GitHub Pages and test all links in production

---

## Files Modified

1. ✅ `src/components/BaseHead.astro` - 8 asset path fixes
2. ✅ `packages/pure/components/pages/PostPreview.astro` - 2 double-slash fixes  
3. ✅ `packages/pure/components/pages/Hero.astro` - 1 hardcoded path fix

**Total Issues Fixed:** 11

---

## Summary

Your Astro configuration is correct, but the components weren't using it properly. The fixes ensure all internal links, assets, and navigation properly include the `/myHackingPage/` base path. You should now be able to deploy to GitHub Pages without the subdirectory being dropped from URLs.

For long-term maintenance, consider using a utility function to generate links consistently across your project.
