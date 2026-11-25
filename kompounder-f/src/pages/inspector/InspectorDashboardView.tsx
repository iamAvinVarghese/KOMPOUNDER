import React, { useState } from 'react';
import type { PharmacyComplianceItem, InspectorAlert, InspectorActivityLog } from './types';

export const InspectorDashboardView: React.FC = () => {
  const [trendFilter, setTrendFilter] = useState<'All' | 'Antibiotics' | 'Narcotics'>('All');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // 1. Summary Metrics Data (KPI Cards)
  const summaryMetrics = [
    { title: 'Monitored Pharmacies', value: '42', label: 'Zone 4 Jurisdiction', trend: '+2 new this month', statusClass: 'status-neutral' },
    { title: 'Daily Stock Filings', value: '38', label: '90.5% compliance rate', trend: '38 of 42 submitted', statusClass: 'status-success' },
    { title: 'Compliance & Stock Alerts', value: '6', label: '2 Critical breaches', trend: 'Action required', statusClass: 'status-danger' },
    { title: 'Monthly Dispensing Volume', value: '14,820', label: 'Units across 182 SKUs', trend: '+3.2% vs last month', statusClass: 'status-neutral' },
  ];

  // 2. Daily Stock Update Monitoring - Pending Pharmacies
  const pendingPharmacies = [
    { name: 'Care Pharmacy & Surgical', location: 'Civil Lines', lastFiled: 'Yesterday, 06:15 PM' },
    { name: 'National Medical Store', location: 'Green Park', lastFiled: 'Yesterday, 07:00 PM' },
    { name: 'Eastside Chemist', location: 'Industrial Area', lastFiled: 'Yesterday, 08:30 PM' },
    { name: 'Arogya Medical Hall', location: 'Old City Gate', lastFiled: 'Yesterday, 09:10 PM' },
  ];

  // 3. Pharmacy Compliance Table Mock Data
  const pharmacies: PharmacyComplianceItem[] = [
    {
      id: 'ph-01',
      name: 'Apex Medicos & Healthcare',
      location: 'Sector 14, Zone 4',
      pharmacistName: 'Rajesh Kumar (REG-PH-8841)',
      regNumber: 'LIC-Z4-2024-001',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 09:30 AM',
      activeAlertsCount: 0,
      complianceStatus: 'Up to Date',
    },
    {
      id: 'ph-02',
      name: 'Care Pharmacy & Surgical',
      location: 'Civil Lines, Zone 4',
      pharmacistName: 'Priya Sharma (REG-PH-9120)',
      regNumber: 'LIC-Z4-2024-014',
      todaySubmitted: false,
      lastUpdatedTime: 'Yesterday, 06:15 PM',
      activeAlertsCount: 2,
      complianceStatus: 'Pending',
    },
    {
      id: 'ph-03',
      name: 'City Pharma Chemist',
      location: 'Main Market, Zone 4',
      pharmacistName: 'Amit Varma (REG-PH-7432)',
      regNumber: 'LIC-Z4-2023-089',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 10:15 AM',
      activeAlertsCount: 1,
      complianceStatus: 'Attention Required',
    },
    {
      id: 'ph-04',
      name: 'Metro Chemist & Druggist',
      location: 'Station Road, Zone 4',
      pharmacistName: 'Sanjay Gupta (REG-PH-6510)',
      regNumber: 'LIC-Z4-2023-045',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 08:45 AM',
      activeAlertsCount: 0,
      complianceStatus: 'Up to Date',
    },
    {
      id: 'ph-05',
      name: 'National Medical Store',
      location: 'Green Park, Zone 4',
      pharmacistName: 'Sunita Patel (REG-PH-8201)',
      regNumber: 'LIC-Z4-2024-033',
      todaySubmitted: false,
      lastUpdatedTime: 'Yesterday, 07:00 PM',
      activeAlertsCount: 1,
      complianceStatus: 'Pending',
    },
    {
      id: 'ph-06',
      name: 'Royal Drug House',
      location: 'Model Town, Zone 4',
      pharmacistName: 'Vikas Malhotra (REG-PH-5541)',
      regNumber: 'LIC-Z4-2022-112',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 10:45 AM',
      activeAlertsCount: 2,
      complianceStatus: 'Attention Required',
    },
    {
      id: 'ph-07',
      name: 'LifeLine Pharmacy',
      location: 'Hospital Road, Zone 4',
      pharmacistName: 'Anil Saxena (REG-PH-9811)',
      regNumber: 'LIC-Z4-2024-055',
      todaySubmitted: true,
      lastUpdatedTime: 'Today, 09:10 AM',
      activeAlertsCount: 0,
      complianceStatus: 'Up to Date',
    },
  ];

  // 4. Compliance Alerts Mock Data
  const alerts: InspectorAlert[] = [
    {
      id: 'alt-01',
      severity: 'Critical',
      pharmacyName: 'Care Pharmacy & Surgical',
      title: 'Daily Stock Declaration Missing',
      description: 'Pharmacy has not submitted today’s mandatory stock update before 10:00 AM cutoff.',
      timestamp: 'Today, 10:05 AM',
      actionStatus: 'Notice Issued',
    },
    {
      id: 'alt-02',
      severity: 'Critical',
      pharmacyName: 'City Pharma Chemist',
      title: 'Low Narcotic Stock Threshold',
      description: 'Fentanyl 50mcg Patch balance dropped to 40 units (Minimum threshold: 50).',
      timestamp: 'Today, 09:40 AM',
      actionStatus: 'Under Review',
    },
    {
      id: 'alt-03',
      severity: 'Attention',
      pharmacyName: 'Royal Drug House',
      title: 'Antibiotic Dispensing Volume Spike',
      description: 'Amoxicillin 500mg dispensing volume exceeded 24-hour average by 45%.',
      timestamp: 'Today, 08:30 AM',
      actionStatus: 'Verification Pending',
    },
    {
      id: 'alt-04',
      severity: 'Attention',
      pharmacyName: 'National Medical Store',
      title: 'Repeated Delayed Filing',
      description: 'Second consecutive delayed stock declaration filing recorded this week.',
      timestamp: 'Yesterday, 07:15 PM',
      actionStatus: 'Warning Logged',
    },
  ];

  // 5. Recent Regulatory Activity Logs
  const recentActivities: InspectorActivityLog[] = [
    { id: 'act-01', activity: 'Daily Stock Update Filed', pharmacyName: 'Apex Medicos & Healthcare', timestamp: 'Today, 09:30 AM', status: 'Verified' },
    { id: 'act-02', activity: 'Narcotic Custody Audit Verified', pharmacyName: 'Metro Chemist & Druggist', timestamp: 'Today, 08:45 AM', status: 'Passed' },
    { id: 'act-03', activity: 'Compliance Notice Dispatched', pharmacyName: 'Care Pharmacy & Surgical', timestamp: 'Today, 10:10 AM', status: 'Pending Reply' },
    { id: 'act-04', activity: 'Schedule H1 Sales Verified', pharmacyName: 'LifeLine Pharmacy', timestamp: 'Today, 09:10 AM', status: 'Compliant' },
  ];

  // 6. Usage Trend Datasets (7 Days: Mon - Sun)
  const chartDatasets = {
    All: [
      { day: 'Mon', value: 420, x: 30, y: 110 },
      { day: 'Tue', value: 480, x: 90, y: 90 },
      { day: 'Wed', value: 450, x: 150, y: 100 },
      { day: 'Thu', value: 540, x: 210, y: 70 },
      { day: 'Fri', value: 610, x: 270, y: 45 },
      { day: 'Sat', value: 680, x: 330, y: 25 },
      { day: 'Sun', value: 590, x: 390, y: 55 },
    ],
    Antibiotics: [
      { day: 'Mon', value: 280, x: 30, y: 125 },
      { day: 'Tue', value: 320, x: 90, y: 112 },
      { day: 'Wed', value: 300, x: 150, y: 118 },
      { day: 'Thu', value: 370, x: 210, y: 95 },
      { day: 'Fri', value: 410, x: 270, y: 82 },
      { day: 'Sat', value: 450, x: 330, y: 68 },
      { day: 'Sun', value: 390, x: 390, y: 88 },
    ],
    Narcotics: [
      { day: 'Mon', value: 45, x: 30, y: 145 },
      { day: 'Tue', value: 52, x: 90, y: 142 },
      { day: 'Wed', value: 48, x: 150, y: 144 },
      { day: 'Thu', value: 65, x: 210, y: 138 },
      { day: 'Fri', value: 58, x: 270, y: 140 },
      { day: 'Sat', value: 72, x: 330, y: 135 },
      { day: 'Sun', value: 50, x: 390, y: 143 },
    ],
  };

  const currentDataset = chartDatasets[trendFilter];

  const generatePath = (points: { x: number; y: number }[]) => {
    return points.reduce((acc, point, idx) => {
      if (idx === 0) return `M ${point.x} ${point.y}`;
      const prev = points[idx - 1];
      const cx = (prev.x + point.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
    }, '');
  };

  const linePath = generatePath(currentDataset);
  const areaPath = `${linePath} L 390 150 L 30 150 Z`;

  return (
    <div className="inspector-dashboard-view">
      {/* Regulatory Sub-Header Banner */}
      <div className="regulatory-dashboard-header">
        <div>
          <h2 className="regulatory-banner-title">Zone 4 Regulatory Monitoring Dashboard</h2>
          <span className="regulatory-banner-subtitle">
            Active Compliance Supervision • Monitored Pharmacies: 42 • System Status: Operational
          </span>
        </div>
        <div className="regulatory-compliance-chip">
          <span className="compliance-chip-dot"></span>
          <span>90.5% Filing Compliance Today</span>
        </div>
      </div>

      {/* 1. Top Summary Metric Cards (KPI Cards) */}
      <div className="inspector-metrics-grid">
        {summaryMetrics.map((metric, idx) => (
          <div key={idx} className="inspector-metric-card">
            <div className="metric-card-top">
              <span className="metric-title">{metric.title}</span>
              <span className={`metric-status-tag ${metric.statusClass}`}>{metric.trend}</span>
            </div>
            <div className="metric-card-body">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Daily Stock Submission Monitoring Section */}
      <div className="inspector-card daily-submission-monitor-card">
        <div className="card-header table-header-flex">
          <div>
            <h2 className="card-title">Daily Stock Submission Status</h2>
            <span className="card-subtitle">Tracking today's mandatory stock declaration filings across Zone 4 dispensaries</span>
          </div>
          <div className="submission-summary-pills">
            <span className="pill-stat stat-submitted">38 Received (90.5%)</span>
            <span className="pill-stat stat-pending">4 Pending (9.5%)</span>
          </div>
        </div>

        <div className="daily-monitor-body">
          <div className="progress-track-container">
            <div className="progress-segmented-bar">
              <div className="segment seg-healthy" style={{ width: '90.5%' }} title="Submitted Today: 38 Pharmacies"></div>
              <div className="segment seg-warning" style={{ width: '9.5%' }} title="Pending Submission: 4 Pharmacies"></div>
            </div>
          </div>

          <div className="pending-pharmacies-block">
            <span className="pending-block-title">Pending Daily Declarations (Requires Inspector Follow-up):</span>
            <div className="pending-grid-chips">
              {pendingPharmacies.map((item, idx) => (
                <div key={idx} className="pending-pharmacy-chip">
                  <span className="chip-pharmacy-name">{item.name}</span>
                  <span className="chip-pharmacy-loc">{item.location}</span>
                  <span className="chip-last-filed">Last filed: {item.lastFiled}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pharmacy Compliance Overview Table */}
      <div className="inspector-card activity-layout-card">
        <div className="card-header table-header-flex">
          <div>
            <h2 className="card-title">Pharmacy Compliance &amp; Stock Declaration Directory</h2>
            <span className="card-subtitle">Real-time daily stock filing and regulatory compliance status across Zone 4</span>
          </div>
          <span className="compliance-count-badge">42 Pharmacies Monitored</span>
        </div>

        <div className="activity-table-container internal-scroll-container">
          <table className="activity-table inspector-table">
            <thead>
              <tr>
                <th>Pharmacy Name</th>
                <th>Location</th>
                <th>Pharmacist In-Charge</th>
                <th className="text-center">Today's Filing</th>
                <th className="text-right">Last Updated</th>
                <th className="text-center">Alerts</th>
                <th className="text-center">Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              {pharmacies.map((pharmacy) => (
                <tr key={pharmacy.id}>
                  <td className="font-semibold">{pharmacy.name}</td>
                  <td className="color-secondary-text">{pharmacy.location}</td>
                  <td className="font-medium">{pharmacy.pharmacistName}</td>
                  <td className="text-center">
                    {pharmacy.todaySubmitted ? (
                      <span className="filing-chip filing-submitted">Submitted</span>
                    ) : (
                      <span className="filing-chip filing-pending">Pending</span>
                    )}
                  </td>
                  <td className="text-right color-secondary-text">{pharmacy.lastUpdatedTime}</td>
                  <td className="text-center">
                    {pharmacy.activeAlertsCount > 0 ? (
                      <span className="alert-count-chip">{pharmacy.activeAlertsCount} Alerts</span>
                    ) : (
                      <span className="alert-count-chip chip-zero">0 Alerts</span>
                    )}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Middle Section: Stock Monitoring Summary & Usage Trends */}
      <div className="inspector-grid-2col">
        {/* Stock Monitoring Summary */}
        <div className="inspector-card stock-summary-card">
          <div className="card-header">
            <h2 className="card-title">Stock Monitoring Summary</h2>
            <span className="card-subtitle">Aggregated inventory controls and daily threshold tracking</span>
          </div>

          <div className="stock-summary-body">
            <div className="summary-section-box">
              <div className="box-top-line">
                <span className="box-label">Antibiotic Stock Control (Schedule H1)</span>
                <span className="box-value">12,450 Units Monitored</span>
              </div>
              <div className="progress-track-container">
                <div className="progress-segmented-bar">
                  <div className="segment seg-healthy" style={{ width: '96.2%' }} title="Compliant: 96.2%"></div>
                  <div className="segment seg-warning" style={{ width: '3.8%' }} title="Watchlist: 3.8%"></div>
                </div>
              </div>
              <span className="sub-stat-text">96.2% compliant across registered dispensaries</span>
            </div>

            <div className="summary-section-box">
              <div className="box-top-line">
                <span className="box-label">Narcotic &amp; Controlled Substances</span>
                <span className="box-value">840 Units Double-Locked</span>
              </div>
              <div className="progress-track-container">
                <div className="progress-segmented-bar">
                  <div className="segment seg-healthy" style={{ width: '100%' }} title="Verified Log: 100%"></div>
                </div>
              </div>
              <span className="sub-stat-text">100% daily register verification rate</span>
            </div>

            <div className="summary-grid-chips">
              <div className="chip-stat-box">
                <span className="stat-num text-warning">3 Pharmacies</span>
                <span className="stat-desc">Near Low Stock Threshold</span>
              </div>
              <div className="chip-stat-box">
                <span className="stat-num text-danger">4 Pharmacies</span>
                <span className="stat-desc">Missing Daily Declaration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drug Usage & Stock Trends Chart */}
        <div className="inspector-card chart-card">
          <div className="card-header chart-header-row">
            <div>
              <h2 className="card-title">Drug Usage &amp; Stock Trends</h2>
              <span className="card-subtitle">7-day aggregate dispensing volume across monitored pharmacies</span>
            </div>

            <div className="trend-filter-pills">
              {(['All', 'Antibiotics', 'Narcotics'] as const).map((cat) => (
                <button
                  key={cat}
                  className={`pill-btn ${trendFilter === cat ? 'active' : ''}`}
                  onClick={() => setTrendFilter(cat)}
                >
                  {cat === 'All' ? 'All Categories' : cat === 'Antibiotics' ? 'Antibiotics (Schedule H1)' : 'Narcotic Drugs'}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-wrapper">
            <div className="svg-chart-container">
              <svg className="svg-trend-chart" viewBox="0 0 420 170">
                {/* Y-Axis Grid Lines & Tick Labels */}
                <line x1="30" y1="25" x2="410" y2="25" stroke="var(--color-border)" strokeDasharray="3 3" />
                <text x="22" y="29" className="axis-tick-text" textAnchor="end">700</text>

                <line x1="30" y1="65" x2="410" y2="65" stroke="var(--color-border)" strokeDasharray="3 3" />
                <text x="22" y="69" className="axis-tick-text" textAnchor="end">500</text>

                <line x1="30" y1="105" x2="410" y2="105" stroke="var(--color-border)" strokeDasharray="3 3" />
                <text x="22" y="109" className="axis-tick-text" textAnchor="end">300</text>

                <line x1="30" y1="150" x2="410" y2="150" stroke="var(--color-border)" />
                <text x="22" y="154" className="axis-tick-text" textAnchor="end">0</text>

                {/* Area Fill */}
                <path d={areaPath} fill="url(#inspector-trend-gradient-2)" opacity="0.15" />

                {/* Trend Curve Line */}
                <path d={linePath} fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" />

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="inspector-trend-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-secondary)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>

                {/* Interactive Data Points */}
                {currentDataset.map((pt, idx) => (
                  <g
                    key={idx}
                    onMouseEnter={() => setHoveredPointIndex(idx)}
                    onMouseLeave={() => setHoveredPointIndex(null)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredPointIndex === idx ? '6' : '4'}
                      fill="var(--color-secondary)"
                      stroke="#ffffff"
                      strokeWidth="2"
                      style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                    />
                    {hoveredPointIndex === idx && (
                      <g>
                        <rect
                          x={pt.x - 35}
                          y={pt.y - 32}
                          width="70"
                          height="22"
                          rx="4"
                          fill="var(--color-primary-dark)"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 18}
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {pt.value} units
                        </text>
                      </g>
                    )}
                  </g>
                ))}
              </svg>

              {/* X-Axis Day Labels */}
              <div className="chart-labels">
                {currentDataset.map((pt, idx) => (
                  <span key={idx} className="x-label-text">{pt.day}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Section: Compliance Alerts & Recent Regulatory Activity */}
      <div className="inspector-grid-2col">
        {/* Compliance & Alerts */}
        <div className="inspector-card alerts-card">
          <div className="card-header">
            <h2 className="card-title">Compliance &amp; Alerts</h2>
            <span className="card-subtitle">Active regulatory breaches &amp; pending declarations requiring inspector action</span>
          </div>

          <div className="alerts-list">
            {alerts.map((alert) => (
              <div key={alert.id} className={`alert-clinical-box border-${alert.severity.toLowerCase()}`}>
                <div className="alert-top-line">
                  <span className="alert-pharmacy-tag">{alert.pharmacyName}</span>
                  <span
                    className={`status-badge ${
                      alert.severity === 'Critical'
                        ? 'badge-critical'
                        : alert.severity === 'Attention'
                        ? 'badge-warning'
                        : 'badge-normal'
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
                <h4 className="alert-title-heading">{alert.title}</h4>
                <p className="alert-item-msg">{alert.description}</p>
                <div className="alert-footer-meta">
                  <span className="meta-time">{alert.timestamp}</span>
                  <span className="meta-action">{alert.actionStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Monitoring Activity Feed */}
        <div className="inspector-card activity-feed-card">
          <div className="card-header">
            <h2 className="card-title">Recent Regulatory Activity</h2>
            <span className="card-subtitle">Automated inspection logs &amp; verification events</span>
          </div>

          <div className="activity-feed-list">
            {recentActivities.map((act) => (
              <div key={act.id} className="feed-item">
                <div className="feed-bullet"></div>
                <div className="feed-content">
                  <div className="feed-top">
                    <span className="feed-activity-title">{act.activity}</span>
                    <span className="feed-status-tag">{act.status}</span>
                  </div>
                  <span className="feed-pharmacy">{act.pharmacyName}</span>
                  <span className="feed-time">{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
