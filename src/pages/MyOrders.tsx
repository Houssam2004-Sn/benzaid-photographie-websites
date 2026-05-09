import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency } from '../utils/formatCurrency';

const mockOrders = [
  {
    id: 'BZ-ABC123',
    date: '2025-12-15',
    items: [{ title: 'Sahara\'s Golden Dawn', format: 'Fine Art Print A3', price: 75 }],
    total: 75,
    status: 'completed',
    payment: 'Stripe',
    tracking: 'SHIP-12345',
  },
  {
    id: 'BZ-DEF456',
    date: '2025-11-20',
    items: [{ title: 'Medina Whispers', format: 'Digital Large', price: 34.99 }],
    total: 34.99,
    status: 'completed',
    payment: 'PayPal',
    tracking: null,
  },
  {
    id: 'BZ-GHI789',
    date: '2025-10-08',
    items: [
      { title: 'Wild Essence', format: 'Canvas Print', price: 180 },
      { title: 'Chefchaouen Blue', format: 'Digital Small', price: 9.99 },
    ],
    total: 189.99,
    status: 'processing',
    payment: 'Crypto (BTC)',
    tracking: null,
  },
];

const statusColors: Record<string, string> = {
  completed: 'text-[#4CAF7A] bg-[#4CAF7A]/10',
  processing: 'text-[#C8A45A] bg-[#C8A45A]/10',
  refunded: 'text-[#E05252] bg-[#E05252]/10',
};

export default function MyOrders() {
  const { isAuthenticated, user } = useAuth();
  const { currency } = useCurrency();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center">
        <div className="max-w-md mx-auto px-4">
          <h1 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mb-4">My Orders</h1>
          <p className="text-[#888880] mb-8">Please sign in to view your orders.</p>
          <Link to="/login" className="inline-block px-8 py-3 bg-[#C8A45A] text-[#0A0A0A] rounded-full font-medium hover:bg-[#D4B66A] gold-transition">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mb-2">My Orders</h1>
        <p className="text-[#888880] mb-8">Welcome back, {user?.full_name}. Here are your orders.</p>

        <div className="space-y-4">
          {mockOrders.map(order => (
            <div key={order.id} className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[#C8A45A] font-mono font-bold">{order.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-[#888880] text-sm">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#F5F5F0] font-medium">{formatCurrency(order.total, currency)}</p>
                  <p className="text-[#888880] text-xs">{order.payment}</p>
                </div>
              </div>
              <div className="border-t border-[#2A2A2A] px-5 py-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1">
                    <span className="text-[#F5F5F0]">{item.title}</span>
                    <span className="text-[#888880]">{item.format}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2A2A2A] px-5 py-3 flex flex-wrap gap-3">
                {order.status === 'completed' && !order.tracking && (
                  <button className="text-[#C8A45A] text-sm hover:underline cursor-pointer">Download Files</button>
                )}
                {order.tracking && (
                  <span className="text-[#888880] text-sm">Tracking: <span className="text-[#F5F5F0]">{order.tracking}</span></span>
                )}
                <button className="text-[#888880] text-sm hover:text-[#F5F5F0] cursor-pointer">View Invoice</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
