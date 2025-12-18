
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  images: string[];
  status: 'for_sale' | 'sold';
  owner_id: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'buyer' | 'seller' | 'admin';
}

export interface Inquiry {
  id: string;
  property_id: string;
  property_title?: string;
  user_email: string;
  user_name: string;
  message: string;
  status: 'pending' | 'responded';
  created_at: string;
}

export interface SiteSettings {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  contactEmail: string;
  footerText: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface FilterOptions {
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
}
