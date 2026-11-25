import React, { useState } from 'react';
import type { InspectorTab, InspectorProfileData } from './types';
import { InspectorSidebar } from './InspectorSidebar';
import { InspectorHeader } from './InspectorHeader';
import { InspectorDashboardView } from './InspectorDashboardView';
import { InspectorPharmacies } from './InspectorPharmacies';
import { InspectorStockMonitoring } from './InspectorStockMonitoring';
import { InspectorSalesDispensing } from './InspectorSalesDispensing';
import { InspectorTrackTrace } from './InspectorTrackTrace';
import { InspectorReports } from './InspectorReports';
import { InspectorCompliance } from './InspectorCompliance';
import { InspectorLocation } from './InspectorLocation';
import { InspectorProfile } from './InspectorProfile';
import { InspectorPlaceholder } from './InspectorPlaceholder';
import './InspectorDashboard.css';

interface InspectorDashboardProps {
  onNavigate: (view: 'landing' | 'login' | 'register' | 'pharmacist-dashboard' | 'inspector-dashboard') => void;
}

export const InspectorDashboard: React.FC<InspectorDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTabState] = useState<InspectorTab>(() => {
    const saved = localStorage.getItem('kompounder_active_inspector_tab') as InspectorTab;
    const validTabs: InspectorTab[] = [
      'dashboard',
      'pharmacies',
      'stock-monitoring',
      'sales',
      'track-trace',
      'reports',
      'compliance',
      'location',
      'profile',
    ];
    return validTabs.includes(saved) ? saved : 'dashboard';
  });

  const setActiveTab = (tab: InspectorTab) => {
    setActiveTabState(tab);
    try {
      localStorage.setItem('kompounder_active_inspector_tab', tab);
    } catch (e) {
      // Storage fallback
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('kompounder_active_inspector_tab');
    } catch (e) {
      // Storage fallback
    }
    onNavigate('landing');
  };

  const inspectorProfile: InspectorProfileData = {
    id: 'insp-04',
    name: 'Dr. A. K. Sharma',
    role: 'Drug Inspector',
    badgeNumber: 'DI-REG-2024-88',
    jurisdictionZone: 'Zone 4',
    avatarInitials: 'AS',
    email: 'ak.sharma@drugscontrol.gov.in',
    phone: '+91 98765 43210',
  };

  return (
    <div className="portal-container inspector-portal-container">
      <InspectorSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        unreadAlertsCount={6}
      />

      <div className="portal-workspace">
        <InspectorHeader
          activeTab={activeTab}
          inspector={inspectorProfile}
          onNavigateTab={setActiveTab}
          unreadCount={6}
        />

        <main className="dashboard-content inspector-dashboard-content">
          {activeTab === 'dashboard' ? (
            <InspectorDashboardView />
          ) : activeTab === 'pharmacies' ? (
            <InspectorPharmacies />
          ) : activeTab === 'stock-monitoring' ? (
            <InspectorStockMonitoring />
          ) : activeTab === 'sales' ? (
            <InspectorSalesDispensing />
          ) : activeTab === 'track-trace' ? (
            <InspectorTrackTrace />
          ) : activeTab === 'reports' ? (
            <InspectorReports />
          ) : activeTab === 'compliance' ? (
            <InspectorCompliance />
          ) : activeTab === 'location' ? (
            <InspectorLocation />
          ) : activeTab === 'profile' ? (
            <InspectorProfile />
          ) : (
            <InspectorPlaceholder activeTab={activeTab} onNavigateTab={setActiveTab} />
          )}
        </main>
      </div>
    </div>
  );
};

export default InspectorDashboard;
