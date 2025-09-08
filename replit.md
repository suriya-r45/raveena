# Palaniappa Jewellers E-Commerce Platform

## Overview
A full-stack jewelry e-commerce application built with React frontend and Express backend. The platform features product management, cart functionality, order processing, payment integration, and administrative tools for managing a jewelry business.

## Current State
✅ **Successfully Configured for Replit Environment**
- Database: PostgreSQL configured and schema applied successfully
- Frontend: React with Vite, serving on port 5000 with webview output  
- Backend: Express.js API with proper CORS and host configuration
- Development workflow: Running successfully on port 5000
- Deployment: Configured for autoscale deployment
- JWT authentication configured with secure secret
- Metal rates service initialized
- Shipping zones and methods initialized
- All API endpoints working correctly
- Application fully operational in Replit environment

## Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI with shadcn/ui components
- **Styling**: Tailwind CSS with custom theming
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation

### Backend (Express + Node.js)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based authentication
- **File Upload**: Multer for image handling
- **Payment Processing**: Stripe integration (optional)
- **SMS Notifications**: Twilio integration (optional)

### Key Features
- Product catalog with categories and filters
- Shopping cart and checkout functionality
- Admin dashboard for product/order management
- Metal rates management system
- Barcode/QR code generation for products
- Image processing with vintage effects
- Shipping zone and method management
- Estimate generation and billing
- Mobile-responsive design

## Environment Configuration

### Required Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (✅ configured)
- `JWT_SECRET` - JWT signing secret (✅ configured)

### Optional Environment Variables
- `STRIPE_SECRET_KEY` - For payment processing
- `TWILIO_ACCOUNT_SID` & `TWILIO_AUTH_TOKEN` - For SMS notifications
- `ADMIN_EMAIL`, `ADMIN_MOBILE`, `ADMIN_PASSWORD` - Admin credentials

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Express backend
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions
│   └── routes.ts           # API routes
├── shared/                 # Shared types and schemas
├── migrations/             # Database migrations
└── uploads/                # File upload storage
```

## Recent Changes (Session: September 8, 2025)
- ✅ Successfully imported GitHub repository and configured for Replit environment
- ✅ Created PostgreSQL database and applied all database schema successfully
- ✅ Generated and configured JWT_SECRET environment variable for authentication
- ✅ Configured development workflow with proper webview output on port 5000
- ✅ Verified frontend serves correctly with allowedHosts: true for Replit proxy
- ✅ Confirmed all backend API endpoints are working (metal-rates, products, videos, home-sections)
- ✅ Successfully initialized core services: metal rates and shipping zones/methods
- ✅ All database tables created and populated with initial data
- ✅ Frontend React application connecting successfully to backend APIs
- ✅ **COMPLETE THEME OVERHAUL**: Replaced complex purple gradients with elegant modern luxury theme
- ✅ **NEW COLOR SCHEME**: Warm gold accents, cream backgrounds, and sophisticated shadows
- ✅ **ENHANCED PRODUCT CARDS**: Modern card design with luxury hover effects and perfect visibility
- ✅ **FESTIVAL COMPONENTS**: Comprehensive secondary home page with countdown timers, special offers, and seasonal collections
- ✅ **MODERN ANIMATIONS**: Replaced complex animations with elegant, subtle effects
- ✅ **RESPONSIVE DESIGN**: Clean, mobile-first layouts that work beautifully across all devices
- ✅ **STUNNING QR CODES**: Enhanced QR code system to generate beautiful product card images instead of plain text
  - QR codes now link to gorgeous product cards with luxury gold backgrounds
  - Professional product image display with elegant framing
  - Complete product details beautifully formatted
  - Palaniappa Jewellers branding and contact information included
- ✅ Project fully operational with stunning new design and enhanced QR functionality

## Development Workflow
- **Start Development**: `npm run dev` - Runs both frontend and backend
- **Build for Production**: `npm run build` - Builds frontend and backend
- **Database Migrations**: `npm run db:push` - Applies schema changes

## User Preferences
- Modern, clean UI design with jewelry-appropriate styling
- Mobile-first responsive design
- Professional admin interface for business management
- Performance optimized for product catalog browsing