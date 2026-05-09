import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from './BrandLogo';

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { to: '/admin/photos', label: 'Photos', icon: '🖼️' },
  { to: '/admin/orders', label: 'Orders', icon: '📦' },
  { to: '/admin/customers', label: 'Customers', icon: '👥' },
  { to: '/admin/messages', label: 'Messages', icon: '💬' },
  { to: '/admin/revenue', label: 'Revenue', icon: '💰' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user?.is_admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0A0A0A] border-r border-[#2A2A2A] fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-[#2A2A2A]">
          <Link to="/admin" className="block" aria-label="Benzaid admin home">
            <BrandLogo size="sm" layout="horizontal" admin className="opacity-95" />
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(link => {
            const isActive = link.exact
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm gold-transition ${
                  isActive
                    ? 'bg-[#C8A45A]/10 text-[#C8A45A] border border-[#C8A45A]/20'
                    : 'text-[#888880] hover:text-[#F5F5F0] hover:bg-[#141414]'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#2A2A2A]">
          <Link to="/" className="block text-[#888880] text-sm hover:text-[#F5F5F0] mb-2 px-4">
            ← Back to Site
          </Link>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-[#E05252] text-sm hover:bg-[#141414] rounded-xl cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A] px-4 py-3 flex items-center gap-3 overflow-x-auto">
        <Link to="/admin" className="text-[#C8A45A] font-bold text-sm shrink-0">Admin</Link>
        {sidebarLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap ${
              location.pathname === link.to || (!link.exact && location.pathname.startsWith(link.to))
                ? 'bg-[#C8A45A]/20 text-[#C8A45A]'
                : 'text-[#888880]'
            }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64">
        <Outlet />
      </main>
    </div>
  );
}
