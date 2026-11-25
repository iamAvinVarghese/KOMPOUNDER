import React, { useState, useMemo } from 'react';
import type { PharmacyDetailItem } from './types';
import './InspectorPharmacies.css';

export const InspectorPharmacies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Filed' | 'Pending' | 'Alert'>('All');
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string>('ph-02');

  // Presentation-ready mock pharmacy records
  const pharmaciesData: PharmacyDetailItem[] = [
    {
      id: 'ph-01',
      name: 'Apex Medicos & Healthcare',
      licenseNumber: 'LIC-Z4-2024-001',
      zoneLocation: 'Sector 14, Zone 4',
      address: 'Shop 12-14, Commercial Complex, Sector 14',
      contactPhone: '+91 98112 34567',
      operatingHours: '08:00 AM – 10:00 PM',
      pharmacistName: 'Rajesh Kumar',
      pharmacistRegNo: 'REG-PH-8841',
      pharmacistLicenseExpiry: '14 Nov 2027',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 09:30 AM',
      filingComplianceScore: '98.5%',
      antibioticStockUnits: 1840,
      narcoticStockUnits: 120,
      lowStockWarning: false,
      activeAlertsCount: 0,
      complianceStatus: 'Up to Date',
      recentSales: [
        { id: 'sale-101', drugName: 'Amoxicillin 500mg', category: 'Schedule H1 Antibiotic', qty: 20, patientId: 'PAT-8812', doctorRegNo: 'DOC-ND-4410', timestamp: 'Today, 09:15 AM' },
        { id: 'sale-102', drugName: 'Azithromycin 250mg', category: 'Schedule H1 Antibiotic', qty: 10, patientId: 'PAT-9014', doctorRegNo: 'DOC-ND-1102', timestamp: 'Today, 08:45 AM' },
        { id: 'sale-103', drugName: 'Morphine Sulphate 10mg', category: 'Narcotic / Double-Lock', qty: 5, patientId: 'PAT-3321', doctorRegNo: 'DOC-ND-9901', timestamp: 'Yesterday, 05:20 PM' },
      ],
      activeAlerts: [],
    },
    {
      id: 'ph-02',
      name: 'Care Pharmacy & Surgical',
      licenseNumber: 'LIC-Z4-2024-014',
      zoneLocation: 'Civil Lines, Zone 4',
      address: 'Plot 45, Near Head Post Office, Civil Lines',
      contactPhone: '+91 98223 45678',
      operatingHours: '09:00 AM – 09:00 PM',
      pharmacistName: 'Priya Sharma',
      pharmacistRegNo: 'REG-PH-9120',
      pharmacistLicenseExpiry: '22 Mar 2026',
      todaySubmitted: false,
      lastUpdatedTime: 'Yesterday, 06:15 PM',
      filingComplianceScore: '84.0%',
      antibioticStockUnits: 2150,
      narcoticStockUnits: 40,
      lowStockWarning: true,
      activeAlertsCount: 2,
      complianceStatus: 'Pending',
      recentSales: [
        { id: 'sale-201', drugName: 'Fentanyl 50mcg Patch', category: 'Narcotic / Double-Lock', qty: 10, patientId: 'PAT-4412', doctorRegNo: 'DOC-ND-8812', timestamp: 'Yesterday, 06:00 PM' },
        { id: 'sale-202', drugName: 'Ciprofloxacin 500mg', category: 'Schedule H1 Antibiotic', qty: 30, patientId: 'PAT-5510', doctorRegNo: 'DOC-ND-3341', timestamp: 'Yesterday, 04:30 PM' },
      ],
      activeAlerts: [
        { id: 'alt-01', severity: 'Critical', title: 'Daily Stock Declaration Missing', description: 'Mandatory daily stock declaration not submitted before 10:00 AM cutoff.', timestamp: 'Today, 10:05 AM' },
        { id: 'alt-02', severity: 'Critical', title: 'Low Narcotic Reserve Warning', description: 'Fentanyl 50mcg Patch inventory dropped below mandatory minimum safety threshold.', timestamp: 'Today, 09:40 AM' },
      ],
    },
    {
      id: 'ph-03',
      name: 'City Pharma Chemist',
      licenseNumber: 'LIC-Z4-2023-089',
      zoneLocation: 'Main Market, Zone 4',
      address: 'Shop 8, Central Retail Plaza, Main Market',
      contactPhone: '+91 98334 56789',
      operatingHours: '08:30 AM – 10:30 PM',
      pharmacistName: 'Amit Varma',
      pharmacistRegNo: 'REG-PH-7432',
      pharmacistLicenseExpiry: '18 Aug 2028',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 10:15 AM',
      filingComplianceScore: '91.2%',
      antibioticStockUnits: 3400,
      narcoticStockUnits: 85,
      lowStockWarning: false,
      activeAlertsCount: 1,
      complianceStatus: 'Attention Required',
      recentSales: [
        { id: 'sale-301', drugName: 'Augmentin 625mg Duo', category: 'Schedule H1 Antibiotic', qty: 40, patientId: 'PAT-6671', doctorRegNo: 'DOC-ND-5512', timestamp: 'Today, 10:00 AM' },
        { id: 'sale-302', drugName: 'Cefixime 200mg', category: 'Schedule H1 Antibiotic', qty: 15, patientId: 'PAT-7782', doctorRegNo: 'DOC-ND-2219', timestamp: 'Today, 09:20 AM' },
      ],
      activeAlerts: [
        { id: 'alt-03', severity: 'Attention', title: 'Antibiotic Sales Volume Spike', description: 'Augmentin 625mg 24-hour sales volume exceeded normal baseline by 35%.', timestamp: 'Today, 08:30 AM' },
      ],
    },
    {
      id: 'ph-04',
      name: 'Metro Chemist & Druggist',
      licenseNumber: 'LIC-Z4-2023-045',
      zoneLocation: 'Station Road, Zone 4',
      address: 'Building 102, Opp. Railway Station Gate 2',
      contactPhone: '+91 98445 67890',
      operatingHours: '24 Hours Open',
      pharmacistName: 'Sanjay Gupta',
      pharmacistRegNo: 'REG-PH-6510',
      pharmacistLicenseExpiry: '05 Jan 2027',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 08:45 AM',
      filingComplianceScore: '100.0%',
      antibioticStockUnits: 4100,
      narcoticStockUnits: 210,
      lowStockWarning: false,
      activeAlertsCount: 0,
      complianceStatus: 'Up to Date',
      recentSales: [
        { id: 'sale-401', drugName: 'Levofloxacin 500mg', category: 'Schedule H1 Antibiotic', qty: 25, patientId: 'PAT-1102', doctorRegNo: 'DOC-ND-7711', timestamp: 'Today, 08:30 AM' },
        { id: 'sale-402', drugName: 'Pethidine Injection 50mg', category: 'Narcotic / Double-Lock', qty: 4, patientId: 'PAT-2299', doctorRegNo: 'DOC-ND-3344', timestamp: 'Today, 07:15 AM' },
      ],
      activeAlerts: [],
    },
    {
      id: 'ph-05',
      name: 'National Medical Store',
      licenseNumber: 'LIC-Z4-2024-033',
      zoneLocation: 'Green Park, Zone 4',
      address: 'Shop 3, Green Park Supermarket Avenue',
      contactPhone: '+91 98556 78901',
      operatingHours: '09:00 AM – 09:30 PM',
      pharmacistName: 'Sunita Patel',
      pharmacistRegNo: 'REG-PH-8201',
      pharmacistLicenseExpiry: '30 Sep 2026',
      todaySubmitted: false,
      lastUpdatedTime: 'Yesterday, 07:00 PM',
      filingComplianceScore: '86.5%',
      antibioticStockUnits: 1280,
      narcoticStockUnits: 60,
      lowStockWarning: false,
      activeAlertsCount: 1,
      complianceStatus: 'Pending',
      recentSales: [
        { id: 'sale-501', drugName: 'Ofloxacin 400mg', category: 'Schedule H1 Antibiotic', qty: 15, patientId: 'PAT-8819', doctorRegNo: 'DOC-ND-4491', timestamp: 'Yesterday, 06:45 PM' },
      ],
      activeAlerts: [
        { id: 'alt-04', severity: 'Attention', title: 'Delayed Stock Filing', description: 'Second delayed stock declaration filing recorded this week.', timestamp: 'Yesterday, 07:15 PM' },
      ],
    },
    {
      id: 'ph-06',
      name: 'Royal Drug House',
      licenseNumber: 'LIC-Z4-2022-112',
      zoneLocation: 'Model Town, Zone 4',
      address: '14/A Model Town Main Circle',
      contactPhone: '+91 98667 89012',
      operatingHours: '08:00 AM – 11:00 PM',
      pharmacistName: 'Vikas Malhotra',
      pharmacistRegNo: 'REG-PH-5541',
      pharmacistLicenseExpiry: '12 Dec 2027',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 10:45 AM',
      filingComplianceScore: '92.0%',
      antibioticStockUnits: 2900,
      narcoticStockUnits: 95,
      lowStockWarning: false,
      activeAlertsCount: 2,
      complianceStatus: 'Attention Required',
      recentSales: [
        { id: 'sale-601', drugName: 'Clarithromycin 500mg', category: 'Schedule H1 Antibiotic', qty: 35, patientId: 'PAT-7721', doctorRegNo: 'DOC-ND-8822', timestamp: 'Today, 10:30 AM' },
      ],
      activeAlerts: [
        { id: 'alt-05', severity: 'Attention', title: 'Schedule H1 Register Gap', description: 'Discrepancy detected between POS log and physical stock count.', timestamp: 'Today, 10:45 AM' },
      ],
    },
    {
      id: 'ph-07',
      name: 'LifeLine Pharmacy',
      licenseNumber: 'LIC-Z4-2024-055',
      zoneLocation: 'Hospital Road, Zone 4',
      address: 'Opp. District Civil Hospital Emergency Gate',
      contactPhone: '+91 98778 90123',
      operatingHours: '24 Hours Open',
      pharmacistName: 'Anil Saxena',
      pharmacistRegNo: 'REG-PH-9811',
      pharmacistLicenseExpiry: '20 May 2029',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 09:10 AM',
      filingComplianceScore: '99.2%',
      antibioticStockUnits: 4800,
      narcoticStockUnits: 310,
      lowStockWarning: false,
      activeAlertsCount: 0,
      complianceStatus: 'Up to Date',
      recentSales: [
        { id: 'sale-701', drugName: 'Doxycycline 100mg', category: 'Schedule H1 Antibiotic', qty: 50, patientId: 'PAT-9912', doctorRegNo: 'DOC-ND-1100', timestamp: 'Today, 09:00 AM' },
      ],
      activeAlerts: [],
    },
  ];

  // Filtering Logic
  const filteredPharmacies = useMemo(() => {
    return pharmaciesData.filter((pharmacy) => {
      const matchesSearch =
        pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.pharmacistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.zoneLocation.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (filterStatus === 'Filed') return pharmacy.todaySubmitted;
      if (filterStatus === 'Pending') return !pharmacy.todaySubmitted;
      if (filterStatus === 'Alert') return pharmacy.activeAlertsCount > 0;

      return true;
    });
  }, [searchTerm, filterStatus]);

  const selectedPharmacy = useMemo(() => {
    return pharmaciesData.find((p) => p.id === selectedPharmacyId) || pharmaciesData[0];
  }, [selectedPharmacyId]);

  return (
    <div className="inspector-pharmacies-view">
      {/* 1. Page Header */}
      <div className="pharmacies-page-header">
        <div>
          <h1 className="pharmacies-page-title">Pharmacies</h1>
          <p className="pharmacies-page-subtitle">
            Regulatory oversight, stock declarations, restricted drug inventories, and compliance history for Zone 4 registered dispensaries.
          </p>
        </div>
        <div className="pharmacies-header-stats">
          <div className="header-stat-chip">
            <span className="stat-value">{pharmaciesData.length}</span>
            <span className="stat-label">Monitored</span>
          </div>
          <div className="header-stat-chip chip-success">
            <span className="stat-value">5</span>
            <span className="stat-label">Filed Today</span>
          </div>
          <div className="header-stat-chip chip-warning">
            <span className="stat-value">2</span>
            <span className="stat-label">Pending Filing</span>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="pharmacies-controls-card">
        <div className="search-input-wrapper">
          <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by pharmacy name, pharmacist, or license number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              &times;
            </button>
          )}
        </div>

        <div className="filter-status-pills">
          <button
            className={`filter-pill ${filterStatus === 'All' ? 'active' : ''}`}
            onClick={() => setFilterStatus('All')}
          >
            All Pharmacies ({pharmaciesData.length})
          </button>
          <button
            className={`filter-pill ${filterStatus === 'Filed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Filed')}
          >
            Update Filed (5)
          </button>
          <button
            className={`filter-pill ${filterStatus === 'Pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Pending')}
          >
            Pending Filing (2)
          </button>
          <button
            className={`filter-pill ${filterStatus === 'Alert' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Alert')}
          >
            Compliance Alert Active (3)
          </button>
        </div>
      </div>

      {/* 3. Pharmacies Directory Table */}
      <div className="inspector-card pharmacies-table-card">
        <div className="card-header table-header-flex">
          <div>
            <h2 className="card-title">Monitored Dispensaries Directory</h2>
            <span className="card-subtitle">Click a pharmacy row to inspect restricted stock levels, pharmacist credentials, and sales logs</span>
          </div>
          <span className="compliance-count-badge">{filteredPharmacies.length} Records</span>
        </div>

        <div className="pharmacies-table-container internal-scroll-container">
          <table className="activity-table inspector-table">
            <thead>
              <tr>
                <th>Pharmacy Name &amp; License</th>
                <th>Location</th>
                <th>Registered Pharmacist</th>
                <th className="text-center">Daily Stock Status</th>
                <th className="text-right">Antibiotic Stock</th>
                <th className="text-right">Narcotic Stock</th>
                <th className="text-center">Compliance Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPharmacies.map((pharmacy) => {
                const isSelected = pharmacy.id === selectedPharmacyId;
                return (
                  <tr
                    key={pharmacy.id}
                    className={`pharmacy-row ${isSelected ? 'row-selected' : ''}`}
                    onClick={() => setSelectedPharmacyId(pharmacy.id)}
                  >
                    <td>
                      <div className="pharmacy-cell-name">
                        <span className="font-semibold text-primary">{pharmacy.name}</span>
                        <span className="cell-sub-license">{pharmacy.licenseNumber}</span>
                      </div>
                    </td>
                    <td className="color-secondary-text">{pharmacy.zoneLocation}</td>
                    <td>
                      <div className="pharmacy-cell-pharmacist">
                        <span className="font-medium">{pharmacy.pharmacistName}</span>
                        <span className="cell-sub-reg">{pharmacy.pharmacistRegNo}</span>
                      </div>
                    </td>
                    <td className="text-center">
                      {pharmacy.todaySubmitted ? (
                        <span className="filing-chip filing-submitted">Submitted</span>
                      ) : (
                        <span className="filing-chip filing-pending">Pending</span>
                      )}
                    </td>
                    <td className="text-right font-medium">{pharmacy.antibioticStockUnits.toLocaleString()} units</td>
                    <td className="text-right font-medium">
                      {pharmacy.narcoticStockUnits} units
                      {pharmacy.lowStockWarning && <span className="warning-dot" title="Low stock warning"></span>}
                    </td>
                    <td className="text-center">
                      <span
                        className={`status-badge ${
                          pharmacy.complianceStatus === 'Up to Date'
                            ? 'in-stock'
                            : pharmacy.complianceStatus === 'Pending'
                            ? 'status-pending-badge'
                            : 'low-stock'
                        }`}
                      >
                        {pharmacy.complianceStatus}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className={`btn-inspect-action ${isSelected ? 'btn-inspect-active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPharmacyId(pharmacy.id);
                        }}
                      >
                        {isSelected ? 'Inspecting' : 'Inspect'}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredPharmacies.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center empty-table-cell">
                    No pharmacy records match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Selected Pharmacy Regulatory Inspection Panel */}
      {selectedPharmacy && (
        <div className="inspector-card pharmacy-detail-card">
          <div className="detail-card-header">
            <div>
              <div className="detail-title-row">
                <h2 className="detail-pharmacy-name">{selectedPharmacy.name}</h2>
                <span className="license-pill">{selectedPharmacy.licenseNumber}</span>
                <span
                  className={`status-badge ${
                    selectedPharmacy.complianceStatus === 'Up to Date'
                      ? 'in-stock'
                      : selectedPharmacy.complianceStatus === 'Pending'
                      ? 'status-pending-badge'
                      : 'low-stock'
                  }`}
                >
                  {selectedPharmacy.complianceStatus}
                </span>
              </div>
              <span className="detail-pharmacy-address">
                {selectedPharmacy.address} • {selectedPharmacy.zoneLocation}
              </span>
            </div>
            <div className="detail-header-score">
              <span className="score-num">{selectedPharmacy.filingComplianceScore}</span>
              <span className="score-label">Filing Compliance Rate</span>
            </div>
          </div>

          <div className="detail-card-body">
            {/* Grid 1: Pharmacy & Pharmacist Info */}
            <div className="detail-info-grid">
              <div className="info-box">
                <span className="info-box-title">Registered Pharmacist In-Charge</span>
                <span className="info-box-main">{selectedPharmacy.pharmacistName}</span>
                <span className="info-box-sub">Registration: {selectedPharmacy.pharmacistRegNo}</span>
                <span className="info-box-sub">License Expiry: {selectedPharmacy.pharmacistLicenseExpiry}</span>
              </div>

              <div className="info-box">
                <span className="info-box-title">Contact &amp; Operations</span>
                <span className="info-box-main">{selectedPharmacy.contactPhone}</span>
                <span className="info-box-sub">Hours: {selectedPharmacy.operatingHours}</span>
                <span className="info-box-sub">Last Stock Update: {selectedPharmacy.lastUpdatedTime}</span>
              </div>

              <div className="info-box">
                <span className="info-box-title">Schedule H1 Antibiotic Balance</span>
                <span className="info-box-main text-secondary">{selectedPharmacy.antibioticStockUnits.toLocaleString()} units</span>
                <span className="info-box-sub">Daily Declaration: {selectedPharmacy.todaySubmitted ? 'Verified Filed' : 'Filing Overdue'}</span>
              </div>

              <div className="info-box">
                <span className="info-box-title">Controlled Narcotic Inventory</span>
                <span className={`info-box-main ${selectedPharmacy.lowStockWarning ? 'text-danger' : 'text-primary'}`}>
                  {selectedPharmacy.narcoticStockUnits} units (Double-Locked)
                </span>
                <span className="info-box-sub">
                  {selectedPharmacy.lowStockWarning ? 'Warning: Low Threshold Breach' : 'Custody Register Verified'}
                </span>
              </div>
            </div>

            {/* Grid 2: Active Alerts & Warnings */}
            {selectedPharmacy.activeAlerts.length > 0 && (
              <div className="detail-alerts-section">
                <h3 className="section-subtitle-heading">Active Compliance Warnings</h3>
                <div className="detail-alerts-list">
                  {selectedPharmacy.activeAlerts.map((alt) => (
                    <div key={alt.id} className={`alert-clinical-box border-${alt.severity.toLowerCase()}`}>
                      <div className="alert-top-line">
                        <span className="alert-pharmacy-tag">{selectedPharmacy.name}</span>
                        <span
                          className={`status-badge ${
                            alt.severity === 'Critical'
                              ? 'badge-critical'
                              : alt.severity === 'Attention'
                              ? 'badge-warning'
                              : 'badge-normal'
                          }`}
                        >
                          {alt.severity}
                        </span>
                      </div>
                      <h4 className="alert-title-heading">{alt.title}</h4>
                      <p className="alert-item-msg">{alt.description}</p>
                      <span className="meta-time">{alt.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grid 3: Recent Dispensing & Sales Logs */}
            <div className="detail-sales-section">
              <h3 className="section-subtitle-heading">Recent Dispensing Declarations (Schedule H1 &amp; Narcotics)</h3>
              <div className="activity-table-container">
                <table className="activity-table inspector-table sales-subtable">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Drug Name</th>
                      <th>Category</th>
                      <th className="text-right">Quantity</th>
                      <th>Patient ID</th>
                      <th>Doctor Reg No</th>
                      <th className="text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPharmacy.recentSales.map((sale) => (
                      <tr key={sale.id}>
                        <td className="font-medium">{sale.id}</td>
                        <td className="font-semibold text-primary">{sale.drugName}</td>
                        <td>
                          <span
                            className={`category-pill ${
                              sale.category.includes('Narcotic') ? 'cat-narcotic' : 'cat-antibiotic'
                            }`}
                          >
                            {sale.category}
                          </span>
                        </td>
                        <td className="text-right font-medium">{sale.qty} units</td>
                        <td className="color-secondary-text">{sale.patientId}</td>
                        <td className="font-medium">{sale.doctorRegNo}</td>
                        <td className="text-right color-secondary-text">{sale.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
