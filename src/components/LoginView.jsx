import React, { useState } from 'react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Pill, 
  UserCheck, 
  FileText, 
  Eye, 
  EyeOff, 
  Smartphone,
  Building2,
  Sparkles
} from 'lucide-react';

export default function LoginView({ onSwitchToSignup, onBackToHome }) {
  const { login, isLoading } = useAuth();
  
  // Selected Role Tab: 'pharmacist' | 'inspector' | 'admin'
  const [selectedRole, setSelectedRole] = useState('pharmacist');
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [showPassword, setShowPassword] = useState(false);
  
  // Form fields
  const [identifier, setIdentifier] = useState(DEMO_ACCOUNTS.pharmacist.email);
  const [password, setPassword] = useState('••••••••••••');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Role Change & auto-populate corresponding demo info for seamless evaluation
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    const demo = DEMO_ACCOUNTS[role];
    setIdentifier(demo.email);
    setPassword('demoPass2026!');
    setOtpSent(false);
  };

  const handleAutofill = () => {
    const demo = DEMO_ACCOUNTS[selectedRole];
    setIdentifier(demo.email);
    setPassword('demoPass2026!');
    setErrorMessage('');
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!identifier) {
      setErrorMessage('Please enter your registered mobile number or email ID');
      return;
    }
    setOtpSent(true);
    setOtpCode('849201'); // Mock auto-filled OTP for smooth demo
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier) {
      setErrorMessage('Please enter your login identifier');
      return;
    }

    try {
      if (loginMethod === 'otp' && !otpSent) {
        handleSendOtp(e);
        return;
      }
      
      // Attempt login
      await login(selectedRole);
    } catch (err) {
      setErrorMessage('Authentication failed. Please verify your credentials or role.');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Premium Informational Hero Showcase */}
        <div className="lg:col-span-6 space-y-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            Drugs Control Department · State Regulatory Grid
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Controlled Drug Surveillance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-teal-500 to-emerald-400">Pharmacy Audit</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              A centralized monitoring ecosystem enforcing real-time accountability for Antibiotic, Narcotic (NDPS), and Schedule H1 drugs across registered pharmacies.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3">
                <Pill className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                Prescription Interlocking
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Automated stock deduction tied to prescribing doctor credentials and patient IDs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                100-Unit Threshold Alert
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Automated breach alarms dispatched directly to Drug Inspectors for immediate review.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                Verified Pharmacists Only
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Mandatory registration certificate review and GPS geofence stamping on store premises.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                Statutory Daily Reporting
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Automatic end-of-day reconciliation ensuring non-tampered drug audit trails.
              </p>
            </div>
          </div>

          {/* Regulatory Trust Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-950/5 via-teal-900/5 to-transparent dark:from-brand-950/40 dark:via-slate-900/40 border border-brand-200/60 dark:border-brand-800/40 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-800 dark:text-white">State Regulatory Compliance:</span> Built according to the Drugs Control Department mandate for controlled substances and antibiotic misuse prevention.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive High-Precision Sign-In Card */}
        <div className="lg:col-span-6">
          <div className="relative">
            {/* Ambient background blur glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-emerald-500 rounded-3xl blur-xl opacity-20 dark:opacity-30"></div>

            <div className="relative glass-panel rounded-3xl p-6 sm:p-9 shadow-2xl transition-all">
              
              {onBackToHome && (
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  <span>Return to Homepage</span>
                </button>
              )}

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-5 mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    Portal Sign In
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Select your operational role to access the surveillance network
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60 hover:bg-brand-100 transition-colors"
                  title="Autofill verified demo test credentials"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                  <span className="hidden sm:inline">Autofill Demo</span>
                </button>
              </div>

              {/* Role Selector Tabs (Pharmacist | Drug Inspector | Admin) */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Select User Authority Level
                </label>
                <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('pharmacist')}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      selectedRole === 'pharmacist'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Pharmacist</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange('inspector')}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      selectedRole === 'inspector'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Drug Inspector</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange('admin')}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      selectedRole === 'admin'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin HQ</span>
                  </button>
                </div>
              </div>

              {/* Login Method Toggle: Password vs OTP */}
              <div className="flex items-center justify-between mb-5 px-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Authentication Factor:
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => { setLoginMethod('password'); setErrorMessage(''); }}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      loginMethod === 'password'
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLoginMethod('otp'); setErrorMessage(''); }}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                      loginMethod === 'otp'
                        ? 'bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-300 dark:border-brand-800'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    OTP Mode
                  </button>
                </div>
              </div>

              {/* Error Notification Alert */}
              {errorMessage && (
                <div className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Identifier Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {selectedRole === 'pharmacist' 
                      ? 'Email, Mobile No. or Drug License No.' 
                      : selectedRole === 'inspector'
                      ? 'Inspector Official ID or Gov Email'
                      : 'Admin Master ID or Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      placeholder="e.g. rajesh@apollo-care.in"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Password Mode */}
                {loginMethod === 'password' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Security Password
                      </label>
                      <a 
                        href="#forgot" 
                        onClick={(e) => { e.preventDefault(); alert("Password reset token dispatched to registered contact phone & email."); }}
                        className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* OTP Mode */}
                {loginMethod === 'otp' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        One-Time Passcode (OTP)
                      </label>
                      {otpSent && (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          ✓ OTP sent to mobile
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength="6"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        disabled={!otpSent}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm tracking-widest text-center disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors whitespace-nowrap"
                      >
                        {otpSent ? 'Resend' : 'Send Code'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      Keep workstation session authenticated
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-brand-500/40 active:scale-[0.99] disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In as {selectedRole === 'pharmacist' ? 'Pharmacist' : selectedRole === 'inspector' ? 'Drug Inspector' : 'System Admin'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Switch to Registration */}
              <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  New pharmacy establishment?{' '}
                  <button
                    onClick={onSwitchToSignup}
                    className="font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Register New Pharmacist</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </p>
              </div>

              {/* Demo Quick Guide Box */}
              <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Demo Quick Access:</span> Switching tabs automatically configures authorized credentials for testing. Signing in will route directly to the designated blank dashboard workspace.
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
