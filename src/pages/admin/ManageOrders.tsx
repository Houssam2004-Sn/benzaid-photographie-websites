import { useState } from 'react';

const orders = [
  { id: 'BZ-XYZ999', customer: 'Sarah Mitchell', email: 'sarah@example.com', total: 250, status: 'completed', method: 'Stripe', date: '2026-01-15' },
  { id: 'BZ-XYZ998', customer: 'James Okonkwo', email: 'james@example.com', total: 180, status: 'processing', method: 'PayPal', date: '2026-01-14' },
  { id: 'BZ-XYZ997', customer: 'Emma Larsson', email: 'emma@example.com', total: 75, status: 'completed', method: 'Crypto (BTC)', date: '2026-01-13' },
  { id: 'BZ-XYZ996', customer: 'Karim Benali', email: 'karim@example.com', total: 2400, status: 'processing', method: 'Stripe', date: '2026-01-12' },
  { id: 'BZ-XYZ995', customer: 'Lisa Wong', email: 'lisa@example.com', total: 120, status: 'refunded', method: 'PayPal', date: '2026-01-10' },
  { id: 'BZ-XYZ994', customer: 'Omar Fayed', email: 'omar@example.com', total: 45, status: 'completed', method: 'Crypto (ETH)', date: '2026-01-09' },
];

const statusColors: Record<string, string> = {
  completed: 'bg-[#4CAF7A]/10 text-[#4CAF7A]',
  processing: 'bg-[#C8A45A]/10 text-[#C8A45A]',
  refunded: 'bg-[#E05252]/10 text-[#E05252]',
  pending: 'bg-gray-500/10 text-gray-400',
};

export default function ManageOrders() {
  const [orderList] = useState(orders);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? orderList : orderList.filter(o => o.status === filter);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0]">Manage Orders</h1>
            <p className="text-[#888880] text-sm">{filtered.length} orders</p>
          </div>
          <button className="px-4 py-2 border border-[#2A2A2A] text-[#888880] rounded-full text-sm hover:border-[#C8A45A] gold-transition cursor-pointer">
            Export CSV
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'completed', 'processing', 'refunded'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-medium gold-transition cursor-pointer ${
                filter === s ? 'bg-[#C8A45A] text-[#0A0A0A]' : 'bg-[#1A1A1A] text-[#888880] hover:text-[#F5F5F0]'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A] text-[#888880] text-xs uppercase">
                  <th className="text-left p-4">Order #</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4 hidden md:table-cell">Payment</th>
                  <th className="text-left p-4 hidden lg:table-cell">Date</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-right p-4">Total</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <tr key={order.id} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#1A1A1A] gold-transition">
                    <td className="p-4">
                      <span className="text-[#C8A45A] font-mono font-medium">{order.id}</span>
                    </td>
                    <td className="p-4">
                      <p className="text-[#F5F5F0]">{order.customer}</p>
                      <p className="text-[#888880] text-xs">{order.email}</p>
                    </td>
                    <td className="p-4 text-[#888880] hidden md:table-cell">{order.method}</td>
                    <td className="p-4 text-[#888880] hidden lg:table-cell">{order.date}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-[#C8A45A] font-medium">${order.total}</td>
                    <td className="p-4 text-right">
                      <select className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-1.5 text-xs text-[#F5F5F0] cursor-pointer focus:outline-none">
                        <option value="">Action</option>
                        <option value="complete">Mark Completed</option>
                        <option value="refund">Mark Refunded</option>
                        <option value="email">Send Email</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
