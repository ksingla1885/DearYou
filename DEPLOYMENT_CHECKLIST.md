# 🚀 DearYou Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## Pre-Deployment Preparation

- [ ] All code changes committed to Git
- [ ] `.gitignore` properly configured (✅ Already done)
- [ ] Environment variables documented in `.env.example` files
- [ ] API URLs updated to use environment variables (✅ Already done)
- [ ] CORS configured for production (✅ Already done)

## Database Setup (MongoDB Atlas)

- [ ] Created MongoDB Atlas account
- [ ] Created a new cluster (free tier is fine)
- [ ] Created database user with password
- [ ] Whitelisted IP addresses (use `0.0.0.0/0` for all IPs)
- [ ] Copied connection string
- [ ] Tested connection locally

**Connection String Format:**
```
mongodb+srv://<username>:<password>@cluster.mongodb.net/dearyou?retryWrites=true&w=majority
```

## Backend Deployment (Render)

- [ ] Created Render account
- [ ] Connected GitHub repository
- [ ] Created new Web Service
- [ ] Configured build settings:
  - Root Directory: `server`
  - Build Command: `npm install`
  - Start Command: `npm start`
- [ ] Added environment variables:
  - [ ] `MONGO_URI` (from MongoDB Atlas)
  - [ ] `NODE_ENV=production`
  - [ ] `CLIENT_URL` (will add after frontend deployment)
  - [ ] `CLOUDINARY_CLOUD_NAME` (if using Cloudinary)
  - [ ] `CLOUDINARY_API_KEY` (if using Cloudinary)
  - [ ] `CLOUDINARY_API_SECRET` (if using Cloudinary)
- [ ] Deployed successfully
- [ ] Copied backend URL: ___________________________

## Frontend Deployment (Vercel)

- [ ] Created Vercel account
- [ ] Connected GitHub repository
- [ ] Created new project
- [ ] Configured build settings:
  - Root Directory: `client`
  - Framework: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] Added environment variables:
  - [ ] `VITE_API_URL` (your backend URL from Render)
- [ ] Deployed successfully
- [ ] Copied frontend URL: ___________________________

## Post-Deployment Configuration

- [ ] Updated `CLIENT_URL` in Render backend environment variables with Vercel URL
- [ ] Redeployed backend after updating CLIENT_URL
- [ ] Tested all features on production:
  - [ ] Landing page loads
  - [ ] Navigation works
  - [ ] Gallery page loads images
  - [ ] Can upload new images
  - [ ] Messages page works
  - [ ] Can post new messages
  - [ ] Surprise page loads
  - [ ] Music player works

## Optional Enhancements

- [ ] Set up custom domain on Vercel
- [ ] Set up custom domain on Render
- [ ] Configure SSL certificates (usually automatic)
- [ ] Set up monitoring/analytics
- [ ] Configure error tracking (e.g., Sentry)

## Troubleshooting

If something doesn't work:

1. **Check browser console** for errors
2. **Check Render logs** for backend errors
3. **Verify environment variables** are set correctly
4. **Check CORS errors** - ensure CLIENT_URL matches your Vercel URL exactly
5. **Database connection** - verify MongoDB Atlas IP whitelist and credentials

## URLs Reference

- **Frontend (Vercel)**: ___________________________
- **Backend (Render)**: ___________________________
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Cloudinary**: https://cloudinary.com (if using)

## Maintenance Notes

- Free tier on Render sleeps after 15 minutes of inactivity
- First request after sleep may take 30-60 seconds
- Consider upgrading to paid tier ($7/month) for always-on service
- Monitor MongoDB Atlas usage (free tier: 512MB)

---

**Deployment Date**: ___________________________
**Deployed By**: ___________________________
**Status**: ⬜ In Progress | ⬜ Completed | ⬜ Issues

## Notes

___________________________
___________________________
___________________________
