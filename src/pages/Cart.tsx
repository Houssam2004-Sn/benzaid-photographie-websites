import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency } from '../utils/formatCurrency';

const formatLabels: Record<string, string> = {
  digital_small: 'Digital Small (1080px)',
  digital_large: 'Digital Large (Full Res)',
  commercial: 'Commercial License',
  print_A4: 'Fine Art Print A4',
  print_A3: 'Fine Art Print A3',
  print_A2: 'Fine Art Print A2',
  canvas: 'Canvas Print',
};

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, total, discountCode, discountPercent, itemCount } = useCart();
  const { currency } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center">
        <div className="max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mb-4">Your Cart is Empty</h1>
          <p className="text-[#888880] mb-8">Looks like you haven't added any photos yet. Explore our gallery to find your perfect piece.</p>
          <Link
            to="/gallery"
            className="inline-block px-8 py-3 bg-[#C8A45A] text-[#0A0A0A] rounded-full font-medium hover:bg-[#D4B66A] gold-transition"
          >
            Browse Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0]">Shopping Cart</h1>
            <p className="text-[#888880] mt-1">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <Link to="/gallery" className="text-[#C8A45A] text-sm hover:underline">Continue Shopping →</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => (
              <div key={`${item.photo.id}-${item.format}-${idx}`} className="flex gap-4 p-4 bg-[#141414] border border-[#2A2A2A] rounded-2xl">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#1A1A1A]" style={{ backgroundColor: item.photo.dominant_color }} />
                <div className="flex-1 min-w-0">
                  <Link to={`/photo/${item.photo.id}`} className="text-[#F5F5F0] font-medium hover:text-[#C8A45A] gold-transition">
                    {item.photo.title}
                  </Link>
                  <p className="text-[#888880] text-sm mt-0.5">{formatLabels[item.format] || item.format}</p>
                  <p className="text-[#888880] text-xs mt-0.5">{item.photo.location_taken}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.photo.id, item.format, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-[#2A2A2A] text-[#888880] hover:text-[#F5F5F0] hover:border-[#C8A45A] gold-transition flex items-center justify-center cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-[#F5F5F0] w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.photo.id, item.format, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-[#2A2A2A] text-[#888880] hover:text-[#F5F5F0] hover:border-[#C8A45A] gold-transition flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#C8A45A] font-medium">{formatCurrency(item.price * item.quantity, currency)}</span>
                      <button
                        onClick={() => removeFromCart(item.photo.id, item.format)}
                        className="text-[#888880] hover:text-[#E05252] gold-transition cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 sticky top-24">
              <h3 className="text-[#F5F5F0] font-medium text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
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
                <div className="flex justify-between text-[#888880]">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-[#2A2A2A] pt-3 flex justify-between text-[#F5F5F0] font-medium text-base">
                  <span>Total</span>
                  <span className="text-[#C8A45A]">{formatCurrency(total, currency)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full mt-6 py-3.5 bg-[#C8A45A] text-[#0A0A0A] text-center rounded-full font-medium hover:bg-[#D4B66A] gold-transition"
              >
                Proceed to Checkout
              </Link>
              <p className="text-[#888880] text-xs text-center mt-4">
                We accept Credit Card, PayPal, and Cryptocurrency
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
