export default function RevenueReports() {
  const monthlyData = [
    { month: 'Jan 2026', revenue: 12450, orders: 145, avgOrder: 85.86 },
    { month: 'Dec 2025', revenue: 15200, orders: 178, avgOrder: 85.39 },
    { month: 'Nov 2025', revenue: 9800, orders: 120, avgOrder: 81.67 },
    { month: 'Oct 2025', revenue: 11300, orders: 135, avgOrder: 83.70 },
    { month: 'Sep 2025', revenue: 8700, orders: 98, avgOrder: 88.78 },
    { month: 'Aug 2025', revenue: 10200, orders: 112, avgOrder: 91.07 },
  ];

  const byCategory = [
    { category: 'Landscape', revenue: 18500, percentage: 32 },
    { category: 'Wildlife', revenue: 14200, percentage: 25 },
    { category: 'Urban', revenue: 11000, percentage: 19 },
    { category: 'Portrait', revenue: 8200, percentage: 14 },
    { category: 'Abstract', revenue: 3500, percentage: 6 },
    { category: 'Nature', revenue: 2300, percentage: 4 },
  ];

  const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
  const totalOrders = monthlyData.reduce((sum, m) => sum + m.orders, 0);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0]">Revenue Reports</h1>
            <p className="text-[#888880] text-sm">Last 6 months</p>
          </div>
          <button className="px-4 py-2 border border-[#2A2A2A] text-[#888880] rounded-full text-sm hover:border-[#C8A45A] gold-transition cursor-pointer">
            Export Report
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}` },
            { label: 'Total Orders', value: totalOrders },
            { label: 'Avg Order Value', value: `$${(totalRevenue / totalOrders).toFixed(2)}` },
            { label: 'Refund Rate', value: '1.2%' },
          ].map(card => (
            <div key={card.label} className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-5">
              <p className="text-[#888880] text-xs mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-[#F5F5F0]">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Revenue Chart (Visual Representation) */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
            <h3 className="text-[#F5F5F0] font-medium mb-6">Monthly Revenue</h3>
            <div className="space-y-4">
              {monthlyData.map(m => (
                <div key={m.month}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#888880]">{m.month}</span>
                    <span className="text-[#C8A45A] font-medium">${m.revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C8A45A] to-[#D4B66A] rounded-full gold-transition"
                      style={{ width: `${(m.revenue / 15200) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
            <h3 className="text-[#F5F5F0] font-medium mb-6">Revenue by Category</h3>
            <div className="space-y-4">
              {byCategory.map(c => (
                <div key={c.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#888880]">{c.category}</span>
                    <span className="text-[#F5F5F0]">${c.revenue.toLocaleString()} ({c.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C8A45A] to-[#D4B66A] rounded-full"
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="mt-8 bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A] text-[#888880] text-xs uppercase">
                  <th className="text-left p-4">Month</th>
                  <th className="text-right p-4">Revenue</th>
                  <th className="text-right p-4">Orders</th>
                  <th className="text-right p-4">Avg Order</th>
                  <th className="text-right p-4">Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((m, i) => {
                  const prev = monthlyData[i + 1];
                  const growth = prev ? ((m.revenue - prev.revenue) / prev.revenue * 100) : 0;
                  return (
                    <tr key={m.month} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#1A1A1A] gold-transition">
                      <td className="p-4 text-[#F5F5F0]">{m.month}</td>
                      <td className="p-4 text-right text-[#C8A45A] font-medium">${m.revenue.toLocaleString()}</td>
                      <td className="p-4 text-right text-[#F5F5F0]">{m.orders}</td>
                      <td className="p-4 text-right text-[#888880]">${m.avgOrder.toFixed(2)}</td>
                      <td className={`p-4 text-right font-medium ${i === monthlyData.length - 1 ? 'text-[#888880]' : growth >= 0 ? 'text-[#4CAF7A]' : 'text-[#E05252]'}`}>
                        {i === monthlyData.length - 1 ? '—' : `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
