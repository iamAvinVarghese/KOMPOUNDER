import React, { useState, useMemo } from 'react';
import type { PharmacyLocationRecord } from './types';
import './InspectorLocation.css';

export const InspectorLocation: React.FC = () => {
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string>('ph-02');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Realistic mock GPS location records for Zone 4 pharmacies
  const locationRecords: PharmacyLocationRecord[] = [
    {
      id: 'ph-01',
      pharmacyName: 'Apex Medicos & Healthcare',
      licenseNumber: 'LIC-Z4-2024-001',
      zoneLocation: 'Sector 14, Zone 4',
      registeredAddress: 'Shop 12-14, Commercial Complex, Sector 14',
      gpsLatitude: '28.6280° N',
      gpsLongitude: '77.2185° E',
      gpsCoordinatesFormatted: '28.6280° N, 77.2185° E',
      pharmacistName: 'Rajesh Kumar',
      pharmacistRegNo: 'REG-PH-8841',
      contactPhone: '+91 98112 34567',
      lastGpsTagTimestamp: 'Today, 09:30 AM',
      locationStatus: 'Verified',
      mapPinX: 35,
      mapPinY: 38,
    },
    {
      id: 'ph-02',
      pharmacyName: 'Care Pharmacy & Surgical',
      licenseNumber: 'LIC-Z4-2024-014',
      zoneLocation: 'Civil Lines, Zone 4',
      registeredAddress: 'Plot 45, Near Head Post Office, Civil Lines',
      gpsLatitude: '28.6139° N',
      gpsLongitude: '77.2090° E',
      gpsCoordinatesFormatted: '28.6139° N, 77.2090° E',
      pharmacistName: 'Priya Sharma',
      pharmacistRegNo: 'REG-PH-9120',
      contactPhone: '+91 98223 45678',
      lastGpsTagTimestamp: 'Yesterday, 06:15 PM',
      locationStatus: 'Location Mismatch',
      mismatchDetails: 'GPS Pinged 420m outside registered premises border on 01 Sep 06:15 PM.',
      mapPinX: 58,
      mapPinY: 52,
    },
    {
      id: 'ph-03',
      pharmacyName: 'City Pharma Chemist',
      licenseNumber: 'LIC-Z4-2023-089',
      zoneLocation: 'Main Market, Zone 4',
      registeredAddress: 'Shop 8, Central Retail Plaza, Main Market',
      gpsLatitude: '28.6355° N',
      gpsLongitude: '77.2240° E',
      gpsCoordinatesFormatted: '28.6355° N, 77.2240° E',
      pharmacistName: 'Amit Varma',
      pharmacistRegNo: 'REG-PH-7432',
      contactPhone: '+91 98334 56789',
      lastGpsTagTimestamp: 'Today, 10:15 AM',
      locationStatus: 'Verified',
      mapPinX: 72,
      mapPinY: 30,
    },
    {
      id: 'ph-04',
      pharmacyName: 'Metro Chemist & Druggist',
      licenseNumber: 'LIC-Z4-2023-045',
      zoneLocation: 'Station Road, Zone 4',
      registeredAddress: 'Building 102, Opp. Railway Station Gate 2',
      gpsLatitude: '28.6090° N',
      gpsLongitude: '77.1980° E',
      gpsCoordinatesFormatted: '28.6090° N, 77.1980° E',
      pharmacistName: 'Sanjay Gupta',
      pharmacistRegNo: 'REG-PH-6510',
      contactPhone: '+91 98445 67890',
      lastGpsTagTimestamp: 'Today, 08:45 AM',
      locationStatus: 'Verified',
      mapPinX: 25,
      mapPinY: 65,
    },
    {
      id: 'ph-05',
      pharmacyName: 'National Medical Store',
      licenseNumber: 'LIC-Z4-2024-033',
      zoneLocation: 'Green Park, Zone 4',
      registeredAddress: 'Shop 3, Green Park Supermarket Avenue',
      gpsLatitude: '28.5980° N',
      gpsLongitude: '77.2110° E',
      gpsCoordinatesFormatted: '28.5980° N, 77.2110° E',
      pharmacistName: 'Sunita Patel',
      pharmacistRegNo: 'REG-PH-8201',
      contactPhone: '+91 98556 78901',
      lastGpsTagTimestamp: 'Yesterday, 07:00 PM',
      locationStatus: 'Pending Verification',
      mismatchDetails: 'Initial GPS Tag pending inspector physical signal confirmation.',
      mapPinX: 45,
      mapPinY: 78,
    },
  ];

  const currentRecord = useMemo(() => {
    return locationRecords.find((r) => r.id === selectedPharmacyId) || locationRecords[0];
  }, [selectedPharmacyId]);

  const filteredLocationRecords = useMemo(() => {
    return locationRecords.filter((rec) => {
      return (
        rec.pharmacyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.registeredAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.gpsCoordinatesFormatted.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  return (
    <div className="inspector-location-view">
      {/* 1. Page Header */}
      <div className="location-page-header">
        <div>
          <h1 className="location-page-title">Location Monitoring</h1>
          <p className="location-page-subtitle">
            GPS tagging and operational location confirmation for monitored Zone 4 dispensaries.
          </p>
        </div>
        <div className="location-header-stats">
          <div className="header-stat-chip">
            <span className="stat-value">{locationRecords.length}</span>
            <span className="stat-label">Pharmacies Monitored</span>
          </div>
          <div className="header-stat-chip chip-success">
            <span className="stat-value">3</span>
            <span className="stat-label">Verified</span>
          </div>
          <div className="header-stat-chip chip-warning">
            <span className="stat-value">1</span>
            <span className="stat-label">Mismatch</span>
          </div>
          <div className="header-stat-chip">
            <span className="stat-value">1</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
      </div>

      {/* 2. Pharmacy Selector Card */}
      <div className="location-selector-card">
        <div className="selector-field-group">
          <label className="selector-label" htmlFor="location-pharmacy-select">
            Select Pharmacy:
          </label>
          <select
            id="location-pharmacy-select"
            className="pharmacy-dropdown-select"
            value={selectedPharmacyId}
            onChange={(e) => setSelectedPharmacyId(e.target.value)}
          >
            {locationRecords.map((rec) => (
              <option key={rec.id} value={rec.id}>
                {rec.pharmacyName} ({rec.zoneLocation}) — {rec.locationStatus}
              </option>
            ))}
          </select>
        </div>

        <div className="location-search-input-wrapper">
          <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="location-search-input"
            placeholder="Search pharmacy name, address, or GPS coordinates..."
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

      {/* 3. Selected Pharmacy Details Header */}
      <div className="inspector-card pharmacy-summary-banner-card">
        <div className="summary-banner-header">
          <div>
            <div className="banner-title-row">
              <h2 className="summary-pharmacy-name">{currentRecord.pharmacyName}</h2>
              <span className="license-pill">{currentRecord.licenseNumber}</span>
              <span
                className={`status-badge ${
                  currentRecord.locationStatus === 'Verified'
                    ? 'in-stock'
                    : currentRecord.locationStatus === 'Location Mismatch'
                    ? 'badge-critical'
                    : 'status-pending-badge'
                }`}
              >
                {currentRecord.locationStatus}
              </span>
            </div>
            <span className="summary-pharmacy-sub">
              {currentRecord.registeredAddress} • {currentRecord.zoneLocation}
            </span>
          </div>

          <div className="summary-header-right">
            <span className="last-updated-text">Last GPS Update: {currentRecord.lastGpsTagTimestamp}</span>
          </div>
        </div>

        {/* Location Mismatch Detail Warning Box */}
        {currentRecord.mismatchDetails && (
          <div className="location-mismatch-box">
            <span className="mismatch-tag">LOCATION MISMATCH DETECTED:</span>
            <span className="mismatch-msg">{currentRecord.mismatchDetails}</span>
          </div>
        )}
      </div>

      {/* 4. Large Google Maps-Style Visualizer Section */}
      <div className="inspector-card gmaps-container-card">
        <div className="gmaps-top-bar">
          <div className="gmaps-bar-left">
            <div className="gmaps-brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div className="gmaps-bar-title-group">
              <h3 className="gmaps-bar-title">{currentRecord.pharmacyName} — GPS Location Map</h3>
              <span className="gmaps-bar-sub">Google Maps Style Regulatory Visualizer • Zone 4 Grid</span>
            </div>
          </div>

          <div className="gmaps-bar-right">
            <span
              className={`gmaps-status-pill ${
                currentRecord.locationStatus === 'Verified'
                  ? 'gmaps-pill-verified'
                  : currentRecord.locationStatus === 'Location Mismatch'
                  ? 'gmaps-pill-mismatch'
                  : 'gmaps-pill-pending'
              }`}
            >
              {currentRecord.locationStatus}
            </span>
          </div>
        </div>

        {/* The Map Canvas Area */}
        <div className="gmaps-canvas-wrapper">
          {/* Map Base Canvas */}
          <div className="gmaps-map-bg">
            {/* Roads & Blocks Visual Pattern */}
            <svg className="gmaps-vector-map" viewBox="0 0 800 450" preserveAspectRatio="none">
              <defs>
                {/* Land Blocks */}
                <pattern id="city-blocks" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect x="5" y="5" width="40" height="40" fill="#e5e7eb" rx="2" />
                  <rect x="55" y="5" width="40" height="40" fill="#f3f4f6" rx="2" />
                  <rect x="5" y="55" width="40" height="40" fill="#f3f4f6" rx="2" />
                  <rect x="55" y="55" width="40" height="40" fill="#e5e7eb" rx="2" />
                </pattern>
              </defs>

              {/* Base background */}
              <rect width="800" height="450" fill="#f8fafc" />
              <rect width="800" height="450" fill="url(#city-blocks)" opacity="0.6" />

              {/* Park / Greenery Area */}
              <path d="M 50 20 C 150 10, 200 120, 180 200 C 120 250, 40 180, 50 20 Z" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="1.5" />
              <text x="100" y="100" fontSize="11" fill="#166534" fontWeight="600">Green Park Reserve</text>

              {/* Water River / Stream */}
              <path d="M 680 0 Q 640 150 720 300 T 780 450" fill="none" stroke="#bae6fd" strokeWidth="32" />
              <path d="M 680 0 Q 640 150 720 300 T 780 450" fill="none" stroke="#38bdf8" strokeWidth="12" />

              {/* Major Highways & Arterial Roads */}
              <line x1="0" y1="220" x2="800" y2="220" stroke="#ffffff" strokeWidth="22" />
              <line x1="0" y1="220" x2="800" y2="220" stroke="#fbbf24" strokeWidth="10" />

              <line x1="380" y1="0" x2="380" y2="450" stroke="#ffffff" strokeWidth="20" />
              <line x1="380" y1="0" x2="380" y2="450" stroke="#f59e0b" strokeWidth="8" />

              {/* Secondary Sector Roads */}
              <line x1="120" y1="0" x2="120" y2="450" stroke="#ffffff" strokeWidth="12" />
              <line x1="120" y1="0" x2="120" y2="450" stroke="#e2e8f0" strokeWidth="6" />

              <line x1="560" y1="0" x2="560" y2="450" stroke="#ffffff" strokeWidth="12" />
              <line x1="560" y1="0" x2="560" y2="450" stroke="#e2e8f0" strokeWidth="6" />

              <line x1="0" y1="100" x2="800" y2="100" stroke="#ffffff" strokeWidth="12" />
              <line x1="0" y1="100" x2="800" y2="100" stroke="#e2e8f0" strokeWidth="6" />

              <line x1="0" y1="340" x2="800" y2="340" stroke="#ffffff" strokeWidth="12" />
              <line x1="0" y1="340" x2="800" y2="340" stroke="#e2e8f0" strokeWidth="6" />

              {/* Street Names Labels */}
              <text x="240" y="214" fontSize="10" fill="#92400e" fontWeight="700">GRAND TRUNK ROAD (NH-44)</text>
              <text x="390" y="140" fontSize="10" fill="#92400e" fontWeight="700" transform="rotate(90 390 140)">CIVIL LINES AVENUE</text>
              <text x="130" y="80" fontSize="9" fill="#64748b" fontWeight="600">Station Road</text>
            </svg>

            {/* Other Monitored Pharmacy Pins on Map Canvas */}
            {locationRecords.map((rec) => {
              const isSelected = rec.id === currentRecord.id;
              const posX = (rec.mapPinX / 100) * 100; // percent
              const posY = (rec.mapPinY / 100) * 100; // percent

              return (
                <div
                  key={rec.id}
                  className={`gmaps-marker-pin ${isSelected ? 'pin-selected' : ''}`}
                  style={{ left: `${posX}%`, top: `${posY}%` }}
                  onClick={() => setSelectedPharmacyId(rec.id)}
                  title={`${rec.pharmacyName} — ${rec.locationStatus}`}
                >
                  <div
                    className={`marker-bubble ${
                      rec.locationStatus === 'Verified'
                        ? 'bubble-verified'
                        : rec.locationStatus === 'Location Mismatch'
                        ? 'bubble-mismatch'
                        : 'bubble-pending'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  {isSelected && (
                    <div className="marker-tooltip-box">
                      <span className="tooltip-title">{rec.pharmacyName}</span>
                      <span className="tooltip-coords">{rec.gpsCoordinatesFormatted}</span>
                      <span
                        className={`tooltip-status ${
                          rec.locationStatus === 'Verified'
                            ? 'text-success'
                            : rec.locationStatus === 'Location Mismatch'
                            ? 'text-danger'
                            : 'text-warning'
                        }`}
                      >
                        {rec.locationStatus}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Map Controls Floating Overlay */}
          <div className="gmaps-map-controls">
            <button className="gmaps-control-btn" title="Zoom In">+</button>
            <button className="gmaps-control-btn" title="Zoom Out">&minus;</button>
          </div>
        </div>

        {/* Coordinates & Last Recorded Location Bar (Beside / Below Map) */}
        <div className="gmaps-details-footer">
          <div className="footer-detail-card">
            <span className="footer-detail-label">REGISTERED GPS COORDINATES</span>
            <span className="footer-detail-value font-mono">{currentRecord.gpsCoordinatesFormatted}</span>
            <span className="footer-detail-sub">Latitude: {currentRecord.gpsLatitude} • Longitude: {currentRecord.gpsLongitude}</span>
          </div>

          <div className="footer-detail-card">
            <span className="footer-detail-label">REGISTERED PREMISES ADDRESS</span>
            <span className="footer-detail-value">{currentRecord.registeredAddress}</span>
            <span className="footer-detail-sub">{currentRecord.zoneLocation}</span>
          </div>

          <div className="footer-detail-card">
            <span className="footer-detail-label">LAST RECORDED LOCATION UPDATE</span>
            <span className="footer-detail-value">{currentRecord.lastGpsTagTimestamp}</span>
            <span className="footer-detail-sub">Automated Regulatory GPS Tag</span>
          </div>

          <div className="footer-detail-card">
            <span className="footer-detail-label">VERIFICATION STATUS</span>
            <span
              className={`footer-detail-value font-bold ${
                currentRecord.locationStatus === 'Verified'
                  ? 'text-success'
                  : currentRecord.locationStatus === 'Location Mismatch'
                  ? 'text-danger'
                  : 'text-warning'
              }`}
            >
              {currentRecord.locationStatus}
            </span>
            <span className="footer-detail-sub">Zone 4 Inspectorate Audit</span>
          </div>
        </div>
      </div>

      {/* 5. Location Verification Directory Table */}
      <div className="inspector-card location-table-card">
        <div className="card-header table-header-flex">
          <div>
            <h2 className="card-title">Zone 4 Dispensary Location Directory</h2>
            <span className="card-subtitle">GPS coordinates, registered address, and location verification audit log</span>
          </div>
          <span className="compliance-count-badge">{filteredLocationRecords.length} Dispensaries</span>
        </div>

        <div className="location-table-container internal-scroll-container">
          <table className="activity-table inspector-table">
            <thead>
              <tr>
                <th>Pharmacy Name &amp; License</th>
                <th>Zone Location</th>
                <th>Registered Premises Address</th>
                <th>GPS Coordinates</th>
                <th className="text-right">Last GPS Update</th>
                <th className="text-center">Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocationRecords.map((item) => (
                <tr
                  key={item.id}
                  className={`pharmacy-row ${item.id === currentRecord.id ? 'row-selected' : ''}`}
                  onClick={() => setSelectedPharmacyId(item.id)}
                >
                  <td>
                    <div className="flex-col">
                      <span className="font-semibold text-primary">{item.pharmacyName}</span>
                      <span className="cell-sub-id">{item.licenseNumber}</span>
                    </div>
                  </td>
                  <td className="color-secondary-text">{item.zoneLocation}</td>
                  <td className="font-medium">{item.registeredAddress}</td>
                  <td className="font-mono text-muted">{item.gpsCoordinatesFormatted}</td>
                  <td className="text-right color-secondary-text">{item.lastGpsTagTimestamp}</td>
                  <td className="text-center">
                    <span
                      className={`status-badge ${
                        item.locationStatus === 'Verified'
                          ? 'in-stock'
                          : item.locationStatus === 'Location Mismatch'
                          ? 'badge-critical'
                          : 'status-pending-badge'
                      }`}
                    >
                      {item.locationStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLocationRecords.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center empty-table-cell">
                    No location records match your search query.
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

export default InspectorLocation;
