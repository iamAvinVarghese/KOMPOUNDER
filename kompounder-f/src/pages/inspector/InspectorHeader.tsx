import React from 'react';
import type { InspectorTab, InspectorProfileData } from './types';
import { useTheme } from '../../hooks/useTheme';

interface InspectorHeaderProps {
  activeTab: InspectorTab;
  inspector: InspectorProfileData;
  onNavigateTab: (tab: InspectorTab) => void;
  unreadCount?: number;
}

export const InspectorHeader: React.FC<InspectorHeaderProps> = ({
  activeTab,
  inspector,
  onNavigateTab,
  unreadCount = 6,
}) => {
  const { theme, toggleTheme } = useTheme();

  const getPageTitle = (tab: InspectorTab): string => {
    switch (tab) {
      case 'dashboard':
        return 'Regulatory Dashboard';
      case 'pharmacies':
        return 'Pharmacy Registry & Compliance';
      case 'stock-monitoring':
        return 'Stock Declaration Monitoring';
      case 'sales':
        return 'Dispensing Audit Logs';
      case 'track-trace':
        return 'Batch Track & Trace';
      case 'reports':
        return 'Regulatory Reports & Analytics';
      case 'compliance':
        return 'Alerts & Compliance Violations';
      case 'location':
        return 'Pharmacy Geospatial Directory';
      case 'profile':
        return 'Inspector Profile & Security';
      default:
        return 'Regulatory Portal';
    }
  };

  return (
    <header className="portal-header inspector-header">
      <div className="header-left">
        <h1 className="header-title">{getPageTitle(activeTab)}</h1>
        <div className="security-tag">
          <span className="security-dot"></span>
          <span className="security-text">Authorized Regulatory Access</span>
        </div>
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

        <div
          className="header-btn notifications-trigger"
          aria-label="Alerts"
          onClick={() => onNavigateTab('compliance')}
          title="View Compliance Alerts"
          style={{ cursor: 'pointer' }}
        >
          <svg
            className="notification-icon-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ width: '20px', height: '20px', color: 'var(--color-text-secondary)' }}
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && <span className="notification-dot"></span>}
        </div>

        <div className="header-divider"></div>

        <div
          className="user-profile-widget inspector-profile-widget"
          onClick={() => onNavigateTab('profile')}
          style={{ cursor: 'pointer' }}
          title="View Inspector Profile"
        >
          <div className="user-info">
            <span className="user-name">{inspector.name}</span>
            <span className="user-role">{inspector.role} • {inspector.jurisdictionZone}</span>
          </div>
          <div className="user-avatar inspector-avatar">{inspector.avatarInitials}</div>
        </div>
      </div>
    </header>
  );
};
