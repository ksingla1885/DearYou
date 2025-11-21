---
description: Deploy DearYou application to production
---

# Deployment Guide for DearYou

This guide will walk you through deploying your full-stack DearYou application.

## Overview
- **Frontend (Client)**: Deploy to Vercel or Netlify
- **Backend (Server)**: Deploy to Render, Railway, or Heroku
- **Database**: MongoDB Atlas (cloud database)

---

## Step 1: Prepare Your Code for Deployment

### 1.1 Update .gitignore (Already Done ✅)
Your `.gitignore` is already configured to exclude sensitive files.

### 1.2 Check Environment Variables
Your server needs these environment variables:
- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (usually set by hosting platform)
- Cloudinary credentials (if using image uploads)

---

## Step 2: Set Up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dearyou`)
6. Save this for later - you'll need it for the server deployment

---

## Step 3: Deploy the Backend (Server)

### Option A: Deploy to Render (Recommended - Free Tier Available)

1. Go to [Render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `dearyou-server`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your server URL (e.g., `https://dearyou-server.onrender.com`)

### Option B: Deploy to Railway

1. Go to [Railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables in the "Variables" tab
5. Railway will auto-detect and deploy your Node.js app

---

## Step 4: Update Client to Use Production API

Before deploying the frontend, update the API URL:

1. Create a `.env` file in the `client` folder:
   ```
   VITE_API_URL=https://your-server-url.onrender.com
   ```

2. Update your API calls in the client code to use `import.meta.env.VITE_API_URL`

---

## Step 5: Deploy the Frontend (Client)

### Option A: Deploy to Vercel (Recommended)

1. Go to [Vercel.com](https://vercel.com) and sign up
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - `VITE_API_URL`: Your backend URL from Step 3
6. Click "Deploy"
7. Your site will be live at `https://your-project.vercel.app`

### Option B: Deploy to Netlify

1. Go to [Netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
5. Add environment variables in "Site settings" → "Environment variables"
6. Click "Deploy site"

---

## Step 6: Configure CORS

Update your server's CORS settings to allow requests from your deployed frontend:

In `server/server.js`, update the CORS configuration:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

Redeploy the server after this change.

---

## Step 7: Test Your Deployment

1. Visit your frontend URL
2. Test all features:
   - Landing page loads correctly
   - Navigation works
   - API calls to backend work
   - Image uploads work (if applicable)
   - Messages can be saved/retrieved

---

## Step 8: Set Up Custom Domain (Optional)

### For Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### For Render:
1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain and update DNS

---

## Quick Deployment Checklist

- [ ] MongoDB Atlas database created and connection string obtained
- [ ] Backend deployed to Render/Railway with environment variables
- [ ] Backend URL copied
- [ ] Client `.env` file created with backend URL
- [ ] Frontend deployed to Vercel/Netlify
- [ ] CORS configured on backend
- [ ] All features tested on production

---

## Troubleshooting

**Issue**: Frontend can't connect to backend
- Check CORS settings on server
- Verify `VITE_API_URL` is set correctly
- Check browser console for errors

**Issue**: Database connection fails
- Verify MongoDB Atlas connection string
- Check if IP whitelist includes `0.0.0.0/0` (allow all)
- Ensure database user has correct permissions

**Issue**: Images not uploading
- Check Cloudinary credentials in server environment variables
- Verify file size limits on hosting platform

---

## Maintenance

- Monitor your deployments through platform dashboards
- Free tiers may have limitations (Render free tier sleeps after inactivity)
- Keep dependencies updated regularly
- Monitor MongoDB Atlas usage

---

## Cost Breakdown (Free Tier)

- **MongoDB Atlas**: Free (512MB storage)
- **Render**: Free (with limitations - sleeps after 15 min inactivity)
- **Vercel**: Free (generous limits for personal projects)
- **Total**: $0/month for small projects

For production with no downtime, consider paid tiers (~$7-15/month total).
