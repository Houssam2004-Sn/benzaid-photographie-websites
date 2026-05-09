import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Link } from 'react-router-dom';

const formatLabels: Record<string, string> = {
  digital_small: 'Digital Small (1080px)',
  digital_large: 'Digital Large (Full Res)',
  commercial: 'Commercial License',
  print_A4: 'Fine Art Print A4',
  print_A3: 'Fine Art Print A3',
  print_A2: 'Fine Art Print A2',
  canvas: 'Canvas Print',
};

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, subtotal, total, discountCode, discountPercent, applyDiscount, itemCount } = useCart();
  const { currency } = useCurrency();
  const [code, setCode] = React.useState('');
  const [codeError, setCodeError] = React.useState('');

  const handleApplyCode = () => {
    if (!code.trim()) return;
    const success = applyDiscount(code);
    if (!success) {
      setCodeError('Invalid discount code');
    } else {
      setCodeError('');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[80]" onClick={() => setIsOpen(false)} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0A0A0A] border-l border-[#2A2A2A] z-[81] flex flex-col animate-[slideRight_0.3s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
          <h2 className="font-['Cormorant_Garamond'] text-2xl text-[#F5F5F0]">
            Your Cart ({itemCount})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#888880] hover:text-[#F5F5F0] gold-transition text-2xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#888880] text-lg mb-2">Your cart is empty</p>
              <Link
                to="/gallery"
                onClick={() => setIsOpen(false)}
                className="text-[#C8A45A] text-sm hover:underline"
              >
                Browse the gallery
              </Link>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.photo.id}-${item.format}-${idx}`} className="flex gap-4 p-3 rounded-xl bg-[#141414] border border-[#2A2A2A]">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#1A1A1A]">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundColor: item.photo.dominant_color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[#F5F5F0] text-sm font-medium truncate">{item.photo.title}</h4>
                  <p className="text-[#888880] text-xs mt-0.5">{formatLabels[item.format] || item.format}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.photo.id, item.format, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-[#2A2A2A] text-[#888880] hover:text-[#F5F5F0] hover:border-[#C8A45A] gold-transition flex items-center justify-center text-xs cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-[#F5F5F0] text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.photo.id, item.format, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-[#2A2A2A] text-[#888880] hover:text-[#F5F5F0] hover:border-[#C8A45A] gold-transition flex items-center justify-center text-xs cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#C8A45A] text-sm font-medium">
                        {formatCurrency(item.price * item.quantity, currency)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.photo.id, item.format)}
                        className="text-[#888880] hover:text-[#E05252] gold-transition text-xs cursor-pointer"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#2A2A2A] p-6 space-y-4">
            {/* Discount code */}
            {!discountCode ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={e => { setCode(e.target.value); setCodeError(''); }}
                  placeholder="Discount code"
                  className="flex-1 px-4 py-2.5 bg-[#141414] border border-[#2A2A2A] rounded-full text-sm text-[#F5F5F0] placeholder-[#555] focus:outline-none focus:border-[#C8A45A] gold-transition"
                />
                <button
                  onClick={handleApplyCode}
                  className="px-4 py-2.5 border border-[#C8A45A] text-[#C8A45A] rounded-full text-sm hover:bg-[#C8A45A] hover:text-[#0A0A0A] gold-transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#4CAF7A]">✓ Code: {discountCode} ({discountPercent}% off)</span>
                <button onClick={() => { applyDiscount(''); setCode(''); }} className="text-[#888880] hover:text-[#E05252] cursor-pointer">Remove</button>
              </div>
            )}
            {codeError && <p className="text-[#E05252] text-xs">{codeError}</p>}

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#888880]">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal, currency)}</span>
              </div>
              {discountCode && (
                <div className="flex justify-between text-[#4CAF7A]">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-{formatCurrency(subtotal * discountPercent / 100, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#F5F5F0] font-medium text-base pt-2 border-t border-[#2A2A2A]">
                <span>Total</span>
                <span className="text-[#C8A45A]">{formatCurrency(total, currency)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3 bg-[#C8A45A] text-[#0A0A0A] text-center rounded-full font-medium hover:bg-[#D4B66A] gold-transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

import React from 'react';
