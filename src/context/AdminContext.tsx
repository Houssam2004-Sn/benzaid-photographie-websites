import { createContext, useContext, useState, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface AdminContextType {
  stats: {
    totalRevenue: number;
    todayRevenue: number;
    weekRevenue: number;
    monthRevenue: number;
    newOrders: number;
    unreadMessages: number;
    totalCustomers: number;
  };
  markMessageRead: (id: string) => void;
  updateOrderStatus: (id: string, status: string) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [stats] = useState({
    totalRevenue: 45780,
    todayRevenue: 1240,
    weekRevenue: 8920,
    monthRevenue: 32150,
    newOrders: 12,
    unreadMessages: 5,
    totalCustomers: 1247,
  });

  const markMessageRead = (_id: string) => {};
  const updateOrderStatus = (_id: string, _status: string) => {};

  if (!user?.is_admin) return <>{children}</>;

  return (
    <AdminContext.Provider value={{ stats, markMessageRead, updateOrderStatus }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
