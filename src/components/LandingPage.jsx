import React from 'react';
import Navbar from './Navbar';
import { 
  Plus, 
  User, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Pill, 
  CheckCircle2, 
  FileText, 
  Activity, 
  Search, 
  Lock, 
  MapPin, 
  Building2, 
  ChevronRight 
} from 'lucide-react';

export default function LandingPage({ onOpenLogin, onOpenSignup }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans relative selection:bg-teal-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        onNavigate={(view) => {
          if (view === 'login') onOpenLogin();
          else if (view === 'signup') onOpenSignup();
        }}
        currentView="landing"
        onBackToHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* =========================================================================
          HERO SECTION (Matches screenshot layout, typography, pill badge & hero image)
      ========================================================================= */}
      <section id="home" className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Subtle background technical grid pattern matching the screenshot */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Pill, Subtitle & Action CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge: • Track & Trace Platform */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span>Track & Trace Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#0b192c] dark:text-white leading-[1.12]">
                Track & Trace <br />
                Infrastructure for <br />
                Restricted Medications
              </h1>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                A security prototype for monitoring antibiotic and narcotic drug distribution, validating pharmacist credentials, and establishing real-time stock transparency.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenSignup}
                  className="px-6 py-3 rounded-lg bg-[#0e7490] hover:bg-[#08637c] dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold text-sm shadow-md shadow-teal-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Register Pharmacy
                </button>

                <button
                  onClick={onOpenLogin}
                  className="px-6 py-3 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
                >
                  Access Portal
                </button>
              </div>

            </div>

            {/* Right Column: Hero Card with Orange Pill Bottle Image */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Subtle soft backdrop glow */}
                <div className="absolute -inset-2 bg-amber-400/20 dark:bg-amber-500/10 rounded-3xl blur-2xl"></div>

                {/* Hero Image Container matching screenshot */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 dark:border-slate-800 aspect-[4/3] bg-[#f99f66]">
                  <img
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&auto=format&fit=crop&q=80"
                    alt="Capsules spilling from prescription bottle on warm background"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          DARK NAVY WORKFLOW STRIP (Matches the bottom band in screenshot)
          Icons: REGISTER -> VERIFY -> TRACK -> COMPLY
      ========================================================================= */}
      <section className="bg-[#091322] dark:bg-[#040810] text-white py-8 border-y border-slate-800/80 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            {/* 1. REGISTER */}
            <div 
              onClick={onOpenSignup} 
              className="flex flex-col items-center group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-teal-500/30 bg-teal-500/10 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-110 group-hover:border-teal-400 transition-all">
                <User className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-1">
                REGISTER
              </span>
              <p className="text-[11px] text-slate-400 max-w-[160px]">
                Pharmacist credentials & store license submission
              </p>
            </div>

            {/* 2. VERIFY */}
            <div className="flex flex-col items-center group p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-full border border-teal-500/30 bg-teal-500/10 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-110 group-hover:border-teal-400 transition-all">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-1">
                VERIFY
              </span>
              <p className="text-[11px] text-slate-400 max-w-[160px]">
                Aadhaar / Mobile OTP & GPS geolocation stamping
              </p>
            </div>

            {/* 3. TRACK */}
            <div className="flex flex-col items-center group p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-full border border-teal-500/30 bg-teal-500/10 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-110 group-hover:border-teal-400 transition-all">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-1">
                TRACK
              </span>
              <p className="text-[11px] text-slate-400 max-w-[160px]">
                Daily antibiotic stock ingestion & auto-deduction
              </p>
            </div>

            {/* 4. COMPLY */}
            <div className="flex flex-col items-center group p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-full border border-teal-500/30 bg-teal-500/10 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-110 group-hover:border-teal-400 transition-all">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-1">
                COMPLY
              </span>
              <p className="text-[11px] text-slate-400 max-w-[160px]">
                100-Unit threshold alerts & Drug Inspector audits
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          ABOUT / SYSTEM OVERVIEW SECTION (Based on Proposal & Gap Analysis)
      ========================================================================= */}
      <section id="about" className="py-20 bg-slate-50 dark:bg-[#070b14]/50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-wider text-teal-600 dark:text-teal-400 uppercase">
              Regulatory Architecture
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0f172a] dark:text-white mt-2">
              Transforming Pharmacy Monitoring Across the State
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              Designed against the Drugs Control Department mandate to curb antimicrobial resistance (AMR), prevent unauthorized narcotic diversion, and protect patient welfare through real-time data transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
                Controlled Drug Categorization
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Strict classification for Antibiotics, Narcotics (NDPS), Schedule H1, and high-potency drugs with centralized drug master registries.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
                GPS Geofence Validation
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Stores are geostamped at registration. All dispensing activities are bound to physical premises, ensuring strict territorial jurisdiction.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
                Immediate Anomaly Alarms
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Automated breach warnings dispatched to Drug Inspectors whenever a pharmacy crosses 100 units or misses the daily cut-off reconciliation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS / WORKFLOW SECTION
      ========================================================================= */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-[#070b14] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider text-teal-600 dark:text-teal-400 uppercase">
              Operational Workflow
            </span>
            <h2 className="font-display text-3xl font-extrabold text-[#0f172a] dark:text-white mt-2">
              End-to-End Compliance in 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-[#0e1e38] text-white flex items-center justify-center text-xs font-bold mb-4">
                01
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                Register & Verify
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pharmacist submits Pharmacy Council certificate, captures GPS coordinates, and verifies mobile number via OTP.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-[#0e1e38] text-white flex items-center justify-center text-xs font-bold mb-4">
                02
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                Ingest Stock
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Batch number, expiry date, and quantities of antibiotics and narcotics received are entered daily before cutoff.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-[#0e1e38] text-white flex items-center justify-center text-xs font-bold mb-4">
                03
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                Dispense on Rx
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Every sale logs doctor registration, patient contact, and PDF bill copy. Available stock auto-decrements instantly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-[#0e1e38] text-white flex items-center justify-center text-xs font-bold mb-4">
                04
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                Inspector Audit
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Drug Inspectors view live district dashboards, investigate anomalies, and generate immutable legal audit trails.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECURITY & REGULATORY FOOTER
      ========================================================================= */}
      <footer id="security" className="bg-[#0b1424] text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center text-teal-400">
                <div className="relative flex items-center justify-center w-6 h-6">
                  <span className="absolute w-4 h-1 bg-teal-400 rounded-full"></span>
                  <span className="absolute h-4 w-1 bg-teal-400 rounded-full"></span>
                </div>
              </div>
              <span className="font-display font-extrabold text-white text-lg tracking-tight">
                KOMPOUNDER
              </span>
              <span className="text-xs text-slate-500 ml-2">
                Pharmacy Monitoring System
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenLogin}
                className="text-xs text-slate-300 hover:text-white"
              >
                Sign In
              </button>
              <span className="text-slate-600">•</span>
              <button
                onClick={onOpenSignup}
                className="text-xs text-slate-300 hover:text-white"
              >
                Register Pharmacy
              </button>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-500">
                256-Bit SSL Encrypted
              </span>
            </div>
          </div>

          <div className="pt-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
            <p>© 2026 KOMPOUNDER. Drugs Control Department, State Regulatory Board. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Authorized Use Only · Drugs and Cosmetics Act 1940 & Pharmacy Act 1948</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
