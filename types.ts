
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
  user_id: string;
  message: string;
  status: 'pending' | 'responded';
  created_at: string;
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
