import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A] pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <BrandLogo size="lg" layout="stacked" className="items-start text-left mb-5" />
            <p className="text-[#888880] text-sm leading-relaxed mb-4 max-w-xs">
              Premium fine art photography, editorial visuals, and collectible prints with a refined African storytelling aesthetic.
            </p>
            <div className="flex gap-3">
              {['Instagram', 'Twitter', 'Facebook'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#2A2A2A] text-[#888880] hover:text-[#C8A45A] hover:border-[#C8A45A] gold-transition text-xs"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F5F5F0] font-medium mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/gallery', label: 'Gallery' },
                { to: '/about', label: 'About the Photographer' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[#888880] text-sm hover:text-[#C8A45A] gold-transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-[#F5F5F0] font-medium mb-4 text-sm uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/my-orders', label: 'My Orders' },
                { to: '/faq', label: 'Shipping & Returns' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/faq', label: 'Licensing' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[#888880] text-sm hover:text-[#C8A45A] gold-transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F5F5F0] font-medium mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:Bb784867@gmail.com" className="text-[#888880] text-sm hover:text-[#C8A45A] gold-transition flex items-center gap-2">
                  <span className="text-[#C8A45A]">✉</span> Bb784867@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+212698788743" className="text-[#888880] text-sm hover:text-[#C8A45A] gold-transition flex items-center gap-2">
                  <span className="text-[#C8A45A]">☎</span> +212 698-788743
                </a>
              </li>
              <li className="text-[#888880] text-sm flex items-center gap-2">
                <span className="text-[#C8A45A]">📍</span> Morocco, North Africa
              </li>
              <li className="text-[#888880] text-sm flex items-center gap-2">
                <span className="text-[#C8A45A]">📸</span> @benzaidphotography
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1A1A1A] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#666] text-xs">
            &copy; {year} Benzaid Photography. All rights reserved. Images protected by DMCA.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-[#666] text-xs hover:text-[#C8A45A] gold-transition">Privacy Policy</Link>
            <Link to="/faq" className="text-[#666] text-xs hover:text-[#C8A45A] gold-transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
