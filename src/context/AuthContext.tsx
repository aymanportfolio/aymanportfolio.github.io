import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lock, LogIn, UserPlus, X, Send, ArrowRight, MessageCircle } from 'lucide-react';

export interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  requireAuth: (action: () => void, reason?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('ayman_portfolio_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('Authentication required to perform this action.');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const login = (name: string, email: string) => {
    const newUser = { name, email };
    setUser(newUser);
    try {
      localStorage.setItem('ayman_portfolio_user', JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ayman_portfolio_user');
  };

  const requireAuth = (action: () => void, customReason?: string) => {
    if (user) {
      action();
    } else {
      setPendingAction(() => action);
      if (customReason) setReason(customReason);
      setIsOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      setError('Please provide email and password.');
      return;
    }
    if (mode === 'signup' && !nameInput.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const userName = nameInput.trim() || emailInput.split('@')[0];
    login(userName, emailInput.trim());

    setIsOpen(false);
    setError('');

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleWhatsAppBypass = () => {
    // Open WhatsApp directly
    const waUrl = 'https://wa.me/?text=Hello%20Ayman%20Ullah%2C%20I%20am%20reaching%20out%20from%20your%20portfolio.';
    window.open(waUrl, '_blank');

    // Also auto-login guest user and execute pending action!
    login('WhatsApp Guest', 'guest@whatsapp.com');
    setIsOpen(false);

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleGoBack = () => {
    setIsOpen(false);
    setPendingAction(null);
    setError('');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, requireAuth }}>
      {children}

      {/* Global Auth Gate Dialog Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-pink-500/50 shadow-[0_0_50px_rgba(255,42,133,0.3)] text-white p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between relative z-10 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-pink-500/20 border border-pink-400/40 text-pink-300">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-mono text-cyan-300">
                    Authentication Gate
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {reason}
                  </p>
                </div>
              </div>
              <button
                onClick={handleGoBack}
                className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex rounded-2xl bg-slate-950 p-1 border border-slate-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5 font-bold ${
                  mode === 'signin'
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5 font-bold ${
                  mode === 'signup'
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" /> Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-center">
                  {error}
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-slate-300">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-pink-400"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-slate-300">Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-pink-400"
                />
              </div>

              {/* SIDE BY SIDE ACTION BUTTONS */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                {/* 1. Primary Sign In / Sign Up Button */}
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-mono font-bold shadow-lg shadow-pink-500/25 transition-transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{mode === 'signin' ? 'Sign In & Continue' : 'Sign Up & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 2. Side-By-Side Animated "Contact WhatsApp" Bypass Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppBypass}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono font-black shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 flex items-center justify-center gap-2 animate-pulse cursor-pointer"
                  title="Bypass authentication and contact via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span>Contact WhatsApp</span>
                </button>
              </div>

              {/* 3. Go Back Button */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="text-slate-400 hover:text-white text-xs font-mono underline cursor-pointer"
                >
                  Go Back
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
