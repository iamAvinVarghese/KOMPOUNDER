import { useState } from 'react';
import './PharmacistInventory.css';

interface StockMovement {
  date: string;
  action: string;
  quantity: number;
  balance: number;
}

interface Medicine {
  name: string;
  category: 'Antibiotic' | 'Narcotic Drug' | 'Other';
  batchNumber: string;
  openingStock: number;
  stockAdded: number;
  dispensed: number;
  currentBalance: number;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Secure';
  details?: string;
  history: StockMovement[];
}

const initialMedicines: Medicine[] = [
  {
    name: 'Amoxicillin 500mg',
    category: 'Antibiotic',
    batchNumber: 'AMX-9021',
    openingStock: 1200,
    stockAdded: 0,
    dispensed: 80,
    currentBalance: 1120,
    lastUpdated: '2026-08-20',
    status: 'In Stock',
    details: 'Broad-spectrum antibiotic. Restricted Schedule H1 classification.',
    history: [
      { date: '2026-08-15', action: 'Initial Stocking', quantity: 1200, balance: 1200 },
      { date: '2026-08-19', action: 'Dispensed', quantity: -80, balance: 1120 },
    ],
  },
  {
    name: 'Fentanyl 50mcg Patch',
    category: 'Narcotic Drug',
    batchNumber: 'FTN-1102',
    openingStock: 45,
    stockAdded: 0,
    dispensed: 5,
    currentBalance: 40,
    lastUpdated: '2026-08-20',
    status: 'Secure',
    details: 'High potency opioid analgesic. Strict double-lock custody required.',
    history: [
      { date: '2026-08-10', action: 'Initial Stocking', quantity: 45, balance: 45 },
      { date: '2026-08-18', action: 'Dispensed', quantity: -5, balance: 40 },
    ],
  },
  {
    name: 'Azithromycin 250mg',
    category: 'Antibiotic',
    batchNumber: 'AZT-4482',
    openingStock: 600,
    stockAdded: 100,
    dispensed: 145,
    currentBalance: 555,
    lastUpdated: '2026-08-20',
    status: 'In Stock',
    details: 'Macrolide antibiotic. Keep in cool dry place.',
    history: [
      { date: '2026-08-12', action: 'Initial Stocking', quantity: 600, balance: 600 },
      { date: '2026-08-17', action: 'Added Stock', quantity: 100, balance: 700 },
      { date: '2026-08-19', action: 'Dispensed', quantity: -145, balance: 555 },
    ],
  },
  {
    name: 'Morphine Sulfate 15mg',
    category: 'Narcotic Drug',
    batchNumber: 'MPH-8890',
    openingStock: 85,
    stockAdded: 0,
    dispensed: 73,
    currentBalance: 12,
    lastUpdated: '2026-08-20',
    status: 'Low Stock',
    details: 'Narcotic pain medication. Double lock verification and sign-off audits mandatory.',
    history: [
      { date: '2026-08-05', action: 'Initial Stocking', quantity: 85, balance: 85 },
      { date: '2026-08-19', action: 'Dispensed', quantity: -73, balance: 12 },
    ],
  },
  {
    name: 'Ciprofloxacin 500mg',
    category: 'Antibiotic',
    batchNumber: 'CPR-7703',
    openingStock: 800,
    stockAdded: 0,
    dispensed: 60,
    currentBalance: 740,
    lastUpdated: '2026-08-20',
    status: 'In Stock',
    details: 'Fluoroquinolone antibiotic. Dispense with caution.',
    history: [
      { date: '2026-08-14', action: 'Initial Stocking', quantity: 800, balance: 800 },
      { date: '2026-08-18', action: 'Dispensed', quantity: -60, balance: 740 },
    ],
  },
];

