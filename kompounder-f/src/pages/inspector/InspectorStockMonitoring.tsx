import React, { useState, useMemo } from 'react';
import type { MonitoredPharmacyStockRecord } from './types';
import './InspectorStockMonitoring.css';

export const InspectorStockMonitoring: React.FC = () => {
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string>('ph-02');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Antibiotics' | 'Narcotics' | 'Warnings'>('All');

  // Presentation-ready mock stock records for Zone 4 pharmacies
  const pharmacyStockRecords: MonitoredPharmacyStockRecord[] = [
    {
      pharmacyId: 'ph-01',
      pharmacyName: 'Apex Medicos & Healthcare',
      licenseNumber: 'LIC-Z4-2024-001',
      zoneLocation: 'Sector 14, Zone 4',
      pharmacistName: 'Rajesh Kumar',
      pharmacistRegNo: 'REG-PH-8841',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 09:30 AM',
      filingComplianceScore: '98.5%',
      totalAntibioticUnits: 1840,
      totalNarcoticUnits: 120,
      hasLowStockAlert: false,
      stockItems: [
        { id: 'stk-101', medicineName: 'Amoxicillin 500mg Capsule', batchNumber: 'AMX-2024-08', category: 'Schedule H1 Antibiotic', currentStock: 850, minThreshold: 200, unit: 'Capsules', lastFiledTime: 'Today, 09:30 AM', todaySubmitted: true, complianceStatus: 'Normal' },
        { id: 'stk-102', medicineName: 'Azithromycin 250mg Tablet', batchNumber: 'AZI-2024-12', category: 'Schedule H1 Antibiotic', currentStock: 620, minThreshold: 150, unit: 'Tablets', lastFiledTime: 'Today, 09:30 AM', todaySubmitted: true, complianceStatus: 'Normal' },
        { id: 'stk-103', medicineName: 'Ciprofloxacin 500mg Tablet', batchNumber: 'CIP-2024-03', category: 'Schedule H1 Antibiotic', currentStock: 370, minThreshold: 100, unit: 'Tablets', lastFiledTime: 'Today, 09:30 AM', todaySubmitted: true, complianceStatus: 'Normal' },
        { id: 'stk-104', medicineName: 'Morphine Sulphate 10mg Injection', batchNumber: 'MRP-2024-01', category: 'Narcotic / Double-Lock', currentStock: 80, minThreshold: 30, unit: 'Ampoules', lastFiledTime: 'Today, 09:30 AM', todaySubmitted: true, complianceStatus: 'Normal' },
        { id: 'stk-105', medicineName: 'Pethidine Hydrochloride 50mg Injection', batchNumber: 'PTH-2024-05', category: 'Narcotic / Double-Lock', currentStock: 40, minThreshold: 20, unit: 'Ampoules', lastFiledTime: 'Today, 09:30 AM', todaySubmitted: true, complianceStatus: 'Normal' },
      ],
    },
    {
      pharmacyId: 'ph-02',
      pharmacyName: 'Care Pharmacy & Surgical',
      licenseNumber: 'LIC-Z4-2024-014',
      zoneLocation: 'Civil Lines, Zone 4',
      pharmacistName: 'Priya Sharma',
      pharmacistRegNo: 'REG-PH-9120',
      todaySubmitted: false,
      lastUpdatedTime: 'Yesterday, 06:15 PM',
      filingComplianceScore: '84.0%',
      totalAntibioticUnits: 2150,
      totalNarcoticUnits: 40,
      hasLowStockAlert: true,
      stockItems: [
        { id: 'stk-201', medicineName: 'Fentanyl 50mcg Transdermal Patch', batchNumber: 'FNT-2024-11', category: 'Narcotic / Double-Lock', currentStock: 15, minThreshold: 50, unit: 'Patches', lastFiledTime: 'Yesterday, 06:15 PM', todaySubmitted: false, complianceStatus: 'Critical Threshold' },
        { id: 'stk-202', medicineName: 'Augmentin 625mg Duo Tablet', batchNumber: 'AUG-2024-19', category: 'Schedule H1 Antibiotic', currentStock: 140, minThreshold: 200, unit: 'Tablets', lastFiledTime: 'Yesterday, 06:15 PM', todaySubmitted: false, complianceStatus: 'Low Stock Warning' },
        { id: 'stk-203', medicineName: 'Levofloxacin 500mg Tablet', batchNumber: 'LVF-2024-07', category: 'Schedule H1 Antibiotic', currentStock: 980, minThreshold: 200, unit: 'Tablets', lastFiledTime: 'Yesterday, 06:15 PM', todaySubmitted: false, complianceStatus: 'Normal' },
        { id: 'stk-204', medicineName: 'Doxycycline 100mg Capsule', batchNumber: 'DOX-2024-04', category: 'Schedule H1 Antibiotic', currentStock: 1030, minThreshold: 300, unit: 'Capsules', lastFiledTime: 'Yesterday, 06:15 PM', todaySubmitted: false, complianceStatus: 'Normal' },
        { id: 'stk-205', medicineName: 'Methadone 5mg Tablet', batchNumber: 'MTD-2024-02', category: 'Narcotic / Double-Lock', currentStock: 25, minThreshold: 20, unit: 'Tablets', lastFiledTime: 'Yesterday, 06:15 PM', todaySubmitted: false, complianceStatus: 'Normal' },
      ],
    },
    {
      pharmacyId: 'ph-03',
      pharmacyName: 'City Pharma Chemist',
      licenseNumber: 'LIC-Z4-2023-089',
      zoneLocation: 'Main Market, Zone 4',
      pharmacistName: 'Amit Varma',
      pharmacistRegNo: 'REG-PH-7432',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 10:15 AM',
      filingComplianceScore: '91.2%',
      totalAntibioticUnits: 3400,
      totalNarcoticUnits: 85,
      hasLowStockAlert: false,
      stockItems: [
        { id: 'stk-301', medicineName: 'Cefixime 200mg Tablet', batchNumber: 'CFX-2024-09', category: 'Schedule H1 Antibiotic', currentStock: 1450, minThreshold: 300, unit: 'Tablets', lastFiledTime: 'Today, 10:15 AM', todaySubmitted: true, complianceStatus: 'Normal' },
        { id: 'stk-302', medicineName: 'Clarithromycin 500mg Tablet', batchNumber: 'CLR-2024-05', category: 'Schedule H1 Antibiotic', currentStock: 1100, minThreshold: 250, unit: 'Tablets', lastFiledTime: 'Today, 10:15 AM', todaySubmitted: true, complianceStatus: 'Normal' },
        { id: 'stk-303', medicineName: 'Ofloxacin 400mg Tablet', batchNumber: 'OFL-2024-14', category: 'Schedule H1 Antibiotic', currentStock: 850, minThreshold: 200, unit: 'Tablets', lastFiledTime: 'Today, 10:15 AM', todaySubmitted: true, complianceStatus: 'Normal' },
        { id: 'stk-304', medicineName: 'Fentanyl 25mcg Transdermal Patch', batchNumber: 'FNT-2024-08', category: 'Narcotic / Double-Lock', currentStock: 85, minThreshold: 30, unit: 'Patches', lastFiledTime: 'Today, 10:15 AM', todaySubmitted: true, complianceStatus: 'Normal' },
      ],
    },
    {
      pharmacyId: 'ph-04',
      pharmacyName: 'Metro Chemist & Druggist',
      licenseNumber: 'LIC-Z4-2023-045',
      zoneLocation: 'Station Road, Zone 4',
      pharmacistName: 'Sanjay Gupta',
      pharmacistRegNo: 'REG-PH-6510',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 08:45 AM',
      filingComplianceScore: '100.0%',
      totalAntibioticUnits: 4100,
      totalNarcoticUnits: 210,
      hasLowStockAlert: false,
      stockItems: [
        { id: 'stk-401', medicineName: 'Amoxicillin + Clavulanate 625mg', batchNumber: 'AMC-2024-22', category: 'Schedule H1 Antibiotic', currentStock: 1800, minThreshold: 400, unit: 'Tablets', lastFiledTime: 'Today, 08:45 AM', todaySubmitted: true, complianceStatus: 'Normal' },
        { id: 'stk-402', medicineName: 'Meropenem 1g Injection', batchNumber: 'MRP-2024-10', category: 'Schedule H1 Antibiotic', currentStock: 420, minThreshold: 100, unit: 'Vials', lastFiledTime: 'Today, 08:45 AM', todaySubmitted: true, complianceStatus: 'Normal' },
        { id: 'stk-403', medicineName: 'Morphine Sulphate 30mg SR Tablet', batchNumber: 'MSR-2024-06', category: 'Narcotic / Double-Lock', currentStock: 140, minThreshold: 40, unit: 'Tablets', lastFiledTime: 'Today, 08:45 AM', todaySubmitted: true, complianceStatus: 'Normal' },
        { id: 'stk-404', medicineName: 'Buprenorphine 2mg Sublingual Tablet', batchNumber: 'BUP-2024-03', category: 'Narcotic / Double-Lock', currentStock: 70, minThreshold: 20, unit: 'Tablets', lastFiledTime: 'Today, 08:45 AM', todaySubmitted: true, complianceStatus: 'Normal' },
      ],
    },
    {
      pharmacyId: 'ph-05',
      pharmacyName: 'National Medical Store',
      licenseNumber: 'LIC-Z4-2024-033',
      zoneLocation: 'Green Park, Zone 4',
      pharmacistName: 'Sunita Patel',
      pharmacistRegNo: 'REG-PH-8201',
      todaySubmitted: false,
      lastUpdatedTime: 'Yesterday, 07:00 PM',
      filingComplianceScore: '86.5%',
      totalAntibioticUnits: 1280,
      totalNarcoticUnits: 60,
      hasLowStockAlert: true,
      stockItems: [
        { id: 'stk-501', medicineName: 'Azithromycin 500mg Tablet', batchNumber: 'AZT-2024-04', category: 'Schedule H1 Antibiotic', currentStock: 180, minThreshold: 250, unit: 'Tablets', lastFiledTime: 'Yesterday, 07:00 PM', todaySubmitted: false, complianceStatus: 'Low Stock Warning' },
        { id: 'stk-502', medicineName: 'Ciprofloxacin 250mg Tablet', batchNumber: 'CPX-2024-01', category: 'Schedule H1 Antibiotic', currentStock: 1100, minThreshold: 300, unit: 'Tablets', lastFiledTime: 'Yesterday, 07:00 PM', todaySubmitted: false, complianceStatus: 'Normal' },
        { id: 'stk-503', medicineName: 'Pethidine 100mg Injection', batchNumber: 'PTH-2024-09', category: 'Narcotic / Double-Lock', currentStock: 60, minThreshold: 25, unit: 'Ampoules', lastFiledTime: 'Yesterday, 07:00 PM', todaySubmitted: false, complianceStatus: 'Normal' },
      ],
    },
  ];

  // Currently Selected Pharmacy Record
  const currentPharmacyRecord = useMemo(() => {
    return pharmacyStockRecords.find((rec) => rec.pharmacyId === selectedPharmacyId) || pharmacyStockRecords[0];
  }, [selectedPharmacyId]);

  // Filtered Stock Items for Table
  const filteredStockItems = useMemo(() => {
    return currentPharmacyRecord.stockItems.filter((item) => {
      const matchesSearch =
        item.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (categoryFilter === 'Antibiotics') return item.category.includes('Antibiotic');
      if (categoryFilter === 'Narcotics') return item.category.includes('Narcotic');
      if (categoryFilter === 'Warnings') return item.complianceStatus !== 'Normal';

      return true;
    });
  }, [currentPharmacyRecord, searchTerm, categoryFilter]);

  return (
    <div className="inspector-stock-monitoring-view">
      {/* 1. Page Header */}
      <div className="stock-page-header">
        <div>
          <h1 className="stock-page-title">Stock Monitoring</h1>
          <p className="stock-page-subtitle">
            Regulatory inventory oversight, Schedule H1 antibiotic balances, and double-locked narcotic stock declarations across Zone 4 dispensaries.
          </p>
        </div>
        <div className="stock-header-stats">
          <div className="header-stat-chip">
            <span className="stat-value">{pharmacyStockRecords.length}</span>
            <span className="stat-label">Pharmacies Tracked</span>
          </div>
          <div className="header-stat-chip chip-success">
            <span className="stat-value">38</span>
            <span className="stat-label">Filings Verified</span>
          </div>
          <div className="header-stat-chip chip-warning">
            <span className="stat-value">3</span>
            <span className="stat-label">Low Stock Alerts</span>
          </div>
        </div>
      </div>

      {/* 2. Pharmacy Selection Bar */}
      <div className="stock-selector-card">
        <div className="selector-field-group">
          <label className="selector-label" htmlFor="pharmacy-select">
            Select Monitored Pharmacy:
          </label>
          <select
            id="pharmacy-select"
            className="pharmacy-dropdown-select"
            value={selectedPharmacyId}
            onChange={(e) => setSelectedPharmacyId(e.target.value)}
          >
            {pharmacyStockRecords.map((rec) => (
              <option key={rec.pharmacyId} value={rec.pharmacyId}>
                {rec.pharmacyName} ({rec.zoneLocation}) — {rec.todaySubmitted ? 'Filing Submitted' : 'Filing Pending'}
              </option>
            ))}
          </select>
        </div>

        <div className="stock-search-input-wrapper">
          <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="stock-search-input"
            placeholder="Search medicine name or batch number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              &times;
            </button>
          )}
        </div>
      </div>

      {/* 3. Selected Pharmacy Summary Banner & KPI Cards */}
      <div className="inspector-card pharmacy-summary-banner-card">
        <div className="summary-banner-header">
          <div>
            <div className="banner-title-row">
              <h2 className="summary-pharmacy-name">{currentPharmacyRecord.pharmacyName}</h2>
              <span className="license-pill">{currentPharmacyRecord.licenseNumber}</span>
              {currentPharmacyRecord.todaySubmitted ? (
                <span className="filing-chip filing-submitted">Daily Filing Submitted</span>
              ) : (
                <span className="filing-chip filing-pending">Daily Filing Pending</span>
              )}
            </div>
            <span className="summary-pharmacy-sub">
              {currentPharmacyRecord.zoneLocation} • Pharmacist In-Charge: {currentPharmacyRecord.pharmacistName} ({currentPharmacyRecord.pharmacistRegNo})
            </span>
          </div>

          <div className="summary-header-right">
            <span className="last-updated-text">Last Updated: {currentPharmacyRecord.lastUpdatedTime}</span>
          </div>
        </div>

        <div className="summary-kpi-grid">
          <div className="kpi-stat-box">
            <span className="kpi-box-title">Daily Declaration Status</span>
            <span className={`kpi-box-main ${currentPharmacyRecord.todaySubmitted ? 'text-success' : 'text-warning'}`}>
              {currentPharmacyRecord.todaySubmitted ? 'Submitted On Time' : 'Pending / Cutoff Missed'}
            </span>
            <span className="kpi-box-sub">Cutoff Deadline: 10:00 AM Daily</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Schedule H1 Antibiotic Balance</span>
            <span className="kpi-box-main text-secondary">
              {currentPharmacyRecord.totalAntibioticUnits.toLocaleString()} units
            </span>
            <span className="kpi-box-sub">Monitored Reserve Level</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Narcotics &amp; Controlled Drugs</span>
            <span className={`kpi-box-main ${currentPharmacyRecord.hasLowStockAlert ? 'text-danger' : 'text-primary'}`}>
              {currentPharmacyRecord.totalNarcoticUnits} units
            </span>
            <span className="kpi-box-sub">
              {currentPharmacyRecord.hasLowStockAlert ? 'Low Threshold Alert Active' : 'Double-Lock Vault Verified'}
            </span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Filing Compliance Score</span>
            <span className="kpi-box-main text-primary">{currentPharmacyRecord.filingComplianceScore}</span>
            <span className="kpi-box-sub">30-Day Audit Average</span>
          </div>
        </div>
      </div>

      {/* 4. Stock Category Filter Tabs & Inventory Table */}
      <div className="inspector-card stock-table-card">
        <div className="card-header stock-table-header-flex">
          <div>
            <h2 className="card-title">Restricted Stock Inventory Directory</h2>
            <span className="card-subtitle">
              Inspecting registered stock balances for {currentPharmacyRecord.pharmacyName}
            </span>
          </div>

          <div className="category-filter-pills">
            <button
              className={`cat-pill ${categoryFilter === 'All' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('All')}
            >
              All Stock Items ({currentPharmacyRecord.stockItems.length})
            </button>
            <button
              className={`cat-pill ${categoryFilter === 'Antibiotics' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('Antibiotics')}
            >
              Antibiotics (Schedule H1)
            </button>
            <button
              className={`cat-pill ${categoryFilter === 'Narcotics' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('Narcotics')}
            >
              Narcotics (Double Lock)
            </button>
            <button
              className={`cat-pill ${categoryFilter === 'Warnings' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('Warnings')}
            >
              Low Stock / Alert Items
            </button>
          </div>
        </div>

        <div className="stock-table-container internal-scroll-container">
          <table className="activity-table inspector-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Batch Number</th>
                <th>Category</th>
                <th className="text-right">Current Balance</th>
                <th className="text-right">Min Threshold</th>
                <th className="text-center">Daily Filing</th>
                <th className="text-center">Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStockItems.map((item) => (
                <tr key={item.id}>
                  <td className="font-semibold text-primary">{item.medicineName}</td>
                  <td className="font-mono text-muted">{item.batchNumber}</td>
                  <td>
                    <span
                      className={`category-pill ${
                        item.category.includes('Narcotic') ? 'cat-narcotic' : 'cat-antibiotic'
                      }`}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="text-right font-medium">
                    {item.currentStock.toLocaleString()} {item.unit}
                  </td>
                  <td className="text-right color-secondary-text">
                    {item.minThreshold.toLocaleString()} {item.unit}
                  </td>
                  <td className="text-center">
                    {item.todaySubmitted ? (
                      <span className="filing-chip filing-submitted">Submitted</span>
                    ) : (
                      <span className="filing-chip filing-pending">Pending</span>
                    )}
                  </td>
                  <td className="text-center">
                    <span
                      className={`status-badge ${
                        item.complianceStatus === 'Normal'
                          ? 'in-stock'
                          : item.complianceStatus === 'Low Stock Warning'
                          ? 'status-pending-badge'
                          : 'badge-critical'
                      }`}
                    >
                      {item.complianceStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredStockItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center empty-table-cell">
                    No stock records match the selected category or search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
