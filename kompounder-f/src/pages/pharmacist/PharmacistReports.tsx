import { useState } from 'react';
import './PharmacistReports.css';

type TimeframeOption = 'Today' | 'This Week' | 'This Month' | 'Custom Range';
type CategoryOption = 'All Medicines' | 'Antibiotics' | 'Narcotic Drugs';

interface StockMovementRow {
  name: string;
  category: string;
  openingStock: number;
  stockAdded: number;
  dispensed: number;
  currentBalance: number;
  status: 'In Stock' | 'Low Stock' | 'Attention' | 'Secure';
}

const stockMovementData: StockMovementRow[] = [
  { name: 'Amoxicillin 500mg', category: 'Antibiotic (Schedule H1)', openingStock: 1200, stockAdded: 400, dispensed: 480, currentBalance: 1120, status: 'In Stock' },
  { name: 'Fentanyl 50mcg Patch', category: 'Narcotic (Controlled)', openingStock: 60, stockAdded: 0, dispensed: 20, currentBalance: 40, status: 'Low Stock' },
  { name: 'Azithromycin 250mg', category: 'Antibiotic (Schedule H1)', openingStock: 700, stockAdded: 0, dispensed: 145, currentBalance: 555, status: 'In Stock' },
  { name: 'Morphine Sulfate 15mg', category: 'Narcotic (Controlled)', openingStock: 95, stockAdded: 0, dispensed: 22, currentBalance: 73, status: 'Attention' },
  { name: 'Ciprofloxacin 500mg', category: 'Antibiotic (Schedule H1)', openingStock: 900, stockAdded: 200, dispensed: 360, currentBalance: 740, status: 'In Stock' },
  { name: 'Paracetamol 650mg', category: 'Analgesic (General)', openingStock: 2500, stockAdded: 1000, dispensed: 1200, currentBalance: 2300, status: 'In Stock' },
];

