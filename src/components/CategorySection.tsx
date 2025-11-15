import ProductCard from './ProductCard';
import { Product } from '../lib/supabase';

interface CategorySectionProps {
  title: string;
  category: 'men' | 'women' | 'unisex';
  products: Product[];
  onCartUpdate?: () => void;
}

export default function CategorySection({
  title,
  category,
  products,
  onCartUpdate
}: CategorySectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2
          className="text-4xl md:text-5xl font-bold mb-2"
          style={{ fontFamily: '"Glowen", sans-serif' }}
        >
          {title}
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-black to-gray-300"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onCartUpdate={onCartUpdate}
          />
        ))}
      </div>
    </section>
  );
}
