import React, { useState } from 'react';
import type { MissingUpdateAlert, AntibioticThresholdAlert, IrregularActivityAlert } from './types';
import './InspectorCompliance.css';

export const InspectorCompliance: React.FC = () => {
  const [selectedAlertId, setSelectedAlertId] = useState<string>('ab-01');

  // 1. Missing Daily Stock Updates Mock Data (Documented Automatic Inspector Notification)
  const missingUpdateAlerts: MissingUpdateAlert[] = [
    {
      id: 'ms-01',
      pharmacyName: 'Care Pharmacy & Surgical',
      licenseNumber: 'LIC-Z4-2024-014',
      location: 'Civil Lines, Zone 4',
      pharmacistName: 'Priya Sharma',
      pharmacistRegNo: 'REG-PH-9120',
      lastStockUpdate: 'Yesterday, 06:15 PM',
      hoursOverdue: 16,
      notificationStatus: 'Auto-Notified',
    },
    {
      id: 'ms-02',
      pharmacyName: 'National Medical Store',
      licenseNumber: 'LIC-Z4-2024-033',
      location: 'Green Park, Zone 4',
      pharmacistName: 'Sunita Patel',
      pharmacistRegNo: 'REG-PH-8201',
      lastStockUpdate: 'Yesterday, 07:00 PM',
      hoursOverdue: 15,
      notificationStatus: 'Auto-Notified',
    },
  ];

  // 2. Antibiotic Usage Alerts Mock Data (Using documented 100 units predetermined threshold)
  const antibioticThresholdAlerts: AntibioticThresholdAlert[] = [
    {
      id: 'ab-01',
      pharmacyName: 'Care Pharmacy & Surgical',
      medicineName: 'Amoxicillin 500mg Capsule',
      category: 'Schedule H1 Antibiotic',
      currentUsageUnits: 240,
      predeterminedThreshold: 100, // Documented 100 units threshold
      status: 'Threshold Exceeded',
      timestamp: 'Today, 09:40 AM',
    },
    {
      id: 'ab-02',
      pharmacyName: 'City Pharma Chemist',
      medicineName: 'Augmentin 625mg Duo Tablet',
      category: 'Schedule H1 Antibiotic',
      currentUsageUnits: 180,
      predeterminedThreshold: 100, // Documented 100 units threshold
      status: 'Threshold Exceeded',
      timestamp: 'Today, 10:00 AM',
    },
    {
      id: 'ab-03',
      pharmacyName: 'National Medical Store',
      medicineName: 'Azithromycin 500mg Tablet',
      category: 'Schedule H1 Antibiotic',
      currentUsageUnits: 95,
      predeterminedThreshold: 100, // Documented 100 units threshold
      status: 'Near Threshold',
      timestamp: 'Yesterday, 07:00 PM',
    },
  ];

  // 3. Irregular Activity Flags Mock Data
  const irregularActivityAlerts: IrregularActivityAlert[] = [
    {
      id: 'ir-01',
      pharmacyName: 'Care Pharmacy & Surgical',
      salesRecordTxnId: 'TXN-2024-9940',
      date: 'Today, 09:40 AM',
      medicineName: 'Amoxicillin 500mg Capsule',
      qtyDispensed: 120,
      patientId: 'PAT-4412',
      doctorRegNo: 'DOC-ND-8812',
      irregularActivityDescription: 'Bulk Dispensing Spike: Single prescription of 120 capsules dispensed, 4x above 24-hr average baseline.',
      status: 'Under Review',
    },
  ];

  return (
    <div className="inspector-compliance-view">
      {/* 1. Page Header */}
      <div className="compliance-page-header">
        <div>
          <h1 className="compliance-page-title">Alerts &amp; Compliance</h1>
          <p className="compliance-page-subtitle">
            Regulatory compliance alerts, missing daily stock declarations, antibiotic threshold breaches, and irregular sales monitoring for Zone 4.
          </p>
        </div>
        <div className="compliance-header-stats">
          <div className="header-stat-chip chip-danger">
            <span className="stat-value">6</span>
            <span className="stat-label">Active Alerts</span>
          </div>
          <div className="header-stat-chip chip-warning">
            <span className="stat-value">2</span>
            <span className="stat-label">Auto-Notified</span>
          </div>
          <div className="header-stat-chip">
            <span className="stat-value">100 Units</span>
            <span className="stat-label">Threshold Limit</span>
          </div>
        </div>
      </div>

      {/* 2. Alert Summary KPI Cards Row */}
      <div className="inspector-metrics-grid">
        <div className="inspector-metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Active Compliance Alerts</span>
            <span className="metric-status-tag status-danger">Requires Action</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value">6</span>
            <span className="metric-label">Zone 4 Total Active Flags</span>
          </div>
        </div>

        <div className="inspector-metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Missing Stock Updates</span>
            <span className="metric-status-tag status-warning">Auto-Notified</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value">2</span>
            <span className="metric-label">10:00 AM Cutoff Overdue</span>
          </div>
        </div>

        <div className="inspector-metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Antibiotic Threshold Alerts</span>
            <span className="metric-status-tag status-danger">100 Limit Exceeded</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value">3</span>
            <span className="metric-label">Schedule H1 Breaches</span>
          </div>
        </div>

        <div className="inspector-metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Irregular Activity Flags</span>
            <span className="metric-status-tag status-warning">Under Review</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value">1</span>
            <span className="metric-label">Unusual Volume Spike</span>
          </div>
        </div>
      </div>

      {/* 3. Section 1: Missing Daily Stock Updates (Automated Inspector Notification) */}
      <div className="inspector-card missing-updates-card">
        <div className="card-header table-header-flex">
          <div>
            <h2 className="card-title">Missing Daily Stock Updates (Automated Inspector Notifications)</h2>
            <span className="card-subtitle">
              Automated system notifications triggered when dispensaries fail to submit daily stock declarations before the 10:00 AM cutoff
            </span>
          </div>
          <span className="compliance-count-badge badge-warning-count">2 Pharmacies Overdue</span>
        </div>

        <div className="activity-table-container internal-scroll-container">
          <table className="activity-table inspector-table">
            <thead>
              <tr>
                <th>Pharmacy Name &amp; License</th>
                <th>Location</th>
                <th>Registered Pharmacist</th>
                <th>Last Stock Update</th>
                <th className="text-right">Hours Overdue</th>
                <th className="text-center">System Status</th>
              </tr>
            </thead>
            <tbody>
              {missingUpdateAlerts.map((item) => (
                <tr
                  key={item.id}
                  className={`alert-row ${selectedAlertId === item.id ? 'row-selected' : ''}`}
                  onClick={() => setSelectedAlertId(item.id)}
                >
                  <td>
                    <div className="flex-col">
                      <span className="font-semibold text-primary">{item.pharmacyName}</span>
                      <span className="cell-sub-id">{item.licenseNumber}</span>
                    </div>
                  </td>
                  <td className="color-secondary-text">{item.location}</td>
                  <td>
                    <div className="flex-col">
                      <span className="font-medium">{item.pharmacistName}</span>
                      <span className="cell-sub-id">{item.pharmacistRegNo}</span>
                    </div>
                  </td>
                  <td className="color-secondary-text">{item.lastStockUpdate}</td>
                  <td className="text-right font-bold text-danger">+{item.hoursOverdue} hrs overdue</td>
                  <td className="text-center">
                    <span className="status-badge status-pending-badge">{item.notificationStatus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Section 2: Antibiotic Usage Threshold Alerts (100 Units Baseline) */}
      <div className="inspector-card antibiotic-threshold-card">
        <div className="card-header table-header-flex">
          <div>
            <h2 className="card-title">Antibiotic Usage Threshold Alerts (100 Units Limit)</h2>
            <span className="card-subtitle">
              Monitoring Schedule H1 antibiotic dispensing against the predetermined 100 units daily threshold baseline
            </span>
          </div>
          <span className="compliance-count-badge badge-danger-count">3 Threshold Breaches</span>
        </div>

        <div className="activity-table-container internal-scroll-container">
          <table className="activity-table inspector-table">
            <thead>
              <tr>
                <th>Pharmacy Name</th>
                <th>Medicine Name</th>
                <th>Category</th>
                <th className="text-right">Current Usage</th>
                <th className="text-right">Predetermined Threshold</th>
                <th className="text-right">Timestamp</th>
                <th className="text-center">Threshold Status</th>
              </tr>
            </thead>
            <tbody>
              {antibioticThresholdAlerts.map((item) => (
                <tr
                  key={item.id}
                  className={`alert-row ${selectedAlertId === item.id ? 'row-selected' : ''}`}
                  onClick={() => setSelectedAlertId(item.id)}
                >
                  <td className="font-semibold text-primary">{item.pharmacyName}</td>
                  <td className="font-medium">{item.medicineName}</td>
                  <td>
                    <span className="category-pill cat-antibiotic">{item.category}</span>
                  </td>
                  <td className="text-right font-bold text-danger">{item.currentUsageUnits} units</td>
                  <td className="text-right font-medium color-secondary-text">{item.predeterminedThreshold} units</td>
                  <td className="text-right color-secondary-text">{item.timestamp}</td>
                  <td className="text-center">
                    <span
                      className={`status-badge ${
                        item.status === 'Threshold Exceeded' ? 'badge-critical' : 'status-pending-badge'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Section 3: Irregular Activity Monitoring */}
      <div className="inspector-card irregular-activity-card">
        <div className="card-header table-header-flex">
          <div>
            <h2 className="card-title">Irregular Activity Monitoring</h2>
            <span className="card-subtitle">
              Flagged sales transactions and dispensing pattern anomalies requiring regulatory verification
            </span>
          </div>
          <span className="compliance-count-badge">1 Flagged Spike</span>
        </div>

        <div className="activity-table-container internal-scroll-container">
          <table className="activity-table inspector-table">
            <thead>
              <tr>
                <th>Pharmacy Name</th>
                <th>Medicine &amp; Sales Record</th>
                <th>Date</th>
                <th>Irregular Activity Description</th>
                <th>Patient &amp; Doctor Reg</th>
                <th className="text-center">Regulatory Status</th>
              </tr>
            </thead>
            <tbody>
              {irregularActivityAlerts.map((item) => (
                <tr
                  key={item.id}
                  className={`alert-row ${selectedAlertId === item.id ? 'row-selected' : ''}`}
                  onClick={() => setSelectedAlertId(item.id)}
                >
                  <td className="font-semibold text-primary">{item.pharmacyName}</td>
                  <td>
                    <div className="flex-col">
                      <span className="font-medium">{item.medicineName}</span>
                      <span className="font-mono text-muted">{item.salesRecordTxnId} ({item.qtyDispensed} units)</span>
                    </div>
                  </td>
                  <td className="color-secondary-text">{item.date}</td>
                  <td className="font-medium text-warning">{item.irregularActivityDescription}</td>
                  <td>
                    <div className="flex-col">
                      <span className="cell-sub-id">Patient: {item.patientId}</span>
                      <span className="cell-sub-id">Doctor: {item.doctorRegNo}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="status-badge status-pending-badge">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
