import { useState, useEffect } from 'react';
import './PharmacistProfile.css';

interface ProfileData {
  fullName: string;
  mobile: string;
  email: string;
  registrationNumber: string;
  licenseStatus: string;
  registeredSince: string;
  pharmacyName: string;
  pharmacyAddress: string;
  aadhaarStatus: string;
  inspectorName: string;
  inspectorDesignation: string;
  inspectorEmail: string;
  lastLogin: string;
  avatarUrl?: string;
}

interface PharmacistProfileProps {
  initialModal?: 'edit' | 'password' | null;
  onModalClosed?: () => void;
}

const STORAGE_KEY = 'kompounder_pharmacist_profile';

const defaultProfile: ProfileData = {
  fullName: 'Rajesh Kumar',
  mobile: '+91 98765 43210',
  email: 'rajesh.kumar@aptivoracare.com',
  registrationNumber: 'REG-PH-2024-8841',
  licenseStatus: 'Verified & Active',
  registeredSince: 'October 14, 2021',
  pharmacyName: 'Aptivora Care Pharmacy',
  pharmacyAddress: 'Shop 12, Main Market, Sector 14, New Delhi - 110001',
  aadhaarStatus: 'UIDAI Biometric Verified',
  inspectorName: 'Dr. A. K. Sharma',
  inspectorDesignation: 'Drugs Inspector, Zone 4',
  inspectorEmail: 'ak.sharma@drugsdept.gov.in',
  lastLogin: '2026-09-01 09:15 AM from New Delhi, India',
};

