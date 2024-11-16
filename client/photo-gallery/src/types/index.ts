// src/types/index.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: 'USER' | 'ADMIN' | 'CREATOR';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

// Add Photo and related types
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface Photo {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata?: {
    width: number;
    height: number;
    location?: {
      name: string;
      coordinates?: [number, number]; // [latitude, longitude]
    };
    camera?: {
      make?: string;
      model?: string;
      settings?: {
        aperture?: string;
        shutterSpeed?: string;
        iso?: number;
        focalLength?: string;
      };
    };
  };
  tags?: string[];
  views: number;
  downloads?: number;
  isPublic: boolean;
  isFeatured?: boolean;
  collection?: {
    id: string;
    name: string;
  };
}

export interface Collection {
  id: string;
  title: string;
  description?: string;
  location: string;
  coverImage: string;
  photoCount: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  photos?: Photo[];
  tags?: string[];
  isPublic: boolean;
}

// Pagination types
export interface PaginatedResponse<T> {
  items: T[];
  nextPage: number | null;
  totalPages: number;
  totalItems: number;
}

// API request types
export interface PhotoUploadRequest {
  file: File;
  caption?: string;
  tags?: string[];
  location?: string;
  isPublic?: boolean;
  collectionId?: string;
}

export interface CreateCollectionRequest {
  title: string;
  description?: string;
  location: string;
  isPublic?: boolean;
  tags?: string[];
}

// API response types
export interface PhotoResponse {
  photo: Photo;
  success: boolean;
}

export interface CollectionResponse {
  collection: Collection;
  success: boolean;
}