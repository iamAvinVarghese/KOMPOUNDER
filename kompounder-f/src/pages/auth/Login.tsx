import React, { useState, useEffect } from 'react';
import './Login.css';

interface LoginProps {
  onNavigate: (view: 'landing' | 'login' | 'register' | 'pharmacist-dashboard' | 'inspector-dashboard') => void;
}

const LOGIN_TEST_USERS = {
  pharmacist: {
    email: 'pharmacist@kompounder.com',
    password: 'Pharma@123',
  },
  inspector: {
    email: 'inspector@kompounder.com',
    password: 'Inspector@123',
  },
};

const DUMMY_OTP = '123456';

function Login({ onNavigate }: LoginProps) {
  // Common states - default to pharmacist role for quick usability
  const [selectedRole, setSelectedRole] = useState<'pharmacist' | 'inspector'>('pharmacist');
  const [authMethod, setAuthMethod] = useState<'credentials' | 'otp'>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ selectedRole?: string; email?: string; password?: string; mobile?: string; otp?: string }>({});

  // Credentials Mode states
  const [email, setEmail] = useState('pharmacist@kompounder.com');
  const [password, setPassword] = useState('Pharma@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // OTP Mode states
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpStatusMsg, setOtpStatusMsg] = useState<string | null>(null);
  const [otpCountdown, setOtpCountdown] = useState(0);

  // Prefill credentials when role changes
  useEffect(() => {
    if (selectedRole && authMethod === 'credentials') {
      const targetUser = LOGIN_TEST_USERS[selectedRole];
      setEmail(targetUser.email);
      setPassword(targetUser.password);
      setErrors({});
    }
  }, [selectedRole, authMethod]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: any;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  const handlePlaceholderAction = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('This feature is currently a placeholder in this prototype.');
  };

  // Simulates requesting OTP code
  const handleSendOtp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!mobile.trim() || !/^\d{10}$/.test(mobile.replace(/\s+/g, ''))) {
      setErrors({ mobile: 'Please enter a valid 10-digit mobile number.' });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setOtpCountdown(30);
      setErrors({});
      setOtpStatusMsg(`Verification code sent to mobile ending in ...${mobile.slice(-4)}.`);
    }, 1000);
  };

  const validateForm = () => {
    const tempErrors: { selectedRole?: string; email?: string; password?: string; mobile?: string; otp?: string } = {};
    let isValid = true;

    if (!selectedRole) {
      tempErrors.selectedRole = 'Please select a portal to sign in.';
      isValid = false;
    }

    if (authMethod === 'credentials') {
      if (!email.trim()) {
        tempErrors.email = 'Email Address is required.';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        tempErrors.email = 'Please enter a valid email address.';
        isValid = false;
      }
      if (!password) {
        tempErrors.password = 'Password is required.';
        isValid = false;
      }

      // Validate test credentials
      if (isValid && selectedRole) {
        const testUser = LOGIN_TEST_USERS[selectedRole];
        if (email !== testUser.email || password !== testUser.password) {
          tempErrors.email = 'Invalid email address or password for the selected portal.';
          isValid = false;
        }
      }
    } else {
      if (!mobile.trim() || !/^\d{10}$/.test(mobile.replace(/\s+/g, ''))) {
        tempErrors.mobile = 'Please enter a valid 10-digit mobile number.';
        isValid = false;
      }
      if (!isOtpSent) {
        tempErrors.otp = 'Please send and verify the OTP code first.';
        isValid = false;
      } else if (!otp.trim() || otp !== DUMMY_OTP) {
        tempErrors.otp = 'Invalid OTP code.';
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (selectedRole === 'pharmacist') {
          onNavigate('pharmacist-dashboard');
        } else if (selectedRole === 'inspector') {
          onNavigate('inspector-dashboard');
        }
      }, 1500);
    }
  };

  return (
    <div className="login-container">
      {/* Left Branding Panel */}
      <section className="login-branding-panel">
        <div className="login-brand-header" onClick={() => onNavigate('landing')}>
          <svg className="login-brand-icon" viewBox="0 0 24 24">
            <path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-15z M10.5 4.5C10.5 3.67 11.17 3 12 3s1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-15z" />
          </svg>
          <span>KOMPOUNDER</span>
        </div>

        <div className="login-branding-body">
          <h2 className="login-brand-title">Track &amp; Trace Platform</h2>
          <p className="login-brand-subtitle">
            Secure tracking, distribution audits, and credential validation infrastructure for restricted pharmaceuticals.
          </p>

          <div className="login-highlights-list">
            <div className="login-highlight-item">
              <div className="login-highlight-icon-box">
                <svg className="login-highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span>Pharmacist Verification controls</span>
            </div>
            <div className="login-highlight-item">
              <div className="login-highlight-icon-box">
                <svg className="login-highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9 0v-3a2 2 0 00-2-2h-2a2 2 0 00-2 2v3a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
              </div>
              <span>Real-time Stock Monitoring</span>
            </div>
            <div className="login-highlight-item">
              <div className="login-highlight-icon-box">
                <svg className="login-highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span>Compliance Auditing</span>
            </div>
            <div className="login-highlight-item">
              <div className="login-highlight-icon-box">
                <svg className="login-highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span>Regulatory visibility channels</span>
            </div>
          </div>
        </div>

        <div className="brand-prompt-wrapper" style={{ zIndex: 2, marginTop: 'auto', marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>
          <div className="form-divider" style={{ opacity: 0.15, margin: 'var(--spacing-md) 0' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255, 255, 255, 0.7)' }}>
              Don't have a pharmacy account?
            </span>
            <button
              type="button"
              className="brand-prompt-btn"
              onClick={() => onNavigate('register')}
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
              Register Pharmacy
            </button>
          </div>
        </div>

        <div className="login-brand-footer">
          <span>&copy; {new Date().getFullYear()} KOMPOUNDER. Sandbox Access Portal.</span>
        </div>
      </section>

      {/* Right Form Panel */}
      <section className="login-form-panel">
        <div className="login-form-wrapper">
          <button type="button" onClick={() => onNavigate('landing')} className="login-back-btn">
            <svg className="login-back-arrow" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back to website</span>
          </button>
          <div className="login-form-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to access your KOMPOUNDER portal.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Role Selection */}
            <div className="role-selection-section">
              <span className="role-selection-title">Select Portal</span>
              <div className="role-cards-grid">
                <div
                  className={`role-card ${selectedRole === 'pharmacist' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('pharmacist')}
                >
                  <span className="role-card-title">Pharmacist</span>
                  <span className="role-card-desc">Pharmacy Portal</span>
                </div>
                <div
                  className={`role-card ${selectedRole === 'inspector' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('inspector')}
                >
                  <span className="role-card-title">Drug Inspector</span>
                  <span className="role-card-desc">Regulatory Portal</span>
                </div>
              </div>
              {errors.selectedRole && <span className="form-error-msg">{errors.selectedRole}</span>}
            </div>

            {/* Auth Method Selector */}
            <div className="auth-method-section">
              <span className="auth-method-title">Login with</span>
              <div className="auth-method-grid">
                <button
                  type="button"
                  className={`auth-method-btn ${authMethod === 'credentials' ? 'active' : ''}`}
                  onClick={() => { setAuthMethod('credentials'); setErrors({}); }}
                  disabled={isLoading}
                >
                  Email &amp; Password
                </button>
                <button
                  type="button"
                  className={`auth-method-btn ${authMethod === 'otp' ? 'active' : ''}`}
                  onClick={() => { setAuthMethod('otp'); setErrors({}); }}
                  disabled={isLoading}
                >
                  Mobile &amp; OTP
                </button>
              </div>
            </div>

            {/* Render fields based on Auth Method */}
            {authMethod === 'credentials' ? (
              <>
                {/* Email Address */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className={`form-input ${errors.email ? 'error-border' : ''}`}
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>

                {/* Password input */}
                <div className="form-group">
                  <label className="form-label" htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className={`form-input ${errors.password ? 'error-border' : ''}`}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      autoComplete="current-password"
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

                {/* Options Row */}
                <div className="form-options-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={handlePlaceholderAction}
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Mobile Number & OTP sender row */}
                <div className="form-group">
                  <label className="form-label" htmlFor="mobile">Mobile Number (10 Digits)</label>
                  <div className="mobile-otp-send-row">
                    <input
                      type="tel"
                      id="mobile"
                      className={`form-input ${errors.mobile ? 'error-border' : ''}`}
                      placeholder="e.g. 9876543210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      disabled={isLoading}
                      maxLength={10}
                    />
                    <button
                      type="button"
                      className="btn btn-outline btn-send-otp"
                      onClick={handleSendOtp}
                      disabled={isLoading || otpCountdown > 0}
                    >
                      {otpCountdown > 0 ? `Resend ${otpCountdown}s` : isOtpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  </div>
                  {errors.mobile && <span className="form-error-msg">{errors.mobile}</span>}
                </div>

                {/* OTP Verification Input */}
                {isOtpSent && (
                  <>
                    {otpStatusMsg && (
                      <div className="otp-status-msg-banner">
                        <svg className="otp-status-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{otpStatusMsg}</span>
                      </div>
                    )}
                    <div className="form-group">
                      <label className="form-label" htmlFor="otp">Enter 6-Digit OTP</label>
                      <input
                        type="text"
                        id="otp"
                        className={`form-input ${errors.otp ? 'error-border' : ''}`}
                        placeholder="000000"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        disabled={isLoading}
                      />
                      {errors.otp && <span className="form-error-msg">{errors.otp}</span>}
                    </div>
                  </>
                )}
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
