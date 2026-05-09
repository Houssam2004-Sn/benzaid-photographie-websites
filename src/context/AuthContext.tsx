import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  total_orders: number;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (data: { full_name: string; email: string; password: string; phone: string; country: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'demo@benzaid.com': {
    password: 'password123',
    user: {
      id: 'user-1',
      full_name: 'Demo User',
      email: 'demo@benzaid.com',
      phone: '+212 600-000000',
      country: 'Morocco',
      total_orders: 5,
      is_admin: false,
    },
  },
  'admin@benzaid.com': {
    password: 'admin123',
    user: {
      id: 'admin-1',
      full_name: 'Benzaid Admin',
      email: 'admin@benzaid.com',
      phone: '+212 698-788743',
      country: 'Morocco',
      total_orders: 0,
      is_admin: true,
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('benzaid_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem('benzaid_user', JSON.stringify(user));
    else localStorage.removeItem('benzaid_user');
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    const entry = MOCK_USERS[email.toLowerCase()];
    if (entry && entry.password === password) {
      setUser(entry.user);
      return true;
    }
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setUser({
      id: 'google-user-1',
      full_name: 'Google User',
      email: 'googleuser@gmail.com',
      phone: '',
      country: 'US',
      total_orders: 0,
      is_admin: false,
    });
    return true;
  };

  const register = async (data: { full_name: string; email: string; password: string; phone: string; country: string }): Promise<boolean> => {
    setUser({
      id: `user-${Date.now()}`,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      total_orders: 0,
      is_admin: false,
    });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
