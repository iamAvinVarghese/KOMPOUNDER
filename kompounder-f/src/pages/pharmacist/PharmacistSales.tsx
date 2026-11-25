import { useState } from 'react';
import './PharmacistSales.css';

interface InventoryItem {
  name: string;
  category: 'Antibiotic' | 'Narcotic Drug' | 'Other';
  batchNumber: string;
  availableStock: number;
  expiryDate: string;
}

interface DispensingRecord {
  id: string;
  dateTime: string;
  medicineName: string;
  category: 'Antibiotic' | 'Narcotic Drug' | 'Other';
  batchNumber: string;
  quantity: number;
  patientName: string;
  patientMobile: string;
  patientDetails: string;
  doctorName: string;
  prescriptionNo: string;
  prescriptionDate: string;
  pharmacist: string;
  status: 'Recorded' | 'Verified';
}

const initialInventory: InventoryItem[] = [
  { name: 'Amoxicillin 500mg', category: 'Antibiotic', batchNumber: 'AMX-9021', availableStock: 1120, expiryDate: '2027-06-30' },
  { name: 'Fentanyl 50mcg Patch', category: 'Narcotic Drug', batchNumber: 'FTN-1102', availableStock: 40, expiryDate: '2026-11-15' },
  { name: 'Azithromycin 250mg', category: 'Antibiotic', batchNumber: 'AZT-4482', availableStock: 555, expiryDate: '2027-03-20' },
  { name: 'Morphine Sulfate 15mg', category: 'Narcotic Drug', batchNumber: 'MPH-8890', availableStock: 12, expiryDate: '2026-09-12' },
  { name: 'Ciprofloxacin 500mg', category: 'Antibiotic', batchNumber: 'CPR-7703', availableStock: 740, expiryDate: '2027-09-10' },
];

const initialRecords: DispensingRecord[] = [
  {
    id: 'DSP-2026-001',
    dateTime: '2026-09-01 09:15 AM',
    medicineName: 'Amoxicillin 500mg',
    category: 'Antibiotic',
    batchNumber: 'AMX-9021',
    quantity: 20,
    patientName: 'Ananya Sharma',
    patientMobile: '+91 98765 43210',
    patientDetails: 'Age 34, Female. Respiratory tract infection treatment.',
    doctorName: 'Dr. V. K. Nair',
    prescriptionNo: 'RX-99412',
    prescriptionDate: '2026-09-01',
    pharmacist: 'Rajesh Kumar (Reg. PH-98214)',
    status: 'Recorded',
  },
  {
    id: 'DSP-2026-002',
    dateTime: '2026-09-01 08:45 AM',
    medicineName: 'Fentanyl 50mcg Patch',
    category: 'Narcotic Drug',
    batchNumber: 'FTN-1102',
    quantity: 2,
    patientName: 'Rajesh Verma',
    patientMobile: '+91 98123 45678',
    patientDetails: 'Age 58, Male. Post-surgical pain control protocol.',
    doctorName: 'Dr. S. R. Mehta',
    prescriptionNo: 'RX-77210',
    prescriptionDate: '2026-08-31',
    pharmacist: 'Rajesh Kumar (Reg. PH-98214)',
    status: 'Verified',
  },
  {
    id: 'DSP-2026-003',
    dateTime: '2026-08-31 04:30 PM',
    medicineName: 'Azithromycin 250mg',
    category: 'Antibiotic',
    batchNumber: 'AZT-4482',
    quantity: 10,
    patientName: 'Priya Patel',
    patientMobile: '+91 97654 32109',
    patientDetails: 'Age 29, Female. ENT infection prescription.',
    doctorName: 'Dr. A. Menon',
    prescriptionNo: 'RX-66301',
    prescriptionDate: '2026-08-31',
    pharmacist: 'Rajesh Kumar (Reg. PH-98214)',
    status: 'Recorded',
  },
  {
    id: 'DSP-2026-004',
    dateTime: '2026-08-31 02:15 PM',
    medicineName: 'Morphine Sulfate 15mg',
    category: 'Narcotic Drug',
    batchNumber: 'MPH-8890',
    quantity: 5,
    patientName: 'Vikram Singh',
    patientMobile: '+91 99887 76655',
    patientDetails: 'Age 62, Male. Palliative pain management.',
    doctorName: 'Dr. R. K. Gupta',
    prescriptionNo: 'RX-88124',
    prescriptionDate: '2026-08-30',
    pharmacist: 'Rajesh Kumar (Reg. PH-98214)',
    status: 'Verified',
  },
  {
    id: 'DSP-2026-005',
    dateTime: '2026-08-30 11:10 AM',
    medicineName: 'Ciprofloxacin 500mg',
    category: 'Antibiotic',
    batchNumber: 'CPR-7703',
    quantity: 15,
    patientName: 'Meera Reddy',
    patientMobile: '+91 94433 22110',
    patientDetails: 'Age 41, Female. Urinary tract infection management.',
    doctorName: 'Dr. V. K. Nair',
    prescriptionNo: 'RX-44190',
    prescriptionDate: '2026-08-30',
    pharmacist: 'Rajesh Kumar (Reg. PH-98214)',
    status: 'Recorded',
  },
];

