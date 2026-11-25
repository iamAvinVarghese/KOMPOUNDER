import React, { useState, useMemo } from 'react';
import type { MonitoredPharmacySalesRecord } from './types';
import './InspectorSalesDispensing.css';

export const InspectorSalesDispensing: React.FC = () => {
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string>('ph-02');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Antibiotics' | 'Narcotics' | 'Flagged'>('All');

  // Presentation-ready mock sales & dispensing records for Zone 4 pharmacies
  const pharmacySalesRecords: MonitoredPharmacySalesRecord[] = [
    {
      pharmacyId: 'ph-01',
      pharmacyName: 'Apex Medicos & Healthcare',
      licenseNumber: 'LIC-Z4-2024-001',
      zoneLocation: 'Sector 14, Zone 4',
      pharmacistName: 'Rajesh Kumar',
      pharmacistRegNo: 'REG-PH-8841',
      todayDispensedUnits: 680,
      todayTransactionsCount: 24,
      flaggedSpikesCount: 0,
      auditVerificationRate: '100.0%',
      salesRecords: [
        { id: 'txn-101', transactionId: 'TXN-2024-9901', timestamp: 'Today, 09:15 AM', medicineName: 'Amoxicillin 500mg Capsule', category: 'Schedule H1 Antibiotic', qtyDispensed: 20, unit: 'Capsules', patientId: 'PAT-8812', patientName: 'Ramesh Patel', doctorName: 'Dr. N. K. Deshmukh', doctorRegNo: 'DOC-ND-4410', postDispenseStock: 830, verificationStatus: 'Verified' },
        { id: 'txn-102', transactionId: 'TXN-2024-9902', timestamp: 'Today, 08:45 AM', medicineName: 'Azithromycin 250mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 10, unit: 'Tablets', patientId: 'PAT-9014', patientName: 'Sunita Sharma', doctorName: 'Dr. V. P. Rao', doctorRegNo: 'DOC-ND-1102', postDispenseStock: 610, verificationStatus: 'Verified' },
        { id: 'txn-103', transactionId: 'TXN-2024-9890', timestamp: 'Yesterday, 05:20 PM', medicineName: 'Morphine Sulphate 10mg Injection', category: 'Narcotic / Double-Lock', qtyDispensed: 5, unit: 'Ampoules', patientId: 'PAT-3321', patientName: 'Anil Malhotra', doctorName: 'Dr. S. K. Gupta', doctorRegNo: 'DOC-ND-9901', postDispenseStock: 75, verificationStatus: 'Verified' },
      ],
    },
    {
      pharmacyId: 'ph-02',
      pharmacyName: 'Care Pharmacy & Surgical',
      licenseNumber: 'LIC-Z4-2024-014',
      zoneLocation: 'Civil Lines, Zone 4',
      pharmacistName: 'Priya Sharma',
      pharmacistRegNo: 'REG-PH-9120',
      todayDispensedUnits: 450,
      todayTransactionsCount: 18,
      flaggedSpikesCount: 2,
      auditVerificationRate: '88.9%',
      salesRecords: [
        { id: 'txn-201', transactionId: 'TXN-2024-9940', timestamp: 'Today, 09:40 AM', medicineName: 'Amoxicillin 500mg Capsule', category: 'Schedule H1 Antibiotic', qtyDispensed: 120, unit: 'Capsules', patientId: 'PAT-4412', patientName: 'Mahesh Verma', doctorName: 'Dr. R. C. Verma', doctorRegNo: 'DOC-ND-8812', postDispenseStock: 140, verificationStatus: 'Flagged Volume Spike', irregularityNote: 'Quantity dispensed 4x above 24-hour average' },
        { id: 'txn-202', transactionId: 'TXN-2024-9938', timestamp: 'Today, 09:10 AM', medicineName: 'Fentanyl 50mcg Transdermal Patch', category: 'Narcotic / Double-Lock', qtyDispensed: 15, unit: 'Patches', patientId: 'PAT-5510', patientName: 'Kavita Singh', doctorName: 'Dr. M. P. Saxena', doctorRegNo: 'DOC-ND-3341', postDispenseStock: 15, verificationStatus: 'Under Review', irregularityNote: 'Low reserve breach triggered after dispensation' },
        { id: 'txn-203', transactionId: 'TXN-2024-9912', timestamp: 'Yesterday, 06:00 PM', medicineName: 'Ciprofloxacin 500mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 30, unit: 'Tablets', patientId: 'PAT-6621', patientName: 'Vikram Joshi', doctorName: 'Dr. A. B. Joshi', doctorRegNo: 'DOC-ND-7711', postDispenseStock: 950, verificationStatus: 'Verified' },
        { id: 'txn-204', transactionId: 'TXN-2024-9889', timestamp: 'Yesterday, 04:30 PM', medicineName: 'Levofloxacin 500mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 20, unit: 'Tablets', patientId: 'PAT-7740', patientName: 'Deepak Saxena', doctorName: 'Dr. H. K. Malhotra', doctorRegNo: 'DOC-ND-2234', postDispenseStock: 960, verificationStatus: 'Verified' },
      ],
    },
    {
      pharmacyId: 'ph-03',
      pharmacyName: 'City Pharma Chemist',
      licenseNumber: 'LIC-Z4-2023-089',
      zoneLocation: 'Main Market, Zone 4',
      pharmacistName: 'Amit Varma',
      pharmacistRegNo: 'REG-PH-7432',
      todayDispensedUnits: 520,
      todayTransactionsCount: 21,
      flaggedSpikesCount: 1,
      auditVerificationRate: '95.2%',
      salesRecords: [
        { id: 'txn-301', transactionId: 'TXN-2024-9955', timestamp: 'Today, 10:00 AM', medicineName: 'Augmentin 625mg Duo Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 80, unit: 'Tablets', patientId: 'PAT-6671', patientName: 'Geeta Rani', doctorName: 'Dr. P. S. Bhatia', doctorRegNo: 'DOC-ND-5512', postDispenseStock: 1450, verificationStatus: 'Flagged Volume Spike', irregularityNote: 'Unusual bulk prescription quantity logged' },
        { id: 'txn-302', transactionId: 'TXN-2024-9920', timestamp: 'Today, 09:20 AM', medicineName: 'Cefixime 200mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 15, unit: 'Tablets', patientId: 'PAT-7782', patientName: 'Rohit Gill', doctorName: 'Dr. K. L. Kapoor', doctorRegNo: 'DOC-ND-2219', postDispenseStock: 1435, verificationStatus: 'Verified' },
      ],
    },
    {
      pharmacyId: 'ph-04',
      pharmacyName: 'Metro Chemist & Druggist',
      licenseNumber: 'LIC-Z4-2023-045',
      zoneLocation: 'Station Road, Zone 4',
      pharmacistName: 'Sanjay Gupta',
      pharmacistRegNo: 'REG-PH-6510',
      todayDispensedUnits: 890,
      todayTransactionsCount: 32,
      flaggedSpikesCount: 0,
      auditVerificationRate: '100.0%',
      salesRecords: [
        { id: 'txn-401', transactionId: 'TXN-2024-9960', timestamp: 'Today, 08:30 AM', medicineName: 'Levofloxacin 500mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 25, unit: 'Tablets', patientId: 'PAT-1102', patientName: 'Alok Nath', doctorName: 'Dr. T. R. Nair', doctorRegNo: 'DOC-ND-7711', postDispenseStock: 1775, verificationStatus: 'Verified' },
        { id: 'txn-402', transactionId: 'TXN-2024-9950', timestamp: 'Today, 07:15 AM', medicineName: 'Pethidine Injection 50mg', category: 'Narcotic / Double-Lock', qtyDispensed: 4, unit: 'Ampoules', patientId: 'PAT-2299', patientName: 'Brijesh Yadav', doctorName: 'Dr. M. S. Sodhi', doctorRegNo: 'DOC-ND-3344', postDispenseStock: 136, verificationStatus: 'Verified' },
      ],
    },
    {
      pharmacyId: 'ph-05',
      pharmacyName: 'National Medical Store',
      licenseNumber: 'LIC-Z4-2024-033',
      zoneLocation: 'Green Park, Zone 4',
      pharmacistName: 'Sunita Patel',
      pharmacistRegNo: 'REG-PH-8201',
      todayDispensedUnits: 310,
      todayTransactionsCount: 12,
      flaggedSpikesCount: 0,
      auditVerificationRate: '100.0%',
      salesRecords: [
        { id: 'txn-501', transactionId: 'TXN-2024-9880', timestamp: 'Yesterday, 06:45 PM', medicineName: 'Ofloxacin 400mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 15, unit: 'Tablets', patientId: 'PAT-8819', patientName: 'Meena Kumari', doctorName: 'Dr. N. P. Roy', doctorRegNo: 'DOC-ND-4491', postDispenseStock: 1085, verificationStatus: 'Verified' },
      ],
    },
  ];

  // Currently Selected Pharmacy Record
  const currentPharmacyRecord = useMemo(() => {
    return pharmacySalesRecords.find((rec) => rec.pharmacyId === selectedPharmacyId) || pharmacySalesRecords[0];
  }, [selectedPharmacyId]);

  // Filtered Sales Transactions for Table
  const filteredSalesRecords = useMemo(() => {
    return currentPharmacyRecord.salesRecords.filter((txn) => {
      const matchesSearch =
        txn.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.doctorRegNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (categoryFilter === 'Antibiotics') return txn.category.includes('Antibiotic');
      if (categoryFilter === 'Narcotics') return txn.category.includes('Narcotic');
      if (categoryFilter === 'Flagged') return txn.verificationStatus !== 'Verified';

      return true;
    });
  }, [currentPharmacyRecord, searchTerm, categoryFilter]);

  return (
    <div className="inspector-sales-dispensing-view">
      {/* 1. Page Header */}
      <div className="sales-page-header">
        <div>
          <h1 className="sales-page-title">Sales &amp; Dispensing</h1>
          <p className="sales-page-subtitle">
            Regulatory oversight and audit verification of recorded Schedule H1 antibiotic and double-locked narcotic sales transactions across Zone 4.
          </p>
        </div>
        <div className="sales-header-stats">
          <div className="header-stat-chip">
            <span className="stat-value">142</span>
            <span className="stat-label">Transactions Today</span>
          </div>
          <div className="header-stat-chip chip-success">
            <span className="stat-value">118</span>
            <span className="stat-label">Schedule H1 Sales</span>
          </div>
          <div className="header-stat-chip chip-warning">
            <span className="stat-value">24</span>
            <span className="stat-label">Narcotic Sales</span>
          </div>
          <div className="header-stat-chip chip-danger">
            <span className="stat-value">3</span>
            <span className="stat-label">Flagged Spikes</span>
          </div>
        </div>
      </div>

      {/* 2. Pharmacy Selection Bar */}
      <div className="sales-selector-card">
        <div className="selector-field-group">
          <label className="selector-label" htmlFor="pharmacy-sales-select">
            Select Monitored Pharmacy:
          </label>
          <select
            id="pharmacy-sales-select"
            className="pharmacy-dropdown-select"
            value={selectedPharmacyId}
            onChange={(e) => setSelectedPharmacyId(e.target.value)}
          >
            {pharmacySalesRecords.map((rec) => (
              <option key={rec.pharmacyId} value={rec.pharmacyId}>
                {rec.pharmacyName} ({rec.zoneLocation}) — {rec.flaggedSpikesCount > 0 ? `${rec.flaggedSpikesCount} Flagged Spike` : 'Verified Log'}
              </option>
            ))}
          </select>
        </div>

        <div className="sales-search-input-wrapper">
          <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="sales-search-input"
            placeholder="Search medicine, patient ID, doctor reg no, or transaction ID..."
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
              {currentPharmacyRecord.flaggedSpikesCount > 0 ? (
                <span className="filing-chip filing-pending">{currentPharmacyRecord.flaggedSpikesCount} Flagged Spike</span>
              ) : (
                <span className="filing-chip filing-submitted">Audit Log Verified</span>
              )}
            </div>
            <span className="summary-pharmacy-sub">
              {currentPharmacyRecord.zoneLocation} • Pharmacist In-Charge: {currentPharmacyRecord.pharmacistName} ({currentPharmacyRecord.pharmacistRegNo})
            </span>
          </div>

          <div className="summary-header-right">
            <span className="last-updated-text">Audit Rate: {currentPharmacyRecord.auditVerificationRate}</span>
          </div>
        </div>

        <div className="summary-kpi-grid">
          <div className="kpi-stat-box">
            <span className="kpi-box-title">Today's Dispensing Volume</span>
            <span className="kpi-box-main text-primary">
              {currentPharmacyRecord.todayDispensedUnits} units
            </span>
            <span className="kpi-box-sub">{currentPharmacyRecord.todayTransactionsCount} Total Transactions</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Schedule H1 Antibiotic Sales</span>
            <span className="kpi-box-main text-secondary">
              {currentPharmacyRecord.salesRecords.filter(s => s.category.includes('Antibiotic')).reduce((a, b) => a + b.qtyDispensed, 0)} units
            </span>
            <span className="kpi-box-sub">Mandatory Doctor Reg Checked</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Narcotics &amp; Controlled Sales</span>
            <span className="kpi-box-main text-primary">
              {currentPharmacyRecord.salesRecords.filter(s => s.category.includes('Narcotic')).reduce((a, b) => a + b.qtyDispensed, 0)} units
            </span>
            <span className="kpi-box-sub">Double-Lock Vault Registered</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Audit Verification Rate</span>
            <span className={`kpi-box-main ${currentPharmacyRecord.flaggedSpikesCount > 0 ? 'text-warning' : 'text-success'}`}>
              {currentPharmacyRecord.auditVerificationRate}
            </span>
            <span className="kpi-box-sub">
              {currentPharmacyRecord.flaggedSpikesCount > 0 ? 'Requires Inspector Review' : '100% Compliant Register'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Category Filter Tabs & Sales Directory Table */}
      <div className="inspector-card sales-table-card">
        <div className="card-header sales-table-header-flex">
          <div>
            <h2 className="card-title">Recorded Sales &amp; Dispensing Audit Directory</h2>
            <span className="card-subtitle">
              Inspecting recorded sales transactions for {currentPharmacyRecord.pharmacyName}
            </span>
          </div>

          <div className="category-filter-pills">
            <button
              className={`cat-pill ${categoryFilter === 'All' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('All')}
            >
              All Transactions ({currentPharmacyRecord.salesRecords.length})
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
              className={`cat-pill ${categoryFilter === 'Flagged' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('Flagged')}
            >
              Flagged / Unusual Spikes
            </button>
          </div>
        </div>

        <div className="sales-table-container internal-scroll-container">
          <table className="activity-table inspector-table">
            <thead>
              <tr>
                <th>Date &amp; Time</th>
                <th>Txn ID</th>
                <th>Medicine Name</th>
                <th>Category</th>
                <th className="text-right">Qty Dispensed</th>
                <th>Patient Information</th>
                <th>Prescribed Doctor</th>
                <th className="text-right">Post Stock</th>
                <th className="text-center">Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalesRecords.map((txn) => (
                <tr key={txn.id}>
                  <td className="color-secondary-text">{txn.timestamp}</td>
                  <td className="font-mono text-muted">{txn.transactionId}</td>
                  <td className="font-semibold text-primary">{txn.medicineName}</td>
                  <td>
                    <span
                      className={`category-pill ${
                        txn.category.includes('Narcotic') ? 'cat-narcotic' : 'cat-antibiotic'
                      }`}
                    >
                      {txn.category}
                    </span>
                  </td>
                  <td className="text-right font-medium">
                    {txn.qtyDispensed} {txn.unit}
                  </td>
                  <td>
                    <div className="patient-cell flex-col">
                      <span className="font-medium">{txn.patientName}</span>
                      <span className="cell-sub-id">{txn.patientId}</span>
                    </div>
                  </td>
                  <td>
                    <div className="doctor-cell flex-col">
                      <span className="font-medium">{txn.doctorName}</span>
                      <span className="cell-sub-id">{txn.doctorRegNo}</span>
                    </div>
                  </td>
                  <td className="text-right color-secondary-text">{txn.postDispenseStock} units</td>
                  <td className="text-center">
                    <span
                      className={`status-badge ${
                        txn.verificationStatus === 'Verified'
                          ? 'in-stock'
                          : txn.verificationStatus === 'Flagged Volume Spike'
                          ? 'status-pending-badge'
                          : 'badge-critical'
                      }`}
                      title={txn.irregularityNote || ''}
                    >
                      {txn.verificationStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredSalesRecords.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center empty-table-cell">
                    No dispensing transaction records match the selected category or search filter.
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