export default function PharmacistProfile({ initialModal, onModalClosed }: PharmacistProfileProps = {}) {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...defaultProfile, ...JSON.parse(saved) };
    } catch {
      // Fallback
    }
    return defaultProfile;
  });

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit Form Fields
  const [editMobile, setEditMobile] = useState(profile.mobile);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editPharmacyName, setEditPharmacyName] = useState(profile.pharmacyName);
  const [editPharmacyAddress, setEditPharmacyAddress] = useState(profile.pharmacyAddress);
  const [editAvatarUrl, setEditAvatarUrl] = useState(profile.avatarUrl || '');

  // Password Form Fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Handle external modal trigger (e.g. from header dropdown)
  useEffect(() => {
    if (initialModal === 'edit') {
      handleOpenEdit();
    } else if (initialModal === 'password') {
      setIsPasswordModalOpen(true);
    }
  }, [initialModal]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleOpenEdit = () => {
    setEditMobile(profile.mobile);
    setEditEmail(profile.email);
    setEditPharmacyName(profile.pharmacyName);
    setEditPharmacyAddress(profile.pharmacyAddress);
    setEditAvatarUrl(profile.avatarUrl || '');
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    onModalClosed?.();
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPasswordError('');
    onModalClosed?.();
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast('Image size should be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setEditAvatarUrl(dataUrl);
      const updatedProfile = { ...profile, avatarUrl: dataUrl };
      setProfile(updatedProfile);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
      } catch {}
      window.dispatchEvent(new Event('kompounder_profile_updated'));
      showToast('Profile picture updated successfully.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setEditAvatarUrl('');
    const updatedProfile = { ...profile, avatarUrl: undefined };
    setProfile(updatedProfile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    } catch {}
    window.dispatchEvent(new Event('kompounder_profile_updated'));
    showToast('Profile picture removed.');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ProfileData = {
      ...profile,
      mobile: editMobile,
      email: editEmail,
      pharmacyName: editPharmacyName,
      pharmacyAddress: editPharmacyAddress,
      avatarUrl: editAvatarUrl || undefined,
    };
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage fallback
    }
    window.dispatchEvent(new Event('kompounder_profile_updated'));
    handleCloseEditModal();
    showToast('Profile details updated successfully!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill out all password fields.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    handleClosePasswordModal();
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Account password has been successfully updated.');
  };

  return (
    <div className="profile-view-content">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="profile-toast-banner animate-slide-down">
          <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
          <button type="button" className="toast-close" onClick={() => setToastMessage(null)} aria-label="Close">
            &times;
          </button>
        </div>
      )}

      {/* 1. Page Header (Matching Inventory / Sales / Reports) */}
      <div className="profile-view-header">
        <div>
          <h2 className="profile-view-title">Profile</h2>
          <p className="profile-view-desc">
            Manage your registered pharmacist credentials, pharmacy details, and inspector assignment.
          </p>
        </div>
        <button type="button" className="btn btn-primary edit-profile-btn" onClick={handleOpenEdit}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Profile
        </button>
      </div>

      {/* 2. Top Summary Metrics Grid (Exactly matching Inventory 4-card row) */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">PHARMACIST STATUS</span>
          </div>
          <div className="metric-card-body" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' }}>
            <div className="profile-hero-avatar-box">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.fullName} className="profile-hero-avatar-img" />
              ) : (
                <div className="profile-hero-avatar-placeholder">RK</div>
              )}
              <label className="profile-avatar-upload-btn" title="Change Profile Picture">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFileChange}
                  style={{ display: 'none' }}
                />
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="metric-value font-semibold" style={{ color: 'var(--color-text-primary)', fontSize: '1.4rem' }}>
                {profile.fullName}
              </span>
              <span className="metric-label" style={{ color: 'var(--color-success)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span className="dot-active"></span> {profile.licenseStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">REGISTRATION NO.</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value font-mono" style={{ color: 'var(--color-secondary)', fontSize: '1.35rem' }}>
              {profile.registrationNumber}
            </span>
            <span className="metric-label">Registered since {profile.registeredSince}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">ASSIGNED INSPECTOR</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value" style={{ color: 'var(--color-primary-dark)', fontSize: '1.25rem' }}>
              {profile.inspectorName}
            </span>
            <span className="metric-label">{profile.inspectorDesignation}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">SECURITY STATUS</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value text-success" style={{ fontSize: '1.35rem' }}>
              2FA Active
            </span>
            <span className="metric-label">{profile.aadhaarStatus}</span>
          </div>
        </div>
      </div>

      {/* 3. Regulatory Inspector Banner (Matching the Daily Stock Update Banner in Inventory) */}
      <div className="profile-inspector-banner">
        <div className="inspector-banner-left">
          <div className="inspector-banner-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="inspector-banner-info">
            <div className="inspector-banner-title-row">
              <h3 className="inspector-banner-title">Assigned Regulatory Inspector</h3>
              <span className="status-badge-active">Active</span>
            </div>
            <p className="inspector-banner-text">
              <strong>{profile.inspectorName}</strong> ({profile.inspectorDesignation}) &bull; Contact:{' '}
              <a href={`mailto:${profile.inspectorEmail}`} className="inspector-email-link">
                {profile.inspectorEmail}
              </a>
              <span className="inspector-pipe">|</span>
              <span className="inspector-subtext">Official regulatory inspector assigned for daily stock submissions &amp; audits.</span>
            </p>
          </div>
        </div>
        <button type="button" className="btn btn-primary submit-action-btn" onClick={handleOpenEdit}>
          Update Details
        </button>
      </div>

      {/* 4. Main 2-Column Content Layout (Cards styled with the same 16px radius, borders, & typography) */}
      <div className="profile-sections-grid">
        {/* Left Column: Pharmacist & Pharmacy Information */}
        <div className="profile-section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">Pharmacist &amp; Pharmacy Information</h3>
              <p className="section-card-desc">Registered store details, license certification, and verified contact channels.</p>
            </div>
            <button type="button" className="btn-inline-edit" onClick={handleOpenEdit}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Details
            </button>
          </div>

          <div className="profile-fields-grid">
            <div className="profile-field-box">
              <span className="pfield-label">FULL NAME</span>
              <span className="pfield-value font-semibold">{profile.fullName}</span>
            </div>

            <div className="profile-field-box">
              <span className="pfield-label">REGISTRATION NUMBER</span>
              <span className="pfield-value font-mono font-bold text-primary">{profile.registrationNumber}</span>
            </div>

            <div className="profile-field-box clickable" onClick={handleOpenEdit} title="Click to edit mobile">
              <div className="pfield-label-row">
                <span className="pfield-label">MOBILE NUMBER</span>
                <span className="pfield-action">Edit</span>
              </div>
              <span className="pfield-value">{profile.mobile}</span>
            </div>

            <div className="profile-field-box clickable" onClick={handleOpenEdit} title="Click to edit email">
              <div className="pfield-label-row">
                <span className="pfield-label">EMAIL ADDRESS</span>
                <span className="pfield-action">Edit</span>
              </div>
              <span className="pfield-value">{profile.email}</span>
            </div>

            <div className="profile-field-box">
              <span className="pfield-label">LICENSE STATUS</span>
              <span className="pfield-value text-success font-semibold">{profile.licenseStatus}</span>
            </div>

            <div className="profile-field-box">
              <span className="pfield-label">AADHAAR VERIFICATION</span>
              <span className="pfield-value text-success font-semibold">{profile.aadhaarStatus}</span>
            </div>

            <div className="profile-field-box full-col clickable" onClick={handleOpenEdit} title="Click to edit pharmacy name">
              <div className="pfield-label-row">
                <span className="pfield-label">PHARMACY / SHOP NAME</span>
                <span className="pfield-action">Edit</span>
              </div>
              <span className="pfield-value font-semibold text-primary">{profile.pharmacyName}</span>
            </div>

            <div className="profile-field-box full-col clickable" onClick={handleOpenEdit} title="Click to edit pharmacy address">
              <div className="pfield-label-row">
                <span className="pfield-label">PHARMACY ADDRESS</span>
                <span className="pfield-action">Edit</span>
              </div>
              <span className="pfield-value">{profile.pharmacyAddress}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Account Security & Portal Access */}
        <div className="profile-section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">Account &amp; Security</h3>
              <p className="section-card-desc">Authentication controls, mobile verification, and recent session audit logs.</p>
            </div>
          </div>

          <div className="security-items-list">
            <div className="security-row-card">
              <div className="sec-row-left">
                <div className="sec-icon-wrap">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <span className="sec-main-title">Account Password</span>
                  <span className="sec-main-sub">Last updated 30 days ago</span>
                </div>
              </div>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsPasswordModalOpen(true)}>
                Change Password
              </button>
            </div>

            <div className="security-row-card">
              <div className="sec-row-left">
                <div className="sec-icon-wrap success">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <span className="sec-main-title">Mobile OTP Authentication</span>
                  <span className="sec-main-sub text-success font-semibold">Verified (+91 98765****0)</span>
                </div>
              </div>
              <span className="status-badge-verified">Enabled</span>
            </div>

            <div className="security-row-card">
              <div className="sec-row-left">
                <div className="sec-icon-wrap info">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <span className="sec-main-title">Last Login Activity</span>
                  <span className="sec-main-sub">{profile.lastLogin}</span>
                </div>
              </div>
              <span className="status-badge-session">Active Session</span>
            </div>

            <div className="security-compliance-box">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="comp-info-icon">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>
                All login sessions and audit actions are authenticated under State Drug Authority compliance standards.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="profile-modal-backdrop" onClick={handleCloseEditModal}>
          <div className="profile-modal-container animate-scale-up" onClick={e => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <h3 className="profile-modal-title">Edit Profile Information</h3>
                <p className="profile-modal-sub">
                  Update your contact details and pharmacy location. Registration credentials are regulatory locked.
                </p>
              </div>
              <button type="button" className="profile-modal-close" onClick={handleCloseEditModal} aria-label="Close modal">
                &times;
              </button>
            </div>

            <form className="profile-modal-form" onSubmit={handleSaveEdit}>
              <div className="profile-modal-body">
                {/* Profile Photo Uploader Section in Modal */}
                <div className="avatar-edit-section">
                  <div className="avatar-preview-box">
                    {editAvatarUrl ? (
                      <img src={editAvatarUrl} alt="Avatar Preview" className="avatar-preview-img" />
                    ) : (
                      <div className="avatar-preview-placeholder">RK</div>
                    )}
                  </div>
                  <div className="avatar-edit-actions">
                    <label className="btn btn-outline btn-upload-avatar">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileChange}
                        style={{ display: 'none' }}
                      />
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      Upload New Photo
                    </label>
                    {editAvatarUrl && (
                      <button type="button" className="btn-remove-avatar" onClick={handleRemoveAvatar}>
                        Remove Photo
                      </button>
                    )}
                    <span className="avatar-hint">PNG, JPG, or WebP up to 2MB</span>
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label className="form-lbl">
                      Full Name <span className="lbl-locked">(Govt Registered)</span>
                    </label>
                    <input type="text" className="form-ctrl read-only" value={profile.fullName} disabled />
                  </div>

                  <div className="form-field">
                    <label className="form-lbl">
                      Registration Number <span className="lbl-locked">(Govt Registered)</span>
                    </label>
                    <input type="text" className="form-ctrl read-only" value={profile.registrationNumber} disabled />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label className="form-lbl">Contact Mobile Number *</label>
                    <input
                      type="tel"
                      className="form-ctrl"
                      value={editMobile}
                      onChange={e => setEditMobile(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-lbl">Contact Email Address *</label>
                    <input
                      type="email"
                      className="form-ctrl"
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-lbl">Pharmacy / Shop Name *</label>
                  <input
                    type="text"
                    className="form-ctrl"
                    value={editPharmacyName}
                    onChange={e => setEditPharmacyName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-lbl">Pharmacy Registered Address *</label>
                  <textarea
                    className="form-ctrl textarea"
                    rows={3}
                    value={editPharmacyAddress}
                    onChange={e => setEditPharmacyAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="profile-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={handleCloseEditModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="profile-modal-backdrop" onClick={handleClosePasswordModal}>
          <div className="profile-modal-container password-modal animate-scale-up" onClick={e => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <h3 className="profile-modal-title">Change Account Password</h3>
                <p className="profile-modal-sub">
                  Secure your account with a strong password (minimum 8 characters).
                </p>
              </div>
              <button type="button" className="profile-modal-close" onClick={handleClosePasswordModal} aria-label="Close modal">
                &times;
              </button>
            </div>

            <form className="profile-modal-form" onSubmit={handlePasswordSubmit}>
              <div className="profile-modal-body">
                {passwordError && (
                  <div className="form-error-banner">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{passwordError}</span>
                  </div>
                )}

                <div className="form-field">
                  <label className="form-lbl">Current Password *</label>
                  <input
                    type="password"
                    className="form-ctrl"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-lbl">New Password *</label>
                  <input
                    type="password"
                    className="form-ctrl"
                    placeholder="Minimum 8 characters"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-lbl">Confirm New Password *</label>
                  <input
                    type="password"
                    className="form-ctrl"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="profile-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={handleClosePasswordModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-save">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
