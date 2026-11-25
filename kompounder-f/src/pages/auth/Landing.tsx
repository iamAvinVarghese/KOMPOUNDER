import { useState, useEffect } from 'react';
import './Landing.css';

interface LandingProps {
  onNavigate: (view: 'landing' | 'login' | 'register' | 'pharmacist-dashboard' | 'inspector-dashboard') => void;
}

function Landing({ onNavigate }: LandingProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'features', 'how-it-works', 'security'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);

    // Scroll listener for top-of-page fallback & IntersectionObserver for scroll spy
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePlaceholderAction = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('This feature is currently a placeholder in this prototype.');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="landing-root">
      {/* 1. Header Navigation */}
      <header className="landing-header">
        <div className="landing-container landing-nav">
          <div className="landing-brand" onClick={() => scrollToSection('home')}>
            <svg className="landing-brand-icon" viewBox="0 0 24 24">
              <path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-15z M10.5 4.5C10.5 3.67 11.17 3 12 3s1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-15z" />
            </svg>
            <span>KOMPOUNDER</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="landing-nav-links">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className={`landing-nav-link ${activeSection === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className={`landing-nav-link ${activeSection === 'about' ? 'active' : ''}`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('features')}
              className={`landing-nav-link ${activeSection === 'features' ? 'active' : ''}`}
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className={`landing-nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('security')}
              className={`landing-nav-link ${activeSection === 'security' ? 'active' : ''}`}
            >
              Security
            </button>
          </nav>

          {/* Desktop Nav Actions */}
          <div className="landing-nav-actions">
            <button type="button" onClick={() => onNavigate('login')} className="btn btn-outline">Login</button>
            <button type="button" onClick={() => onNavigate('register')} className="btn btn-primary">Register Pharmacy</button>
          </div>

          {/* Mobile Menu Toggle button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer Dropdown */}
      <nav className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <button type="button" onClick={() => scrollToSection('home')} className="landing-nav-link">Home</button>
        <button type="button" onClick={() => scrollToSection('about')} className="landing-nav-link">About</button>
        <button type="button" onClick={() => scrollToSection('features')} className="landing-nav-link">Features</button>
        <button type="button" onClick={() => scrollToSection('how-it-works')} className="landing-nav-link">How It Works</button>
        <button type="button" onClick={() => scrollToSection('security')} className="landing-nav-link">Security</button>
        <div className="landing-nav-actions">
          <button type="button" onClick={() => onNavigate('login')} className="btn btn-outline">Login</button>
          <button type="button" onClick={() => onNavigate('register')} className="btn btn-primary">Register Pharmacy</button>
        </div>
      </nav>

      <main>
        {/* 2. Hero Section */}
        <section id="home" className="hero-section">
          <div className="landing-container hero-grid">
            <div className="hero-content animate-fade-in delay-1">
              <div className="hero-badge">
                <span>Track &amp; Trace Platform</span>
              </div>
              <h1 className="hero-title">
                Track &amp; Trace Infrastructure for Restricted Medications
              </h1>
              <p className="hero-subtitle">
                A security prototype for monitoring antibiotic and narcotic drug distribution, validating pharmacist credentials, and establishing real-time stock transparency.
              </p>
              <div className="hero-actions">
                <button type="button" onClick={() => onNavigate('register')} className="btn btn-primary btn-secondary">Register Pharmacy</button>
                <button type="button" onClick={() => onNavigate('login')} className="btn btn-outline">Access Portal</button>
              </div>
            </div>
            <div className="hero-visual animate-fade-in delay-2">
              <div className="hero-image-container">
                <img
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80"
                  alt="Organized pharmacy medicine shelves with medicine bottles and boxes"
                  className="hero-pharmacy-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Trust / Purpose Strip */}
        <section className="trust-strip animate-fade-in delay-2">
          <div className="landing-container trust-grid">
            <div className="trust-item">
              <div className="trust-icon-box">
                <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M8.5 10a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
                </svg>
              </div>
              <span className="trust-label">Register</span>
              <p className="trust-desc">Pharmacies establish secure profiles verified with physical location metadata.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon-box">
                <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="trust-label">Verify</span>
              <p className="trust-desc">Verification of pharmacist credentials to authenticate authorized individuals.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon-box">
                <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <span className="trust-label">Track</span>
              <p className="trust-desc">Real-time recording of stock balances and daily distribution actions.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon-box">
                <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="trust-label">Comply</span>
              <p className="trust-desc">System alerts flag abnormal stock usage and distribution thresholds.</p>
            </div>
          </div>
        </section>

        {/* 4. About KOMPOUNDER Section */}
        <section id="about" className="about-section">
          <div className="landing-container about-grid">
            <div className="about-content">
              <span className="section-tag">System Overview</span>
              <h2 className="section-title">About KOMPOUNDER</h2>
              <p className="about-desc">
                KOMPOUNDER is a regulatory track-and-trace prototype designed to prevent the unauthorized sale and misuse of restricted medications, specifically antibiotics and narcotic drugs. 
              </p>
              <p className="about-desc" style={{ marginBottom: 'var(--spacing-xl)' }}>
                By establishing direct pharmacist verification requirements and secure stock logging pipelines, the system aims to introduce accountability and transparency for pharmacy sales.
              </p>
              <div className="about-highlights">
                <div className="about-highlight-card">
                  <h4 className="about-highlight-title">Targeted Tracking</h4>
                  <p className="about-highlight-desc">Focused oversight on restricted antibiotics and critical narcotic drugs.</p>
                </div>
                <div className="about-highlight-card">
                  <h4 className="about-highlight-title">Pharmacist Verification</h4>
                  <p className="about-highlight-desc">Strict session validation of certified professionals before dispensing.</p>
                </div>
              </div>
            </div>
            <div className="about-visual">
              {/* Conceptual verification flow SVG */}
              <svg className="about-svg-visual" viewBox="0 0 440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="440" height="320" rx="12" fill="#f4f6f9" stroke="#d2d8e2" strokeWidth="2" />
                
                {/* Node 1: Pharmacy */}
                <rect x="40" y="120" width="100" height="80" rx="6" fill="#0f2e59" />
                <text x="90" y="160" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">REGISTERED</text>
                <text x="90" y="175" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">PHARMACY</text>
                
                {/* Node 2: Verification Hub */}
                <rect x="300" y="120" width="100" height="80" rx="6" fill="#0c827c" />
                <text x="350" y="160" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">VERIFIED</text>
                <text x="350" y="175" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">CREDENTIALS</text>

                {/* Connecting Lines */}
                <path d="M140 160 H300" stroke="#d2d8e2" strokeWidth="3" />
                <circle cx="220" cy="160" r="24" fill="#ffffff" stroke="#0f2e59" strokeWidth="2" />
                <path d="M213 160 L218 165 L227 155" stroke="#0c827c" strokeWidth="3" strokeLinecap="round" />
                
                {/* Text descriptors */}
                <text x="220" y="210" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">SECURE LINK</text>
              </svg>
            </div>
          </div>
        </section>

        {/* 5. Product Preview Section */}
        <section id="preview" className="preview-section">
          <div className="landing-container preview-grid">
            <div className="section-header">
              <span className="section-tag">System Interface</span>
              <h2 className="section-title">Real-Time Visibility Into Drug Movement</h2>
              <p className="section-subtitle">
                Inspect a preview of the pharmacist and regulatory authority interface showing real-time ledger records.
              </p>
            </div>

            <div className="preview-dashboard-shell">
              <div className="preview-metrics-grid">
                <div className="preview-metric-card">
                  <span className="feature-category">Active Inventory</span>
                  <div className="preview-metric-value">4,129 Units</div>
                </div>
                <div className="preview-metric-card">
                  <span className="feature-category">Sales Logged Today</span>
                  <div className="preview-metric-value">42 Transactions</div>
                </div>
                <div className="preview-metric-card">
                  <span className="feature-category">Threshold Status</span>
                  <div className="preview-metric-value" style={{ color: 'var(--color-success)' }}>NORMAL</div>
                </div>
              </div>

              <div className="preview-inner-grid">
                <div className="preview-widget">
                  <h4 style={{ margin: '0 0 var(--spacing-sm) 0' }}>Dispensing Log</h4>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: '0 0 var(--spacing-md) 0' }}>
                    Latest entries from antibiotic and narcotic ledgers.
                  </p>
                  
                  <div style={{ overflowX: 'auto' }}>
                    <table className="preview-logs-table">
                      <thead>
                        <tr>
                          <th>Drug Name</th>
                          <th>Category</th>
                          <th>Qty</th>
                          <th>Pharmacist ID</th>
                          <th>Verification Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Amoxicillin 500mg</td>
                          <td>Antibiotic</td>
                          <td>20</td>
                          <td>RPH-4929</td>
                          <td><span className="badge-status badge-success">✓ Verified</span></td>
                        </tr>
                        <tr>
                          <td>Morphine Sulfate</td>
                          <td>Narcotic</td>
                          <td>2</td>
                          <td>RPH-9912</td>
                          <td><span className="badge-status badge-success">✓ Verified</span></td>
                        </tr>
                        <tr>
                          <td>Ciprofloxacin 250mg</td>
                          <td>Antibiotic</td>
                          <td>10</td>
                          <td>RPH-2104</td>
                          <td><span className="badge-status badge-success">✓ Verified</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="preview-widget" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  <h4 style={{ margin: 0 }}>Compliance Monitor</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    <div style={{ padding: 'var(--spacing-sm)', backgroundColor: 'var(--color-success-bg)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-success)' }}>
                      <p style={{ fontSize: '11px', margin: 0, fontWeight: 'bold', color: 'var(--color-success)' }}>Credential Check</p>
                      <p style={{ fontSize: '10px', margin: 0, color: 'var(--color-text-secondary)' }}>Pharmacist ID validated successfully.</p>
                    </div>

                    <div style={{ padding: 'var(--spacing-sm)', backgroundColor: 'var(--color-warning-bg)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-warning)' }}>
                      <p style={{ fontSize: '11px', margin: 0, fontWeight: 'bold', color: 'var(--color-warning)' }}>Compliance Alerts</p>
                      <p style={{ fontSize: '10px', margin: 0, color: 'var(--color-text-secondary)' }}>Narcotic threshold limit check active.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Key Features Section */}
        <section id="features" className="features-section">
          <div className="landing-container">
            <div className="section-header">
              <span className="section-tag">System Capabilities</span>
              <h2 className="section-title">Essential Regulatory Features</h2>
              <p className="section-subtitle">A professional dashboard prototype designed to support compliance workflows and secure oversight.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  </svg>
                </div>
                <span className="feature-category">Tracking</span>
                <h3 className="feature-card-title">Track &amp; Trace</h3>
                <p className="feature-card-desc">Comprehensive logging of antibiotics and narcotic drug movement across physical pharmacy endpoints.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="feature-category">Verification</span>
                <h3 className="feature-card-title">Pharmacist Verification</h3>
                <p className="feature-card-desc">Ensures only licensed pharmacists are authenticated to perform drug dispatch transactions.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <span className="feature-category">Transparency</span>
                <h3 className="feature-card-title">Data Transparency</h3>
                <p className="feature-card-desc">Facilitates records visibility to regulatory authorities for stock logs and verification status checks.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="feature-category">Audit Controls</span>
                <h3 className="feature-card-title">Compliance Audits</h3>
                <p className="feature-card-desc">Compliance alerts and threshold monitoring flag anomalous purchase patterns or high narcotic transactions.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9 0v-3a2 2 0 00-2-2h-2a2 2 0 00-2 2v3a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                </div>
                <span className="feature-category">Intelligence</span>
                <h3 className="feature-card-title">Usage Analytics</h3>
                <p className="feature-card-desc">Dynamic aggregation of daily and monthly dispensing trends for reporting purposes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. How KOMPOUNDER Works */}
        <section id="how-it-works" className="timeline-section">
          <div className="landing-container">
            <div className="section-header">
              <span className="section-tag">Sequence Flow</span>
              <h2 className="section-title">How the Platform Operates</h2>
              <p className="section-subtitle">The process from initial verification to active drug compliance tracking.</p>
            </div>
            <div className="timeline-flow">
              <div className="timeline-step">
                <span className="step-badge">01</span>
                <h4 className="step-title">Register</h4>
                <p className="step-desc">Establish shop details and record GPS location coordinates.</p>
              </div>
              <div className="timeline-step">
                <span className="step-badge">02</span>
                <h4 className="step-title">Verify</h4>
                <p className="step-desc">Pharmacist submits registration records for verification.</p>
              </div>
              <div className="timeline-step">
                <span className="step-badge">03</span>
                <h4 className="step-title">Stock &amp; Sales</h4>
                <p className="step-desc">Record transaction details and submit verification bills.</p>
              </div>
              <div className="timeline-step">
                <span className="step-badge">04</span>
                <h4 className="step-title">Monitor</h4>
                <p className="step-desc">Real-time ledger updates trace medical distribution feeds.</p>
              </div>
              <div className="timeline-step">
                <span className="step-badge">05</span>
                <h4 className="step-title">Comply</h4>
                <p className="step-desc">Auto-generated daily summaries highlight compliance alerts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Regulatory Security Panel */}
        <section id="security" className="security-section">
          <div className="landing-container security-panel">
            <div className="security-grid">
              <div>
                <span className="security-tag">Security &amp; Accountability</span>
                <h2 className="security-title">Secure Regulatory Environment</h2>
                <p className="security-desc">
                  KOMPOUNDER restricts ledger interactions to authorized pharmacists. Sensitive distribution metrics are recorded securely to provide accountability.
                </p>
                <ul className="security-list">
                  <li className="security-list-item">
                    <svg className="security-list-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified Pharmacist Sessions (OTP validated)
                  </li>
                  <li className="security-list-item">
                    <svg className="security-list-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Location Verification (GPS coordinate tagging)
                  </li>
                  <li className="security-list-item">
                    <svg className="security-list-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Billing PDF Upload and Record Association
                  </li>
                </ul>
              </div>
              <div className="security-visual-box">
                <svg className="security-svg-visual" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="300" rx="8" fill="#ffffff" stroke="#d2d8e2" strokeWidth="2" />
                  <path d="M200 60 L280 90 V170 C280 220 200 250 200 250 C200 250 120 220 120 170 V90 L200 60 Z" fill="#0f2e59" opacity="0.9" />
                  <path d="M200 80 L260 105 V165 C260 200 200 225 200 225 C200 225 140 200 140 165 V105 L200 80 Z" fill="#0c827c" />
                  <path d="M185 155 L195 165 L220 135" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Action CTA Section */}
        <section className="cta-section">
          <div className="landing-container cta-content">
            <h2 className="cta-title">Pharmacy Registration Portal</h2>
            <p className="cta-desc">
              Register your pharmacy profile to participate in tracking and tracing antibiotic and narcotic stock balances.
            </p>
            <button type="button" onClick={() => onNavigate('register')} className="btn btn-secondary">Initialize Registration</button>
          </div>
        </section>
      </main>

      {/* 10. Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-title">KOMPOUNDER</div>
              <p className="footer-brand-desc">
                Tracking infrastructure prototype for responsible monitoring of antibiotics and narcotic drugs.
              </p>
            </div>
            <div>
              <h5 className="footer-heading">Platform</h5>
              <ul className="footer-links">
                <li><button type="button" onClick={() => scrollToSection('home')} className="footer-link-btn">Home</button></li>
                <li><button type="button" onClick={() => scrollToSection('about')} className="footer-link-btn">About</button></li>
                <li><button type="button" onClick={() => scrollToSection('features')} className="footer-link-btn">Features</button></li>
              </ul>
            </div>
            <div>
              <h5 className="footer-heading">Portals</h5>
              <ul className="footer-links">
                <li><button type="button" onClick={() => onNavigate('login')} className="footer-link-btn">Pharmacist Login</button></li>
                <li><button type="button" onClick={handlePlaceholderAction} className="footer-link-btn">Inspector Portal</button></li>
                <li><button type="button" onClick={handlePlaceholderAction} className="footer-link-btn">Registration Setup</button></li>
              </ul>
            </div>
            <div>
              <h5 className="footer-heading">Access</h5>
              <ul className="footer-links">
                <li><button type="button" onClick={() => scrollToSection('how-it-works')} className="footer-link-btn">How it Works</button></li>
                <li><button type="button" onClick={() => scrollToSection('security')} className="footer-link-btn">Security</button></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} KOMPOUNDER. Tracking prototype.</span>
            <span>Security Sandbox Mode</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
