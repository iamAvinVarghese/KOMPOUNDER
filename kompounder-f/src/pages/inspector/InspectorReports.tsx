import React, { useState, useMemo } from 'react';
import type { PharmacyUsageReport } from './types';
import './InspectorReports.css';

export const InspectorReports: React.FC = () => {
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string>('ph-02');
  const [reportPeriod, setReportPeriod] = useState<'Daily' | 'Monthly'>('Daily');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Presentation-ready mock usage report datasets
  const mockUsageReports: PharmacyUsageReport[] = [
    {
      pharmacyId: 'ph-02',
      pharmacyName: 'Care Pharmacy & Surgical',
      licenseNumber: 'LIC-Z4-2024-014',
      zoneLocation: 'Civil Lines, Zone 4',
      pharmacistName: 'Priya Sharma',
      pharmacistRegNo: 'REG-PH-9120',
      dailyAntibioticDispensed: 240,
      dailyNarcoticDispensed: 25,
      monthlyAntibioticDispensed: 1840,
      monthlyNarcoticDispensed: 160,
      currentAntibioticStock: 2150,
      currentNarcoticStock: 40,
      dailyUsageTrend: [
        { label: 'Mon', antibioticVal: 180, narcoticVal: 15, x: 30, yA: 110, yN: 145 },
        { label: 'Tue', antibioticVal: 210, narcoticVal: 18, x: 90, yA: 100, yN: 142 },
        { label: 'Wed', antibioticVal: 190, narcoticVal: 12, x: 150, yA: 108, yN: 148 },
        { label: 'Thu', antibioticVal: 260, narcoticVal: 22, x: 210, yA: 85, yN: 138 },
        { label: 'Fri', antibioticVal: 310, narcoticVal: 28, x: 270, yA: 68, yN: 132 },
        { label: 'Sat', antibioticVal: 380, narcoticVal: 35, x: 330, yA: 45, yN: 125 },
        { label: 'Sun', antibioticVal: 240, narcoticVal: 25, x: 390, yA: 90, yN: 135 },
      ],
      monthlyUsageTrend: [
        { label: 'May', antibioticVal: 1420, narcoticVal: 110, x: 30, yA: 120, yN: 148 },
        { label: 'Jun', antibioticVal: 1580, narcoticVal: 135, x: 102, yA: 105, yN: 142 },
        { label: 'Jul', antibioticVal: 1690, narcoticVal: 142, x: 174, yA: 95, yN: 140 },
        { label: 'Aug', antibioticVal: 1750, narcoticVal: 155, x: 246, yA: 88, yN: 135 },
        { label: 'Sep', antibioticVal: 1840, narcoticVal: 160, x: 318, yA: 80, yN: 132 },
        { label: 'Oct (Proj)', antibioticVal: 1920, narcoticVal: 170, x: 390, yA: 72, yN: 128 },
      ],
      dailyMatrix: [
        { id: 'mat-101', periodDate: '02 Sep 2024 (Today)', medicineName: 'Amoxicillin 500mg Capsule', category: 'Schedule H1 Antibiotic', qtyDispensed: 120, unit: 'Capsules', stockBalance: 140, filingStatus: 'Pending' },
        { id: 'mat-102', periodDate: '02 Sep 2024 (Today)', medicineName: 'Fentanyl 50mcg Transdermal Patch', category: 'Narcotic / Double-Lock', qtyDispensed: 15, unit: 'Patches', stockBalance: 15, filingStatus: 'Pending' },
        { id: 'mat-103', periodDate: '01 Sep 2024 (Yesterday)', medicineName: 'Ciprofloxacin 500mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 30, unit: 'Tablets', stockBalance: 950, filingStatus: 'Submitted' },
        { id: 'mat-104', periodDate: '01 Sep 2024 (Yesterday)', medicineName: 'Levofloxacin 500mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 20, unit: 'Tablets', stockBalance: 960, filingStatus: 'Submitted' },
        { id: 'mat-105', periodDate: '01 Sep 2024 (Yesterday)', medicineName: 'Morphine Sulphate 10mg Injection', category: 'Narcotic / Double-Lock', qtyDispensed: 10, unit: 'Ampoules', stockBalance: 30, filingStatus: 'Submitted' },
      ],
      monthlyMatrix: [
        { id: 'matm-101', periodDate: 'September 2024', medicineName: 'Amoxicillin 500mg Capsule', category: 'Schedule H1 Antibiotic', qtyDispensed: 650, unit: 'Capsules', stockBalance: 140, filingStatus: 'Submitted' },
        { id: 'matm-102', periodDate: 'September 2024', medicineName: 'Levofloxacin 500mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 420, unit: 'Tablets', stockBalance: 960, filingStatus: 'Submitted' },
        { id: 'matm-103', periodDate: 'September 2024', medicineName: 'Fentanyl 50mcg Transdermal Patch', category: 'Narcotic / Double-Lock', qtyDispensed: 85, unit: 'Patches', stockBalance: 15, filingStatus: 'Submitted' },
        { id: 'matm-104', periodDate: 'September 2024', medicineName: 'Morphine Sulphate 10mg Injection', category: 'Narcotic / Double-Lock', qtyDispensed: 75, unit: 'Ampoules', stockBalance: 30, filingStatus: 'Submitted' },
      ],
    },
    {
      pharmacyId: 'ph-01',
      pharmacyName: 'Apex Medicos & Healthcare',
      licenseNumber: 'LIC-Z4-2024-001',
      zoneLocation: 'Sector 14, Zone 4',
      pharmacistName: 'Rajesh Kumar',
      pharmacistRegNo: 'REG-PH-8841',
      dailyAntibioticDispensed: 310,
      dailyNarcoticDispensed: 15,
      monthlyAntibioticDispensed: 2100,
      monthlyNarcoticDispensed: 110,
      currentAntibioticStock: 1840,
      currentNarcoticStock: 120,
      dailyUsageTrend: [
        { label: 'Mon', antibioticVal: 220, narcoticVal: 10, x: 30, yA: 98, yN: 148 },
        { label: 'Tue', antibioticVal: 250, narcoticVal: 12, x: 90, yA: 90, yN: 145 },
        { label: 'Wed', antibioticVal: 270, narcoticVal: 14, x: 150, yA: 84, yN: 142 },
        { label: 'Thu', antibioticVal: 290, narcoticVal: 16, x: 210, yA: 78, yN: 139 },
        { label: 'Fri', antibioticVal: 320, narcoticVal: 18, x: 270, yA: 70, yN: 136 },
        { label: 'Sat', antibioticVal: 350, narcoticVal: 20, x: 330, yA: 60, yN: 132 },
        { label: 'Sun', antibioticVal: 310, narcoticVal: 15, x: 390, yA: 72, yN: 140 },
      ],
      monthlyUsageTrend: [
        { label: 'May', antibioticVal: 1650, narcoticVal: 80, x: 30, yA: 110, yN: 152 },
        { label: 'Jun', antibioticVal: 1780, narcoticVal: 90, x: 102, yA: 98, yN: 149 },
        { label: 'Jul', antibioticVal: 1890, narcoticVal: 95, x: 174, yA: 88, yN: 147 },
        { label: 'Aug', antibioticVal: 2010, narcoticVal: 105, x: 246, yA: 78, yN: 144 },
        { label: 'Sep', antibioticVal: 2100, narcoticVal: 110, x: 318, yA: 70, yN: 142 },
        { label: 'Oct (Proj)', antibioticVal: 2220, narcoticVal: 120, x: 390, yA: 60, yN: 138 },
      ],
      dailyMatrix: [
        { id: 'mat-201', periodDate: '02 Sep 2024 (Today)', medicineName: 'Amoxicillin 500mg Capsule', category: 'Schedule H1 Antibiotic', qtyDispensed: 30, unit: 'Capsules', stockBalance: 850, filingStatus: 'Submitted' },
        { id: 'mat-202', periodDate: '02 Sep 2024 (Today)', medicineName: 'Azithromycin 250mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 10, unit: 'Tablets', stockBalance: 620, filingStatus: 'Submitted' },
        { id: 'mat-203', periodDate: '01 Sep 2024 (Yesterday)', medicineName: 'Morphine Sulphate 10mg Injection', category: 'Narcotic / Double-Lock', qtyDispensed: 5, unit: 'Ampoules', stockBalance: 80, filingStatus: 'Submitted' },
      ],
      monthlyMatrix: [
        { id: 'matm-201', periodDate: 'September 2024', medicineName: 'Amoxicillin 500mg Capsule', category: 'Schedule H1 Antibiotic', qtyDispensed: 920, unit: 'Capsules', stockBalance: 850, filingStatus: 'Submitted' },
        { id: 'matm-202', periodDate: 'September 2024', medicineName: 'Azithromycin 250mg Tablet', category: 'Schedule H1 Antibiotic', qtyDispensed: 680, unit: 'Tablets', stockBalance: 620, filingStatus: 'Submitted' },
        { id: 'matm-203', periodDate: 'September 2024', medicineName: 'Morphine Sulphate 10mg Injection', category: 'Narcotic / Double-Lock', qtyDispensed: 60, unit: 'Ampoules', stockBalance: 80, filingStatus: 'Submitted' },
      ],
    },
  ];

  // Currently Selected Pharmacy Report
  const currentReport = useMemo(() => {
    return mockUsageReports.find((r) => r.pharmacyId === selectedPharmacyId) || mockUsageReports[0];
  }, [selectedPharmacyId]);

  // Active matrix based on Daily / Monthly selection
  const activeMatrix = useMemo(() => {
    return reportPeriod === 'Daily' ? currentReport.dailyMatrix : currentReport.monthlyMatrix;
  }, [currentReport, reportPeriod]);

  // Filtered matrix based on search
  const filteredMatrix = useMemo(() => {
    return activeMatrix.filter((item) => {
      return (
        item.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.periodDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [activeMatrix, searchTerm]);

  // SVG Trend Chart path generation
  const activeTrendData = reportPeriod === 'Daily' ? currentReport.dailyUsageTrend : currentReport.monthlyUsageTrend;

  const generatePath = (points: { x: number; y: number }[]) => {
    return points.reduce((acc, point, idx) => {
      if (idx === 0) return `M ${point.x} ${point.y}`;
      const prev = points[idx - 1];
      const cx = (prev.x + point.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
    }, '');
  };

  const antibioticPoints = activeTrendData.map((pt) => ({ x: pt.x, y: pt.yA }));
  const narcoticPoints = activeTrendData.map((pt) => ({ x: pt.x, y: pt.yN }));

  const antibioticPath = generatePath(antibioticPoints);
  const narcoticPath = generatePath(narcoticPoints);

  return (
    <div className="inspector-reports-view">
      {/* 1. Page Header */}
      <div className="reports-page-header">
        <div>
          <h1 className="reports-page-title">Reports</h1>
          <p className="reports-page-subtitle">
            Regulatory daily and monthly restricted drug usage reports, stock balances, and dispensing audit matrices for Zone 4 dispensaries.
          </p>
        </div>
        <div className="reports-header-stats">
          <div className="header-stat-chip">
            <span className="stat-value">42</span>
            <span className="stat-label">Reports Generated</span>
          </div>
          <div className="header-stat-chip chip-success">
            <span className="stat-value">100%</span>
            <span className="stat-label">Audit Coverage</span>
          </div>
        </div>
      </div>

      {/* 2. Controls & Period Bar */}
      <div className="reports-controls-card">
        <div className="selector-field-group">
          <label className="selector-label" htmlFor="reports-pharmacy-select">
            Select Monitored Pharmacy:
          </label>
          <select
            id="reports-pharmacy-select"
            className="pharmacy-dropdown-select"
            value={selectedPharmacyId}
            onChange={(e) => setSelectedPharmacyId(e.target.value)}
          >
            {mockUsageReports.map((rep) => (
              <option key={rep.pharmacyId} value={rep.pharmacyId}>
                {rep.pharmacyName} ({rep.zoneLocation})
              </option>
            ))}
          </select>
        </div>

        <div className="period-toggle-buttons">
          <button
            className={`period-btn ${reportPeriod === 'Daily' ? 'active' : ''}`}
            onClick={() => setReportPeriod('Daily')}
          >
            Daily Report
          </button>
          <button
            className={`period-btn ${reportPeriod === 'Monthly' ? 'active' : ''}`}
            onClick={() => setReportPeriod('Monthly')}
          >
            Monthly Report
          </button>
        </div>

        <div className="reports-search-input-wrapper">
          <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="reports-search-input"
            placeholder="Search medicine name or period date..."
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
              <h2 className="summary-pharmacy-name">{currentReport.pharmacyName}</h2>
              <span className="license-pill">{currentReport.licenseNumber}</span>
              <span className="filing-chip filing-submitted">{reportPeriod} Regulatory Report</span>
            </div>
            <span className="summary-pharmacy-sub">
              {currentReport.zoneLocation} • Registered Pharmacist: {currentReport.pharmacistName} ({currentReport.pharmacistRegNo})
            </span>
          </div>

          <div className="summary-header-right">
            <span className="last-updated-text">Audit Period: {reportPeriod} Oversight</span>
          </div>
        </div>

        <div className="summary-kpi-grid">
          <div className="kpi-stat-box">
            <span className="kpi-box-title">{reportPeriod} Antibiotic Dispensed</span>
            <span className="kpi-box-main text-secondary">
              {(reportPeriod === 'Daily' ? currentReport.dailyAntibioticDispensed : currentReport.monthlyAntibioticDispensed).toLocaleString()} units
            </span>
            <span className="kpi-box-sub">Schedule H1 Total</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">{reportPeriod} Narcotic Dispensed</span>
            <span className="kpi-box-main text-primary">
              {reportPeriod === 'Daily' ? currentReport.dailyNarcoticDispensed : currentReport.monthlyNarcoticDispensed} units
            </span>
            <span className="kpi-box-sub">Double-Lock Vault Total</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Current Antibiotic Reserve</span>
            <span className="kpi-box-main text-primary">
              {currentReport.currentAntibioticStock.toLocaleString()} units
            </span>
            <span className="kpi-box-sub">Active Stock Balance</span>
          </div>

          <div className="kpi-stat-box">
            <span className="kpi-box-title">Current Narcotic Reserve</span>
            <span className="kpi-box-main text-primary">
              {currentReport.currentNarcoticStock} units
            </span>
            <span className="kpi-box-sub">Vault Stock Balance</span>
          </div>
        </div>
      </div>

      {/* 4. Pure SVG Usage Trend Chart */}
      <div className="inspector-card reports-chart-card">
        <div className="card-header chart-header-row">
          <div>
            <h2 className="card-title">{reportPeriod} Drug Usage &amp; Dispensing Trend</h2>
            <span className="card-subtitle">
              Comparative dispensing volume curve for Schedule H1 Antibiotics vs Controlled Narcotics ({reportPeriod})
            </span>
          </div>

          <div className="chart-legend-labels">
            <span className="legend-chip legend-antibiotic">
              <span className="legend-dot dot-secondary"></span> Schedule H1 Antibiotics
            </span>
            <span className="legend-chip legend-narcotic">
              <span className="legend-dot dot-primary"></span> Double-Lock Narcotics
            </span>
          </div>
        </div>

        <div className="chart-wrapper">
          <div className="svg-chart-container">
            <svg className="svg-trend-chart" viewBox="0 0 420 170">
              {/* Y-Axis Grid Lines */}
              <line x1="30" y1="25" x2="410" y2="25" stroke="var(--color-border)" strokeDasharray="3 3" />
              <line x1="30" y1="65" x2="410" y2="65" stroke="var(--color-border)" strokeDasharray="3 3" />
              <line x1="30" y1="105" x2="410" y2="105" stroke="var(--color-border)" strokeDasharray="3 3" />
              <line x1="30" y1="150" x2="410" y2="150" stroke="var(--color-border)" />

              {/* Antibiotics Trend Curve (Secondary Color) */}
              <path d={antibioticPath} fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" />

              {/* Narcotics Trend Curve (Primary Dark Color) */}
              <path d={narcoticPath} fill="none" stroke="var(--color-primary-dark)" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />

              {/* Data Points */}
              {activeTrendData.map((pt, idx) => (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredPointIndex(idx)}
                  onMouseLeave={() => setHoveredPointIndex(null)}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.yA}
                    r={hoveredPointIndex === idx ? '6' : '4'}
                    fill="var(--color-secondary)"
                    stroke="#ffffff"
                    strokeWidth="2"
                    style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                  />
                  {hoveredPointIndex === idx && (
                    <g>
                      <rect
                        x={pt.x - 45}
                        y={pt.yA - 32}
                        width="90"
                        height="22"
                        rx="4"
                        fill="var(--color-primary-dark)"
                      />
                      <text
                        x={pt.x}
                        y={pt.yA - 18}
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {pt.antibioticVal} anti / {pt.narcoticVal} narc
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>

            {/* X-Axis Labels */}
            <div className="chart-labels">
              {activeTrendData.map((pt, idx) => (
                <span key={idx} className="x-label-text">{pt.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Usage Matrix Audit Directory Table */}
      <div className="inspector-card reports-table-card">
        <div className="card-header table-header-flex">
          <div>
            <h2 className="card-title">Dispensing Usage Matrix Directory</h2>
            <span className="card-subtitle">
              Audit log matrix of medicine dispensing, stock balances, and declaration filings ({reportPeriod} Report)
            </span>
          </div>
          <span className="compliance-count-badge">{filteredMatrix.length} Records</span>
        </div>

        <div className="reports-table-container internal-scroll-container">
          <table className="activity-table inspector-table">
            <thead>
              <tr>
                <th>Date / Period</th>
                <th>Medicine Name</th>
                <th>Category</th>
                <th className="text-right">Quantity Dispensed</th>
                <th className="text-right">Stock Balance</th>
                <th className="text-center">Filing Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatrix.map((item) => (
                <tr key={item.id}>
                  <td className="color-secondary-text">{item.periodDate}</td>
                  <td className="font-semibold text-primary">{item.medicineName}</td>
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
                    {item.qtyDispensed} {item.unit}
                  </td>
                  <td className="text-right font-medium">
                    {item.stockBalance} {item.unit}
                  </td>
                  <td className="text-center">
                    {item.filingStatus === 'Submitted' ? (
                      <span className="filing-chip filing-submitted">Submitted</span>
                    ) : (
                      <span className="filing-chip filing-pending">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredMatrix.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center empty-table-cell">
                    No usage matrix records match your search criteria.
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
