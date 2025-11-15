import { supabase, CartItem, WishlistItem } from './supabase';

function getSessionId(): string {
  let sessionId = localStorage.getItem('user_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('user_session_id', sessionId);
  }
  return sessionId;
}

export const cartService = {
  async getCartItems(): Promise<CartItem[]> {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_session_id', sessionId);

    if (error) throw error;
    return data || [];
  },

  async addToCart(
    productId: string,
    quantity: number = 1,
    selectedSize?: string,
    selectedColor?: string
  ): Promise<CartItem> {
    const sessionId = getSessionId();

    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_session_id', sessionId)
      .eq('product_id', productId)
      .eq('selected_size', selectedSize || '')
      .eq('selected_color', selectedColor || '')
      .maybeSingle();

    if (existing) {
      return this.updateCartItem(existing.id, existing.quantity + quantity);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert([{
        user_session_id: sessionId,
        product_id: productId,
        quantity,
        selected_size: selectedSize,
        selected_color: selectedColor,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCartItem(cartItemId: string, quantity: number): Promise<CartItem> {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeFromCart(cartItemId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;
  },

  async clearCart(): Promise<void> {
    const sessionId = getSessionId();
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_session_id', sessionId);

    if (error) throw error;
  },

  async getCartCount(): Promise<number> {
    const items = await this.getCartItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
};

export const wishlistService = {
  async getWishlistItems(): Promise<WishlistItem[]> {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_session_id', sessionId);

    if (error) throw error;
    return data || [];
  },

  async addToWishlist(productId: string): Promise<WishlistItem> {
    const sessionId = getSessionId();

    const { data: existing } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_session_id', sessionId)
      .eq('product_id', productId)
      .maybeSingle();

    if (existing) return existing;

    const { data, error } = await supabase
      .from('wishlist_items')
      .insert([{
        user_session_id: sessionId,
        product_id: productId,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeFromWishlist(productId: string): Promise<void> {
    const sessionId = getSessionId();
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_session_id', sessionId)
      .eq('product_id', productId);

    if (error) throw error;
  },

  async isInWishlist(productId: string): Promise<boolean> {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_session_id', sessionId)
      .eq('product_id', productId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },
};
