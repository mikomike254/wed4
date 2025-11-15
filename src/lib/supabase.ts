import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  category: 'men' | 'women' | 'unisex';
  subcategory: string | null;
  description: string | null;
  price: number;
  colors: string[];
  sizes: string[];
  image_url: string | null;
  featured: boolean;
  in_stock: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_session_id: string;
  product_id: string;
  quantity: number;
  selected_size: string | null;
  selected_color: string | null;
  created_at: string;
  product?: Product;
}

export interface WishlistItem {
  id: string;
  user_session_id: string;
  product_id: string;
  created_at: string;
  product?: Product;
}
