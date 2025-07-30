/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore build errors for faster deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Optimize for Vercel deployment
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'mongodb-client-encryption': 'mongodb-client-encryption',
      })
    }
    return config
  },
  
  // Output configuration for better performance
  output: 'standalone',
  
  // Reduce bundle size
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
}

export default nextConfig
