import React from 'react';
import type { InspectorAccountDetails } from './types';
import './InspectorProfile.css';

export const InspectorProfile: React.FC = () => {
  const inspectorDetails: InspectorAccountDetails = {
    name: 'Dr. A. K. Sharma',
    role: 'Drug Inspector',
    accountStatus: 'Active',
    officialEmail: 'ak.sharma@drugscontrol.gov.in',
    mobileNumber: '+91 98765 43210',
    badgeNumber: 'DI-REG-2024-88',
    jurisdictionZone: 'Zone 4 (Central & North-East District)',
    otpAuthStatus: 'Enabled',
    accountSecurityStatus: 'Secure / 2FA Verified',
    lastLoginTimestamp: 'Today, 08:35 AM (IP: 10.240.12.89)',
    authorizationScope: 'Regulatory Monitoring & Compliance Inspectorate',
    regulatoryJurisdiction: 'Drugs Control Department, State Regulatory Authority',
  };

  return (
    <div className="inspector-page-container inspector-profile-container">
      {/* 1. Profile Header Card */}
      <section className="inspector-card profile-header-card">
        <div className="profile-header-content">
          <div className="profile-avatar-large">
            <span>AS</span>
          </div>
          <div className="profile-header-info">
            <div className="profile-title-row">
              <h1 className="profile-name-title">{inspectorDetails.name}</h1>
              <span className="profile-status-badge status-active">
                <span className="status-dot"></span>
                {inspectorDetails.accountStatus}
              </span>
            </div>
            <p className="profile-role-subtitle">{inspectorDetails.role}</p>
            <div className="profile-badge-tags">
              <span className="profile-meta-tag">Badge: {inspectorDetails.badgeNumber}</span>
              <span className="profile-meta-tag">Jurisdiction: {inspectorDetails.jurisdictionZone}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="profile-grid-layout">
        {/* Left Column: Account Info & Access Information */}
        <div className="profile-grid-column">
          {/* 2. Account Information Card */}
          <section className="inspector-card profile-section-card">
            <div className="profile-card-header">
              <h2 className="profile-card-title">Account Information</h2>
              <span className="profile-section-subtext">Verified Regulatory Account</span>
            </div>
            <div className="profile-details-grid">
              <div className="profile-field-item">
                <span className="field-label">Full Name</span>
                <span className="field-value-text font-bold">{inspectorDetails.name}</span>
              </div>

              <div className="profile-field-item">
                <span className="field-label">Official Role</span>
                <span className="field-value-text">{inspectorDetails.role}</span>
              </div>

              <div className="profile-field-item">
                <span className="field-label">Official Email</span>
                <span className="field-value-text email-highlight">{inspectorDetails.officialEmail}</span>
              </div>

              <div className="profile-field-item">
                <span className="field-label">Mobile Number</span>
                <span className="field-value-text">{inspectorDetails.mobileNumber}</span>
              </div>

              <div className="profile-field-item">
                <span className="field-label">Badge Registration No.</span>
                <span className="field-value-text badge-mono">{inspectorDetails.badgeNumber}</span>
              </div>

              <div className="profile-field-item">
                <span className="field-label">Assigned Jurisdiction</span>
                <span className="field-value-text">{inspectorDetails.jurisdictionZone}</span>
              </div>
            </div>
          </section>

          {/* 4. Access Information Card */}
          <section className="inspector-card profile-section-card">
            <div className="profile-card-header">
              <h2 className="profile-card-title">Access Information</h2>
              <span className="profile-section-subtext">Authorized Regulatory Scope</span>
            </div>
            <div className="profile-access-banner">
              <div className="access-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="access-banner-content">
                <h3 className="access-banner-heading">Authorized Inspector Account</h3>
                <p className="access-banner-description">
                  This account is an authorized Drug Inspector account designated for regulatory monitoring, stock verification, and sales auditing under the State Drugs Control Department.
                </p>
              </div>
            </div>

            <div className="profile-details-grid grid-1col">
              <div className="profile-field-item">
                <span className="field-label">Authorization Scope</span>
                <span className="field-value-text">{inspectorDetails.authorizationScope}</span>
              </div>

              <div className="profile-field-item">
                <span className="field-label">Regulatory Body</span>
                <span className="field-value-text">{inspectorDetails.regulatoryJurisdiction}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Authentication & Security */}
        <div className="profile-grid-column">
          {/* 3. Authentication & Security Card */}
          <section className="inspector-card profile-section-card">
            <div className="profile-card-header">
              <h2 className="profile-card-title">Authentication & Security</h2>
              <span className="profile-section-subtext">Govt Gateway Credentials</span>
            </div>

            <div className="profile-security-list">
              <div className="security-status-item">
                <div className="security-item-info">
                  <span className="security-item-title">OTP Authentication Status</span>
                  <span className="security-item-desc">Mandatory 2FA OTP active for portal login</span>
                </div>
                <span className="security-badge badge-green">{inspectorDetails.otpAuthStatus}</span>
              </div>

              <div className="security-status-item">
                <div className="security-item-info">
                  <span className="security-item-title">Account Security Status</span>
                  <span className="security-item-desc">Encrypted session & Verified Credentials</span>
                </div>
                <span className="security-badge badge-blue">{inspectorDetails.accountSecurityStatus}</span>
              </div>

              <div className="security-status-item">
                <div className="security-item-info">
                  <span className="security-item-title">Last Portal Login</span>
                  <span className="security-item-desc">Recorded audit log entry</span>
                </div>
                <span className="security-item-timestamp">{inspectorDetails.lastLoginTimestamp}</span>
              </div>
            </div>
          </section>

          {/* Regulatory Guidelines Box */}
          <div className="profile-notice-box">
            <h4 className="notice-heading">Security Compliance Notice</h4>
            <p className="notice-text">
              Portal access logs are audited by the Regulatory Authority. Official credentials must not be shared or transferred. Report unauthorized access attempts to IT Security immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectorProfile;
