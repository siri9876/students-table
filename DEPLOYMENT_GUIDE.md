# Quick Deployment Guide

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Vercel (Easiest)

### Method 1: Using GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"
6. Done! Your site is live

### Method 2: Using CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Deploy to Netlify

### Method 1: Drag and Drop

1. Build your project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to Netlify
4. Your site is live!

### Method 2: Using CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Method 3: Using GitHub

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy site"

## Project Configuration

### Build Settings

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18 or higher

### Environment Variables

No environment variables are required for the basic version.

## Verifying Deployment

After deployment, test these features:

1. Page loads correctly
2. Can add a new student
3. Can edit existing student
4. Can delete a student
5. Search functionality works
6. Excel download works
7. Responsive on mobile devices

## Troubleshooting

### Build Fails

- Ensure Node.js version is 18 or higher
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try `npm run build` locally first

### Site Loads but Broken

- Check browser console for errors
- Ensure all files are uploaded
- Clear browser cache
- Check build output for warnings

### Excel Download Not Working

- Ensure `xlsx` package is installed
- Check browser console for errors
- Try in different browser

## Custom Domain Setup

### Vercel

1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify

1. Go to site settings
2. Click "Domain management"
3. Add custom domain
4. Update DNS records as instructed

## Performance Tips

- Keep bundle size under 500KB (currently ~528KB)
- Enable gzip compression (automatic on Vercel/Netlify)
- Use CDN for faster global delivery (automatic)
- Enable HTTPS (automatic on Vercel/Netlify)

## Monitoring

### Vercel Analytics

1. Go to project dashboard
2. Enable "Analytics"
3. View traffic and performance metrics

### Netlify Analytics

1. Go to site dashboard
2. Enable "Analytics"
3. View traffic and performance data

## Support

For issues or questions:
- Check the README.md for detailed information
- Review the code comments
- Test locally before deploying
- Check build logs for errors

---

**Happy Deploying!**
