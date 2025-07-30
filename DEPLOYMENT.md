# Deployment Guide for The Newars Platform

## 🚀 Quick Deploy to Vercel

### Prerequisites
1. **GitHub Account** - To store your code
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free)
3. **MongoDB Atlas Account** - Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas) (free)

### Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (choose free tier)

2. **Configure Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `newars_admin`
   - Password: Generate strong password (save it!)
   - Database User Privileges: "Read and write to any database"

3. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Add `0.0.0.0/0` (allow access from anywhere)
   - This is needed for Vercel to connect

4. **Get Connection String**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Should look like: `mongodb+srv://newars_admin:yourpassword@cluster0.xxxxx.mongodb.net/newars?retryWrites=true&w=majority`

### Step 2: Push Code to GitHub

\`\`\`bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit - The Newars cultural platform"

# Create repository on GitHub and add remote
git remote add origin https://github.com/yourusername/newars-cultural-platform.git

# Push to GitHub
git push -u origin main
\`\`\`

### Step 3: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure project settings:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: **/** (leave default)
   - Build Command: **npm run build** (auto-detected)
   - Output Directory: **.next** (auto-detected)

### Step 4: Set Environment Variables

In Vercel dashboard, go to your project → Settings → Environment Variables

Add these variables for **Production**, **Preview**, and **Development**:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://newars_admin:yourpassword@cluster0.xxxxx.mongodb.net/newars?retryWrites=true&w=majority` | Your MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | Generate using: `openssl rand -base64 32` | Random secret for NextAuth (32+ characters) |
| `NEXTAUTH_URL` | `https://your-project-name.vercel.app` | Your Vercel domain |

**To generate NEXTAUTH_SECRET:**
\`\`\`bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
\`\`\`

### Step 5: Deploy

1. **Click "Deploy"** in Vercel
2. **Wait for build to complete** (usually 2-3 minutes)
3. **Your site will be live** at `https://your-project-name.vercel.app`

### Step 6: Post-Deployment Setup

1. **Visit your live site**
2. **Go to `/setup`** to create admin user
   - Example: `https://your-project-name.vercel.app/setup`
   - Click "Create Admin User"
   - Save the credentials shown

3. **Login to admin panel**
   - Go to `/admin/login`
   - Use default credentials:
     - Username: `admin`
     - Password: `admin123`

4. **Start adding content!**
   - Create your first posts
   - Add works and achievements
   - Upload images and videos

## 🔧 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure no TypeScript errors (or enable `ignoreBuildErrors`)

### Database Connection Issues
- Verify MongoDB URI is correct
- Check that IP `0.0.0.0/0` is whitelisted in Atlas
- Ensure database user has correct permissions

### Environment Variables Not Working
- Make sure variables are set for all environments (Production, Preview, Development)
- Redeploy after setting environment variables
- Check variable names match exactly (case-sensitive)

### Images Not Loading
- Images are stored as base64 in MongoDB
- No additional file storage setup needed
- Check browser console for any errors

## 🎯 Custom Domain (Optional)

1. **Buy a domain** from any registrar
2. **In Vercel dashboard:**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions
3. **Update NEXTAUTH_URL** environment variable to your custom domain

## 📊 Monitoring

- **Vercel Analytics:** Built-in traffic and performance monitoring
- **Function Logs:** Check API route performance and errors
- **MongoDB Atlas:** Monitor database usage and performance

## 🔄 Continuous Deployment

Once set up, every push to your main branch will:
1. Automatically trigger a new build
2. Deploy to production if build succeeds
3. Update your live site

## 💡 Pro Tips

1. **Use Preview Deployments:** Every pull request gets its own URL for testing
2. **Branch Deployments:** Deploy specific branches for staging
3. **Environment-Specific Variables:** Different values for production vs preview
4. **Vercel CLI:** Install `npm i -g vercel` for command-line deployments

## 🎉 You're Live!

Your Newars cultural platform should now be live and ready to use!

**Next Steps:**
- ✅ Test all functionality
- ✅ Create sample content
- ✅ Share with your community
- ✅ Customize design and content as needed

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Check MongoDB Atlas connection
4. Ensure all environment variables are set correctly

Happy deploying! 🚀