export default function PharmacistSales() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [records, setRecords] = useState<DispensingRecord[]>(initialRecords);

  // Filters State
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Antibiotic' | 'Narcotic Drug'>('All');
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | 'Past 7 Days'>('All');

  // Modal States
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DispensingRecord | null>(null);

  // Form State
  const [selectedMedName, setSelectedMedName] = useState<string>(initialInventory[0].name);
  const [qtyDispensed, setQtyDispensed] = useState<string>('1');
  const [patientName, setPatientName] = useState('');
  const [patientMobile, setPatientMobile] = useState('');
  const [patientDetails, setPatientDetails] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [prescriptionNo, setPrescriptionNo] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState(new Date().toISOString().split('T')[0]);
  const [pharmacistName] = useState('Rajesh Kumar (Reg. PH-98214)');
  const [narcoticVerified, setNarcoticVerified] = useState(false);

  // Currently selected medicine item info
  const selectedMedObj = inventory.find(m => m.name === selectedMedName) || inventory[0];

  // Summary Metrics calculations
  const totalTodayDispensed = records.reduce((acc, curr) => acc + curr.quantity, 0);
  const antibioticsDispensed = records
    .filter(r => r.category === 'Antibiotic')
    .reduce((acc, curr) => acc + curr.quantity, 0);
  const narcoticsDispensed = records
    .filter(r => r.category === 'Narcotic Drug')
    .reduce((acc, curr) => acc + curr.quantity, 0);
  const totalTransactionsToday = records.length;

  const handleRecordSale = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMedObj) {
      alert('Please select a valid medicine.');
      return;
    }

    const qty = parseInt(qtyDispensed, 10);
    if (isNaN(qty) || qty <= 0) {
      alert('Please enter a valid dispensing quantity.');
      return;
    }

    if (qty > selectedMedObj.availableStock) {
      alert(`Dispensing quantity cannot exceed available stock (${selectedMedObj.availableStock} units).`);
      return;
    }

    if (!patientName.trim() || !patientMobile.trim() || !doctorName.trim() || !prescriptionNo.trim()) {
      alert('Please fill out all required patient and prescription information.');
      return;
    }

    if (selectedMedObj.category === 'Narcotic Drug' && !narcoticVerified) {
      alert('Narcotic drug dispensing requires double-lock verification sign-off before recording.');
      return;
    }

    // 1. Deduct stock from inventory
    setInventory(prev =>
      prev.map(item =>
        item.name === selectedMedObj.name
          ? { ...item, availableStock: item.availableStock - qty }
          : item
      )
    );

    // 2. Format current date & time
    const now = new Date();
    const formattedDateTime = now.toISOString().split('T')[0] + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 3. Create new record
    const newRecord: DispensingRecord = {
      id: `DSP-2026-0${records.length + 1}`,
      dateTime: formattedDateTime,
      medicineName: selectedMedObj.name,
      category: selectedMedObj.category,
      batchNumber: selectedMedObj.batchNumber,
      quantity: qty,
      patientName: patientName.trim(),
      patientMobile: patientMobile.trim(),
      patientDetails: patientDetails.trim() || 'Standard outpatient prescription.',
      doctorName: doctorName.trim(),
      prescriptionNo: prescriptionNo.trim(),
      prescriptionDate: prescriptionDate,
      pharmacist: pharmacistName,
      status: selectedMedObj.category === 'Narcotic Drug' ? 'Verified' : 'Recorded',
    };

    setRecords([newRecord, ...records]);

    // Reset Form & Close Modal
    setQtyDispensed('1');
    setPatientName('');
    setPatientMobile('');
    setPatientDetails('');
    setDoctorName('');
    setPrescriptionNo('');
    setNarcoticVerified(false);
    setIsRecordModalOpen(false);
  };

  // Filter records
  const filteredRecords = records.filter(rec => {
    const matchesSearch =
      rec.medicineName.toLowerCase().includes(search.toLowerCase()) ||
      rec.patientName.toLowerCase().includes(search.toLowerCase()) ||
      rec.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      rec.prescriptionNo.toLowerCase().includes(search.toLowerCase()) ||
      rec.batchNumber.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || rec.category === categoryFilter;

    // Date filtering simulation
    let matchesDate = true;
    if (dateFilter === 'Today') {
      matchesDate = rec.dateTime.includes('2026-09-01');
    } else if (dateFilter === 'Past 7 Days') {
      matchesDate = rec.dateTime.includes('2026-09-01') || rec.dateTime.includes('2026-08-31') || rec.dateTime.includes('2026-08-30');
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <div className="sales-view-content">
      {/* 1. Header */}
      <div className="sales-view-header">
        <div>
          <h2 className="sales-view-title">Sales &amp; Dispensing</h2>
          <p className="sales-view-desc">Record and manage dispensing of antibiotics and narcotic medicines with patient and prescription details.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsRecordModalOpen(true)}>
          <span style={{ marginRight: 'var(--spacing-sm)', fontSize: '1.2rem', lineHeight: '1' }}>+</span>
          Record Sale
        </button>
      </div>

      {/* 2. Today's Dispensing Summary Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Today's Dispensed</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value">{totalTodayDispensed.toLocaleString()}</span>
            <span className="metric-label">Total dosage units dispensed</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Antibiotics Dispensed</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value" style={{ color: 'var(--color-warning)' }}>{antibioticsDispensed.toLocaleString()}</span>
            <span className="metric-label">Schedule H1 controlled units</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Narcotic Drugs Dispensed</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value" style={{ color: 'var(--color-danger)' }}>{narcoticsDispensed.toLocaleString()}</span>
            <span className="metric-label">Double-lock verified units</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Transactions Today</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value" style={{ color: 'var(--color-secondary)' }}>{totalTransactionsToday}</span>
            <span className="metric-label">Completed prescription logs</span>
          </div>
        </div>
      </div>

      {/* 3. Compliance Traceability Banner */}
      <div className="dispensing-compliance-banner">
        <div className="banner-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="banner-text">
          <h4 className="banner-title">Regulatory Dispensing &amp; Traceability Compliance</h4>
          <p className="banner-desc">
            All antibiotic and narcotic dispensing entries automatically update pharmacy stock balances, generate doctor-patient audit records, and ensure Schedule H1 &amp; Controlled Substances compliance.
          </p>
        </div>
      </div>

      {/* 4. Search and Filters Bar */}
      <div className="filters-bar-card">
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Search Dispensing Log</label>
            <input
              type="text"
              placeholder="Search by medicine, patient, doctor, or Rx #..."
              className="filter-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value as any)}
            >
              <option value="All">All Categories</option>
              <option value="Antibiotic">Antibiotics (Schedule H1)</option>
              <option value="Narcotic Drug">Narcotics (Controlled)</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Timeframe Filter</label>
            <select
              className="filter-select"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value as any)}
            >
              <option value="All">All Time</option>
              <option value="Today">Today</option>
              <option value="Past 7 Days">Past 7 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. Dispensing Records Table */}
      <div className="activity-layout-card">
        <div className="card-header">
          <h3 className="card-title">Recent Dispensing Records</h3>
          <span className="card-subtitle">Click on any record row to inspect full patient and prescription details.</span>
        </div>
        <div className="activity-table-container">
          <table className="activity-table clickable-rows">
            <thead>
              <tr>
                <th>Date &amp; Time</th>
                <th>Medicine</th>
                <th>Category</th>
                <th className="text-right">Quantity</th>
                <th>Patient Name</th>
                <th>Prescribed Doctor</th>
                <th>Batch No.</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((rec) => (
                <tr key={rec.id} onClick={() => setSelectedRecord(rec)}>
                  <td className="color-secondary-text font-medium">{rec.dateTime}</td>
                  <td className="font-semibold">{rec.medicineName}</td>
                  <td className="color-secondary-text">{rec.category}</td>
                  <td className="text-right font-bold text-primary">{rec.quantity}</td>
                  <td className="font-medium">{rec.patientName}</td>
                  <td className="color-secondary-text">{rec.doctorName}</td>
                  <td><code className="batch-code">{rec.batchNumber}</code></td>
                  <td className="text-center">
                    <span className={`status-badge ${rec.status.toLowerCase()}`}>
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center" style={{ padding: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
                    No matching dispensing records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Record Sale Modal */}
      {isRecordModalOpen && (
        <div className="modal-overlay" onClick={() => setIsRecordModalOpen(false)}>
          <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <div className="modal-header">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h3 className="modal-title">Record Medicine Dispensing</h3>
                <p className="modal-subtitle" style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                  Log prescription issuance with real-time stock deduction.
                </p>
              </div>
            </div>

            <form onSubmit={handleRecordSale}>
              <div className="modal-form-grid">
                {/* Section 1: Medicine Selection */}
                <div className="form-section-title" style={{ gridColumn: 'span 2' }}>
                  1. Medicine &amp; Stock Selection
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Select Inventory Medicine *</label>
                  <select
                    className="form-select"
                    value={selectedMedName}
                    onChange={e => setSelectedMedName(e.target.value)}
                  >
                    {inventory.map(item => (
                      <option key={item.name} value={item.name}>
                        {item.name} ({item.category}) — Batch: {item.batchNumber} — Available: {item.availableStock} units
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Medicine Info Card */}
                {selectedMedObj && (
                  <div className="selected-med-info-box" style={{ gridColumn: 'span 2' }}>
                    <div className="med-info-pill">
                      <span className="info-label">Category:</span>
                      <span className="info-val font-semibold">{selectedMedObj.category}</span>
                    </div>
                    <div className="med-info-pill">
                      <span className="info-label">Batch No:</span>
                      <span className="info-val font-semibold">{selectedMedObj.batchNumber}</span>
                    </div>
                    <div className="med-info-pill">
                      <span className="info-label">Available Stock:</span>
                      <span className="info-val font-bold" style={{ color: selectedMedObj.availableStock < 50 ? 'var(--color-danger)' : 'var(--color-secondary)' }}>
                        {selectedMedObj.availableStock} units
                      </span>
                    </div>
                    <div className="med-info-pill">
                      <span className="info-label">Expiry Date:</span>
                      <span className="info-val font-semibold">{selectedMedObj.expiryDate}</span>
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Quantity to Dispense *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={selectedMedObj ? selectedMedObj.availableStock : 9999}
                    className="form-input"
                    value={qtyDispensed}
                    onChange={e => setQtyDispensed(e.target.value)}
                  />
                  {selectedMedObj && parseInt(qtyDispensed, 10) > selectedMedObj.availableStock && (
                    <span className="form-error-msg" style={{ marginTop: 'var(--spacing-xs)', display: 'block' }}>
                      Entered quantity exceeds available stock ({selectedMedObj.availableStock} max).
                    </span>
                  )}
                </div>

                {/* Narcotic Drug Warning Box */}
                {selectedMedObj && selectedMedObj.category === 'Narcotic Drug' && (
                  <div className="narcotic-alert-banner" style={{ gridColumn: 'span 2' }}>
                    <div className="narcotic-alert-header">
                      <span className="narcotic-badge">CONTROLLED NARCOTIC SUBSTANCE</span>
                      <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold' }}>Schedule X / Double-Lock Regulated</span>
                    </div>
                    <p className="narcotic-alert-desc">
                      This medicine requires mandatory patient verification, doctor registration log checks, and dual-authorization sign-off.
                    </p>
                    <label className="narcotic-verify-checkbox">
                      <input
                        type="checkbox"
                        checked={narcoticVerified}
                        onChange={e => setNarcoticVerified(e.target.checked)}
                      />
                      <span>I confirm double-lock box release and verify doctor prescription legitimacy.</span>
                    </label>
                  </div>
                )}

                {/* Section 2: Patient Information */}
                <div className="form-section-title" style={{ gridColumn: 'span 2' }}>
                  2. Patient Information
                </div>

                <div className="form-group">
                  <label className="form-label">Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    className="form-input"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile / ID Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98765 43210"
                    className="form-input"
                    value={patientMobile}
                    onChange={e => setPatientMobile(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Relevant Clinical / Patient Details</label>
                  <input
                    type="text"
                    placeholder="e.g. Age 45, Male. Outpatient treatment notes..."
                    className="form-input"
                    value={patientDetails}
                    onChange={e => setPatientDetails(e.target.value)}
                  />
                </div>

                {/* Section 3: Prescription Information */}
                <div className="form-section-title" style={{ gridColumn: 'span 2' }}>
                  3. Prescription &amp; Doctor Traceability
                </div>

                <div className="form-group">
                  <label className="form-label">Prescribed Doctor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. V. K. Nair"
                    className="form-input"
                    value={doctorName}
                    onChange={e => setDoctorName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Prescription / Ref Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. RX-99412"
                    className="form-input"
                    value={prescriptionNo}
                    onChange={e => setPrescriptionNo(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Prescription Date *</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={prescriptionDate}
                    onChange={e => setPrescriptionDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Responsible Pharmacist</label>
                  <input
                    type="text"
                    disabled
                    className="form-input"
                    value={pharmacistName}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setIsRecordModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm &amp; Dispense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Transaction Details Modal Popup */}
      {selectedRecord && (
        <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px' }}>
            <div className="modal-header">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h3 className="modal-title">Dispensing Record: {selectedRecord.id}</h3>
                <span className={`status-badge ${selectedRecord.status.toLowerCase()}`} style={{ marginTop: '4px', display: 'inline-block' }}>
                  {selectedRecord.status}
                </span>
              </div>
            </div>

            <div className="sales-detail-body">
              <div className="detail-meta-grid">
                <div className="meta-card">
                  <span className="meta-label">Medicine</span>
                  <span className="meta-val font-semibold">{selectedRecord.medicineName}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Category</span>
                  <span className="meta-val font-semibold">{selectedRecord.category}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Batch No.</span>
                  <span className="meta-val font-semibold">{selectedRecord.batchNumber}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Quantity Dispensed</span>
                  <span className="meta-val font-bold" style={{ color: 'var(--color-primary)' }}>{selectedRecord.quantity} units</span>
                </div>
                <div className="meta-card" style={{ gridColumn: 'span 2' }}>
                  <span className="meta-label">Date &amp; Time</span>
                  <span className="meta-val font-medium">{selectedRecord.dateTime}</span>
                </div>
              </div>

              {/* Patient Details Box */}
              <div className="record-section-box">
                <h5 className="section-box-title">Patient Record</h5>
                <div className="section-box-content">
                  <p><strong>Name:</strong> {selectedRecord.patientName}</p>
                  <p><strong>Mobile / ID:</strong> {selectedRecord.patientMobile}</p>
                  <p><strong>Clinical Notes:</strong> {selectedRecord.patientDetails}</p>
                </div>
              </div>

              {/* Doctor Details Box */}
              <div className="record-section-box">
                <h5 className="section-box-title">Prescription &amp; Doctor Traceability</h5>
                <div className="section-box-content">
                  <p><strong>Prescribing Doctor:</strong> {selectedRecord.doctorName}</p>
                  <p><strong>Prescription Ref #:</strong> <code className="batch-code">{selectedRecord.prescriptionNo}</code></p>
                  <p><strong>Prescription Date:</strong> {selectedRecord.prescriptionDate}</p>
                </div>
              </div>

              {/* Responsible Pharmacist */}
              <div className="record-section-box" style={{ backgroundColor: 'rgba(12, 130, 124, 0.05)', borderColor: 'rgba(12, 130, 124, 0.2)' }}>
                <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-dark)' }}>
                  <strong>Authorized Sign-off Pharmacist:</strong> {selectedRecord.pharmacist}
                </p>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => setSelectedRecord(null)}>Close Record</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
