import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency } from '../utils/formatCurrency';
import { BrandLogo } from '../components/BrandLogo';

type PaymentMethod = 'stripe' | 'paypal' | 'crypto';
type CryptoCoin = 'BTC' | 'ETH' | 'USDT' | 'DOGE' | 'SHIB' | 'BNB';

const cryptoAddresses: Record<CryptoCoin, string> = {
  BTC: 'bc1qxyz1234567890abcdefghijklmnopqrstuvwxyz',
  ETH: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3',
  USDT: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3',
  DOGE: 'D8xRcPjXYZ1234567890AbCdEfGhIjKlMnOp',
  SHIB: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3',
  BNB: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3',
};

export default function Checkout() {
  const { items, subtotal, total, discountCode, discountPercent, clearCart } = useCart();
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [method, setMethod] = useState<PaymentMethod>('stripe');
  const [selectedCoin, setSelectedCoin] = useState<CryptoCoin>('BTC');
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', address: '', city: '', zip: '' });
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-[#888880]">Your cart is empty</p>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000));
    const orderNumber = `BZ-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    navigate(`/order-confirmation?order=${orderNumber}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-[#2A2A2A] bg-[#141414] p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <BrandLogo size="md" layout="horizontal" className="mb-4" />
              <h1 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mb-2">Checkout</h1>
              <p className="text-[#888880]">{step === 'form' ? 'Shipping Information' : 'Payment'}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl border border-[#2A2A2A] bg-[#0A0A0A] px-4 py-3 text-[#888880]">
                <span className="block text-[#F5F5F0] font-medium mb-1">Encrypted</span>
                Secure checkout experience
              </div>
              <div className="rounded-2xl border border-[#2A2A2A] bg-[#0A0A0A] px-4 py-3 text-[#888880]">
                <span className="block text-[#F5F5F0] font-medium mb-1">Delivery</span>
                Digital and print fulfillment
              </div>
              <div className="rounded-2xl border border-[#2A2A2A] bg-[#0A0A0A] px-4 py-3 text-[#888880]">
                <span className="block text-[#F5F5F0] font-medium mb-1">Support</span>
                Direct artist contact included
              </div>
            </div>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-4 mb-10">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === (s === 1 ? 'form' : 'payment') || (step === 'payment' && s === 1)
                  ? 'bg-[#C8A45A] text-[#0A0A0A]'
                  : 'bg-[#1A1A1A] text-[#888880]'
              }`}>
                {step === 'payment' && s === 1 ? '✓' : s}
              </div>
              <span className={`text-sm ${step === (s === 1 ? 'form' : 'payment') ? 'text-[#F5F5F0]' : 'text-[#888880]'}`}>
                {s === 1 ? 'Shipping' : 'Payment'}
              </span>
              {s === 1 && <div className="w-16 h-px bg-[#2A2A2A]" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            {step === 'form' ? (
              <form onSubmit={handleFormSubmit} className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 space-y-4">
                <h3 className="text-[#F5F5F0] font-medium text-lg mb-2">Shipping Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', key: 'name', type: 'text' },
                    { label: 'Email', key: 'email', type: 'email' },
                    { label: 'Phone', key: 'phone', type: 'tel' },
                    { label: 'Country', key: 'country', type: 'text' },
                    { label: 'Address', key: 'address', type: 'text' },
                    { label: 'City', key: 'city', type: 'text' },
                    { label: 'ZIP / Postal Code', key: 'zip', type: 'text' },
                  ].map(field => (
                    <div key={field.key} className={field.key === 'address' ? 'sm:col-span-2' : ''}>
                      <label className="block text-[#888880] text-xs mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        required
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F5F0] placeholder-[#555] focus:outline-none focus:border-[#C8A45A] gold-transition"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C8A45A] text-[#0A0A0A] rounded-full font-medium hover:bg-[#D4B66A] gold-transition cursor-pointer"
                >
                  Continue to Payment
                </button>
              </form>
            ) : (
              <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
                <h3 className="text-[#F5F5F0] font-medium text-lg mb-6">Select Payment Method</h3>

                {/* Payment Tabs */}
                <div className="flex gap-2 mb-6">
                  {[
                    { key: 'stripe' as const, label: '💳 Card', },
                    { key: 'paypal' as const, label: '🅿️ PayPal', },
                    { key: 'crypto' as const, label: '₿ Crypto', },
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setMethod(opt.key)}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium gold-transition cursor-pointer ${
                        method === opt.key
                          ? 'bg-[#C8A45A] text-[#0A0A0A]'
                          : 'bg-[#1A1A1A] text-[#888880] hover:text-[#F5F5F0]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Stripe Form */}
                {method === 'stripe' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#888880] text-xs mb-1.5">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F5F0] placeholder-[#555] focus:outline-none focus:border-[#C8A45A] gold-transition"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#888880] text-xs mb-1.5">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F5F0] placeholder-[#555] focus:outline-none focus:border-[#C8A45A] gold-transition" />
                      </div>
                      <div>
                        <label className="block text-[#888880] text-xs mb-1.5">CVC</label>
                        <input type="text" placeholder="123" className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F5F0] placeholder-[#555] focus:outline-none focus:border-[#C8A45A] gold-transition" />
                      </div>
                    </div>
                    <p className="text-[#888880] text-xs">🔒 Secured by Stripe. Your data is encrypted.</p>
                  </div>
                )}

                {/* PayPal */}
                {method === 'paypal' && (
                  <div className="text-center py-8">
                    <p className="text-[#888880] mb-4">You'll be redirected to PayPal to complete your payment.</p>
                    <div className="inline-block px-6 py-3 bg-[#0070BA] text-white rounded-full text-sm font-medium">
                      PayPal Checkout
                    </div>
                  </div>
                )}

                {/* Crypto */}
                {method === 'crypto' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#888880] text-xs mb-2">Select Cryptocurrency</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(Object.keys(cryptoAddresses) as CryptoCoin[]).map(coin => (
                          <button
                            key={coin}
                            onClick={() => setSelectedCoin(coin)}
                            className={`py-2.5 rounded-xl text-sm font-medium gold-transition cursor-pointer ${
                              selectedCoin === coin
                                ? 'bg-[#C8A45A] text-[#0A0A0A]'
                                : 'bg-[#1A1A1A] text-[#888880] hover:text-[#F5F5F0]'
                            }`}
                          >
                            {coin}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4">
                      <p className="text-[#888880] text-xs mb-2">Send exactly:</p>
                      <p className="text-[#F5F5F0] text-lg font-mono break-all">
                        {formatCurrency(total, currency)} ≈ 0.0012 {selectedCoin}
                      </p>
                      <p className="text-[#888880] text-xs mt-3 mb-1">Wallet Address:</p>
                      <p className="text-[#C8A45A] text-xs font-mono break-all bg-[#141414] p-3 rounded-lg">
                        {cryptoAddresses[selectedCoin]}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className={`w-full mt-6 py-3.5 rounded-full font-medium gold-transition cursor-pointer ${
                    processing
                      ? 'bg-[#2A2A2A] text-[#888880] cursor-not-allowed'
                      : 'bg-[#C8A45A] text-[#0A0A0A] hover:bg-[#D4B66A]'
                  }`}
                >
                  {processing ? 'Processing...' : `Pay ${formatCurrency(total, currency)}`}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 sticky top-24">
              <h3 className="text-[#F5F5F0] font-medium mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-[#888880] truncate mr-2">{item.photo.title} ×{item.quantity}</span>
                    <span className="text-[#F5F5F0] shrink-0">{formatCurrency(item.price * item.quantity, currency)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2A2A2A] pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-[#888880]">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>
                {discountCode && (
                  <div className="flex justify-between text-[#4CAF7A]">
                    <span>Code: {discountCode}</span>
                    <span>-{discountPercent}%</span>
                  </div>
                )}
                <div className="flex justify-between text-[#F5F5F0] font-medium pt-2 border-t border-[#2A2A2A]">
                  <span>Total</span>
                  <span className="text-[#C8A45A]">{formatCurrency(total, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
