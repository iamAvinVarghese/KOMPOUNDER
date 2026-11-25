import React from 'react';
import type { InspectorTab } from './types';

interface InspectorSidebarProps {
  activeTab: InspectorTab;
  onTabChange: (tab: InspectorTab) => void;
  onLogout: () => void;
  unreadAlertsCount?: number;
}

export const InspectorSidebar: React.FC<InspectorSidebarProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  unreadAlertsCount = 6,
}) => {
  const mainNavItems: { id: InspectorTab; label: string; iconSvg: React.ReactNode; badge?: number }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      iconSvg: (
        <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      id: 'pharmacies',
      label: 'Pharmacies',
      iconSvg: (
        <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M3 7v14M21 7v14M6 21V11m12 10V11M9 21v-4h6v4M4 7l8-4 8 4" />
        </svg>
      ),
    },
    {
      id: 'stock-monitoring',
      label: 'Stock Monitoring',
      iconSvg: (
        <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: 'sales',
      label: 'Sales & Dispensing',
      iconSvg: (
        <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      id: 'track-trace',
      label: 'Track & Trace',
      iconSvg: (
        <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      ),
    },
    {
      id: 'reports',
      label: 'Reports',
      iconSvg: (
        <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      ),
    },
    {
      id: 'compliance',
      label: 'Alerts & Compliance',
      badge: unreadAlertsCount,
      iconSvg: (
        <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: 'location',
      label: 'Location',
      iconSvg: (
        <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      ),
    },
  ];

  return (
    <div className="portal-sidebar-container">
      <aside className="portal-sidebar inspector-sidebar">
        <div className="sidebar-brand">
          <svg className="sidebar-brand-icon" viewBox="0 0 24 24">
            <path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-15z M10.5 4.5C10.5 3.67 11.17 3 12 3s1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-15z" />
          </svg>
          <div className="brand-text-block">
            <span className="sidebar-brand-name">KOMPOUNDER</span>
            <span className="sidebar-brand-tag">INSPECTOR PORTAL</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            {mainNavItems.map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                title={item.label}
                onClick={() => onTabChange(item.id)}
              >
                <span className="nav-icon">{item.iconSvg}</span>
                <span className="nav-text">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="badge-pill alert-badge">{item.badge}</span>
                )}
              </div>
            ))}
          </div>

          <div className="nav-footer">
            <div
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              title="Profile"
              onClick={() => onTabChange('profile')}
            >
              <span className="nav-icon">
                <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <span className="nav-text">Profile</span>
            </div>

            <div className="nav-item logout-btn" onClick={onLogout} title="Logout">
              <span className="nav-icon">
                <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </span>
              <span className="nav-text">Logout</span>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
};
