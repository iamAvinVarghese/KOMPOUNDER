import React, { useState, useEffect } from 'react';
import './Register.css';

interface RegisterProps {
  onNavigate: (view: 'landing' | 'login' | 'register' | 'pharmacist-dashboard' | 'inspector-dashboard') => void;
}

function Register({ onNavigate }: RegisterProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Step 1: Pharmacy Details
  const [pharmacyName, setPharmacyName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  // Step 2: Pharmacist Details
  const [pharmacistName, setPharmacistName] = useState('');
  const [pharmacistRegId, setPharmacistRegId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [pharmacistMobile, setPharmacistMobile] = useState('');

  // Step 3: Aadhaar-linked OTP Verification
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpStatusMsg, setOtpStatusMsg] = useState<string | null>(null);

  // Step 4: Location & Documents
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [stateName, setStateName] = useState('');
  const [licenseFile, setLicenseFile] = useState<string | null>(null);
  const [credentialsFile, setCredentialsFile] = useState<string | null>(null);

  // Step 5: Review & Submit
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Countdown timer for resending OTP
  useEffect(() => {
    let timer: any;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  // Simulates sending Aadhaar OTP
  const handleSendOtp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!pharmacistMobile || pharmacistMobile.length < 10) {
      setErrors({ otp: 'Please enter a valid mobile number in Step 2 before requesting OTP.' });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setOtpCountdown(30);
      setErrors({});
      setOtpStatusMsg(`[MOCK OTP] One-Time Password sent to mobile ending in ...${pharmacistMobile.slice(-4)}. Use dummy code 123456 to verify.`);
    }, 1000);
  };

  // Simulates verifying Aadhaar OTP
  const handleVerifyOtp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (otpCode === '123456') {
      setIsOtpVerified(true);
      setErrors({});
    } else {
      setErrors({ otp: 'Invalid OTP code. Please use the dummy code 123456.' });
    }
  };


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'license' | 'credentials') => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      if (fileType === 'license') {
        setLicenseFile(name);
      } else {
        setCredentialsFile(name);
      }
    }
  };

  const removeFile = (fileType: 'license' | 'credentials') => {
    if (fileType === 'license') {
      setLicenseFile(null);
    } else {
      setCredentialsFile(null);
    }
  };

  const validateStep = () => {
    const tempErrors: { [key: string]: string } = {};
    let isValid = true;

    if (step === 1) {
      if (!pharmacyName.trim()) { tempErrors.pharmacyName = 'Pharmacy Name is required.'; isValid = false; }
      if (!licenseNumber.trim()) { tempErrors.licenseNumber = 'Drug License Number is required.'; isValid = false; }
      if (!phoneNumber.trim()) {
        tempErrors.phoneNumber = 'Phone Number is required.';
        isValid = false;
      } else if (!/^\+?[0-9]{7,15}$/.test(phoneNumber.replace(/\s+/g, ''))) {
        tempErrors.phoneNumber = 'Please enter a valid phone number.';
        isValid = false;
      }
      if (!address.trim()) { tempErrors.address = 'Shop Address is required.'; isValid = false; }
    }

    if (step === 2) {
      if (!pharmacistName.trim()) { tempErrors.pharmacistName = 'Pharmacist Name is required.'; isValid = false; }
      if (!pharmacistRegId.trim()) { tempErrors.pharmacistRegId = 'Registration ID is required.'; isValid = false; }
      if (!email.trim()) {
        tempErrors.email = 'Email Address is required.';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        tempErrors.email = 'Please enter a valid email address.';
        isValid = false;
      }
      if (!password) { tempErrors.password = 'Password is required.'; isValid = false; }
      if (!aadhaarNumber.trim()) {
        tempErrors.aadhaarNumber = 'Aadhaar Number is required.';
        isValid = false;
      } else if (!/^\d{12}$/.test(aadhaarNumber.trim())) {
        tempErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number.';
        isValid = false;
      }
      if (!pharmacistMobile.trim()) {
        tempErrors.pharmacistMobile = 'Mobile Number linked to Aadhaar is required.';
        isValid = false;
      } else if (!/^\+?[0-9]{7,15}$/.test(pharmacistMobile.replace(/\s+/g, ''))) {
        tempErrors.pharmacistMobile = 'Please enter a valid mobile number.';
        isValid = false;
      }
    }

    if (step === 3) {
      if (!isOtpVerified) {
        tempErrors.otp = 'Aadhaar OTP verification is required to proceed.';
        isValid = false;
      }
    }

    if (step === 4) {
      if (!locality.trim()) { tempErrors.locality = 'Locality / Area is required.'; isValid = false; }
      if (!city.trim()) { tempErrors.city = 'City / Town is required.'; isValid = false; }
      if (!district.trim()) { tempErrors.district = 'District is required.'; isValid = false; }
      if (!stateName.trim()) { tempErrors.stateName = 'State is required.'; isValid = false; }
      if (!licenseFile) { tempErrors.licenseFile = 'Drug License document PDF is required.'; isValid = false; }
      if (!credentialsFile) { tempErrors.credentialsFile = 'Pharmacist Registration credential PDF is required.'; isValid = false; }
    }

    if (step === 5) {
      if (!termsAccepted) {
        tempErrors.terms = 'You must certify that the pharmacist credentials provided are active and valid.';
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onNavigate('landing');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccessModal(true);
      }, 1500);
    }
  };

  return (
    <div className="register-container">
      {/* Left Branding Panel */}
      <section className="register-branding-panel">
        <div className="register-brand-header" onClick={() => onNavigate('landing')}>
          <svg className="register-brand-icon" viewBox="0 0 24 24">
            <path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-15z M10.5 4.5C10.5 3.67 11.17 3 12 3s1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-15z" />
          </svg>
          <span>KOMPOUNDER</span>
        </div>

        <div className="register-branding-body">
          <h2 className="register-brand-title">Register Pharmacy</h2>
          <p className="register-brand-subtitle">
            Securely register your pharmacy and verified pharmacist credentials to participate in restricted pharmaceutical tracking.
          </p>

          <div className="register-highlights-list">
            <div className="register-highlight-item">
              <div className="register-highlight-icon-box">
                <svg className="register-highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Pharmacy Details</span>
            </div>
            <div className="register-highlight-item">
              <div className="register-highlight-icon-box">
                <svg className="register-highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Pharmacist Verification</span>
            </div>
            <div className="register-highlight-item">
              <div className="register-highlight-icon-box">
                <svg className="register-highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Credentials &amp; Documents</span>
            </div>
            <div className="register-highlight-item">
              <div className="register-highlight-icon-box">
                <svg className="register-highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Location Information</span>
            </div>
          </div>
        </div>

        <div className="brand-prompt-wrapper" style={{ zIndex: 2, marginTop: 'auto', marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>
          <div className="form-divider" style={{ opacity: 0.15, margin: 'var(--spacing-md) 0' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255, 255, 255, 0.7)' }}>
              Already registered?
            </span>
            <button
              type="button"
              className="brand-prompt-btn"
              onClick={() => onNavigate('login')}
              disabled={isLoading}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--color-secondary-light)',
                fontWeight: 'bold',
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: 'var(--font-size-sm)',
                textDecoration: 'underline'
              }}
            >
              Login
            </button>
          </div>
        </div>

        <div className="register-brand-footer">
          <span>&copy; {new Date().getFullYear()} KOMPOUNDER. Security Registration System.</span>
        </div>
      </section>

      {/* Right Form Wizard Panel */}
      <section className="register-form-panel">
        <div className="register-form-wrapper">
          <button type="button" onClick={handleBack} className="register-back-btn">
            <svg className="register-back-arrow" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{step === 1 ? 'Back to website' : 'Back to previous step'}</span>
          </button>

          {/* Stepper Progress Bar */}
          <div className="stepper-container">
            <div className={`stepper-step ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
              <div className="step-circle">{step > 1 ? '✓' : '1'}</div>
              <span className="step-title">Pharmacy</span>
            </div>
            <div className={`stepper-step ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
              <div className="step-circle">{step > 2 ? '✓' : '2'}</div>
              <span className="step-title">Pharmacist</span>
            </div>
            <div className={`stepper-step ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}>
              <div className="step-circle">{step > 3 ? '✓' : '3'}</div>
              <span className="step-title">Verification</span>
            </div>
            <div className={`stepper-step ${step === 4 ? 'active' : step > 4 ? 'completed' : ''}`}>
              <div className="step-circle">{step > 4 ? '✓' : '4'}</div>
              <span className="step-title">Location</span>
            </div>
            <div className={`stepper-step ${step === 5 ? 'active' : ''}`}>
              <div className="step-circle">5</div>
              <span className="step-title">Review</span>
            </div>
          </div>

          {/* Form Content Steps */}
          {step === 1 && (
            <div>
              <h2 className="register-step-title">Pharmacy Details</h2>
              <p className="register-step-desc">Provide your verified drug retail license and shop details.</p>

              <div className="form-group">
                <label className="form-label" htmlFor="pharmacyName">Pharmacy / Shop Name</label>
                <input
                  type="text"
                  id="pharmacyName"
                  className={`form-input ${errors.pharmacyName ? 'error-border' : ''}`}
                  placeholder="Enter pharmacy name"
                  value={pharmacyName}
                  onChange={(e) => setPharmacyName(e.target.value)}
                  disabled={isLoading}
                />
                {errors.pharmacyName && <span className="form-error-msg">{errors.pharmacyName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="licenseNumber">Drug License Number</label>
                <input
                  type="text"
                  id="licenseNumber"
                  className={`form-input ${errors.licenseNumber ? 'error-border' : ''}`}
                  placeholder="e.g. DL-20492-X"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  disabled={isLoading}
                />
                {errors.licenseNumber && <span className="form-error-msg">{errors.licenseNumber}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phoneNumber">Store Contact Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className={`form-input ${errors.phoneNumber ? 'error-border' : ''}`}
                  placeholder="e.g. 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  disabled={isLoading}
                  maxLength={10}
                />
                {errors.phoneNumber && <span className="form-error-msg">{errors.phoneNumber}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">Shop Physical Address</label>
                <textarea
                  id="address"
                  className={`form-textarea ${errors.address ? 'error-border' : ''}`}
                  placeholder="Enter complete store physical address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isLoading}
                />
                {errors.address && <span className="form-error-msg">{errors.address}</span>}
              </div>

              <div className="wizard-actions-row">
                <button type="button" onClick={() => onNavigate('landing')} className="btn btn-outline btn-wizard">Cancel</button>
                <button type="button" onClick={handleContinue} className="btn btn-primary btn-wizard">Continue</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="register-step-title">Pharmacist Information</h2>
              <p className="register-step-desc">Enter the certified practitioner credentials authorized to manage stock ledgers.</p>

              <div className="form-group">
                <label className="form-label" htmlFor="pharmacistName">Pharmacist Full Name</label>
                <input
                  type="text"
                  id="pharmacistName"
                  className={`form-input ${errors.pharmacistName ? 'error-border' : ''}`}
                  placeholder="Enter pharmacist name"
                  value={pharmacistName}
                  onChange={(e) => setPharmacistName(e.target.value)}
                  disabled={isLoading}
                />
                {errors.pharmacistName && <span className="form-error-msg">{errors.pharmacistName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pharmacistRegId">Registration ID</label>
                <input
                  type="text"
                  id="pharmacistRegId"
                  className={`form-input ${errors.pharmacistRegId ? 'error-border' : ''}`}
                  placeholder="e.g. RPH-40291"
                  value={pharmacistRegId}
                  onChange={(e) => setPharmacistRegId(e.target.value)}
                  disabled={isLoading}
                />
                {errors.pharmacistRegId && <span className="form-error-msg">{errors.pharmacistRegId}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className={`form-input ${errors.email ? 'error-border' : ''}`}
                  placeholder="pharmacist@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete="email"
                />
                {errors.email && <span className="form-error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Login Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`form-input ${errors.password ? 'error-border' : ''}`}
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className="password-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg className="password-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <span className="form-error-msg">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="aadhaarNumber">Aadhaar Number (12 Digits)</label>
                <input
                  type="text"
                  id="aadhaarNumber"
                  className={`form-input ${errors.aadhaarNumber ? 'error-border' : ''}`}
                  placeholder="Enter 12-digit Aadhaar number"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  disabled={isLoading}
                  maxLength={12}
                />
                {errors.aadhaarNumber && <span className="form-error-msg">{errors.aadhaarNumber}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pharmacistMobile">Mobile Number (Linked to Aadhaar)</label>
                <input
                  type="tel"
                  id="pharmacistMobile"
                  className={`form-input ${errors.pharmacistMobile ? 'error-border' : ''}`}
                  placeholder="Enter registered mobile number"
                  value={pharmacistMobile}
                  onChange={(e) => setPharmacistMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  disabled={isLoading}
                  maxLength={10}
                />
                {errors.pharmacistMobile && <span className="form-error-msg">{errors.pharmacistMobile}</span>}
              </div>

              <div className="wizard-actions-row">
                <button type="button" onClick={handleBack} className="btn btn-outline btn-wizard">Back</button>
                <button type="button" onClick={handleContinue} className="btn btn-primary btn-wizard">Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="register-step-title">Aadhaar OTP Verification</h2>
              <p className="register-step-desc">Verify your credentials through the secure Aadhaar link OTP simulator.</p>

              <div className="otp-verification-box">
                {!isOtpSent ? (
                  <div className="otp-send-row">
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                      An authorization OTP will be sent to the mobile number ending in <strong>...{pharmacistMobile.slice(-4)}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="btn btn-secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending OTP...' : 'Send OTP via Aadhaar'}
                    </button>
                  </div>
                ) : (
                  <div>
                    {otpStatusMsg && (
                      <div className="otp-status-msg-banner">
                        <svg className="otp-status-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{otpStatusMsg}</span>
                      </div>
                    )}
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                      Enter the 6-digit OTP code sent to your registered device.
                    </p>
                    <div className="otp-inputs-wrapper">
                      <input
                        type="text"
                        className="form-input otp-code-input"
                        placeholder="000000"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        disabled={isOtpVerified}
                      />
                    </div>

                    {!isOtpVerified ? (
                      <div>
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          className="btn btn-primary"
                          style={{ width: '100%', maxWidth: '240px' }}
                        >
                          Verify OTP
                        </button>
                        <div className="otp-countdown-text">
                          {otpCountdown > 0 ? (
                            <span>Resend code in {otpCountdown}s</span>
                          ) : (
                            <button type="button" onClick={handleSendOtp} className="otp-resend-btn">Resend OTP</button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="otp-status-badge">
                        <svg className="otp-status-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Aadhaar Authenticated</span>
                      </div>
                    )}
                  </div>
                )}
                {errors.otp && <span className="form-error-msg" style={{ display: 'block', marginTop: 'var(--spacing-sm)' }}>{errors.otp}</span>}
              </div>

              <div className="wizard-actions-row">
                <button type="button" onClick={handleBack} className="btn btn-outline btn-wizard">Back</button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="btn btn-primary btn-wizard"
                  disabled={!isOtpVerified}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="register-step-title">Location &amp; Documents</h2>
              <p className="register-step-desc">Establish pharmacy location details and upload certified credential proofs.</p>

              <div className="form-group">
                <label className="form-label" htmlFor="locality">Locality / Area</label>
                <input
                  type="text"
                  id="locality"
                  className={`form-input ${errors.locality ? 'error-border' : ''}`}
                  placeholder="Enter locality or area name"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  disabled={isLoading}
                />
                {errors.locality && <span className="form-error-msg">{errors.locality}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="city">City / Town</label>
                <input
                  type="text"
                  id="city"
                  className={`form-input ${errors.city ? 'error-border' : ''}`}
                  placeholder="Enter city or town"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={isLoading}
                />
                {errors.city && <span className="form-error-msg">{errors.city}</span>}
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div>
                  <label className="form-label" htmlFor="district">District</label>
                  <input
                    type="text"
                    id="district"
                    className={`form-input ${errors.district ? 'error-border' : ''}`}
                    placeholder="Enter district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={isLoading}
                  />
                  {errors.district && <span className="form-error-msg">{errors.district}</span>}
                </div>
                <div>
                  <label className="form-label" htmlFor="stateName">State</label>
                  <input
                    type="text"
                    id="stateName"
                    className={`form-input ${errors.stateName ? 'error-border' : ''}`}
                    placeholder="Enter state"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    disabled={isLoading}
                  />
                  {errors.stateName && <span className="form-error-msg">{errors.stateName}</span>}
                </div>
              </div>

              {/* Upload license document */}
              <div className="form-group">
                <label className="form-label">Drug License Document (PDF)</label>
                {!licenseFile ? (
                  <div className="upload-container">
                    <svg className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="upload-text">Click to choose or drag drug license PDF</p>
                    <span className="upload-hint">PDF up to 5MB</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="file-input"
                      onChange={(e) => handleFileUpload(e, 'license')}
                      disabled={isLoading}
                    />
                  </div>
                ) : (
                  <div className="uploaded-file-tag">
                    <span>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {licenseFile}
                    </span>
                    <button type="button" onClick={() => removeFile('license')} className="btn-remove-file" aria-label="Remove file">✕</button>
                  </div>
                )}
                {errors.licenseFile && <span className="form-error-msg">{errors.licenseFile}</span>}
              </div>

              {/* Upload pharmacist credentials */}
              <div className="form-group">
                <label className="form-label">Pharmacist Credential / Registration Certificate (PDF)</label>
                {!credentialsFile ? (
                  <div className="upload-container">
                    <svg className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="upload-text">Click to choose or drag pharmacist credentials PDF</p>
                    <span className="upload-hint">PDF up to 5MB</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="file-input"
                      onChange={(e) => handleFileUpload(e, 'credentials')}
                      disabled={isLoading}
                    />
                  </div>
                ) : (
                  <div className="uploaded-file-tag">
                    <span>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {credentialsFile}
                    </span>
                    <button type="button" onClick={() => removeFile('credentials')} className="btn-remove-file" aria-label="Remove file">✕</button>
                  </div>
                )}
                {errors.credentialsFile && <span className="form-error-msg">{errors.credentialsFile}</span>}
              </div>

              <div className="wizard-actions-row">
                <button type="button" onClick={handleBack} className="btn btn-outline btn-wizard">Back</button>
                <button type="button" onClick={handleContinue} className="btn btn-primary btn-wizard">Continue</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="register-step-title">Review Registration Details</h2>
              <p className="register-step-desc">Confirm all entered fields match certified drug registry details before submission.</p>

              <div className="review-summary-card">
                <h4 className="review-section-title">Pharmacy Details</h4>
                <div className="review-data-row">
                  <span className="review-data-label">Pharmacy Name:</span>
                  <span className="review-data-val">{pharmacyName}</span>
                </div>
                <div className="review-data-row">
                  <span className="review-data-label">License Number:</span>
                  <span className="review-data-val">{licenseNumber}</span>
                </div>
                <div className="review-data-row">
                  <span className="review-data-label">Contact Number:</span>
                  <span className="review-data-val">{phoneNumber}</span>
                </div>
                <div className="review-data-row">
                  <span className="review-data-label">Store Address:</span>
                  <span className="review-data-val">{address}</span>
                </div>

                <h4 className="review-section-title">Pharmacist Details</h4>
                <div className="review-data-row">
                  <span className="review-data-label">Full Name:</span>
                  <span className="review-data-val">{pharmacistName}</span>
                </div>
                <div className="review-data-row">
                  <span className="review-data-label">Registration ID:</span>
                  <span className="review-data-val">{pharmacistRegId}</span>
                </div>
                <div className="review-data-row">
                  <span className="review-data-label">Aadhaar Number:</span>
                  <span className="review-data-val">{aadhaarNumber.replace(/(\d{4})/g, '$1 ').trim()}</span>
                </div>
                <div className="review-data-row">
                  <span className="review-data-label">Aadhaar Mobile:</span>
                  <span className="review-data-val">{pharmacistMobile}</span>
                </div>
                <div className="review-data-row">
                  <span className="review-data-label">Verification Status:</span>
                  <span className="review-data-val" style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>Aadhaar OTP Verified</span>
                </div>

                <h4 className="review-section-title">Location &amp; Documents</h4>
                <div className="review-data-row">
                  <span className="review-data-label">Locality / City:</span>
                  <span className="review-data-val">{locality}, {city}</span>
                </div>
                <div className="review-data-row">
                  <span className="review-data-label">District / State:</span>
                  <span className="review-data-val">{district}, {stateName}</span>
                </div>
                <div className="review-data-row">
                  <span className="review-data-label">License PDF:</span>
                  <span className="review-data-val">{licenseFile}</span>
                </div>
                <div className="review-data-row">
                  <span className="review-data-label">Credentials PDF:</span>
                  <span className="review-data-val">{credentialsFile}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      disabled={isLoading}
                    />
                    <span>
                      I hereby certify that the pharmacist credentials and license details provided are active, valid, and comply with Drugs Control Department guidelines.
                    </span>
                  </label>
                  {errors.terms && <span className="form-error-msg" style={{ marginTop: 'var(--spacing-xs)' }}>{errors.terms}</span>}
                </div>

                <div className="wizard-actions-row">
                  <button type="button" onClick={handleBack} className="btn btn-outline btn-wizard" disabled={isLoading}>Back</button>
                  <button type="submit" className="btn btn-primary btn-wizard" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner" aria-hidden="true"></span>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Registration</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
      {/* Custom Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-scale-in">
            <div className="modal-icon-box">
              <svg className="modal-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="modal-title">Registration Submitted</h3>
            <p className="modal-text">
              Your pharmacy registration profile and credentials have been submitted successfully.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-modal-close"
              onClick={() => onNavigate('landing')}
            >
              Go to Home Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
