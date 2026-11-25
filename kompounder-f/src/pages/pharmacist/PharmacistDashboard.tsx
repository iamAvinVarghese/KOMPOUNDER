import { useState, useRef, useEffect } from 'react';
import './PharmacistDashboard.css';
import PharmacistInventory from './PharmacistInventory';
import PharmacistSales from './PharmacistSales';
import PharmacistReports from './PharmacistReports';
import PharmacistNotifications from './PharmacistNotifications';
import PharmacistProfile from './PharmacistProfile';
import { useTheme } from '../../hooks/useTheme';

interface PharmacistDashboardProps {
  onNavigate: (view: 'landing' | 'login' | 'register' | 'pharmacist-dashboard' | 'inspector-dashboard') => void;
}

type PharmacistTab = 'dashboard' | 'inventory' | 'sales' | 'reports' | 'notifications' | 'profile';

export default function PharmacistDashboard({ onNavigate }: PharmacistDashboardProps) {
  const [activeTab, setActiveTabState] = useState<PharmacistTab>(() => {
    const saved = localStorage.getItem('kompounder_active_pharmacist_tab') as PharmacistTab;
    const validTabs: PharmacistTab[] = ['dashboard', 'inventory', 'sales', 'reports', 'notifications', 'profile'];
    return validTabs.includes(saved) ? saved : 'dashboard';
  });

  const { theme, toggleTheme } = useTheme();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileModalRequest, setProfileModalRequest] = useState<'edit' | 'password' | null>(null);
  const [profileData, setProfileData] = useState<{ fullName: string; role: string; avatarUrl?: string }>(() => {
    try {
      const saved = localStorage.getItem('kompounder_pharmacist_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          fullName: parsed.fullName || 'Rajesh Kumar',
          role: 'Registered Pharmacist',
          avatarUrl: parsed.avatarUrl,
        };
      }
    } catch {}
    return { fullName: 'Rajesh Kumar', role: 'Registered Pharmacist' };
  });

  useEffect(() => {
    const handleProfileUpdate = () => {
      try {
        const saved = localStorage.getItem('kompounder_pharmacist_profile');
        if (saved) {
          const parsed = JSON.parse(saved);
          setProfileData({
            fullName: parsed.fullName || 'Rajesh Kumar',
            role: 'Registered Pharmacist',
            avatarUrl: parsed.avatarUrl,
          });
        }
      } catch {}
    };
    window.addEventListener('kompounder_profile_updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);
    return () => {
      window.removeEventListener('kompounder_profile_updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const handleWindowClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProfileMenuOpen(false);
      }
    };

    window.addEventListener('click', handleWindowClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  const setActiveTab = (tab: PharmacistTab) => {
    setActiveTabState(tab);
    try {
      localStorage.setItem('kompounder_active_pharmacist_tab', tab);
    } catch (e) {
      // Storage fallback
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('kompounder_active_pharmacist_tab');
    } catch (e) {
      // Storage fallback
    }
    onNavigate('landing');
  };

  const [unreadCount, setUnreadCount] = useState<number>(3);

  const [trendFilter, setTrendFilter] = useState<'All' | 'Antibiotic' | 'Narcotic'>('All');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Mock Data
  const summaryMetrics = [
    { title: 'Total Stock', value: '14,820', label: '182 registered SKUs', trend: '+2.4% vs last month', color: 'var(--color-primary)' },
    { title: "Today's Dispensed", value: '284', label: '18 prescriptions processed', trend: 'Normal volume', color: 'var(--color-secondary)' },
    { title: 'Antibiotics', value: '4,210', label: 'Schedule H1 restricted', trend: '3 active alerts', color: 'var(--color-warning)' },
    { title: 'Narcotic Drugs', value: '312', label: 'Double lock custody', trend: '100% audit verified', color: 'var(--color-danger)' },
  ];

  const todayActivity = [
    { name: 'Amoxicillin 500mg', category: 'Antibiotic (Schedule H1)', opening: 1200, dispensed: 80, balance: 1120, status: 'In Stock' },
    { name: 'Fentanyl 50mcg Patch', category: 'Narcotic (Secure)', opening: 45, dispensed: 5, balance: 40, status: 'Secure' },
    { name: 'Azithromycin 250mg', category: 'Antibiotic (Schedule H1)', opening: 600, dispensed: 45, balance: 555, status: 'In Stock' },
    { name: 'Morphine Sulfate 15mg', category: 'Narcotic (Secure)', opening: 85, dispensed: 12, balance: 73, status: 'Low Stock' },
    { name: 'Ciprofloxacin 500mg', category: 'Antibiotic (Schedule H1)', opening: 800, dispensed: 60, balance: 740, status: 'In Stock' },
  ];

  const alerts = [
    { level: 'Critical', badgeClass: 'badge-critical', title: 'Low Stock Limit Exceeded', message: 'Fentanyl 50mcg Patch balance is 40 units (Minimum threshold: 50).' },
    { level: 'Warning', badgeClass: 'badge-warning', title: 'Expiring Batch Alert', message: 'Morphine Sulfate 15mg batch #MSP-902 expires in 12 days.' },
    { level: 'Warning', badgeClass: 'badge-warning', title: 'Daily Declaration Pending', message: 'Daily Stock Submission has not been filed yet for Dr. A. K. Sharma.' },
    { level: 'Normal', badgeClass: 'badge-normal', title: 'Audit Verification Clear', message: 'Opioid double-lock release log verified with 100% prescription match.' },
  ];

  // Trend Chart Datasets (Mon - Sun)
  const chartDatasets = {
    All: [
      { day: 'Mon', value: 140, x: 30, y: 80 },
      { day: 'Tue', value: 165, x: 90, y: 65 },
      { day: 'Wed', value: 150, x: 150, y: 75 },
      { day: 'Thu', value: 185, x: 210, y: 50 },
      { day: 'Fri', value: 210, x: 270, y: 35 },
      { day: 'Sat', value: 240, x: 330, y: 20 },
      { day: 'Sun', value: 195, x: 390, y: 45 },
    ],
    Antibiotic: [
      { day: 'Mon', value: 75, x: 30, y: 110 },
      { day: 'Tue', value: 90, x: 90, y: 100 },
      { day: 'Wed', value: 85, x: 150, y: 105 },
      { day: 'Thu', value: 110, x: 210, y: 88 },
      { day: 'Fri', value: 130, x: 270, y: 72 },
      { day: 'Sat', value: 145, x: 330, y: 62 },
      { day: 'Sun', value: 115, x: 390, y: 82 },
    ],
    Narcotic: [
      { day: 'Mon', value: 12, x: 30, y: 138 },
      { day: 'Tue', value: 16, x: 90, y: 134 },
      { day: 'Wed', value: 14, x: 150, y: 136 },
      { day: 'Thu', value: 22, x: 210, y: 128 },
      { day: 'Fri', value: 18, x: 270, y: 132 },
      { day: 'Sat', value: 25, x: 330, y: 124 },
      { day: 'Sun', value: 15, x: 390, y: 135 },
    ],
  };

  const currentDataset = chartDatasets[trendFilter];

  // Generate smooth cubic bezier SVG path string
  const generatePath = (points: { x: number; y: number }[]) => {
    return points.reduce((acc, point, idx) => {
      if (idx === 0) return `M ${point.x} ${point.y}`;
      const prev = points[idx - 1];
      const cx = (prev.x + point.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
    }, '');
  };

  const linePath = generatePath(currentDataset);
  const areaPath = `${linePath} L 390 140 L 30 140 Z`;

  return (
    <div className="portal-container">
      {/* Sidebar Section */}
      <div className="portal-sidebar-container">
        <aside className="portal-sidebar">
          <div className="sidebar-brand">
            <svg className="sidebar-brand-icon" viewBox="0 0 24 24">
              <path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-15z M10.5 4.5C10.5 3.67 11.17 3 12 3s1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-15z" />
            </svg>
            <span className="sidebar-brand-name">KOMPOUNDER</span>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} title="Dashboard" onClick={() => setActiveTab('dashboard')}>
                <span className="nav-icon">
                  <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="9" rx="1"/>
                    <rect x="14" y="3" width="7" height="5" rx="1"/>
                    <rect x="14" y="12" width="7" height="9" rx="1"/>
                    <rect x="3" y="16" width="7" height="5" rx="1"/>
                  </svg>
                </span>
                <span className="nav-text">Dashboard</span>
              </div>
              
              <div className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`} title="Inventory" onClick={() => setActiveTab('inventory')}>
                <span className="nav-icon">
                  <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </span>
                <span className="nav-text">Inventory</span>
              </div>

              <div className={`nav-item ${activeTab === 'sales' ? 'active' : ''}`} title="Sales &amp; Dispensing" onClick={() => setActiveTab('sales')}>
                <span className="nav-icon">
                  <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </span>
                <span className="nav-text">Sales &amp; Dispensing</span>
              </div>

              <div className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} title="Reports" onClick={() => setActiveTab('reports')}>
                <span className="nav-icon">
                  <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                  </svg>
                </span>
                <span className="nav-text">Reports</span>
              </div>

              <div className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`} title="Notifications" onClick={() => setActiveTab('notifications')}>
                <span className="nav-icon">
                  <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </span>
                <span className="nav-text">Notifications</span>
                {unreadCount > 0 && <span className="badge-pill">{unreadCount}</span>}
              </div>
            </div>

            <div className="nav-footer">
              <div
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                title="Profile"
                onClick={() => {
                  setActiveTab('profile');
                  setProfileModalRequest(null);
                }}
              >
                <span className="nav-icon">
                  <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <span className="nav-text">Profile</span>
              </div>
              <div className="nav-item logout-btn" onClick={handleLogout} title="Logout">
                <span className="nav-icon">
                  <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                  </svg>
                </span>
                <span className="nav-text">Logout</span>
              </div>
            </div>
          </nav>
        </aside>
      </div>

      {/* Main Workspace layout wrapper */}
      <div className="portal-workspace">
        {/* Top Header Section */}
        <header className="portal-header">
          <div className="header-left">
            <h1 className="header-title">
              {activeTab === 'dashboard'
                ? 'Dashboard'
                : activeTab === 'inventory'
                ? 'Inventory'
                : activeTab === 'sales'
                ? 'Sales & Dispensing'
                : activeTab === 'reports'
                ? 'Reports'
                : activeTab === 'notifications'
                ? 'Notifications'
                : 'Profile'}
            </h1>
          </div>

          <div className="header-right">
            {/* Day / Night Toggle */}
            <button
              type="button"
              className="header-btn theme-toggle-btn"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              aria-label="Toggle Day and Night Mode"
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#fbbf24' }}>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-text-secondary)' }}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <div className="header-btn notifications-trigger" aria-label="Alerts" onClick={() => setActiveTab('notifications')} style={{ cursor: 'pointer' }}>
              <svg className="notification-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px', color: 'var(--color-text-secondary)' }}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {unreadCount > 0 && <span className="notification-dot"></span>}
            </div>
            <div className="header-divider"></div>
            <div className="user-profile-menu-container" ref={profileMenuRef}>
              <div
                className={`user-profile-widget ${isProfileMenuOpen ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileMenuOpen(prev => !prev);
                }}
                style={{ cursor: 'pointer' }}
                title="Account Menu"
              >
                <div className="user-info">
                  <span className="user-name">{profileData.fullName}</span>
                  <span className="user-role">{profileData.role}</span>
                </div>
                <div className="user-avatar">
                  {profileData.avatarUrl ? (
                    <img src={profileData.avatarUrl} alt={profileData.fullName} className="user-avatar-img" />
                  ) : (
                    'RK'
                  )}
                </div>
                <svg
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`menu-chevron-icon ${isProfileMenuOpen ? 'open' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {isProfileMenuOpen && (
                <div 
                  className="user-profile-dropdown animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="dropdown-user-header">
                    <div className="dropdown-header-top-row">
                      <div className="dropdown-user-main">
                        <div className="dropdown-header-avatar">
                          {profileData.avatarUrl ? (
                            <img src={profileData.avatarUrl} alt={profileData.fullName} className="user-avatar-img" />
                          ) : (
                            'RK'
                          )}
                        </div>
                        <div className="dropdown-user-meta">
                          <h4 className="dropdown-user-name">{profileData.fullName}</h4>
                          <p className="dropdown-user-role">{profileData.role}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="dropdown-close-btn"
                        onClick={() => setIsProfileMenuOpen(false)}
                        title="Close Menu"
                        aria-label="Close Account Menu"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                    <p className="dropdown-user-email">rajesh.kumar@aptivoracare.com</p>
                  </div>

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setActiveTab('profile');
                      setProfileModalRequest(null);
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    View Full Profile
                  </button>

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setActiveTab('profile');
                      setProfileModalRequest('edit');
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Profile Details
                  </button>

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setActiveTab('profile');
                      setProfileModalRequest('password');
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Change Password
                  </button>

                  <button
                    type="button"
                    className="dropdown-item danger"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Work area */}
        <main className="dashboard-content">
          {activeTab === 'dashboard' ? (
            <>
              {/* 1. Summary Cards */}
              <div className="metrics-grid">
                {summaryMetrics.map((metric, idx) => (
                  <div key={idx} className="metric-card">
                    <div className="metric-card-top">
                      <span className="metric-title">{metric.title}</span>
                      <span className="metric-trend-tag">{metric.trend}</span>
                    </div>
                    <div className="metric-card-body">
                      <span className="metric-value">{metric.value}</span>
                      <span className="metric-label">{metric.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Stock Health Overview Bar */}
              <div className="stock-health-card">
                <div className="stock-health-header">
                  <div>
                    <h2 className="card-title">Stock Health &amp; Inventory Status</h2>
                    <span className="card-subtitle">Distribution of 182 registered items across threshold health classifications</span>
                  </div>
                  <span className="health-total-badge">182 Items Total</span>
                </div>

                <div className="progress-track-container">
                  <div className="progress-segmented-bar">
                    <div className="segment seg-healthy" style={{ width: '90.1%' }} title="Healthy Stock: 164 items"></div>
                    <div className="segment seg-low" style={{ width: '7.7%' }} title="Low Stock: 14 items"></div>
                    <div className="segment seg-critical" style={{ width: '2.2%' }} title="Critical Stock: 4 items"></div>
                  </div>
                </div>

                <div className="health-stats-row">
                  <div className="stat-chip">
                    <span className="dot dot-healthy"></span>
                    <span className="stat-name">Healthy Stock:</span>
                    <span className="stat-count font-bold">164 items</span>
                    <span className="stat-pct">(90.1%)</span>
                  </div>
                  <div className="stat-chip">
                    <span className="dot dot-low"></span>
                    <span className="stat-name">Low Stock:</span>
                    <span className="stat-count font-bold text-warning">14 items</span>
                    <span className="stat-pct">(7.7%)</span>
                  </div>
                  <div className="stat-chip">
                    <span className="dot dot-critical"></span>
                    <span className="stat-name">Critical Threshold:</span>
                    <span className="stat-count font-bold text-danger">4 items</span>
                    <span className="stat-pct">(2.2%)</span>
                  </div>
                </div>
              </div>

              {/* 3. Primary Main Content: Activity Table */}
              <div className="activity-layout-card">
                <div className="card-header">
                  <h2 className="card-title">Recent Stock &amp; Dispensing Activity</h2>
                  <span className="card-subtitle">Today's transactions and balance values</span>
                </div>
                <div className="activity-table-container">
                  <table className="activity-table">
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Category</th>
                        <th className="text-right">Opening Stock</th>
                        <th className="text-right">Dispensed</th>
                        <th className="text-right">Current Balance</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayActivity.map((row, idx) => (
                        <tr key={idx}>
                          <td className="font-semibold">{row.name}</td>
                          <td className="color-secondary-text">{row.category}</td>
                          <td className="text-right">{row.opening}</td>
                          <td className="text-right font-medium text-warning">{row.dispensed}</td>
                          <td className="text-right font-semibold">{row.balance}</td>
                          <td className="text-center">
                            <span className={`status-badge ${row.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. Analytics & Compliance Grid */}
              <div className="secondary-grid">
                {/* Weekly Dispensing Trends Chart */}
                <div className="chart-card">
                  <div className="card-header chart-header-row">
                    <div>
                      <h2 className="card-title">Weekly Dispensing Trends</h2>
                      <span className="card-subtitle">Units dispensed over last 7 days</span>
                    </div>

                    <div className="trend-filter-pills">
                      {(['All', 'Antibiotic', 'Narcotic'] as const).map(cat => (
                        <button
                          key={cat}
                          className={`pill-btn ${trendFilter === cat ? 'active' : ''}`}
                          onClick={() => setTrendFilter(cat)}
                        >
                          {cat === 'All' ? 'All Medicines' : cat === 'Antibiotic' ? 'Antibiotics' : 'Narcotic Drugs'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="chart-wrapper">
                    <div className="svg-chart-container">
                      <svg className="svg-trend-chart" viewBox="0 0 420 160">
                        {/* Y-Axis Grid Lines & Tick Labels */}
                        <line x1="30" y1="20" x2="410" y2="20" stroke="var(--color-border)" strokeDasharray="3 3" />
                        <text x="22" y="24" className="axis-tick-text" textAnchor="end">250</text>

                        <line x1="30" y1="50" x2="410" y2="50" stroke="var(--color-border)" strokeDasharray="3 3" />
                        <text x="22" y="54" className="axis-tick-text" textAnchor="end">200</text>

                        <line x1="30" y1="80" x2="410" y2="80" stroke="var(--color-border)" strokeDasharray="3 3" />
                        <text x="22" y="84" className="axis-tick-text" textAnchor="end">150</text>

                        <line x1="30" y1="110" x2="410" y2="110" stroke="var(--color-border)" strokeDasharray="3 3" />
                        <text x="22" y="114" className="axis-tick-text" textAnchor="end">100</text>

                        <line x1="30" y1="140" x2="410" y2="140" stroke="var(--color-border)" />
                        <text x="22" y="144" className="axis-tick-text" textAnchor="end">0</text>

                        {/* Area Fill */}
                        <path d={areaPath} fill="url(#trend-area-gradient)" opacity="0.12" />

                        {/* Trend Curve Line */}
                        <path d={linePath} fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" />

                        {/* Gradient Definition */}
                        <defs>
                          <linearGradient id="trend-area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--color-secondary)" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>

                        {/* Interactive Data Points */}
                        {currentDataset.map((pt, idx) => (
                          <g key={idx} onMouseEnter={() => setHoveredPointIndex(idx)} onMouseLeave={() => setHoveredPointIndex(null)}>
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={hoveredPointIndex === idx ? '6' : '4'}
                              fill="var(--color-secondary)"
                              stroke="#ffffff"
                              strokeWidth="2"
                              style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                            />
                            {hoveredPointIndex === idx && (
                              <g>
                                <rect
                                  x={pt.x - 30}
                                  y={pt.y - 32}
                                  width="60"
                                  height="22"
                                  rx="4"
                                  fill="var(--color-primary-dark)"
                                />
                                <text
                                  x={pt.x}
                                  y={pt.y - 18}
                                  fill="#ffffff"
                                  fontSize="10"
                                  fontWeight="bold"
                                  textAnchor="middle"
                                >
                                  {pt.value} units
                                </text>
                              </g>
                            )}
                          </g>
                        ))}
                      </svg>

                      {/* X-Axis Day Labels */}
                      <div className="chart-labels">
                        {currentDataset.map((pt, idx) => (
                          <span key={idx} className="x-label-text">{pt.day}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance & Operations Alerts Panel */}
                <div className="alerts-card">
                  <div className="card-header">
                    <h2 className="card-title">Compliance &amp; Alerts</h2>
                    <span className="card-subtitle">Active regulatory &amp; operational notifications</span>
                  </div>

                  <div className="alerts-list">
                    {alerts.map((alert, idx) => (
                      <div key={idx} className={`alert-clinical-box border-${alert.level.toLowerCase()}`}>
                        <div className="alert-top-line">
                          <span className="alert-item-title">{alert.title}</span>
                          <span className={`status-badge ${alert.badgeClass}`}>{alert.level}</span>
                        </div>
                        <p className="alert-item-msg">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === 'inventory' ? (
            <PharmacistInventory />
          ) : activeTab === 'sales' ? (
            <PharmacistSales />
          ) : activeTab === 'reports' ? (
            <PharmacistReports />
          ) : activeTab === 'notifications' ? (
            <PharmacistNotifications
              onNavigateTab={tab => setActiveTab(tab)}
              onUnreadCountChange={count => setUnreadCount(count)}
            />
          ) : (
            <PharmacistProfile
              initialModal={profileModalRequest}
              onModalClosed={() => setProfileModalRequest(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
