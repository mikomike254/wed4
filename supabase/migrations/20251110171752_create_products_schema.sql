/*
  # Eddjos Collections Product Catalog Schema

  ## Overview
  Complete database schema for Eddjos Collections fashion e-commerce platform
  with WhatsApp-based ordering system.

  ## 1. New Tables
  
  ### `products`
  Main product catalog table containing all clothing items
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text, not null) - Product name (e.g., "Eddjos Oversized Hoodie")
  - `category` (text, not null) - Product category: 'men', 'women', 'unisex'
  - `subcategory` (text) - Subcategory (Women: Dresses, Open Sweaters, Panties, Handbags. Men: Polo, Blazer, Full Suits, Cap, Belt)
  - `description` (text) - Detailed product description
  - `price` (numeric, not null) - Price in Kenyan Shillings (KES)
  - `colors` (text[]) - Array of available colors
  - `sizes` (text[]) - Array of available sizes (S, M, L, XL, etc.)
  - `image_url` (text) - Primary product image URL
  - `featured` (boolean) - Whether product is featured on homepage
  - `in_stock` (boolean) - Inventory status
  - `sort_order` (integer) - Display order in catalog
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `categories`
  Product category reference table
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text, unique, not null) - Category name
  - `slug` (text, unique, not null) - URL-friendly slug
  - `display_order` (integer) - Display order in navigation
  - `created_at` (timestamptz) - Record creation timestamp

  ## 2. Security
  - Enable RLS on all tables
  - Public read access for product catalog (no authentication required)
  - No write access from client (products managed via admin tools)

  ## 3. Indexes
  - Index on product category for fast filtering
  - Index on featured products for homepage queries
  - Index on in_stock status for availability filtering
  - Index on subcategory for filtering by product type

  ## 4. Notes
  - All prices in Kenyan Shillings (KES)
  - No cart/checkout - orders via WhatsApp
  - Colors and sizes stored as arrays for flexibility
  - Products can belong to multiple categories via category field
  - Subcategories: Women (Dresses, Open Sweaters, Panties, Handbags), Men (Polo, Blazer, Full Suits, Cap, Belt)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('men', 'women', 'unisex')),
  subcategory text,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  colors text[] DEFAULT '{}',
  sizes text[] DEFAULT '{}',
  image_url text,
  featured boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock) WHERE in_stock = true;
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for browsing)
CREATE POLICY "Categories are publicly readable"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Products are publicly readable"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert default categories
INSERT INTO categories (name, slug, display_order) VALUES
  ('Men', 'men', 1),
  ('Women', 'women', 2),
  ('Unisex', 'unisex', 3)
ON CONFLICT (name) DO NOTHING;