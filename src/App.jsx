import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LoginView from './components/LoginView';
import SignupView from './components/SignupView';
import BlankScreen from './components/BlankScreen';
import { ShieldCheck, PhoneCall, Globe } from 'lucide-react';

export default function App() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'login' | 'signup'

  // If user is authenticated, direct them directly to the Blank Screen!
  if (user) {
    return <BlankScreen onSignOut={() => setCurrentView('landing')} />;
  }

  // If on Landing Page, render the full landing experience matching user's design
  if (currentView === 'landing') {
    return (
      <LandingPage 
        onOpenLogin={() => setCurrentView('login')} 
        onOpenSignup={() => setCurrentView('signup')} 
      />
    );
  }

  // Otherwise, render Login or Signup views with dedicated Navbar & Footer
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Background Lighting Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] pointer-events-none"></div>

      {/* Global Top Navbar */}
      <Navbar 
        onNavigate={setCurrentView} 
        currentView={currentView} 
        onBackToHome={() => setCurrentView('landing')} 
      />

      {/* Main Auth View Area */}
      <main className="flex-1 flex items-center justify-center relative z-10 py-6">
        {currentView === 'signup' ? (
          <SignupView 
            onSwitchToLogin={() => setCurrentView('login')} 
            onBackToHome={() => setCurrentView('landing')} 
          />
        ) : (
          <LoginView 
            onSwitchToSignup={() => setCurrentView('signup')} 
            onBackToHome={() => setCurrentView('landing')} 
          />
        )}
      </main>

      {/* Official Government Disclaimer Footer */}
      <footer className="relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>
              Official Drugs Control Department Portal · National Controlled Substances Surveillance
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
              <span>Inspector Helpline: 1800-425-3333</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-brand-500" />
              <span>Drugs Act 1940 & Rules 1945 Compliant</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