export default function PharmacistInventory() {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Antibiotic' | 'Narcotic Drug'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In Stock' | 'Low Stock' | 'Secure'>('All');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<'Antibiotic' | 'Narcotic Drug' | 'Other'>('Other');
  const [formBatch, setFormBatch] = useState('');
  const [formQty, setFormQty] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formDetails, setFormDetails] = useState('');

  // Daily Update State
  const [dailyStatus, setDailyStatus] = useState<'Pending' | 'Submitted Today'>(() => {
    return localStorage.getItem('kompounder_daily_stock_submitted') === 'true' ? 'Submitted Today' : 'Pending';
  });
  const [lastSubmittedTime, setLastSubmittedTime] = useState<string>(() => {
    return localStorage.getItem('kompounder_daily_stock_last_time') || 'Not submitted today';
  });
  const [isDailyStockModalOpen, setIsDailyStockModalOpen] = useState(false);

  // Summary Metrics calculation
  const totalStockCount = medicines.reduce((acc, curr) => acc + curr.currentBalance, 0);
  const antibioticCount = medicines.filter(m => m.category === 'Antibiotic').reduce((acc, curr) => acc + curr.currentBalance, 0);
  const narcoticCount = medicines.filter(m => m.category === 'Narcotic Drug').reduce((acc, curr) => acc + curr.currentBalance, 0);
  const lowStockCount = medicines.filter(m => m.status === 'Low Stock').length;

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formBatch || !formQty || !formDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const qty = parseInt(formQty, 10);
    const existingIndex = medicines.findIndex(m => m.name.toLowerCase() === formName.toLowerCase() && m.batchNumber === formBatch);

    if (existingIndex > -1) {
      // Update existing item
      const updated = [...medicines];
      const target = updated[existingIndex];
      target.stockAdded += qty;
      target.currentBalance += qty;
      target.lastUpdated = formDate;
      target.history.push({
        date: formDate,
        action: 'Added Stock',
        quantity: qty,
        balance: target.currentBalance,
      });
      // Re-evaluate status
      if (target.category === 'Narcotic Drug') {
        target.status = 'Secure';
      } else {
        target.status = target.currentBalance < 50 ? 'Low Stock' : 'In Stock';
      }
      setMedicines(updated);
    } else {
      // Create new medicine item
      const newMed: Medicine = {
        name: formName,
        category: formCategory,
        batchNumber: formBatch,
        openingStock: qty,
        stockAdded: 0,
        dispensed: 0,
        currentBalance: qty,
        lastUpdated: formDate,
        status: formCategory === 'Narcotic Drug' ? 'Secure' : qty < 50 ? 'Low Stock' : 'In Stock',
        details: formDetails,
        history: [{ date: formDate, action: 'Initial Stocking', quantity: qty, balance: qty }],
      };
      setMedicines([newMed, ...medicines]);
    }

    // Reset Form
    setFormName('');
    setFormCategory('Other');
    setFormBatch('');
    setFormQty('');
    setFormDate('');
    setFormDetails('');
    setIsAddModalOpen(false);
  };

  const handleConfirmDailySubmit = () => {
    if (medicines.length === 0) {
      alert('No inventory stock available for submission.');
      return;
    }

    const now = new Date();
    const formattedTime = now.toISOString().split('T')[0] + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setDailyStatus('Submitted Today');
    setLastSubmittedTime(formattedTime);

    try {
      localStorage.setItem('kompounder_daily_stock_submitted', 'true');
      localStorage.setItem('kompounder_daily_stock_last_time', formattedTime);
    } catch (e) {
      // Storage fallback
    }

    setIsDailyStockModalOpen(false);
    alert(`Daily stock update successfully submitted to Assigned Drug Inspector Dr. A. K. Sharma on ${formattedTime}.`);
  };

  // Filter medicines
  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(search.toLowerCase()) || med.batchNumber.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || med.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || med.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="inventory-view-content">
      {/* 1. Header */}
      <div className="inventory-view-header">
        <div>
          <h2 className="inventory-view-title">Inventory</h2>
          <p className="inventory-view-desc">Manage and update pharmacy medicine stock levels and track regulatory classifications.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <span style={{ marginRight: 'var(--spacing-sm)', fontSize: '1.2rem', lineHeight: '1' }}>+</span>
          Add Stock
        </button>
      </div>

      {/* 2. Stock Summary Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Total Stock</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value">{totalStockCount.toLocaleString()}</span>
            <span className="metric-label">Total available units</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Antibiotics</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value">{antibioticCount.toLocaleString()}</span>
            <span className="metric-label">Schedule H1 classified</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Narcotic Drugs</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value">{narcoticCount.toLocaleString()}</span>
            <span className="metric-label">Secure lock inventory</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Low Stock</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value" style={{ color: 'var(--color-danger)' }}>{lowStockCount}</span>
            <span className="metric-label">Items requiring restock</span>
          </div>
        </div>
      </div>

      {/* 3. Daily Stock Update Box */}
      <div className="daily-compliance-card">
        <div className="compliance-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="compliance-info">
          <div className="compliance-header-line" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: '4px' }}>
            <h4 className="compliance-title" style={{ margin: 0 }}>Daily Stock Update</h4>
            <span className={`status-badge ${dailyStatus === 'Submitted Today' ? 'in-stock' : 'low-stock'}`}>
              {dailyStatus}
            </span>
          </div>
          <p className="compliance-text">
            <strong>Last submitted:</strong> {lastSubmittedTime} &nbsp;|&nbsp; <strong>Assigned Inspector:</strong> Dr. A. K. Sharma (Drugs Inspector, Zone 4)
          </p>
        </div>
        <button 
          className={`btn ${dailyStatus === 'Submitted Today' ? 'btn-outline' : 'btn-primary'}`} 
          onClick={() => setIsDailyStockModalOpen(true)}
        >
          {dailyStatus === 'Submitted Today' ? 'View / Resubmit Daily Stock' : 'Submit Daily Stock'}
        </button>
      </div>

      {/* 4. Search & Filters Bar */}
      <div className="filters-bar-card">
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Search Medicine</label>
            <input
              type="text"
              placeholder="Search by name or batch..."
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
              <option value="Antibiotic">Antibiotics (H1)</option>
              <option value="Narcotic Drug">Narcotics (Secure)</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Stock Status</label>
            <select 
              className="filter-select" 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value as any)}
            >
              <option value="All">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Secure">Secure Lock</option>
              <option value="Low Stock">Low Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. Inventory Table */}
      <div className="activity-layout-card">
        <div className="card-header">
          <h3 className="card-title">Pharmacy Stock Register</h3>
          <span className="card-subtitle">Click on any row to view stock movements and logs.</span>
        </div>
        <div className="activity-table-container">
          <table className="activity-table clickable-rows">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Category</th>
                <th>Batch No.</th>
                <th className="text-right">Opening</th>
                <th className="text-right">Added</th>
                <th className="text-right">Dispensed</th>
                <th className="text-right">Current Balance</th>
                <th>Last Updated</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((med, idx) => (
                <tr key={idx} onClick={() => setSelectedMed(med)}>
                  <td className="font-semibold">{med.name}</td>
                  <td className="color-secondary-text">{med.category}</td>
                  <td><code className="batch-code">{med.batchNumber}</code></td>
                  <td className="text-right">{med.openingStock}</td>
                  <td className="text-right text-success font-medium">+{med.stockAdded}</td>
                  <td className="text-right text-warning font-medium">-{med.dispensed}</td>
                  <td className="text-right font-semibold">{med.currentBalance}</td>
                  <td className="color-secondary-text">{med.lastUpdated}</td>
                  <td className="text-center">
                    <span className={`status-badge ${med.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {med.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredMedicines.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center" style={{ padding: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
                    No matching medicines found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reports Quick Link Panel */}
      <div className="usage-reports-link-card">
        <div className="reports-link-info">
          <span className="reports-link-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </span>
          <div>
            <h4 className="reports-link-title">Dispensing &amp; Usage Reports</h4>
            <p className="reports-link-text">Monitor daily and monthly restricted substance trends for narcotics auditing files.</p>
          </div>
        </div>
        <div className="reports-link-actions">
          <button className="btn btn-outline" disabled title="Reports page implementation pending">View Daily Trends</button>
          <button className="btn btn-outline" disabled title="Reports page implementation pending">Monthly Logs</button>
        </div>
      </div>

      {/* 6. Add Stock Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Record Stock Entry</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddStock}>
              <div className="modal-form-grid">
                <div className="form-group">
                  <label className="form-label">Medicine Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amoxicillin 500mg"
                    className="form-input"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select 
                    className="form-select" 
                    value={formCategory} 
                    onChange={e => setFormCategory(e.target.value as any)}
                  >
                    <option value="Other">Other</option>
                    <option value="Antibiotic">Antibiotic (Schedule H1)</option>
                    <option value="Narcotic Drug">Narcotic Drug (Secure Lock)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Batch Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BAT-2092"
                    className="form-input"
                    value={formBatch}
                    onChange={e => setFormBatch(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Quantity Received *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 500"
                    className="form-input"
                    value={formQty}
                    onChange={e => setFormQty(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Date Received *</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Medicine Details / Storage Instructions</label>
                  <textarea
                    rows={3}
                    placeholder="Provide storage notes or compliance flags..."
                    className="form-textarea"
                    value={formDetails}
                    onChange={e => setFormDetails(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Stock Details Side Panel */}
      {selectedMed && (
        <div className="modal-overlay" onClick={() => setSelectedMed(null)}>
          <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">{selectedMed.name}</h3>
                <span className="status-badge" style={{ marginTop: 'var(--spacing-xs)', display: 'inline-block' }}>
                  {selectedMed.category}
                </span>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedMed(null)}>&times;</button>
            </div>
            
            <div className="med-detail-body">
              <div className="detail-meta-grid">
                <div className="meta-card">
                  <span className="meta-label">Batch Number</span>
                  <span className="meta-val font-semibold">{selectedMed.batchNumber}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Current Stock</span>
                  <span className="meta-val font-bold" style={{ color: 'var(--color-secondary)' }}>{selectedMed.currentBalance}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Status</span>
                  <span className={`status-badge ${selectedMed.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {selectedMed.status}
                  </span>
                </div>
              </div>

              {selectedMed.details && (
                <div className="detail-description-box">
                  <strong>Notes:</strong> {selectedMed.details}
                </div>
              )}

              <h4 style={{ margin: 'var(--spacing-lg) 0 var(--spacing-sm) 0', color: 'var(--color-primary)' }}>Stock Movement Logs</h4>
              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Action</th>
                      <th className="text-right">Qty Change</th>
                      <th className="text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMed.history.map((log, idx) => (
                      <tr key={idx}>
                        <td>{log.date}</td>
                        <td className="font-medium">{log.action}</td>
                        <td className={`text-right font-bold ${log.quantity > 0 ? 'text-success' : 'text-danger'}`}>
                          {log.quantity > 0 ? `+${log.quantity}` : log.quantity}
                        </td>
                        <td className="text-right font-semibold">{log.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => setSelectedMed(null)}>Close Details</button>
            </div>
          </div>
        </div>
      )}
      {/* 8. Daily Stock Submission Modal */}
      {isDailyStockModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDailyStockModalOpen(false)}>
          <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '720px' }}>
            <div className="modal-header">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h3 className="modal-title">Daily Stock Submission</h3>
                <p className="modal-subtitle" style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                  Official daily inventory declaration for Drug Inspector audit &amp; compliance verification.
                </p>
              </div>
            </div>

            <div className="daily-submit-modal-body">
              {/* Inspection Meta Box */}
              <div className="inspection-meta-box">
                <div className="meta-pill">
                  <span className="meta-pill-label">Submission Date:</span>
                  <span className="meta-pill-val font-semibold">{new Date().toISOString().split('T')[0]}</span>
                </div>
                <div className="meta-pill">
                  <span className="meta-pill-label">Pharmacy Name:</span>
                  <span className="meta-pill-val font-semibold">Aptivora Care Pharmacy (Lic # PH-DL-9941)</span>
                </div>
                <div className="meta-pill" style={{ gridColumn: 'span 2' }}>
                  <span className="meta-pill-label">Assigned Drug Inspector:</span>
                  <span className="meta-pill-val font-semibold">Dr. A. K. Sharma (Drugs Inspector, Zone 4)</span>
                </div>
              </div>

              {/* Current Stock Summary Bar */}
              <div className="stock-summary-bar">
                <div className="summary-chip">
                  <span className="chip-label">Total Items:</span>
                  <span className="chip-val font-bold">{medicines.length} items</span>
                </div>
                <div className="summary-chip">
                  <span className="chip-label">Antibiotics:</span>
                  <span className="chip-val font-bold text-warning">
                    {medicines.filter(m => m.category === 'Antibiotic').length} items
                  </span>
                </div>
                <div className="summary-chip">
                  <span className="chip-label">Narcotic Drugs:</span>
                  <span className="chip-val font-bold text-danger">
                    {medicines.filter(m => m.category === 'Narcotic Drug').length} items
                  </span>
                </div>
              </div>

              {/* Stock Data Table */}
              <div className="modal-table-container">
                <table className="modal-stock-table">
                  <thead>
                    <tr>
                      <th>Medicine Name</th>
                      <th>Category</th>
                      <th className="text-right">Opening Stock</th>
                      <th className="text-right">Stock Added</th>
                      <th className="text-right">Dispensed</th>
                      <th className="text-right">Current Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((m, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold">{m.name}</td>
                        <td>
                          <span className={`category-pill ${m.category.toLowerCase().replace(/\s+/g, '-')}`}>
                            {m.category}
                          </span>
                        </td>
                        <td className="text-right">{m.openingStock}</td>
                        <td className="text-right text-success">+{m.stockAdded}</td>
                        <td className="text-right text-warning">-{m.dispensed}</td>
                        <td className="text-right font-bold text-primary">{m.openingStock + m.stockAdded - m.dispensed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-outline" onClick={() => setIsDailyStockModalOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleConfirmDailySubmit}>
                Confirm &amp; Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