export default function PharmacistReports() {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('This Week');
  const [categoryFilter, setCategoryFilter] = useState<CategoryOption>('All Medicines');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Dynamic summary metrics based on selected timeframe
  const getMetrics = () => {
    switch (timeframe) {
      case 'Today':
        return { totalStock: '14,820', totalDispensed: '284', antibiotics: '185', narcotics: '17' };
      case 'This Month':
        return { totalStock: '14,820', totalDispensed: '7,850', antibiotics: '4,620', narcotics: '395' };
      case 'Custom Range':
        return { totalStock: '14,820', totalDispensed: '3,410', antibiotics: '2,050', narcotics: '164' };
      case 'This Week':
      default:
        return { totalStock: '14,820', totalDispensed: '1,940', antibiotics: '1,120', narcotics: '98' };
    }
  };

  const metrics = getMetrics();

  // Dynamic SVG Trend Chart path coordinates depending on Category Filter
  const getChartPath = () => {
    if (categoryFilter === 'Antibiotics') {
      return {
        path: 'M 20 100 Q 75 80 130 90 T 240 50 T 350 35',
        area: 'M 20 100 Q 75 80 130 90 T 240 50 T 350 35 L 350 140 L 20 140 Z',
        points: [
          { cx: 20, cy: 100, val: 160 },
          { cx: 130, cy: 90, val: 180 },
          { cx: 240, cy: 50, val: 250 },
          { cx: 350, cy: 35, val: 185 },
        ],
        strokeColor: 'var(--color-warning)',
      };
    } else if (categoryFilter === 'Narcotic Drugs') {
      return {
        path: 'M 20 125 Q 75 120 130 115 T 240 105 T 350 95',
        area: 'M 20 125 Q 75 120 130 115 T 240 105 T 350 95 L 350 140 L 20 140 Z',
        points: [
          { cx: 20, cy: 125, val: 14 },
          { cx: 130, cy: 115, val: 18 },
          { cx: 240, cy: 105, val: 26 },
          { cx: 350, cy: 95, val: 17 },
        ],
        strokeColor: 'var(--color-danger)',
      };
    } else {
      return {
        path: 'M 20 110 Q 75 70 130 80 T 240 40 T 350 25',
        area: 'M 20 110 Q 75 70 130 80 T 240 40 T 350 25 L 350 140 L 20 140 Z',
        points: [
          { cx: 20, cy: 110, val: 280 },
          { cx: 130, cy: 80, val: 310 },
          { cx: 240, cy: 40, val: 420 },
          { cx: 350, cy: 25, val: 284 },
        ],
        strokeColor: 'var(--color-secondary)',
      };
    }
  };

  const chartData = getChartPath();

  return (
    <div className="reports-view-content">
      {/* 1. PAGE HEADER */}
      <div className="reports-view-header">
        <div>
          <h2 className="reports-view-title">Reports &amp; Analytics</h2>
          <p className="reports-view-desc">Review stock movement, dispensing activity, and usage trends.</p>
        </div>

        <div className="header-actions-group">
          {/* Timeframe Selector */}
          <div className="timeframe-selector-pill">
            {(['Today', 'This Week', 'This Month', 'Custom Range'] as TimeframeOption[]).map(option => (
              <button
                key={option}
                className={`timeframe-btn ${timeframe === option ? 'active' : ''}`}
                onClick={() => setTimeframe(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button className="btn btn-primary export-btn" onClick={() => setIsExportModalOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px', marginRight: '6px' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* 2. REPORT SUMMARY CARDS */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Total Stock</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value">{metrics.totalStock}</span>
            <span className="metric-label">Units across 182 items</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Today's Dispensed</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value" style={{ color: 'var(--color-secondary)' }}>{metrics.totalDispensed}</span>
            <span className="metric-label">Units issued ({timeframe})</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Antibiotics Dispensed</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value" style={{ color: 'var(--color-warning)' }}>{metrics.antibiotics}</span>
            <span className="metric-label">Schedule H1 restricted units</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-title">Narcotic Drugs Dispensed</span>
          </div>
          <div className="metric-card-body">
            <span className="metric-value" style={{ color: 'var(--color-danger)' }}>{metrics.narcotics}</span>
            <span className="metric-label">Double-lock secure units</span>
          </div>
        </div>
      </div>

      {/* 3. DAILY USAGE & 4. MONTHLY USAGE CHARTS (2-Column Grid) */}
      <div className="charts-grid">
        {/* Daily Usage Card */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="card-title">Daily Usage Trends</h3>
              <span className="card-subtitle">Dispensing volume across {timeframe.toLowerCase()}</span>
            </div>

            {/* Category Filter Toggles */}
            <div className="category-filter-pills">
              {(['All Medicines', 'Antibiotics', 'Narcotic Drugs'] as CategoryOption[]).map(cat => (
                <button
                  key={cat}
                  className={`cat-pill ${categoryFilter === cat ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-wrapper">
            <svg className="svg-trend-chart" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="reports-chart-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={chartData.strokeColor} stopOpacity="0.25" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="140" x2="380" y2="140" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="20" y1="95" x2="380" y2="95" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="50" x2="380" y2="50" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Area Fill */}
              <path d={chartData.area} fill="url(#reports-chart-grad)" />

              {/* Stroke Path */}
              <path
                d={chartData.path}
                fill="none"
                stroke={chartData.strokeColor}
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data Point Dots */}
              {chartData.points.map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.cx} cy={pt.cy} r="4" fill={chartData.strokeColor} />
                  <text x={pt.cx} y={pt.cy - 8} fontSize="9" fill="var(--color-text-secondary)" textAnchor="middle" fontWeight="bold">
                    {pt.val}
                  </text>
                </g>
              ))}
            </svg>

            <div className="chart-labels">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Monthly Usage Card */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="card-title">Monthly Usage Trends</h3>
              <span className="card-subtitle">Comparative unit volume over the last 5 months</span>
            </div>
          </div>

          <div className="bar-chart-container">
            {[
              { month: 'May', total: 6800, anti: 3900, narc: 310 },
              { month: 'Jun', total: 7200, anti: 4150, narc: 340 },
              { month: 'Jul', total: 7100, anti: 4000, narc: 325 },
              { month: 'Aug', total: 7900, anti: 4700, narc: 380 },
              { month: 'Sep', total: 7850, anti: 4620, narc: 395 },
            ].map((m, idx) => (
              <div key={idx} className="bar-group">
                <div className="bars-flex">
                  <div
                    className="bar bar-total"
                    style={{ height: `${(m.total / 8500) * 100}%` }}
                    title={`Total: ${m.total} units`}
                  ></div>
                  <div
                    className="bar bar-anti"
                    style={{ height: `${(m.anti / 8500) * 100}%` }}
                    title={`Antibiotics: ${m.anti} units`}
                  ></div>
                  <div
                    className="bar bar-narc"
                    style={{ height: `${(m.narc / 8500) * 100 * 5}%` }}
                    title={`Narcotics: ${m.narc} units`}
                  ></div>
                </div>
                <span className="bar-label">{m.month}</span>
              </div>
            ))}
          </div>

          {/* Bar Legend */}
          <div className="bar-legend">
            <div className="legend-item">
              <span className="legend-box bar-total"></span> Total Units
            </div>
            <div className="legend-item">
              <span className="legend-box bar-anti"></span> Antibiotics
            </div>
            <div className="legend-item">
              <span className="legend-box bar-narc"></span> Narcotics (5x scale)
            </div>
          </div>
        </div>
      </div>

      {/* 5. STOCK MOVEMENT LEDGER TABLE */}
      <div className="activity-layout-card">
        <div className="card-header">
          <h3 className="card-title">Stock Movement Register</h3>
          <span className="card-subtitle">Real-time inventory opening balances, additions, and dispensing counts.</span>
        </div>
        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Category</th>
                <th className="text-right">Opening Stock</th>
                <th className="text-right">Stock Added</th>
                <th className="text-right">Dispensed</th>
                <th className="text-right">Current Balance</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {stockMovementData.map((row, idx) => (
                <tr key={idx}>
                  <td className="font-semibold">{row.name}</td>
                  <td className="color-secondary-text">{row.category}</td>
                  <td className="text-right">{row.openingStock.toLocaleString()}</td>
                  <td className="text-right font-medium text-success">+{row.stockAdded.toLocaleString()}</td>
                  <td className="text-right font-medium text-warning">-{row.dispensed.toLocaleString()}</td>
                  <td className="text-right font-bold">{row.currentBalance.toLocaleString()}</td>
                  <td className="text-center">
                    <span className={`status-badge ${row.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. COMPLIANCE & ALERT SUMMARY */}
      <div className="compliance-summary-card">
        <div className="card-header">
          <h3 className="card-title">Compliance &amp; Risk Monitor</h3>
          <span className="card-subtitle">Regulatory inspection readiness and stock risk flags</span>
        </div>

        <div className="compliance-grid">
          <div className="compliance-item">
            <div className="compliance-item-top">
              <span className="item-title">Low Stock Watch</span>
              <span className="status-badge low-stock">Attention</span>
            </div>
            <p className="item-desc">2 items are below threshold limits: Fentanyl 50mcg (40 units) and Morphine 15mg (73 units).</p>
          </div>

          <div className="compliance-item">
            <div className="compliance-item-top">
              <span className="item-title">High Usage Surge</span>
              <span className="status-badge attention">Attention</span>
            </div>
            <p className="item-desc">Amoxicillin 500mg recorded a +42% demand increase compared to last week's baseline.</p>
          </div>

          <div className="compliance-item">
            <div className="compliance-item-top">
              <span className="item-title">Narcotic Log Integrity</span>
              <span className="status-badge normal">Normal</span>
            </div>
            <p className="item-desc">100% of controlled narcotic releases have verified doctor prescription entries and double-lock sign-offs.</p>
          </div>

          <div className="compliance-item">
            <div className="compliance-item-top">
              <span className="item-title">Inspection Audit Status</span>
              <span className="status-badge normal">Normal</span>
            </div>
            <p className="item-desc">Schedule H1 registers are fully reconciled and ready for Drug Inspector review.</p>
          </div>
        </div>
      </div>

      {/* 7. EXPORT REPORT MODAL */}
      {isExportModalOpen && (
        <div className="modal-overlay" onClick={() => setIsExportModalOpen(false)}>
          <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h3 className="modal-title">Export Pharmacy Report</h3>
                <p className="modal-subtitle" style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                  Download official compliance and stock ledgers for {timeframe.toLowerCase()}.
                </p>
              </div>
            </div>

            <div className="export-modal-body">
              <div className="form-group">
                <label className="form-label">Report Format</label>
                <select className="form-select" defaultValue="pdf">
                  <option value="pdf">PDF Audit Document (.pdf)</option>
                  <option value="csv">CSV Stock Register (.csv)</option>
                  <option value="excel">Excel Detailed Analytics (.xlsx)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Selected Timeframe</label>
                <input type="text" className="form-input" disabled value={timeframe} />
              </div>

              <div className="form-group">
                <label className="form-label">Category Filter</label>
                <input type="text" className="form-input" disabled value={categoryFilter} />
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setIsExportModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={() => {
                alert(`Exporting ${timeframe} report in PDF format...`);
                setIsExportModalOpen(false);
              }}>
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
