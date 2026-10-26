import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const DEMO_ADMIN = {
  id: 'admin-01',
  name: 'Chief Curator',
  email: 'admin@mono.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  title: 'Managing Director & Design Architect'
};

export const DEMO_CUSTOMER = {
  id: 'cust-01',
  name: 'Alexander Wright',
  email: 'alexander.wright@archdesign.com',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  phone: '+1 (555) 234-8901',
  address: {
    street: '420 West Broadway, Loft 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10012',
    country: 'United States'
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('mono_auth_user', DEMO_ADMIN);
  const toast = useToast();

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === 'admin@mono.com') {
      setCurrentUser(DEMO_ADMIN);
      toast.success('Admin Session Initialized', 'Welcome back to MONO™ Command.');
      return { success: true, user: DEMO_ADMIN };
    }

    if (cleanEmail === DEMO_CUSTOMER.email || cleanEmail === 'customer@demo.com') {
      setCurrentUser(DEMO_CUSTOMER);
      toast.success('Patron Session Initialized', `Welcome back, ${DEMO_CUSTOMER.name}.`);
      return { success: true, user: DEMO_CUSTOMER };
    }

    // Generic registration/login for testing
    const genericUser = {
      id: `cust-${Date.now()}`,
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80'
    };
    setCurrentUser(genericUser);
    toast.success('Session Initialized', `Logged in as ${genericUser.name}`);
    return { success: true, user: genericUser };
  };

  const register = (userData) => {
    const newUser = {
      id: `cust-${Date.now()}`,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      ...userData
    };
    setCurrentUser(newUser);
    toast.success('Account Created', 'Welcome to the MONO™ patronage network.');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    toast.info('Session Terminated', 'You have been safely signed out.');
  };

  const isAdmin = currentUser?.role === 'admin';
  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        isAuthenticated,
        login,
        register,
        logout,
        setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
