export type InspectorTab = 
  | 'dashboard'
  | 'pharmacies'
  | 'stock-monitoring'
  | 'sales'
  | 'track-trace'
  | 'reports'
  | 'compliance'
  | 'location'
  | 'profile';

export interface InspectorProfileData {
  id: string;
  name: string;
  role: string;
  badgeNumber: string;
  jurisdictionZone: string;
  avatarInitials: string;
  email: string;
  phone: string;
}

export interface InspectorAccountDetails {
  name: string;
  role: string;
  accountStatus: 'Active' | 'Inactive';
  officialEmail: string;
  mobileNumber: string;
  badgeNumber: string;
  jurisdictionZone: string;
  otpAuthStatus: 'Enabled' | 'Disabled';
  accountSecurityStatus: 'Secure / 2FA Verified' | 'Action Required';
  lastLoginTimestamp: string;
  authorizationScope: string;
  regulatoryJurisdiction: string;
}

export interface PharmacyComplianceItem {
  id: string;
  name: string;
  location: string;
  pharmacistName: string;
  regNumber: string;
  todaySubmitted: boolean;
  lastUpdatedTime: string;
  activeAlertsCount: number;
  complianceStatus: 'Up to Date' | 'Pending' | 'Attention Required';
}

export interface InspectorAlert {
  id: string;
  severity: 'Critical' | 'Attention' | 'Normal';
  pharmacyName: string;
  title: string;
  description: string;
  timestamp: string;
  actionStatus: string;
}

export interface InspectorActivityLog {
  id: string;
  activity: string;
  pharmacyName: string;
  timestamp: string;
  status: string;
}

export interface StockMonitoringSummaryData {
  antibioticsMonitoredCount: number;
  antibioticsComplianceRate: number;
  narcoticsDoubleLockedCount: number;
  narcoticsVerificationRate: number;
  nearLowStockPharmaciesCount: number;
  missingDeclarationPharmaciesCount: number;
}

export interface UsageTrendPoint {
  day: string;
  value: number;
  x: number;
  y: number;
}

export interface PharmacySaleRecord {
  id: string;
  drugName: string;
  category: 'Schedule H1 Antibiotic' | 'Narcotic / Double-Lock' | 'General Prescription';
  qty: number;
  patientId: string;
  doctorRegNo: string;
  timestamp: string;
}

export interface PharmacyDetailItem {
  id: string;
  name: string;
  licenseNumber: string;
  zoneLocation: string;
  address: string;
  contactPhone: string;
  operatingHours: string;
  pharmacistName: string;
  pharmacistRegNo: string;
  pharmacistLicenseExpiry: string;
  todaySubmitted: boolean;
  lastUpdatedTime: string;
  filingComplianceScore: string;
  antibioticStockUnits: number;
  narcoticStockUnits: number;
  lowStockWarning: boolean;
  activeAlertsCount: number;
  complianceStatus: 'Up to Date' | 'Pending' | 'Attention Required';
  recentSales: PharmacySaleRecord[];
  activeAlerts: {
    id: string;
    severity: 'Critical' | 'Attention' | 'Normal';
    title: string;
    description: string;
    timestamp: string;
  }[];
}

export interface PharmacyStockItem {
  id: string;
  medicineName: string;
  batchNumber: string;
  category: 'Schedule H1 Antibiotic' | 'Narcotic / Double-Lock';
  currentStock: number;
  minThreshold: number;
  unit: string;
  lastFiledTime: string;
  todaySubmitted: boolean;
  complianceStatus: 'Normal' | 'Low Stock Warning' | 'Critical Threshold';
}

export interface MonitoredPharmacyStockRecord {
  pharmacyId: string;
  pharmacyName: string;
  licenseNumber: string;
  zoneLocation: string;
  pharmacistName: string;
  pharmacistRegNo: string;
  todaySubmitted: boolean;
  lastUpdatedTime: string;
  filingComplianceScore: string;
  totalAntibioticUnits: number;
  totalNarcoticUnits: number;
  hasLowStockAlert: boolean;
  stockItems: PharmacyStockItem[];
}

export interface InspectorSalesDispensingRecord {
  id: string;
  transactionId: string;
  timestamp: string;
  medicineName: string;
  category: 'Schedule H1 Antibiotic' | 'Narcotic / Double-Lock';
  qtyDispensed: number;
  unit: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  doctorRegNo: string;
  postDispenseStock: number;
  verificationStatus: 'Verified' | 'Flagged Volume Spike' | 'Under Review';
  irregularityNote?: string;
}

