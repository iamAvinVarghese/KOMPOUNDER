import React, { useState, useMemo } from 'react';
import type { MedicineTraceabilityRecord } from './types';
import './InspectorTrackTrace.css';

export const InspectorTrackTrace: React.FC = () => {
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string>('ph-02');
  const [selectedMedicineId, setSelectedMedicineId] = useState<string>('trace-201');

  // Presentation-ready mock traceability datasets for Zone 4 pharmacies & restricted drugs
  const mockTraceabilityRecords: MedicineTraceabilityRecord[] = [
    {
      id: 'trace-201',
      pharmacyId: 'ph-02',
      pharmacyName: 'Care Pharmacy & Surgical',
      licenseNumber: 'LIC-Z4-2024-014',
      zoneLocation: 'Civil Lines, Zone 4',
      pharmacistName: 'Priya Sharma',
      pharmacistRegNo: 'REG-PH-9120',
      medicineName: 'Amoxicillin 500mg Capsule',
      batchNumber: 'AMX-2024-08',
      category: 'Schedule H1 Antibiotic',
      initialStock: 300,
      currentStock: 140,
      minThreshold: 200,
      unit: 'Capsules',
      lastFiledTime: 'Yesterday, 06:15 PM',
      todaySubmitted: false,
      hasIrregularity: true,
      irregularitySummary: 'Unusual Sales Volume Spike Detected: Single transaction of 120 units dispensed on 02 Sep 09:40 AM (4x above 24-hr average baseline).',
      traceabilitySteps: [
        { id: 'st-201', stepNumber: 1, timestamp: '01 Sep, 09:00 AM', eventType: 'Daily Declaration', qtyChange: 0, stockBalanceAfter: 300, unit: 'Capsules', statusTag: 'Compliant', notes: 'Mandatory daily stock declaration filed by Priya Sharma (REG-PH-9120)' },
        { id: 'st-202', stepNumber: 2, timestamp: '01 Sep, 04:30 PM', eventType: 'Dispensing Sale', transactionId: 'TXN-2024-9889', qtyChange: -40, stockBalanceAfter: 260, unit: 'Capsules', patientId: 'PAT-7740', patientName: 'Deepak Saxena', doctorName: 'Dr. H. K. Malhotra', doctorRegNo: 'DOC-ND-2234', statusTag: 'Compliant', notes: 'Standard Schedule H1 prescription verified' },
        { id: 'st-203', stepNumber: 3, timestamp: '02 Sep, 09:40 AM', eventType: 'Dispensing Sale', transactionId: 'TXN-2024-9940', qtyChange: -120, stockBalanceAfter: 140, unit: 'Capsules', patientId: 'PAT-4412', patientName: 'Mahesh Verma', doctorName: 'Dr. R. C. Verma', doctorRegNo: 'DOC-ND-8812', statusTag: 'Flagged Spike', notes: 'High-volume single transaction triggered volume spike threshold' },
        { id: 'st-204', stepNumber: 4, timestamp: '02 Sep, 09:41 AM', eventType: 'Threshold Warning', qtyChange: 0, stockBalanceAfter: 140, unit: 'Capsules', statusTag: 'Under Review', notes: 'Stock balance (140 units) dropped below minimum threshold (200 units)' },
      ],
    },
    {
      id: 'trace-202',
      pharmacyId: 'ph-02',
      pharmacyName: 'Care Pharmacy & Surgical',
      licenseNumber: 'LIC-Z4-2024-014',
      zoneLocation: 'Civil Lines, Zone 4',
      pharmacistName: 'Priya Sharma',
      pharmacistRegNo: 'REG-PH-9120',
      medicineName: 'Fentanyl 50mcg Transdermal Patch',
      batchNumber: 'FNT-2024-11',
      category: 'Narcotic / Double-Lock',
      initialStock: 40,
      currentStock: 15,
      minThreshold: 50,
      unit: 'Patches',
      lastFiledTime: 'Yesterday, 06:15 PM',
      todaySubmitted: false,
      hasIrregularity: true,
      irregularitySummary: 'Low Narcotic Reserve Warning: Stock dropped to 15 patches (Minimum threshold: 50 patches). Double-lock vault log under review.',
      traceabilitySteps: [
        { id: 'st-210', stepNumber: 1, timestamp: '01 Sep, 09:00 AM', eventType: 'Daily Declaration', qtyChange: 0, stockBalanceAfter: 40, unit: 'Patches', statusTag: 'Compliant', notes: 'Double-lock vault register verified' },
        { id: 'st-211', stepNumber: 2, timestamp: '01 Sep, 06:00 PM', eventType: 'Dispensing Sale', transactionId: 'TXN-2024-9912', qtyChange: -10, stockBalanceAfter: 30, unit: 'Patches', patientId: 'PAT-4412', patientName: 'Kavita Singh', doctorName: 'Dr. M. P. Saxena', doctorRegNo: 'DOC-ND-3341', statusTag: 'Compliant', notes: 'Oncology prescription verified' },
        { id: 'st-212', stepNumber: 3, timestamp: '02 Sep, 09:10 AM', eventType: 'Dispensing Sale', transactionId: 'TXN-2024-9938', qtyChange: -15, stockBalanceAfter: 15, unit: 'Patches', patientId: 'PAT-5510', patientName: 'Kavita Singh', doctorName: 'Dr. M. P. Saxena', doctorRegNo: 'DOC-ND-3341', statusTag: 'Under Review', notes: 'Repeat dispensation within 15 hours flagged' },
      ],
    },
    {
      id: 'trace-101',
      pharmacyId: 'ph-01',
      pharmacyName: 'Apex Medicos & Healthcare',
      licenseNumber: 'LIC-Z4-2024-001',
      zoneLocation: 'Sector 14, Zone 4',
      pharmacistName: 'Rajesh Kumar',
      pharmacistRegNo: 'REG-PH-8841',
      medicineName: 'Amoxicillin 500mg Capsule',
      batchNumber: 'AMX-2024-08',
      category: 'Schedule H1 Antibiotic',
      initialStock: 880,
      currentStock: 850,
      minThreshold: 200,
      unit: 'Capsules',
      lastFiledTime: 'Today, 09:30 AM',
      todaySubmitted: true,
      hasIrregularity: false,
      traceabilitySteps: [
        { id: 'st-101', stepNumber: 1, timestamp: '02 Sep, 08:00 AM', eventType: 'Daily Declaration', qtyChange: 0, stockBalanceAfter: 880, unit: 'Capsules', statusTag: 'Compliant', notes: 'Opening stock verified' },
        { id: 'st-102', stepNumber: 2, timestamp: '02 Sep, 09:15 AM', eventType: 'Dispensing Sale', transactionId: 'TXN-2024-9901', qtyChange: -30, stockBalanceAfter: 850, unit: 'Capsules', patientId: 'PAT-8812', patientName: 'Ramesh Patel', doctorName: 'Dr. N. K. Deshmukh', doctorRegNo: 'DOC-ND-4410', statusTag: 'Compliant', notes: 'Schedule H1 register entry verified' },
        { id: 'st-103', stepNumber: 3, timestamp: '02 Sep, 09:30 AM', eventType: 'Audit Verification', qtyChange: 0, stockBalanceAfter: 850, unit: 'Capsules', statusTag: 'Compliant', notes: 'Automated daily reconciliation verified' },
      ],
    },
    {
      id: 'trace-301',
      pharmacyId: 'ph-03',
      pharmacyName: 'City Pharma Chemist',
      licenseNumber: 'LIC-Z4-2023-089',
      zoneLocation: 'Main Market, Zone 4',
      pharmacistName: 'Amit Varma',
      pharmacistRegNo: 'REG-PH-7432',
      medicineName: 'Augmentin 625mg Duo Tablet',
      batchNumber: 'AUG-2024-19',
      category: 'Schedule H1 Antibiotic',
      initialStock: 1530,
      currentStock: 1450,
      minThreshold: 300,
      unit: 'Tablets',
      lastFiledTime: 'Today, 10:15 AM',
      todaySubmitted: true,
      hasIrregularity: true,
      irregularitySummary: 'Bulk Dispensation Alert: Single transaction of 80 units logged on 02 Sep 10:00 AM.',
      traceabilitySteps: [
        { id: 'st-301', stepNumber: 1, timestamp: '02 Sep, 08:30 AM', eventType: 'Daily Declaration', qtyChange: 0, stockBalanceAfter: 1530, unit: 'Tablets', statusTag: 'Compliant', notes: 'Opening inventory verified' },
        { id: 'st-302', stepNumber: 2, timestamp: '02 Sep, 10:00 AM', eventType: 'Dispensing Sale', transactionId: 'TXN-2024-9955', qtyChange: -80, stockBalanceAfter: 1450, unit: 'Tablets', patientId: 'PAT-6671', patientName: 'Geeta Rani', doctorName: 'Dr. P. S. Bhatia', doctorRegNo: 'DOC-ND-5512', statusTag: 'Flagged Spike', notes: 'Bulk prescription quantity flagged' },
      ],
    },
  ];

  // Available Pharmacies List
  const availablePharmacies = useMemo(() => {
    const map = new Map<string, { id: string; name: string; zone: string }>();
    mockTraceabilityRecords.forEach((rec) => {
      if (!map.has(rec.pharmacyId)) {
        map.set(rec.pharmacyId, { id: rec.pharmacyId, name: rec.pharmacyName, zone: rec.zoneLocation });
      }
    });
    return Array.from(map.values());
  }, [mockTraceabilityRecords]);

  // Medicines available for the selected pharmacy
  const availableMedicines = useMemo(() => {
    return mockTraceabilityRecords.filter((rec) => rec.pharmacyId === selectedPharmacyId);
  }, [mockTraceabilityRecords, selectedPharmacyId]);

  // Current Selected Traceability Record
  const currentRecord = useMemo(() => {
    const found = mockTraceabilityRecords.find(
      (rec) => rec.pharmacyId === selectedPharmacyId && rec.id === selectedMedicineId
    );
    if (found) return found;
    return availableMedicines[0] || mockTraceabilityRecords[0];
  }, [mockTraceabilityRecords, selectedPharmacyId, selectedMedicineId, availableMedicines]);

  return (
    <div className="inspector-track-trace-view">
      {/* 1. Page Header */}
      <div className="trace-page-header">
        <div>
          <h1 className="trace-page-title">Track &amp; Trace</h1>
          <p className="trace-page-subtitle">
            Audit trail and inventory-to-dispensing traceability connecting recorded stock declarations with patient sales records across Zone 4.
          </p>
        </div>
        <div className="trace-header-stats">
          <div className="header-stat-chip">
            <span className="stat-value">7</span>
            <span className="stat-label">Pharmacies Audited</span>
          </div>
          <div className="header-stat-chip chip-success">
            <span className="stat-value">28</span>
            <span className="stat-label">Batches Tracked</span>
          </div>
          <div className="header-stat-chip chip-warning">
            <span className="stat-value">97.4%</span>
            <span className="stat-label">Trace Integrity</span>
          </div>
        </div>
      </div>

      {/* 2. Pharmacy & Medicine Selection Bar */}
      <div className="trace-selector-card">
        <div className="selector-group-col">
          <label className="selector-label" htmlFor="trace-pharmacy-select">
            1. Select Monitored Pharmacy:
          </label>
          <select
            id="trace-pharmacy-select"
            className="trace-dropdown-select"
            value={selectedPharmacyId}
            onChange={(e) => {
              setSelectedPharmacyId(e.target.value);
              const firstMed = mockTraceabilityRecords.find((r) => r.pharmacyId === e.target.value);
              if (firstMed) setSelectedMedicineId(firstMed.id);
            }}
          >
            {availablePharmacies.map((pharm) => (
              <option key={pharm.id} value={pharm.id}>
                {pharm.name} ({pharm.zone})
              </option>
            ))}
          </select>
        </div>

        <div className="selector-group-col">
          <label className="selector-label" htmlFor="trace-medicine-select">
            2. Select Restricted Medicine Batch:
          </label>
          <select
            id="trace-medicine-select"
            className="trace-dropdown-select"
            value={currentRecord.id}
            onChange={(e) => setSelectedMedicineId(e.target.value)}
          >
            {availableMedicines.map((med) => (
              <option key={med.id} value={med.id}>
                {med.medicineName} (Batch: {med.batchNumber}) — {med.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Selected Medicine & Pharmacy Regulatory Summary Card */}
      <div className="inspector-card trace-summary-card">
        <div className="summary-banner-header">
          <div>
            <div className="banner-title-row">
              <h2 className="summary-pharmacy-name">{currentRecord.medicineName}</h2>
              <span className="license-pill">Batch: {currentRecord.batchNumber}</span>
              <span
                className={`category-pill ${
                  currentRecord.category.includes('Narcotic') ? 'cat-narcotic' : 'cat-antibiotic'
                }`}
              >
                {currentRecord.category}
              </span>
              {currentRecord.todaySubmitted ? (
                <span className="filing-chip filing-submitted">Filing Verified</span>
              ) : (
                <span className="filing-chip filing-pending">Filing Pending</span>
              )}
            </div>
            <span className="summary-pharmacy-sub">
              {currentRecord.pharmacyName} ({currentRecord.licenseNumber}) • Pharmacist: {currentRecord.pharmacistName} ({currentRecord.pharmacistRegNo})
            </span>
          </div>

          <div className="summary-header-right">
            <span className="last-updated-text">Last Filed: {currentRecord.lastFiledTime}</span>
          </div>
        </div>

        <div className="trace-kpi-grid">
          <div className="kpi-stat-box">
            <span className="kpi-box-title">Opening Stock Balance</span>
            <span className="kpi-box-main text-primary">{currentRecord.initialStock} {currentRecord.unit}</span>
            <span className="kpi-box-sub">Initial Audit Register Balance</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Current Recorded Balance</span>
            <span className="kpi-box-main text-secondary">{currentRecord.currentStock} {currentRecord.unit}</span>
            <span className="kpi-box-sub">Post-Transaction Inventory</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Minimum Reserve Threshold</span>
            <span className="kpi-box-main text-primary">{currentRecord.minThreshold} {currentRecord.unit}</span>
            <span className="kpi-box-sub">Mandatory Stock Baseline</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Trace Integrity Status</span>
            <span className={`kpi-box-main ${currentRecord.hasIrregularity ? 'text-warning' : 'text-success'}`}>
              {currentRecord.hasIrregularity ? 'Irregular Activity Flagged' : '100% Trace Verified'}
            </span>
            <span className="kpi-box-sub">Reconciliation Verification</span>
          </div>
        </div>

        {/* Irregularity Warning Box (if applicable) */}
        {currentRecord.hasIrregularity && (
          <div className="trace-irregularity-box">
            <div className="irregularity-top-line">
              <span className="irregularity-tag">INSPECTION WARNING</span>
              <span className="irregularity-time">Regulatory Flag Active</span>
            </div>
            <p className="irregularity-msg">{currentRecord.irregularitySummary}</p>
          </div>
        )}
      </div>

      {/* 4. Chronological Traceability Audit Trail & Table */}
      <div className="inspector-card trace-ledger-card">
        <div className="card-header table-header-flex">
          <div>
            <h2 className="card-title">Chronological Traceability Audit Ledger</h2>
            <span className="card-subtitle">
              Step-by-step audit sequence connecting stock declarations to patient dispensing transactions for {currentRecord.medicineName}
            </span>
          </div>
          <span className="compliance-count-badge">
            {currentRecord.traceabilitySteps.length} Audit Trail Steps
          </span>
        </div>

        <div className="trace-table-container internal-scroll-container">
          <table className="activity-table inspector-table">
            <thead>
              <tr>
                <th>Step #</th>
                <th>Date &amp; Time</th>
                <th>Event Type</th>
                <th>Transaction ID</th>
                <th className="text-right">Quantity Change</th>
                <th className="text-right">Post-Event Stock</th>
                <th>Patient Details</th>
                <th>Prescribed Doctor</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRecord.traceabilitySteps.map((step) => (
                <tr key={step.id}>
                  <td className="font-bold text-primary">#{step.stepNumber}</td>
                  <td className="color-secondary-text">{step.timestamp}</td>
                  <td>
                    <span className="event-type-chip">{step.eventType}</span>
                  </td>
                  <td className="font-mono text-muted">{step.transactionId || 'N/A'}</td>
                  <td className="text-right font-bold">
                    {step.qtyChange < 0 ? (
                      <span className="qty-minus">{step.qtyChange} {step.unit}</span>
                    ) : step.qtyChange > 0 ? (
                      <span className="qty-plus">+{step.qtyChange} {step.unit}</span>
                    ) : (
                      <span className="qty-zero">0 {step.unit}</span>
                    )}
                  </td>
                  <td className="text-right font-medium">{step.stockBalanceAfter} {step.unit}</td>
                  <td>
                    {step.patientId ? (
                      <div className="flex-col">
                        <span className="font-medium">{step.patientName}</span>
                        <span className="cell-sub-id">{step.patientId}</span>
                      </div>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>
                    {step.doctorRegNo ? (
                      <div className="flex-col">
                        <span className="font-medium">{step.doctorName}</span>
                        <span className="cell-sub-id">{step.doctorRegNo}</span>
                      </div>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="text-center">
                    <span
                      className={`status-badge ${
                        step.statusTag === 'Compliant'
                          ? 'in-stock'
                          : step.statusTag === 'Flagged Spike'
                          ? 'status-pending-badge'
                          : 'badge-critical'
                      }`}
                      title={step.notes || ''}
                    >
                      {step.statusTag}
                    </span>
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
