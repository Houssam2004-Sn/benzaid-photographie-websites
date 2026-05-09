import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import type { Currency } from '../utils/formatCurrency';
import { BrandLogo } from './BrandLogo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const currencies: Currency[] = ['USD', 'EUR', 'MAD', 'GBP'];

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 gold-transition ${
          scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="shrink-0 group" aria-label="Benzaid home">
              <BrandLogo size="md" layout="horizontal" className="group-hover:opacity-90 gold-transition" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm tracking-wide gold-transition ${
                    location.pathname === link.to
                      ? 'text-[#C8A45A]'
                      : 'text-[#888880] hover:text-[#F5F5F0]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Currency */}
              <div className="hidden sm:block relative">
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value as Currency)}
                  className="appearance-none bg-transparent text-[#888880] text-xs border border-[#2A2A2A] rounded-full px-3 py-1.5 cursor-pointer hover:border-[#C8A45A] gold-transition focus:outline-none"
                >
                  {currencies.map(c => (
                    <option key={c} value={c} className="bg-[#0A0A0A]">{c}</option>
                  ))}
                </select>
              </div>

              {/* Account */}
              <div className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="text-[#888880] hover:text-[#F5F5F0] gold-transition p-2 cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#141414] border border-[#2A2A2A] rounded-xl shadow-2xl py-2 overflow-hidden">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-3 border-b border-[#2A2A2A]">
                          <p className="text-[#F5F5F0] text-sm font-medium">{user?.full_name}</p>
                          <p className="text-[#888880] text-xs">{user?.email}</p>
                        </div>
                        {user?.is_admin && (
                          <Link to="/admin" className="block px-4 py-2.5 text-sm text-[#888880] hover:text-[#C8A45A] hover:bg-[#1A1A1A] gold-transition">
                            Admin Dashboard
                          </Link>
                        )}
                        <Link to="/my-orders" className="block px-4 py-2.5 text-sm text-[#888880] hover:text-[#F5F5F0] hover:bg-[#1A1A1A] gold-transition">
                          My Orders
                        </Link>
                        <button
                          onClick={() => { logout(); setAccountOpen(false); }}
                          className="block w-full text-left px-4 py-2.5 text-sm text-[#E05252] hover:bg-[#1A1A1A] gold-transition cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => { navigate('/login'); setAccountOpen(false); }}
                          className="block w-full text-left px-4 py-2.5 text-sm text-[#F5F5F0] hover:bg-[#1A1A1A] gold-transition cursor-pointer"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => { navigate('/register'); setAccountOpen(false); }}
                          className="block w-full text-left px-4 py-2.5 text-sm text-[#888880] hover:bg-[#1A1A1A] gold-transition cursor-pointer"
                        >
                          Create Account
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative text-[#888880] hover:text-[#F5F5F0] gold-transition p-2 cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C8A45A] text-[#0A0A0A] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-[#888880] hover:text-[#F5F5F0] gold-transition p-2 cursor-pointer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {mobileOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0A0A0A] border-t border-[#2A2A2A] animate-[slideDown_0.3s_ease-out]">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block py-3 px-4 rounded-lg gold-transition ${
                    location.pathname === link.to
                      ? 'text-[#C8A45A] bg-[#1A1A1A]'
                      : 'text-[#888880] hover:text-[#F5F5F0] hover:bg-[#141414]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 px-4">
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value as Currency)}
                  className="w-full appearance-none bg-[#141414] text-[#888880] text-sm border border-[#2A2A2A] rounded-full px-4 py-2.5 cursor-pointer hover:border-[#C8A45A] gold-transition focus:outline-none"
                >
                  {currencies.map(c => (
                    <option key={c} value={c} className="bg-[#0A0A0A]">{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Backdrop for account dropdown */}
      {accountOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setAccountOpen(false)} />
      )}
    </>
  );
}
