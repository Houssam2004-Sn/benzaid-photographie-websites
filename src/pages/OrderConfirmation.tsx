import { Link, useSearchParams } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const orderNumber = params.get('order') || 'BZ-XXXXXXXX';

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <BrandLogo size="lg" layout="stacked" className="mb-6" />
        <div className="w-20 h-20 rounded-full bg-[#4CAF7A]/20 flex items-center justify-center mx-auto mb-6 border border-[#4CAF7A]/20">
          <svg className="w-10 h-10 text-[#4CAF7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mb-3">
          Order Confirmed!
        </h1>
        <p className="text-[#888880] text-lg mb-2">Thank you for your purchase.</p>
        <p className="text-[#888880] mb-6">
          Your order number is{' '}
          <span className="text-[#C8A45A] font-mono font-bold text-lg">{orderNumber}</span>
        </p>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 mb-8 text-left">
          <h3 className="text-[#F5F5F0] font-medium mb-3">What happens next?</h3>
          <ul className="space-y-3 text-sm text-[#888880]">
            <li className="flex gap-3">
              <span className="text-[#C8A45A]">1.</span>
              You'll receive a confirmation email at your provided email address.
            </li>
            <li className="flex gap-3">
              <span className="text-[#C8A45A]">2.</span>
              For digital purchases, a download link will be sent within minutes.
            </li>
            <li className="flex gap-3">
              <span className="text-[#C8A45A]">3.</span>
              For prints, we'll begin processing and you'll receive a tracking number within 2–3 business days.
            </li>
            <li className="flex gap-3">
              <span className="text-[#C8A45A]">4.</span>
              You can track your order anytime on your My Orders page.
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/my-orders"
            className="px-8 py-3 bg-[#C8A45A] text-[#0A0A0A] rounded-full font-medium hover:bg-[#D4B66A] gold-transition"
          >
            View My Orders
          </Link>
          <Link
            to="/gallery"
            className="px-8 py-3 border border-[#2A2A2A] text-[#F5F5F0] rounded-full font-medium hover:border-[#C8A45A] gold-transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