export interface MonitoredPharmacySalesRecord {
  pharmacyId: string;
  pharmacyName: string;
  licenseNumber: string;
  zoneLocation: string;
  pharmacistName: string;
  pharmacistRegNo: string;
  todayDispensedUnits: number;
  todayTransactionsCount: number;
  flaggedSpikesCount: number;
  auditVerificationRate: string;
  salesRecords: InspectorSalesDispensingRecord[];
}

export interface TraceabilityStep {
  id: string;
  stepNumber: number;
  timestamp: string;
  eventType: 'Daily Declaration' | 'Dispensing Sale' | 'Threshold Warning' | 'Audit Verification';
  transactionId?: string;
  qtyChange: number;
  stockBalanceAfter: number;
  unit: string;
  patientId?: string;
  patientName?: string;
  doctorName?: string;
  doctorRegNo?: string;
  statusTag: 'Compliant' | 'Flagged Spike' | 'Under Review';
  notes?: string;
}

export interface MedicineTraceabilityRecord {
  id: string;
  pharmacyId: string;
  pharmacyName: string;
  licenseNumber: string;
  zoneLocation: string;
  pharmacistName: string;
  pharmacistRegNo: string;
  medicineName: string;
  batchNumber: string;
  category: 'Schedule H1 Antibiotic' | 'Narcotic / Double-Lock';
  initialStock: number;
  currentStock: number;
  minThreshold: number;
  unit: string;
  lastFiledTime: string;
  todaySubmitted: boolean;
  hasIrregularity: boolean;
  irregularitySummary?: string;
  traceabilitySteps: TraceabilityStep[];
}

export interface UsageMatrixItem {
  id: string;
  periodDate: string;
  medicineName: string;
  category: 'Schedule H1 Antibiotic' | 'Narcotic / Double-Lock';
  qtyDispensed: number;
  unit: string;
  stockBalance: number;
  filingStatus: 'Submitted' | 'Pending';
}

export interface PharmacyUsageReport {
  pharmacyId: string;
  pharmacyName: string;
  licenseNumber: string;
  zoneLocation: string;
  pharmacistName: string;
  pharmacistRegNo: string;
  dailyAntibioticDispensed: number;
  dailyNarcoticDispensed: number;
  monthlyAntibioticDispensed: number;
  monthlyNarcoticDispensed: number;
  currentAntibioticStock: number;
  currentNarcoticStock: number;
  dailyUsageTrend: { label: string; antibioticVal: number; narcoticVal: number; x: number; yA: number; yN: number }[];
  monthlyUsageTrend: { label: string; antibioticVal: number; narcoticVal: number; x: number; yA: number; yN: number }[];
  dailyMatrix: UsageMatrixItem[];
  monthlyMatrix: UsageMatrixItem[];
}

export interface MissingUpdateAlert {
  id: string;
  pharmacyName: string;
  licenseNumber: string;
  location: string;
  pharmacistName: string;
  pharmacistRegNo: string;
  lastStockUpdate: string;
  hoursOverdue: number;
  notificationStatus: 'Auto-Notified' | 'Follow-up Pending';
}

export interface AntibioticThresholdAlert {
  id: string;
  pharmacyName: string;
  medicineName: string;
  category: string;
  currentUsageUnits: number;
  predeterminedThreshold: number; // 100 units
  status: 'Threshold Exceeded' | 'Near Threshold';
  timestamp: string;
}

export interface IrregularActivityAlert {
  id: string;
  pharmacyName: string;
  salesRecordTxnId: string;
  date: string;
  medicineName: string;
  qtyDispensed: number;
  patientId: string;
  doctorRegNo: string;
  irregularActivityDescription: string;
  status: 'Under Review' | 'Warning Logged';
}

export interface PharmacyLocationRecord {
  id: string;
  pharmacyName: string;
  licenseNumber: string;
  zoneLocation: string;
  registeredAddress: string;
  gpsLatitude: string;
  gpsLongitude: string;
  gpsCoordinatesFormatted: string;
  pharmacistName: string;
  pharmacistRegNo: string;
  contactPhone: string;
  lastGpsTagTimestamp: string;
  locationStatus: 'Verified' | 'Location Mismatch' | 'Pending Verification';
  mismatchDetails?: string;
  mapPinX: number;
  mapPinY: number;
}
