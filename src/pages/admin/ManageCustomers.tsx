const customers = [
  { id: 'C-001', name: 'Sarah Mitchell', email: 'sarah@example.com', country: 'USA', orders: 12, total: 3450, joined: '2024-03-15', blocked: false },
  { id: 'C-002', name: 'James Okonkwo', email: 'james@example.com', country: 'Nigeria', orders: 8, total: 2100, joined: '2024-05-22', blocked: false },
  { id: 'C-003', name: 'Emma Larsson', email: 'emma@example.com', country: 'Sweden', orders: 5, total: 980, joined: '2024-07-10', blocked: false },
  { id: 'C-004', name: 'Karim Benali', email: 'karim@example.com', country: 'Morocco', orders: 24, total: 8500, joined: '2024-01-08', blocked: false },
  { id: 'C-005', name: 'Lisa Wong', email: 'lisa@example.com', country: 'Singapore', orders: 3, total: 340, joined: '2025-09-01', blocked: true },
];

export default function ManageCustomers() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0]">Manage Customers</h1>
            <p className="text-[#888880] text-sm">{customers.length} registered users</p>
          </div>
          <input
            type="text"
            placeholder="Search customers..."
            className="px-4 py-2.5 bg-[#141414] border border-[#2A2A2A] rounded-full text-[#F5F5F0] placeholder-[#555] text-sm focus:outline-none focus:border-[#C8A45A] gold-transition"
          />
        </div>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A] text-[#888880] text-xs uppercase">
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4 hidden md:table-cell">Country</th>
                  <th className="text-center p-4">Orders</th>
                  <th className="text-right p-4 hidden sm:table-cell">Total Spent</th>
                  <th className="text-left p-4 hidden lg:table-cell">Joined</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#1A1A1A] gold-transition">
                    <td className="p-4">
                      <p className="text-[#F5F5F0] font-medium">{c.name}</p>
                      <p className="text-[#888880] text-xs">{c.email}</p>
                    </td>
                    <td className="p-4 text-[#888880] hidden md:table-cell">{c.country}</td>
                    <td className="p-4 text-center text-[#F5F5F0]">{c.orders}</td>
                    <td className="p-4 text-right text-[#C8A45A] font-medium hidden sm:table-cell">${c.total.toLocaleString()}</td>
                    <td className="p-4 text-[#888880] hidden lg:table-cell">{c.joined}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        c.blocked ? 'bg-[#E05252]/10 text-[#E05252]' : 'bg-[#4CAF7A]/10 text-[#4CAF7A]'
                      }`}>
                        {c.blocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-[#888880] hover:text-[#F5F5F0] text-xs cursor-pointer">View</button>
                        <button className={`text-xs cursor-pointer ${c.blocked ? 'text-[#4CAF7A]' : 'text-[#E05252]'} hover:underline`}>
                          {c.blocked ? 'Unblock' : 'Block'}
                        </button>
                      </div>
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
