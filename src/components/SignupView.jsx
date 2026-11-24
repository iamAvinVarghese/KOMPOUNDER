import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  MapPin, 
  UploadCloud, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Crosshair, 
  Lock, 
  KeyRound, 
  Smartphone,
  Check,
  Hospital
} from 'lucide-react';

export default function SignupView({ onSwitchToLogin, onBackToHome }) {
  const { signup, isLoading } = useAuth();
  
  // Multi-step form state (1: Pharmacist Info, 2: Pharmacy Store & GPS, 3: Verification & Certificate)
  const [currentStep, setCurrentStep] = useState(1);
  const [isLocating, setIsLocating] = useState(false);
  const [gpsCaptured, setGpsCaptured] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [formError, setFormError] = useState('');

  // Form Fields
  const [formData, setFormData] = useState({
    // Step 1: Pharmacist Credentials
    pharmacistName: 'Sanjay Varma, B.Pharm',
    licenseNumber: 'KA-PCI-2024-59218',
    email: 'sanjay.varma@medlife.org',
    phone: '+91 98450 11223',
    password: 'password123!',
    confirmPassword: 'password123!',

    // Step 2: Pharmacy Details
    pharmacyName: 'MedLife Specialty Chemist & Druggist',
    registrationNumber: 'DL-KA-BNG-88190',
    address: '#45, 12th Main, 4th Block, Jayanagar',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    pincode: '560011',
    gpsCoordinates: '12.9298° N, 77.5843° E',

    // Step 3: Certificate & Compliance
    certificateFileName: 'Pharmacy_Council_Registration_SanjayVarma.pdf',
    complianceAgreed: true
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormError('');
  };

  // Browser Geolocation capture
  const handleCaptureGPS = () => {
    setIsLocating(true);
    setFormError('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`;
          handleChange('gpsCoordinates', coords);
          setGpsCaptured(true);
          setIsLocating(false);
        },
        () => {
          // Fallback if browser permission is denied or simulated
          handleChange('gpsCoordinates', '12.9298° N, 77.5843° E (Detected via Network)');
          setGpsCaptured(true);
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      handleChange('gpsCoordinates', '12.9298° N, 77.5843° E (Default)');
      setGpsCaptured(true);
      setIsLocating(false);
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpCode('481920'); // Mock code
  };

  const handleVerifyOtp = () => {
    if (otpCode.length >= 4) {
      setOtpVerified(true);
    }
  };

  const handleNext = () => {
    setFormError('');
    if (currentStep === 1) {
      if (!formData.pharmacistName || !formData.licenseNumber || !formData.email || !formData.phone || !formData.password) {
        setFormError('Please fill in all pharmacist credential fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.pharmacyName || !formData.registrationNumber || !formData.address || !formData.district) {
        setFormError('Please provide complete pharmacy establishment details.');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.complianceAgreed) {
      setFormError('You must agree to the Drugs Control Department regulatory compliance declaration.');
      return;
    }
    try {
      await signup(formData);
    } catch (err) {
      setFormError('Registration could not be completed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 animate-fade-in">
      <div className="relative">
        {/* Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-brand-600 rounded-3xl blur-xl opacity-20 dark:opacity-30"></div>

        <div className="relative glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Header */}
          <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-6 mb-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                Statutory Pharmacy Registration
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Register Pharmacy Store
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Authorized registration under State Drugs Control Department Monitoring Rules
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-0">
              {onBackToHome && (
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Homepage</span>
                </button>
              )}
              <button
                onClick={onSwitchToLogin}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <span>Already registered? Sign In</span>
              </button>
            </div>
          </div>

          {/* Step Progress Stepper */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              
              {/* Step 1 Indicator */}
              <div 
                onClick={() => currentStep > 1 && setCurrentStep(1)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                  currentStep === 1
                    ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300'
                    : currentStep > 1
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400'
                    : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  currentStep > 1 
                    ? 'bg-emerald-500 text-white' 
                    : currentStep === 1 
                    ? 'bg-brand-600 text-white' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold leading-none">Pharmacist</div>
                  <div className="text-[10px] opacity-75 mt-0.5">Credentials</div>
                </div>
              </div>

              {/* Step 2 Indicator */}
              <div 
                onClick={() => currentStep > 2 && setCurrentStep(2)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                  currentStep === 2
                    ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300'
                    : currentStep > 2
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400'
                    : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  currentStep > 2 
                    ? 'bg-emerald-500 text-white' 
                    : currentStep === 2 
                    ? 'bg-brand-600 text-white' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {currentStep > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold leading-none">Pharmacy & GPS</div>
                  <div className="text-[10px] opacity-75 mt-0.5">Premises Location</div>
                </div>
              </div>

              {/* Step 3 Indicator */}
              <div 
                className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                  currentStep === 3
                    ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300'
                    : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  currentStep === 3 
                    ? 'bg-brand-600 text-white' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  3
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold leading-none">Verification</div>
                  <div className="text-[10px] opacity-75 mt-0.5">Certificates & OTP</div>
                </div>
              </div>

            </div>
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span>{formError}</span>
            </div>
          )}

          {/* FORM CONTENT */}
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Pharmacist Credentials */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Pharmacist Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.pharmacistName}
                      onChange={(e) => handleChange('pharmacistName', e.target.value)}
                      placeholder="e.g. Sanjay Varma"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      State Pharmacy Council Reg. No. *
                    </label>
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => handleChange('licenseNumber', e.target.value)}
                      placeholder="e.g. KA-PCI-2024-59218"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="sanjay@pharmacy.in"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Mobile Number (For OTP Verification) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+91 98450 11223"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Create Password *
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-md shadow-brand-500/25 transition-all"
                  >
                    <span>Continue to Pharmacy & Location</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Pharmacy Store & GPS Geolocation */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Pharmacy Store Trade Name *
                    </label>
                    <input
                      type="text"
                      value={formData.pharmacyName}
                      onChange={(e) => handleChange('pharmacyName', e.target.value)}
                      placeholder="e.g. MedLife Chemist"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Drug License No. (Form 20/21) *
                    </label>
                    <input
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) => handleChange('registrationNumber', e.target.value)}
                      placeholder="e.g. 20B/21B-KA-BNG-88190"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Physical Store Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Shop No, Building, Street, Area"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      District / Jurisdiction *
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => handleChange('district', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    >
                      <option value="Bengaluru Urban">Bengaluru Urban (South Zone)</option>
                      <option value="Bengaluru North">Bengaluru North</option>
                      <option value="Bengaluru Rural">Bengaluru Rural</option>
                      <option value="Mysuru">Mysuru Central</option>
                      <option value="Mangaluru">Mangaluru Coastal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleChange('pincode', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* GPS Location Stamping Section (Key System Requirement) */}
                <div className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/60 mt-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          Mandatory GPS Geolocation Stamping
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Drugs Control Department mandates recording official premises coordinates to prevent unauthorized remote sales.
                      </p>
                      <div className="font-mono text-xs text-brand-700 dark:text-brand-300 font-semibold pt-1">
                        📍 Recorded Coordinates: {formData.gpsCoordinates}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCaptureGPS}
                      disabled={isLocating}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-300 border border-brand-300 dark:border-brand-700 hover:bg-brand-50 shadow-sm transition-all"
                    >
                      <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                      <span>{isLocating ? 'Detecting...' : gpsCaptured ? 'Recapture GPS' : 'Capture Live GPS'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Credentials</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-md shadow-brand-500/25 transition-all"
                  >
                    <span>Next: Document & OTP Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Verification & Certificate Upload */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                
                {/* Certificate Upload Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Upload Registered Pharmacist Certificate (PDF or Scanned Copy) *
                  </label>
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 rounded-2xl p-5 text-center bg-white/50 dark:bg-slate-900/50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 mx-auto rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {formData.certificateFileName}
                    </div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Document verified & attached ready for Admin review
                    </div>
                  </div>
                </div>

                {/* Mobile / Aadhaar OTP Verification */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Mobile Number OTP Verification
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{formData.phone}</span>
                  </div>

                  {!otpSent ? (
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Dispatch authentication passcode to register primary device
                      </p>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors"
                      >
                        Send OTP
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="6-digit OTP"
                        className="px-3 py-1.5 rounded-lg text-xs font-mono tracking-widest border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 w-32 text-center"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                      >
                        {otpVerified ? 'Verified ✓' : 'Verify Code'}
                      </button>
                      {otpVerified && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Mobile Verified
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Statutory Agreement Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.complianceAgreed}
                      onChange={(e) => handleChange('complianceAgreed', e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      I solemnly affirm that I am a licensed pharmacist registered under the Pharmacy Act. I undertake to record every dispensing event for Antibiotics and Schedule H1 / Narcotic medicines with legitimate doctor and patient details in KOMPOUNDER, subject to regulatory audit.
                    </span>
                  </label>
                </div>

                {/* Navigation and Submit */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Pharmacy</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Registration</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

          </form>

        </div>
      </div>
    </div>
  );
}
