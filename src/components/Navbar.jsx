import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, ShieldCheck, Lock } from 'lucide-react';

export default function Navbar({ onNavigate, currentView, onBackToHome }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleNavClick = (sectionId) => {
    if (onBackToHome) {
      onBackToHome();
    }
  };

  return (
    <nav className="w-full bg-white/95 dark:bg-[#070b14]/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo with Teal Plus Icon (Exact match to screenshot) */}
        <div 
          onClick={onBackToHome || (() => onNavigate?.('landing'))}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          title="Return to Home"
        >
          <div className="flex items-center justify-center text-teal-600 dark:text-teal-400">
            <div className="relative flex items-center justify-center w-7 h-7">
              <span className="absolute w-5 h-1.5 bg-teal-600 dark:bg-teal-400 rounded-full group-hover:scale-110 transition-transform"></span>
              <span className="absolute h-5 w-1.5 bg-teal-600 dark:bg-teal-400 rounded-full group-hover:scale-110 transition-transform"></span>
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#0f172a] dark:text-white font-display">
            KOMPOUNDER
          </span>
        </div>

        {/* Center Navigation Links (Exact match to screenshot) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => handleNavClick('home')}
            className={`transition-colors pb-1 ${
              currentView === 'landing' 
                ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-600' 
                : 'hover:text-teal-600 dark:hover:text-teal-400'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('about')}
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => handleNavClick('features')}
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleNavClick('security')}
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            Security
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Unauthenticated Nav Buttons */}
          {!user && (
            <>
              {/* Login Button (Outline Pill) */}
              <button
                onClick={() => onNavigate?.('login')}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors border shadow-sm ${
                  currentView === 'login'
                    ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-700'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                }`}
              >
                Login
              </button>

              {/* Register Pharmacy Button (Dark Navy Pill as in screenshot) */}
              <button
                onClick={() => onNavigate?.('signup')}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#0e1e38] hover:bg-[#152a4d] dark:bg-teal-600 dark:hover:bg-teal-500 text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Register Pharmacy
              </button>
            </>
          )}

          {/* User Profile Pill when logged in */}
          {user && (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <img 
                  src={user.avatar || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/50" 
                />
                <div className="hidden lg:block text-left text-xs">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                    {user.role}
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
