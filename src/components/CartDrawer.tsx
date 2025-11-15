import { useState, useEffect } from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { cartService } from '../lib/cart';
import { supabase, CartItem } from '../lib/supabase';
import { generateWhatsAppLink } from '../lib/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<(CartItem & { product?: any })[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  const loadCart = async () => {
    setIsLoading(true);
    try {
      const items = await cartService.getCartItems();
      const itemsWithProducts = await Promise.all(
        items.map(async (item) => {
          const { data: product } = await supabase
            .from('products')
            .select('*')
            .eq('id', item.product_id)
            .single();
          return { ...item, product };
        })
      );
      setCartItems(itemsWithProducts);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (cartItemId: string) => {
    try {
      await cartService.removeFromCart(cartItemId);
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleUpdateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await handleRemove(cartItemId);
      return;
    }
    try {
      await cartService.updateCartItem(cartItemId, newQuantity);
      setCartItems(
        cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity * 0.5,
      0
    );
  };

  const handleCheckout = () => {
    const cartSummary = cartItems
      .map(
        (item) =>
          `${item.product?.name} (Qty: ${item.quantity}, Color: ${item.selected_color || 'N/A'}, Size: ${item.selected_size || 'N/A'})`
      )
      .join('\n');

    const totalPrice = getTotalPrice();
    const message = `Hi, I'd like to order the following items:\n\n${cartSummary}\n\nTotal (50% OFF): KSh ${totalPrice.toLocaleString()}\n\nPlease confirm availability and proceed with checkout.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/254793832286?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <h2 className="text-xl font-bold">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1">
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product?.name}</p>
                      <p className="text-xs text-gray-500">
                        Color: {item.selected_color || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {item.selected_size || 'N/A'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border rounded hover:bg-gray-100 transition-colors text-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded hover:bg-gray-100 transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold text-sm">
                      KSh {(((item.product?.price || 0) * item.quantity) * 0.5).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4 sticky bottom-0 bg-white">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total (50% OFF):</span>
              <span>KSh {getTotalPrice().toLocaleString()}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
