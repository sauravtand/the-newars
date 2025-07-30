# The Newars - Cultural Platform

A modern, responsive website for The Newars, dedicated to sharing and promoting Newari culture in Nepal.

## Features

- 📝 **Cultural Posts Management** - Create, edit, and display cultural content
- 🏆 **Works Showcase** - Display community achievements and projects
- 🖼️ **Media Gallery** - Support for multiple images and videos
- 👤 **Admin Panel** - Secure content management system
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Cultural Theme** - Traditional Newari colors and design

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Next.js API Routes, NextAuth.js
- **Database:** MongoDB with Mongoose
- **UI Components:** Radix UI, Lucide Icons
- **File Upload:** Local storage with API routes

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd newars-cultural-platform
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update `.env.local` with your values:
- `NEXTAUTH_SECRET`: Generate a random secret
- `MONGODB_URI`: Your MongoDB connection string
- `NEXTAUTH_URL`: Your domain (for production)

5. Create uploads directory:
\`\`\`bash
mkdir public/uploads
\`\`\`

6. Create admin user:
\`\`\`bash
npm run create-admin
\`\`\`

7. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

8. Open [http://localhost:3000](http://localhost:3000)

## Deployment Instructions

### Prerequisites
1. GitHub account
2. Vercel account (free)
3. MongoDB Atlas account (free)

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/newars-cultural-platform)

### Manual Deployment Steps

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set Environment Variables**
4. **Deploy**

See full instructions below.

## Environment Variables

Set these in Vercel dashboard:

- `NEXTAUTH_SECRET`: Random 32+ character string
- `NEXTAUTH_URL`: Your Vercel domain
- `MONGODB_URI`: MongoDB Atlas connection string

## Post-Deployment

1. Visit `/setup` to create admin user
2. Login at `/admin/login`
3. Start adding content!

## Admin Access

Default admin credentials (change after first login):
- Username: `admin`
- Password: `admin123`

Access admin panel at: `/admin/login`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── post/              # Post detail pages
│   ├── work/              # Work detail pages
│   └── ...
├── components/            # React components
├── lib/                   # Utilities and database
├── public/               # Static files
└── scripts/              # Utility scripts
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email thenewars.nepal@gmail.com or create an issue on GitHub.
"# the-newars" 
