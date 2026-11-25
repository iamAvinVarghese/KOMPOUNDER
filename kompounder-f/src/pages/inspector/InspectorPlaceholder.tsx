import React from 'react';
import type { InspectorTab } from './types';

interface InspectorPlaceholderProps {
  activeTab: InspectorTab;
  onNavigateTab: (tab: InspectorTab) => void;
}

export const InspectorPlaceholder: React.FC<InspectorPlaceholderProps> = ({
  activeTab,
  onNavigateTab,
}) => {
  const getPlaceholderData = (tab: InspectorTab) => {
    switch (tab) {
      case 'pharmacies':
        return {
          title: 'Registered Pharmacy Directory',
          subtitle: 'Jurisdictional overview of all licensed retail & hospital pharmacies in Zone 4',
          badgeText: '42 Licensed Pharmacies',
          description:
            'Review active pharmacy registrations, licensed pharmacist credentials, premises addresses, and historical compliance records.',
        };
      case 'stock-monitoring':
        return {
          title: 'Stock Declaration & Threshold Monitoring',
          subtitle: 'Real-time inventory verification and daily stock submission status',
          badgeText: 'Daily Declarations Audit',
          description:
            'Monitor opening stock, additions, and current balance ratios for Schedule H1 antibiotics and double-lock narcotics across all zone pharmacies.',
        };
      case 'sales':
        return {
          title: 'Dispensing Audit Logs',
          subtitle: 'Prescription-linked transaction history and verification trails',
          badgeText: 'Prescription Verification Module',
          description:
            'Inspect prescription numbers, prescribing doctor identities, patient identifiers, and quantity limits for controlled medication sales.',
        };
      case 'track-trace':
        return {
          title: 'Medication Batch Track & Trace',
          subtitle: 'Supply chain movement and batch serialization verification',
          badgeText: 'Batch Audit Trail',
          description:
            'Trace batch manufacturing numbers, expiry schedules, wholesaler distribution channels, and retail pharmacy receipts.',
        };
      case 'reports':
        return {
          title: 'Regulatory Reports & Analytics',
          subtitle: 'Automated compliance summaries and inspection export tools',
          badgeText: 'Regulatory Intelligence',
          description:
            'Generate formal audit statements, threshold breach reports, and periodic regulatory compliance summaries for state authorities.',
        };
      case 'compliance':
        return {
          title: 'Alerts & Compliance Violations',
          subtitle: 'High-priority regulatory flags, missing updates, and threshold breaches',
          badgeText: 'Action Required',
          description:
            'Investigate flagged compliance violations, issue formal notices, and record inspector verification notes.',
        };
      case 'location':
        return {
          title: 'Pharmacy Geospatial Directory',
          subtitle: 'Map-based jurisdictional tracking and inspection route planning',
          badgeText: 'Zone 4 Spatial Directory',
          description:
            'Geographic distribution of pharmacies, compliance heatmaps, and field inspection scheduling tools.',
        };
      case 'profile':
        return {
          title: 'Inspector Profile & Security Settings',
          subtitle: 'Regulatory authorization credentials, digital signature, and security preferences',
          badgeText: 'Official Credentials',
          description:
            'Manage Drug Inspector registration credentials, security credentials, assigned zone jurisdiction, and audit signature keys.',
        };
      default:
        return {
          title: 'Regulatory Portal Section',
          subtitle: 'Compliance monitoring module',
          badgeText: 'System Active',
          description: 'Authorized access for regulatory monitoring and inspection verification.',
        };
    }
  };

  const info = getPlaceholderData(activeTab);

  return (
    <div className="inspector-placeholder-container">
      <div className="placeholder-card">
        <div className="placeholder-header">
          <div>
            <h2 className="placeholder-title">{info.title}</h2>
            <p className="placeholder-subtitle">{info.subtitle}</p>
          </div>
          <span className="placeholder-badge">{info.badgeText}</span>
        </div>

        <div className="placeholder-body">
          <p className="placeholder-desc">{info.description}</p>

          <div className="placeholder-status-box">
            <div className="status-box-header">
              <span className="status-indicator-dot"></span>
              <span className="status-box-title">Module Ready for Phase Integration</span>
            </div>
            <p className="status-box-text">
              The Inspector Portal foundation, layout, navigation, and state persistence are fully active. Detailed interactive workflows for <strong>{info.title}</strong> will be implemented in subsequent phases.
            </p>
          </div>

          <div className="placeholder-actions">
            <button className="btn-secondary-custom" onClick={() => onNavigateTab('dashboard')}>
              Return to Inspector Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
