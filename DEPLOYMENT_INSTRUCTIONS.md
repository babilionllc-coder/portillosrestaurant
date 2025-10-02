# 🚀 DEPLOYMENT GUIDE - Portillos Restaurante

## **DEPLOYMENT OPTIONS**

### **1. 🌟 GITHUB PAGES (RECOMMENDED - FREE)**

#### **Step 1: Enable GitHub Pages**
1. Go to your GitHub repository: `https://github.com/[username]/portillosrestaurant`
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

#### **Step 2: Access Your Website**
- Your website will be available at: `https://[username].github.io/portillosrestaurant`
- GitHub Pages typically takes 5-10 minutes to deploy

#### **Step 3: Custom Domain (Optional)**
1. In GitHub Pages settings, add your custom domain: `portillosrestaurante.com`
2. Update DNS records to point to GitHub Pages
3. Add `CNAME` file to repository root

### **2. 🌐 NETLIFY (ALTERNATIVE - FREE)**

#### **Step 1: Connect Repository**
1. Go to [netlify.com](https://netlify.com)
2. Click **New site from Git**
3. Connect your GitHub repository
4. Select **portillosrestaurant** repository

#### **Step 2: Deploy Settings**
- **Build command:** Leave empty (static site)
- **Publish directory:** `/` (root)
- Click **Deploy site**

#### **Step 3: Custom Domain**
1. Go to **Domain settings**
2. Add custom domain: `portillosrestaurante.com`
3. Update DNS records

### **3. 🔥 VERCEL (ALTERNATIVE - FREE)**

#### **Step 1: Import Project**
1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import from GitHub
4. Select **portillosrestaurant** repository

#### **Step 2: Deploy**
- **Framework Preset:** Other
- **Root Directory:** `./`
- Click **Deploy**

## **🚀 QUICK DEPLOYMENT COMMANDS**

### **For GitHub Pages:**
```bash
# Ensure all files are committed
git add .
git commit -m "Ready for deployment"
git push origin main

# Enable GitHub Pages in repository settings
# Website will be available at: https://[username].github.io/portillosrestaurant
```

### **For Netlify:**
```bash
# Build command: (leave empty)
# Publish directory: /
# Deploy automatically from GitHub
```

### **For Vercel:**
```bash
# Framework: Other
# Root directory: ./
# Deploy automatically from GitHub
```

## **📋 POST-DEPLOYMENT CHECKLIST**

### **✅ Test All Pages:**
- [ ] Home page loads correctly
- [ ] Menu page displays properly
- [ ] Gallery page works
- [ ] Contact page functions
- [ ] WhatsApp links work
- [ ] All images load
- [ ] Mobile responsive design

### **✅ Test All Features:**
- [ ] Navigation menu
- [ ] WhatsApp ordering buttons
- [ ] Contact form
- [ ] Google Maps embed
- [ ] Social media links
- [ ] Favicon displays

### **✅ SEO & Analytics:**
- [ ] Google Analytics tracking
- [ ] Meta tags display correctly
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] Open Graph tags work

## **🌐 DOMAIN CONFIGURATION**

### **If Using Custom Domain:**
1. **Purchase Domain:** `portillosrestaurante.com`
2. **DNS Configuration:**
   - A Record: `185.199.108.153` (GitHub Pages)
   - A Record: `185.199.109.153` (GitHub Pages)
   - A Record: `185.199.110.153` (GitHub Pages)
   - A Record: `185.199.111.153` (GitHub Pages)
   - CNAME: `www` → `[username].github.io`

3. **SSL Certificate:** Automatically provided by GitHub Pages

## **📊 PERFORMANCE OPTIMIZATION**

### **After Deployment:**
1. **Test Page Speed:** Use Google PageSpeed Insights
2. **Optimize Images:** Compress images if needed
3. **Enable Compression:** GitHub Pages handles this automatically
4. **Monitor Analytics:** Check Google Analytics data

## **🔧 MAINTENANCE**

### **Regular Updates:**
- Update menu prices
- Add new photos to gallery
- Update business hours
- Monitor WhatsApp orders
- Check analytics data

### **Backup:**
- GitHub repository serves as backup
- Regular commits preserve changes
- Version history available

---

## **🎯 RECOMMENDED DEPLOYMENT:**

**GitHub Pages** is the best option because:
- ✅ **Free hosting**
- ✅ **Automatic SSL**
- ✅ **Custom domain support**
- ✅ **Easy updates via Git**
- ✅ **Professional appearance**
- ✅ **Fast loading**

**Your website will be live at:**
`https://[username].github.io/portillosrestaurant`

**Or with custom domain:**
`https://portillosrestaurante.com`
