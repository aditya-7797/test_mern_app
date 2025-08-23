# Render Deployment Guide

## Prerequisites
- Your backend is already deployed and working on Render
- You have a Render account

## Deployment Steps

### 1. Connect Your Repository
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Select the repository: `Interior_Design_Website`

### 2. Configure Build Settings
- **Name**: `interior-design-frontend` (or your preferred name)
- **Branch**: `main` (or your default branch)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`

### 3. Set Environment Variables
In the Render dashboard, add these environment variables:
- **Key**: `REACT_APP_API_URL`
- **Value**: `https://your-backend-url.onrender.com` (replace with your actual backend URL)

### 4. Deploy
1. Click "Create Static Site"
2. Wait for the build to complete
3. Your site will be available at the provided URL

## Important Notes

### Environment Variables
- Make sure to set `REACT_APP_API_URL` to your actual backend URL
- The environment variable must start with `REACT_APP_` for React to recognize it

### Build Process
- The build command will install dependencies and create a production build
- The `build` folder contains your static files
- Render will serve these files as a static site

### Routing
- The `render.yaml` file includes rewrite rules for React Router
- All routes will fall back to `index.html` for client-side routing

## Troubleshooting

### Build Failures
- Check that all dependencies are in `package.json`
- Ensure the build command works locally: `npm run build`

### Environment Variables
- Verify `REACT_APP_API_URL` is set correctly
- Check the browser console for any API connection errors

### Routing Issues
- Ensure the rewrite rules in `render.yaml` are correct
- Test navigation between pages after deployment

## Local Testing
Before deploying, test the production build locally:
```bash
cd client
npm run build
npx serve -s build
```

This will help identify any build issues before deployment.
