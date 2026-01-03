# Mini E-Commerce Platform

A modern e-commerce application built with Next.js 16.1.1, featuring product browsing, authentication, and order management with a sleek UI powered by Tailwind CSS and GSAP animations.

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: GSAP React
- **Authentication**: JWT with HttpOnly cookies
- **State Management**: React Context API
- **TypeScript**: Full type safety

## 📋 Features

- 🛍️ Product catalog with dynamic variants (colors, sizes)
- 🔐 Phone-based authentication with OTP verification
- 📱 Mobile-responsive design
- 🛒 Shopping cart and purchase flow
- 👤 User profile with order history
- ✨ Smooth GSAP animations and interactions
- 🎨 Dark theme with modern UI



## 🔐 Quick Login (Demo Access)

For testing purposes, use these dummy credentials:

### Existing User Login
1. **Phone Number**: `9876543210`
2. **OTP**: `1234`

### New User Registration
1. **Phone Number**: Any 10-digit number (not `9876543210`)
2. **OTP**: `5678`
3. **Name**: Enter any name for registration

### How to Login
1. Go to `/login`
2. Enter phone number and click "Continue"
3. Enter OTP when prompted
4. For existing users, you'll be redirected to home
5. For new users, complete registration first

## 🏗️ Architecture Decisions

### Authentication Strategy
- **JWT tokens stored in HttpOnly cookies** for security
- **Server-side rendering** for protected routes
- **Context API** for client-side auth state synchronization
- **No localStorage/sessionStorage usage** for token storage

### Component Architecture
- **SSR Components**: Navbar, Footer, Product details for SEO and performance
- **Client Components**: Interactive elements with animations and state
- **Hybrid Approach**: Best of both worlds for performance and UX

### State Management
- **Authentication**: React Context for global auth state
- **Local State**: Component-specific state with useState
- **Server State**: Direct API calls for data fetching

### Styling Approach
- **Utility-First**: Tailwind CSS for consistent design
- **Custom Configuration**: Responsive breakpoints and theme
- **Component Scoped**: Scoped styles for component-specific needs

### Animation Strategy
- **GSAP**: Advanced animations for product interactions
- **Performance**: Hardware-accelerated animations
- **User Experience**: Smooth transitions and micro-interactions

## 📁 Project Structure

```
app/
├── api/                    # API routes
│   ├── auth/              # Authentication endpoints
│   ├── purchase-product/    # Purchase processing
│   └── user-orders/       # Order history
├── components/             # Reusable components
│   ├── ProductCard.tsx     # Product display card
│   ├── Navbar.tsx          # Navigation header
│   └── Footer.tsx         # Footer component
├── context/               # React contexts
│   └── AuthContext.tsx     # Authentication state
├── lib/                   # Utilities
│   ├── apiClient.ts        # API helper
│   └── auth.ts            # Auth utilities
└── types/                 # TypeScript definitions
    └── product.ts          # Product interfaces
```

## 🎯 Key Features

### Product Display
- Dynamic color and size selection
- Real-time price updates
- Animated product cards with hover effects
- Responsive grid layout

### Authentication Flow
- Phone number verification
- OTP-based authentication
- Secure cookie-based session management
- Protected route enforcement

### User Experience
- Smooth page transitions
- Loading states and error handling
- Mobile-responsive design
- Touch-friendly interactions

## 🚀 Deployment


**Note**: This is a demonstration project with mock authentication and data. In a production environment, replace mock endpoints with real backend services.