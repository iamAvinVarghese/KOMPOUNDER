import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_ACCOUNTS = {
  pharmacist: {
    role: 'Pharmacist',
    name: 'Rajesh Kumar, M.Pharm',
    email: 'rajesh@apollo-care.in',
    username: 'rx_rajesh',
    pharmacyName: 'Apollo MedPlus Care & Clinic',
    licenseNumber: 'KA-DRUG-2024-88419',
    registrationNumber: 'PH-KA-49021',
    district: 'Bengaluru Urban (South Zone)',
    state: 'Karnataka',
    phone: '+91 98451 23456',
    gps: '12.9249° N, 77.5833° E',
    approvalStatus: 'Approved (Active)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
  },
  inspector: {
    role: 'Drug Inspector',
    name: 'Dr. Anita Deshmukh',
    email: 'anita.deshmukh@drugcontrol.gov.in',
    username: 'insp_anita',
    designation: 'Senior Drug Inspector & Licensing Authority',
    department: 'Drugs Control Department, State Regulatory Board',
    jurisdiction: 'Zone 4: Bengaluru South & Anekal Circle',
    badgeId: 'DCD-KA-INS-042',
    phone: '+91 94481 00293',
    approvalStatus: 'Official State Authority',
    avatar: 'https://images.unsplash.com/photo-1594824813511-13c7c2b29141?w=150&auto=format&fit=crop&q=80'
  },
  admin: {
    role: 'Admin',
    name: 'Director S. Ramanathan',
    email: 'admin.director@kompounder.gov.in',
    username: 'admin_sys',
    designation: 'Chief Administrator & State Controller',
    department: 'Drugs Control Headquarters & Surveillance Cell',
    jurisdiction: 'Statewide Central Master System',
    badgeId: 'ADMIN-DCD-001',
    phone: '+91 80 2234 5678',
    approvalStatus: 'Superuser Access',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kompounder_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = async (roleKey, customData = null) => {
    setIsLoading(true);
    // Simulate server authentication latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let loggedUser;
    if (customData) {
      loggedUser = {
        role: customData.role || 'Pharmacist',
        name: customData.name || 'Registered Pharmacist',
        email: customData.email || 'user@pharmacy.in',
        username: customData.username || customData.email?.split('@')[0],
        pharmacyName: customData.pharmacyName || 'Registered Pharmacy Store',
        licenseNumber: customData.licenseNumber || 'PENDING-VERIFICATION',
        registrationNumber: customData.registrationNumber || 'NEW-REG-001',
        district: customData.district || 'Jurisdiction Area',
        state: customData.state || 'Karnataka',
        phone: customData.phone || '+91 98000 00000',
        gps: customData.gps || '12.9716° N, 77.5946° E',
        approvalStatus: 'Under Fast-Track Verification',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80'
      };
    } else {
      loggedUser = DEMO_ACCOUNTS[roleKey] || DEMO_ACCOUNTS.pharmacist;
    }

    setUser(loggedUser);
    localStorage.setItem('kompounder_user', JSON.stringify(loggedUser));
    setIsLoading(false);
    return loggedUser;
  };

  const signup = async (formData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser = {
      role: 'Pharmacist',
      name: formData.pharmacistName || formData.name,
      email: formData.email,
      username: formData.username || formData.email.split('@')[0],
      pharmacyName: formData.pharmacyName,
      licenseNumber: formData.licenseNumber,
      registrationNumber: formData.registrationNumber,
      district: formData.district || 'Bengaluru Urban',
      state: formData.state || 'Karnataka',
      phone: formData.phone,
      gps: formData.gpsCoordinates || '12.9716° N, 77.5946° E',
      certificateUploaded: !!formData.certificateFileName,
      approvalStatus: 'Submitted — Pending Admin Review',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'
    };
    setUser(newUser);
    localStorage.setItem('kompounder_user', JSON.stringify(newUser));
    setIsLoading(false);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kompounder_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
