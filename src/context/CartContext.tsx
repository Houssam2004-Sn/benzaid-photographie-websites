import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Photo } from '../data/photos';

export interface CartItem {
  photo: Photo;
  format: 'digital_small' | 'digital_large' | 'commercial' | 'print_A4' | 'print_A3' | 'print_A2' | 'canvas';
  quantity: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (photo: Photo, format: CartItem['format'], price: number) => void;
  removeFromCart: (photoId: string, format: string) => void;
  updateQuantity: (photoId: string, format: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  discountCode: string | null;
  discountPercent: number;
  applyDiscount: (code: string) => boolean;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

const VALID_DISCOUNTS: Record<string, number> = {
  'WELCOME10': 10,
  'BENZAID20': 20,
  'AFRICA15': 15,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('benzaid_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    localStorage.setItem('benzaid_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (photo: Photo, format: CartItem['format'], price: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.photo.id === photo.id && i.format === format);
      if (existing) {
        return prev.map(i =>
          i.photo.id === photo.id && i.format === format
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { photo, format, quantity: 1, price }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (photoId: string, format: string) => {
    setItems(prev => prev.filter(i => !(i.photo.id === photoId && i.format === format)));
  };

  const updateQuantity = (photoId: string, format: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(photoId, format);
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.photo.id === photoId && i.format === format ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => { setItems([]); setDiscountCode(null); setDiscountPercent(0); };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = subtotal * (1 - discountPercent / 100);

  const applyDiscount = (code: string): boolean => {
    const upper = code.toUpperCase().trim();
    if (VALID_DISCOUNTS[upper]) {
      setDiscountCode(upper);
      setDiscountPercent(VALID_DISCOUNTS[upper]);
      return true;
    }
    return false;
  };

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      subtotal, itemCount, isOpen, setIsOpen, discountCode, discountPercent, applyDiscount, total
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
