# MrPhotos - Photography Platform Documentation

## Quick Start Guide

### Prerequisites
- Node.js v20+
- Docker and Docker Compose
- PostgreSQL (if running without Docker)
- Git

### Clone Repository
```bash
git clone <repository-url>
cd mrphotos
```

### Environment Setup

1. Create backend environment file:
```bash
# server/.env
DATABASE_URL="postgresql://mrphotos:mr_photos@postgres:5432/mrphotos"
JWT_SECRET="your-secret-key"
PORT=3001
```

2. Create frontend environment file:
```bash
# client/.env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### Installation

#### Backend Setup
```bash
cd server
npm install
npx prisma generate
```

#### Frontend Setup
```bash
cd client/photo-gallery
npm install
```

### Running with Docker (will rum ciient and server with 1 call)
From the root directory:
```bash
# Start all services
docker compose -f /docker_compose.yml/ up -d
OR
docker compose up --build

# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Stop services
docker compose down
```

### Running Locally (Without Docker)
#### Backend
```bash
cd server
npm run dev
```

#### Frontend
```bash
cd client/photo-gallery
npm run dev
```

## Current Implementation Status

### Backend Implementation
- ✅ Express server setup
- ✅ PostgreSQL with Prisma ORM
- ✅ Authentication system (JWT)
- ✅ User roles (USER, ADMIN, CREATOR)
- ✅ Basic API structure

### Frontend Implementation
- ✅ Next.js 14 setup
- ✅ Tailwind CSS
- ✅ shadcn/ui components
- ✅ Authentication UI
- ✅ Basic routing structure

### Current Features

#### Authentication
- Login/Register functionality
- Role-based access control
- Protected routes
- Token management

#### Pages Implemented
- Public Home Page
- Login/Register Pages
- Feed Page (in progress)
- Photographer Portfolio Page (in progress)

#### Components Created
- Navigation Bar
- Photo Feed Card
- Collection Grid
- Auth Forms
- Layout Components

### Directory Structure
```
mrphotos/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.ts
│   ├── prisma/
│   └── package.json
├── client/
│   ├── photo-gallery/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   └── types/
│   │   └── package.json
├── docker/
│   ├── backend/
│   └── frontend/
└── docker-compose.yml
```

### API Endpoints Implemented
```
AUTH:
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me

USERS:
GET  /api/users
GET  /api/users/:id
PATCH /api/users/:id/role

PHOTOS: (In Progress)
GET  /api/photos/feed
POST /api/photos
GET  /api/photos/:id
```


## Development Tools
- VS Code with ESLint and Prettier
- Prisma extension for VS Code
- React Developer Tools
- Docker Desktop


---------------------------------------------------------------------

## Development Phases

### Phase 1: Core Features

#### Authentication System
- **User Registration & Login**
  - Email and password authentication
  - Social media authentication (optional)
- **Role-Based Access Control**
  - User: Basic member access
  - Creator: Enhanced posting capabilities
  - Admin: Full platform management
- **Profile Management**
  - Personal information
  - Profile picture
  - Biography
  - Contact information

#### Feed/Home Page
- **Featured Content**
  - Curated photo grid
  - Spotlight photographers
  - Editor's picks
- **Trending Section**
  - Most viewed photos
  - Popular photographers
  - Trending categories
- **Latest Uploads**
  - Real-time feed
  - Infinite scroll implementation
  - Quick view functionality

#### User Profiles
- **Profile Header**
  - Profile picture
  - User information
  - Contact details
  - Social media links
- **Photo Gallery Grid**
  - Masonry layout
  - Filter options
  - Sort capabilities
- **Statistics Dashboard**
  - Total photos
  - Engagement metrics (likes)
  - View counts
  - Follower statistics

### Phase 2: Social Features

#### Photo Interactions
- **Engagement Features**
  - Like/Unlike functionality
  - Save to collections
  - Share capabilities
- **Comments System**
  - Threaded comments
  - Rich text support
  - Moderation tools

#### Blog/Stories
- **Content Creation**
  - Photo stories
  - Text integration
  - Multi-photo layouts
- **Organization**
  - Category system
  - Tagging functionality
  - Search capabilities
- **Featured Content**
  - Editorial picks
  - Community highlights
  - Trending stories

### Phase 3: Advanced Features

#### Collections/Albums
- **Organization**
  - Create collections
  - Edit capabilities
  - Batch operations
- **Privacy Controls**
  - Public/Private toggle
  - Shared access
  - Password protection
- **Sharing Options**
  - Social media integration
  - Direct links
  - Embed capabilities

#### Discover Features
- **Search System**
  - Advanced filters
  - Tag-based search
  - Location search
- **Category Exploration**
  - Organized browsing
  - Category filters
  - Subcategories
- **Recommendations**
  - Personalized suggestions
  - Similar content
  - "You might like" section

## Technical Requirements

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Query for data fetching

### Backend
- Node.js/Express
- PostgreSQL with Prisma
- JWT authentication
- RESTful API design

### Infrastructure
- Docker containerization
- Azure or Cloudinary for photo storage
- Redis for caching (future implementation)
- AWS S3 for backup storage (future implementation)

## Development Guidelines

### Code Organization
- Feature-based folder structure
- Component-driven development
- Type-safe implementations
- Modular architecture

### API Structure
- RESTful endpoints
- Versioned API routes
- Comprehensive documentation
- Security best practices

### Design Principles
- Mobile-first approach (experience on mobile needs to be easy to use and attractive)
- Responsive design
- Accessibility compliance
- Performance optimization

## Future Considerations
- Integration with professional photography tools
- Advanced analytics dashboard
- Print-on-demand services
- Photographer booking system
- Workshop/Event management
- Equipment rental marketplace

