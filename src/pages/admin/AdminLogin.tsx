import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../../components/BrandLogo';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@benzaid.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Hint: admin@benzaid.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <BrandLogo size="lg" layout="stacked" admin className="mb-5" />
          <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0]">Admin Access</h1>
          <p className="text-[#888880] text-sm mt-2">Secure sign-in for the Benzaid dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-[#E05252]/10 border border-[#E05252]/30 rounded-xl p-3 text-[#E05252] text-xs">
              {error}
            </div>
          )}
          <div>
            <label className="block text-[#888880] text-xs mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F5F0] focus:outline-none focus:border-[#C8A45A] gold-transition"
            />
          </div>
          <div>
            <label className="block text-[#888880] text-xs mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F5F0] focus:outline-none focus:border-[#C8A45A] gold-transition"
              placeholder="admin123"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#C8A45A] text-[#0A0A0A] rounded-full font-medium hover:bg-[#D4B66A] gold-transition cursor-pointer"
          >
            Sign In to Admin
          </button>
        </form>
      </div>
    </div>
  );
}
