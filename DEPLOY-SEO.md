# Korean MP4 Converter - SEO Deployment Guide

## ✅ Already Done

Your repo already has:
- ✅ Google verification file: `public/googleb924e597f1175dc3.html`
- ✅ Naver verification file: `public/naver-site-verification.html`
- ✅ Sitemap: `public/sitemap.xml`
- ✅ Robots.txt with Korean search engines (Googlebot, Yeti, Daumoa)
- ✅ Korean meta tags in layout.tsx
- ✅ Good structure and responsive design

## 🎯 What You Need to Do

### Step 1: Install Node.js (if not done yet)

```bash
# Install Homebrew (will ask for password)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify
node --version
npm --version
```

### Step 2: Apply Enhanced SEO Code

I've created improved files with better SEO:

**Option A: Quick Update (Recommended)**
```bash
cd ~/korean-mp4-converter

# Backup current layout
cp src/app/layout.tsx src/app/layout-backup.tsx

# Replace with enhanced version
cp src/app/layout-enhanced.tsx src/app/layout.tsx
```

**Option B: Manual Update**
Add to `src/app/layout.tsx`:
1. Add Google verification code in metadata
2. Add structured data (WebApplication schema) in the `<head>`

### Step 3: Add FAQ Section (Boosts SEO)

```bash
cd ~/korean-mp4-converter

# FAQ component is already created at:
# src/app/components/FAQ.tsx

# Add to src/app/page.tsx (after <Converter />):
```

Edit `src/app/page.tsx`:
```typescript
import Header from './components/Header';
import Footer from './components/Footer';
import Converter from './components/Converter';
import FAQ from './components/FAQ';  // ADD THIS

export default function Home() {
  return (
    <>
      <Header />
      <Converter />
      <FAQ />  {/* ADD THIS */}
      <Footer />
    </>
  );
}
```

### Step 4: Get Verification Codes

#### Google Search Console
1. Go to: https://search.google.com/search-console
2. Add property: `https://shikhar127.github.io/korean-mp4-converter/`
3. Choose "HTML tag" method
4. Copy the code from the meta tag
5. Add to `src/app/layout.tsx`:
   ```typescript
   verification: {
     google: 'YOUR_CODE_HERE', // Paste here
   }
   ```

**Note:** You already have `googleb924e597f1175dc3.html` file, so Google might already be verified!

#### Naver Search Advisor
1. Go to: https://searchadvisor.naver.com/
2. Login/create Naver account
3. Add site: `https://shikhar127.github.io/korean-mp4-converter/`
4. Choose "HTML tag" method
5. Copy the code
6. Add to `src/app/layout.tsx`:
   ```typescript
   verification: {
     google: 'your_google_code',
     other: {
       'naver-site-verification': 'YOUR_NAVER_CODE_HERE',
     },
   }
   ```

### Step 5: Install Dependencies & Test

```bash
cd ~/korean-mp4-converter

# Install dependencies
npm install

# Test locally
npm run dev

# Open http://localhost:3000
# Check:
# - FAQ section appears at bottom
# - No console errors
# - Converter still works
```

### Step 6: Build & Deploy

```bash
cd ~/korean-mp4-converter

# Build for production
npm run build

# If build succeeds, deploy
git add .
git commit -m "Add SEO improvements: FAQ section, enhanced meta tags, structured data

- Added FAQ component with 7 Korean Q&As
- Enhanced layout.tsx with Google/Naver verification
- Added WebApplication and FAQPage structured data (JSON-LD)
- Improved Korean meta descriptions and keywords

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

git push origin main
```

### Step 7: Submit to Search Engines

#### Google Search Console
1. Go to: https://search.google.com/search-console
2. Verify ownership (should auto-verify if file exists)
3. Submit sitemap:
   - Go to "Sitemaps" section
   - Add: `https://shikhar127.github.io/korean-mp4-converter/sitemap.xml`
4. Request indexing:
   - Go to "URL Inspection"
   - Enter: `https://shikhar127.github.io/korean-mp4-converter/`
   - Click "Request Indexing"

