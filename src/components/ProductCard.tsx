import { useState, useEffect } from 'react';
import { Product } from '../lib/supabase';
import { generateWhatsAppLink } from '../lib/whatsapp';
import { cartService, wishlistService } from '../lib/cart';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onCartUpdate?: () => void;
}

export default function ProductCard({ product, onCartUpdate }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');
  const [isHovering, setIsHovering] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    checkWishlist();
  }, [product.id]);

  const checkWishlist = async () => {
    try {
      const isLiked = await wishlistService.isInWishlist(product.id);
      setIsWishlisted(isLiked);
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await wishlistService.removeFromWishlist(product.id);
      } else {
        await wishlistService.addToWishlist(product.id);
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    try {
      await cartService.addToCart(product.id, 1, selectedSize, selectedColor);
      onCartUpdate?.();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleOrder = () => {
    const whatsappLink = generateWhatsAppLink(
      product.name,
      selectedSize,
      selectedColor
    );
    window.open(whatsappLink, '_blank');
  };

  const discountedPrice = Math.floor(product.price * 0.5);

  return (
    <div
      className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovering ? 'scale-110' : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-6xl">👕</span>
          </div>
        )}

        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100 transition-all z-10 shadow-lg"
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>

        <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          50% OFF
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-medium text-lg text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          {product.subcategory && (
            <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
              {product.subcategory}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm line-through text-gray-400">KSh {product.price.toLocaleString()}</p>
            <p className="text-xl font-bold text-green-600">KSh {discountedPrice.toLocaleString()}</p>
          </div>
          {!product.in_stock && (
            <span className="text-xs text-red-600 font-medium">Out of Stock</span>
          )}
        </div>

        {product.colors.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">Color:</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 text-xs border rounded transition-all ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.sizes.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">Size:</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-xs border rounded transition-all ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleOrder}
          disabled={!product.in_stock}
          className="w-full py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-4"
        >
          {product.in_stock ? 'Order via WhatsApp' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
