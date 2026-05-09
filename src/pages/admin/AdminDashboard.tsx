import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const stats = {
  totalRevenue: 45780,
  todayRevenue: 1240,
  weekRevenue: 8920,
  monthRevenue: 32150,
  newOrders: 12,
  unreadMessages: 5,
  totalCustomers: 1247,
  totalPhotos: 186,
};

const recentOrders = [
  { id: 'BZ-XYZ999', customer: 'Sarah Mitchell', total: 250, status: 'Completed', date: '2 hours ago' },
  { id: 'BZ-XYZ998', customer: 'James Okonkwo', total: 180, status: 'Processing', date: '5 hours ago' },
  { id: 'BZ-XYZ997', customer: 'Emma Larsson', total: 75, status: 'Completed', date: '1 day ago' },
  { id: 'BZ-XYZ996', customer: 'Karim Benali', total: 2400, status: 'Processing', date: '1 day ago' },
];

const bestSellers = [
  { title: 'Wild Essence', sales: 89, revenue: 4500 },
  { title: 'Chefchaouen Blue', sales: 76, revenue: 3400 },
  { title: 'Sahara\'s Golden Dawn', sales: 65, revenue: 5200 },
  { title: 'Medina Whispers', sales: 58, revenue: 2300 },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0]">Dashboard</h1>
            <p className="text-[#888880] text-sm">Welcome back, {user?.full_name}</p>
          </div>
          <Link
            to="/admin/photos"
            className="px-4 py-2 bg-[#C8A45A] text-[#0A0A0A] rounded-full text-sm font-medium hover:bg-[#D4B66A] gold-transition"
          >
            Manage Photos
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: 'border-[#C8A45A]/40' },
            { label: 'New Orders', value: stats.newOrders, icon: '📦', color: 'border-[#4CAF7A]/40' },
            { label: 'Unread Messages', value: stats.unreadMessages, icon: '💬', color: 'border-[#E05252]/40' },
            { label: 'Customers', value: stats.totalCustomers.toLocaleString(), icon: '👥', color: 'border-blue-500/40' },
          ].map(stat => (
            <div key={stat.label} className={`bg-[#141414] border ${stat.color} rounded-2xl p-5`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-[#888880] text-xs">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-[#F5F5F0]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Revenue Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Today', value: `$${stats.todayRevenue}` },
            { label: 'This Week', value: `$${stats.weekRevenue}` },
            { label: 'This Month', value: `$${stats.monthRevenue}` },
          ].map(rev => (
            <div key={rev.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 text-center">
              <p className="text-[#888880] text-xs">{rev.label}</p>
              <p className="text-[#C8A45A] font-bold text-lg">{rev.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#F5F5F0] font-medium">Recent Orders</h3>
              <Link to="/admin/orders" className="text-[#C8A45A] text-xs hover:underline">View All →</Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-[#2A2A2A] last:border-0">
                  <div>
                    <p className="text-[#F5F5F0] text-sm font-mono">{order.id}</p>
                    <p className="text-[#888880] text-xs">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#C8A45A] text-sm font-medium">${order.total}</p>
                    <p className="text-[#888880] text-xs">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Sellers */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
            <h3 className="text-[#F5F5F0] font-medium mb-4">Best Selling Photos</h3>
            <div className="space-y-3">
              {bestSellers.map((photo, i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-[#2A2A2A] last:border-0">
                  <span className="text-[#C8A45A] font-bold text-lg w-6">#{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-[#F5F5F0] text-sm">{photo.title}</p>
                    <p className="text-[#888880] text-xs">{photo.sales} sold</p>
                  </div>
                  <span className="text-[#C8A45A] font-medium">${photo.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { to: '/admin/photos', label: 'Manage Photos', icon: '🖼️' },
            { to: '/admin/orders', label: 'Manage Orders', icon: '📦' },
            { to: '/admin/customers', label: 'Customers', icon: '👥' },
            { to: '/admin/messages', label: 'Messages', icon: '💬' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-5 text-center gold-transition hover:border-[#C8A45A]/40 hover:-translate-y-1"
            >
              <span className="text-3xl block mb-2">{link.icon}</span>
              <span className="text-[#F5F5F0] text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