#### Naver Search Advisor
1. Go to: https://searchadvisor.naver.com/
2. Verify ownership
3. Submit sitemap:
   - 사이트 관리 → 사이트맵 제출
   - Add: `https://shikhar127.github.io/korean-mp4-converter/sitemap.xml`
4. Submit RSS (optional)

#### Daum Webmaster Tools
1. Go to: https://register.search.daum.net/index.daum
2. Submit URL: `https://shikhar127.github.io/korean-mp4-converter/`
3. Submit sitemap
4. No verification needed (simpler than Naver)

---

## 📊 Verification Checklist

### Before Deploy
- [ ] Node.js installed
- [ ] Dependencies installed (`npm install` success)
- [ ] FAQ component added to page.tsx
- [ ] Layout.tsx has verification codes
- [ ] Local build works (`npm run dev`)
- [ ] Production build succeeds (`npm run build`)

### After Deploy
- [ ] Live site loads: https://shikhar127.github.io/korean-mp4-converter/
- [ ] FAQ section visible at bottom
- [ ] Converter still works
- [ ] No console errors
- [ ] View source shows:
  - Google verification meta tag
  - Naver verification meta tag
  - Structured data (JSON-LD) in `<head>`

### SEO Registration
- [ ] Google Search Console verified
- [ ] Naver Search Advisor verified
- [ ] Daum submitted
- [ ] Sitemap submitted to all 3
- [ ] Main page indexing requested (Google)

---

## 🧪 Testing Tools

### SEO
- **Google Rich Results Test:** https://search.google.com/test/rich-results
  - Test URL: `https://shikhar127.github.io/korean-mp4-converter/`
  - Should show: WebApplication and FAQPage schemas

- **Google Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
  - Should pass with no issues

### Performance
- **Lighthouse (in Chrome DevTools):**
  ```
  Open site → F12 → Lighthouse tab → Run audit
  ```
  - Target: Performance >90, Accessibility >90, SEO >95

---

## 📈 Expected Results

### Week 1
- Google Search Console: Verified ✓
- Naver Search Advisor: Verified ✓
- Daum: Submitted ✓
- Sitemap: Submitted to all 3 ✓

### Week 2
- Google: Indexed (check in Search Console)
- Naver: May start appearing in search
- Rich results (FAQ) start showing in Google

### Week 3-4
- Naver: Indexed and appearing in search
- Daum: Indexed
- Organic traffic begins (5-10 visitors/day)

### Month 2-3
- Rankings improve for target keywords
- Organic traffic grows (20-50 visitors/day)
- FAQ snippets show in Google search results

---

## 🎯 Target Keywords (Korean)

Primary:
- MP4 MP3 변환
- MP4에서 MP3
- 무료 변환기
- 온라인 변환

Secondary:
- 동영상 MP3 추출
- MP4 오디오 추출
- 무료 MP4 변환
- 브라우저 변환

---

## 🔧 Files Modified

New files created:
- `src/app/layout-enhanced.tsx` - Enhanced layout with full SEO
- `src/app/components/FAQ.tsx` - FAQ component with structured data
- `DEPLOY-SEO.md` - This file

Files to modify:
- `src/app/layout.tsx` - Replace with enhanced version
- `src/app/page.tsx` - Add FAQ component

---

## ⚡ Quick Deploy (Copy-Paste)

```bash
# 1. Install Node.js (if needed)
brew install node

# 2. Setup
cd ~/korean-mp4-converter
npm install

# 3. Apply changes
cp src/app/layout-enhanced.tsx src/app/layout.tsx

# 4. Edit page.tsx to add FAQ (use text editor)
# Add: import FAQ from './components/FAQ';
# Add: <FAQ /> after <Converter />

# 5. Get verification codes and update layout.tsx

# 6. Test
npm run dev
# Check http://localhost:3000

# 7. Deploy
npm run build
git add .
git commit -m "Add SEO improvements and FAQ section"
git push origin main

# 8. Register with search engines (manual step)
```

---

## 📞 Support

If you encounter issues:
1. Check `npm run build` output for errors
2. Verify FAQ.tsx is in correct location
3. Check browser console for errors
4. Ensure verification codes don't have quotes

---

**Ready to boost your SEO!** 🚀

Start with Step 1 (install Node.js) and follow sequentially.
