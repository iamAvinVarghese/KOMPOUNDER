import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileBarChart, 
  Bell, 
  User, 
  LogOut, 
  Plus, 
  AlertTriangle, 
  Search, 
  Sun, 
  Moon, 
  CheckCircle2, 
  X, 
  FileSpreadsheet, 
  ShieldCheck, 
  Clock, 
  Filter,
  Download,
  Calendar,
  Building2,
  Lock
} from 'lucide-react';

// Initial realistic pharmacy stock register data (matching the screenshot)
const INITIAL_MEDICINES = [
  {
    id: 1,
    name: 'Amoxicillin 500mg',
    generic: 'Amoxicillin Trihydrate',
    category: 'Antibiotic',
    batchNo: 'AMX-9021',
    opening: 1200,
    added: 0,
    dispensed: 80,
    currentBalance: 1120,
    lastUpdated: '2026-08-20',
    expiryDate: '2027-12-31',
    status: 'In Stock',
    schedule: 'Schedule H1'
  },
  {
    id: 2,
    name: 'Fentanyl 50mcg',
    generic: 'Fentanyl Citrate',
    category: 'Narcotic',
    batchNo: 'FNT-4402',
    opening: 60,
    added: 0,
    dispensed: 8,
    currentBalance: 52,
    lastUpdated: '2026-08-20',
    expiryDate: '2026-11-15',
    status: 'In Stock',
    schedule: 'NDPS Controlled'
  },
  {
    id: 3,
    name: 'Azithromycin 500mg',
    generic: 'Azithromycin Dihydrate',
    category: 'Antibiotic',
    batchNo: 'AZM-1182',
    opening: 850,
    added: 50,
    dispensed: 120,
    currentBalance: 780,
    lastUpdated: '2026-08-20',
    expiryDate: '2028-04-30',
    status: 'In Stock',
    schedule: 'Schedule H1'
  },
  {
    id: 4,
    name: 'Tramadol 50mg',
    generic: 'Tramadol Hydrochloride',
    category: 'Narcotic',
    batchNo: 'TRM-8810',
    opening: 12,
    added: 0,
    dispensed: 11,
    currentBalance: 1,
    lastUpdated: '2026-08-20',
    expiryDate: '2026-10-01',
    status: 'Low Stock',
    schedule: 'Schedule H1 / NDPS'
  },
  {
    id: 5,
    name: 'Ciprofloxacin 500mg',
    generic: 'Ciprofloxacin HCl',
    category: 'Antibiotic',
    batchNo: 'CPR-3091',
    opening: 500,
    added: 100,
    dispensed: 85,
    currentBalance: 515,
    lastUpdated: '2026-08-19',
    expiryDate: '2027-09-15',
    status: 'In Stock',
    schedule: 'Schedule H1'
  },
  {
    id: 6,
    name: 'Cefixime 200mg',
    generic: 'Cefixime Trihydrate',
    category: 'Antibiotic',
    batchNo: 'CFX-7720',
    opening: 0,
    added: 0,
    dispensed: 0,
    currentBalance: 0,
    lastUpdated: '2026-08-18',
    expiryDate: '2026-08-15',
    status: 'Out of Stock',
    schedule: 'Schedule H1'
  }
];

export default function BlankScreen({ onSignOut }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Active Sidebar Tab: 'dashboard' | 'inventory' | 'sales' | 'reports' | 'notifications' | 'profile'
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Inventory state
  const [medicines, setMedicines] = useState(INITIAL_MEDICINES);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dailyStockSubmitted, setDailyStockSubmitted] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Modal State for "+ Add Stock"
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [newStock, setNewStock] = useState({
    name: '',
    category: 'Antibiotic',
    batchNo: '',
    quantity: '',
    expiryDate: ''
  });

  const handleSignOut = () => {
    logout();
    onSignOut?.();
  };

  // Add Stock Handler
  const handleAddStockSubmit = (e) => {
    e.preventDefault();
    if (!newStock.name || !newStock.quantity || !newStock.batchNo) return;

    const qty = parseInt(newStock.quantity, 10) || 0;
    const item = {
      id: Date.now(),
      name: newStock.name,
      generic: newStock.name,
      category: newStock.category,
      batchNo: newStock.batchNo.toUpperCase(),
      opening: qty,
      added: qty,
      dispensed: 0,
      currentBalance: qty,
      lastUpdated: new Date().toISOString().split('T')[0],
      expiryDate: newStock.expiryDate || '2028-01-01',
      status: qty > 10 ? 'In Stock' : 'Low Stock',
      schedule: newStock.category === 'Narcotic' ? 'NDPS Controlled' : 'Schedule H1'
    };

    setMedicines(prev => [item, ...prev]);
    setIsAddStockOpen(false);
    setNewStock({ name: '', category: 'Antibiotic', batchNo: '', quantity: '', expiryDate: '' });
  };

  // Calculate live stats
  const totalStock = medicines.reduce((sum, item) => sum + item.currentBalance, 0);
  const antibioticStock = medicines.filter(m => m.category === 'Antibiotic').reduce((sum, item) => sum + item.currentBalance, 0);
  const narcoticStock = medicines.filter(m => m.category === 'Narcotic').reduce((sum, item) => sum + item.currentBalance, 0);
  const lowStockCount = medicines.filter(m => m.status === 'Low Stock' || m.currentBalance <= 10).length;

  // Filtered medicines
  const filteredMedicines = medicines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.batchNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || m.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  // User initials for avatar
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RK';

  return (
    <div className="min-h-screen flex bg-[#f8fafc] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* =========================================================================
          LEFT SIDEBAR (Matches the dark navy sidebar in the screenshot)
      ========================================================================= */}
      <aside className="w-64 bg-[#071527] text-slate-300 flex flex-col flex-shrink-0 z-30 select-none border-r border-slate-800">
        
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 gap-3 border-b border-slate-800/80">
          <div className="flex items-center justify-center text-teal-400">
            <div className="relative flex items-center justify-center w-7 h-7">
              <span className="absolute w-5 h-1.5 bg-teal-400 rounded-full"></span>
              <span className="absolute h-5 w-1.5 bg-teal-400 rounded-full"></span>
            </div>
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-white">
            KOMPOUNDER
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1.5">
          
          {/* Dashboard */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#0e7490] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          {/* Inventory (Active in screenshot) */}
          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'inventory'
                ? 'bg-[#0e7490] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Inventory</span>
          </button>

          {/* Sales & Dispensing */}
          <button
            onClick={() => setActiveTab('sales')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'sales'
                ? 'bg-[#0e7490] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Sales & Dispensing</span>
          </button>

          {/* Reports */}
          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'reports'
                ? 'bg-[#0e7490] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileBarChart className="w-5 h-5" />
            <span>Reports</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'notifications'
                ? 'bg-[#0e7490] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
              3
            </span>
          </button>

        </nav>

        {/* Bottom User Action Links */}
        <div className="px-3 py-6 border-t border-slate-800/80 space-y-1.5">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-[#0e7490] text-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* =========================================================================
          RIGHT MAIN WRAPPER
      ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar (Matches screenshot) */}
        <header className="h-20 bg-white dark:bg-[#070b14] border-b border-slate-200 dark:border-slate-800/80 px-8 flex items-center justify-between transition-colors sticky top-0 z-20">
          
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white capitalize">
            {activeTab === 'inventory' ? 'Inventory' : activeTab === 'dashboard' ? 'Pharmacy Dashboard' : activeTab}
          </h1>

          <div className="flex items-center gap-5">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Notification Bell */}
            <button 
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white dark:ring-slate-900"></span>
            </button>

            {/* User Profile Component (Matches screenshot) */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {user?.name || 'Rajesh Kumar'}
                </div>
                <div className="text-xs text-teal-600 dark:text-teal-400 font-medium leading-tight">
                  {user?.role || 'Registered Pharmacist'}
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#0e7490] text-white font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-teal-500/30">
                {initials}
              </div>
            </div>

          </div>
        </header>

        {/* =========================================================================
            TAB CONTENT AREA: INVENTORY (Exact Match to Screenshot)
        ========================================================================= */}
        {activeTab === 'inventory' && (
          <main className="p-8 space-y-6 max-w-7xl">
            
            {/* Inventory Page Title & Add Stock Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                  Inventory
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Manage and update pharmacy medicine stock levels and track regulatory classifications.
                </p>
              </div>

              <button
                onClick={() => setIsAddStockOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e1e38] hover:bg-[#152a4d] dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold text-sm shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Stock</span>
              </button>
            </div>

            {/* 4 Key Stat Cards (Matches screenshot numbers and layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Card 1: Total Stock */}
              <div className="bg-white dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  TOTAL STOCK
                </span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
                  {totalStock.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Total available units
                </div>
              </div>

              {/* Card 2: Antibiotics */}
              <div className="bg-white dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  ANTIBIOTICS
                </span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
                  {antibioticStock.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Schedule H1 classified
                </div>
              </div>

              {/* Card 3: Narcotic Drugs */}
              <div className="bg-white dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  NARCOTIC DRUGS
                </span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
                  {narcoticStock.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Secure lock inventory
                </div>
              </div>

              {/* Card 4: Low Stock */}
              <div className="bg-white dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  LOW STOCK
                </span>
                <div className="text-3xl font-extrabold text-red-600 dark:text-red-400 mt-2 font-display">
                  {lowStockCount}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Items requiring restock
                </div>
              </div>

            </div>

            {/* Daily Stock Update Compliance Banner (Matches screenshot) */}
            <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
              dailyStockSubmitted 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60' 
                : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800/80 shadow-sm'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  dailyStockSubmitted 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' 
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400'
                }`}>
                  {dailyStockSubmitted ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Daily Stock Update
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      dailyStockSubmitted 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                    }`}>
                      {dailyStockSubmitted ? 'Submitted ✓' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {dailyStockSubmitted 
                      ? 'Reconciled today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' | Regulatory audit lock in effect'
                      : 'Last submitted: Not submitted today | Assigned Inspector: Dr. A. K. Sharma (Drugs Inspector, Zone 4)'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setDailyStockSubmitted(true)}
                disabled={dailyStockSubmitted}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
                  dailyStockSubmitted
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-[#0e1e38] hover:bg-[#152a4d] dark:bg-teal-600 dark:hover:bg-teal-500 text-white shadow-sm'
                }`}
              >
                {dailyStockSubmitted ? 'Daily Stock Submitted ✓' : 'Submit Daily Stock'}
              </button>
            </div>

            {/* Filter and Search Bar (Matches screenshot) */}
            <div className="bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Search Medicine */}
              <div className="md:col-span-6 space-y-1">
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  SEARCH MEDICINE
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or batch..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="md:col-span-3 space-y-1">
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  CATEGORY
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Antibiotic">Antibiotic</option>
                  <option value="Narcotic">Narcotic</option>
                  <option value="Schedule H1">Schedule H1</option>
                </select>
              </div>

              {/* Stock Status Dropdown */}
              <div className="md:col-span-3 space-y-1">
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  STOCK STATUS
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

            </div>

            {/* Pharmacy Stock Register Table (Matches screenshot) */}
            <div className="bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm overflow-hidden">
              
              {/* Table Header Section */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Pharmacy Stock Register
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Click on any row to view stock movements and logs.
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  
                  {/* Table Column Headers */}
                  <thead className="bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-3.5">MEDICINE NAME</th>
                      <th className="px-6 py-3.5">CATEGORY</th>
                      <th className="px-6 py-3.5">BATCH NO.</th>
                      <th className="px-6 py-3.5 text-right">OPENING</th>
                      <th className="px-6 py-3.5 text-right">ADDED</th>
                      <th className="px-6 py-3.5 text-right">DISPENSED</th>
                      <th className="px-6 py-3.5 text-right">CURRENT BALANCE</th>
                      <th className="px-6 py-3.5">LAST UPDATED</th>
                      <th className="px-6 py-3.5">STATUS</th>
                    </tr>
                  </thead>

                  {/* Table Rows */}
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredMedicines.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="px-6 py-10 text-center text-slate-400">
                          No matching medicines found in registry.
                        </td>
                      </tr>
                    ) : (
                      filteredMedicines.map((item) => (
                        <tr 
                          key={item.id}
                          onClick={() => setSelectedMedicine(item)}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                        >
                          {/* Medicine Name */}
                          <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                            {item.name}
                          </td>

                          {/* Category */}
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                            {item.category}
                          </td>

                          {/* Batch No. (Light blue pill badge in screenshot) */}
                          <td className="px-6 py-4">
                            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 font-semibold">
                              {item.batchNo}
                            </span>
                          </td>

                          {/* Opening */}
                          <td className="px-6 py-4 text-right font-medium text-slate-600 dark:text-slate-300">
                            {item.opening}
                          </td>

                          {/* Added */}
                          <td className="px-6 py-4 text-right font-bold text-teal-600 dark:text-teal-400">
                            +{item.added}
                          </td>

                          {/* Dispensed */}
                          <td className="px-6 py-4 text-right font-bold text-amber-600 dark:text-amber-500">
                            -{item.dispensed}
                          </td>

                          {/* Current Balance */}
                          <td className="px-6 py-4 text-right font-extrabold text-slate-900 dark:text-white">
                            {item.currentBalance}
                          </td>

                          {/* Last Updated */}
                          <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                            {item.lastUpdated}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              item.status === 'In Stock'
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                                : item.status === 'Low Stock'
                                ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {item.status}
                            </span>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>

                </table>
              </div>

            </div>

          </main>
        )}

        {/* =========================================================================
            TAB CONTENT: DASHBOARD
        ========================================================================= */}
        {activeTab === 'dashboard' && (
          <main className="p-8 space-y-6 max-w-7xl">
            <div className="bg-gradient-to-r from-[#0e7490] to-teal-700 text-white p-7 rounded-3xl shadow-lg">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                Surveillance Grid Active
              </span>
              <h2 className="font-display text-2xl font-bold mt-1">
                Pharmacy Compliance Portal — {user?.pharmacyName || 'Apollo MedPlus Care'}
              </h2>
              <p className="text-xs opacity-90 mt-1 max-w-2xl leading-relaxed">
                All dispensing of Antibiotics and Narcotic (NDPS) substances is synced live with Drugs Control Department Inspectorate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase">Today's Dispensing Events</div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">14</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">✓ Doctor Reg. Validated</div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase">100-Unit Threshold Limit</div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">32 / 100</div>
                <div className="text-xs text-teal-600 dark:text-teal-400 mt-1">Normal Rate (68 Units Safe Margin)</div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase">Inspector Status</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-2">Dr. A. K. Sharma</div>
                <div className="text-xs text-slate-500 mt-1">Zone 4 (Bengaluru South) · Audit Up to date</div>
              </div>
            </div>
          </main>
        )}

        {/* =========================================================================
            TAB CONTENT: SALES & DISPENSING
        ========================================================================= */}
        {activeTab === 'sales' && (
          <main className="p-8 space-y-6 max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                  Sales & Controlled Medicine Dispensing
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enforces Doctor Registration No., Patient Mobile, and Prescription PDF Attachment.
                </p>
              </div>
              <button 
                onClick={() => alert("Dispensing module ready for next sprint integration.")}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-sm"
              >
                + Record Prescription Sale
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center py-12">
              <ShoppingCart className="w-12 h-12 text-teal-500 mx-auto mb-3" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Prescription Sales Log Interlocking Active
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Every sale auto-decrements current stock balance and creates an auditable record for the Drug Inspector.
              </p>
            </div>
          </main>
        )}

        {/* =========================================================================
            TAB CONTENT: NOTIFICATIONS
        ========================================================================= */}
        {activeTab === 'notifications' && (
          <main className="p-8 space-y-6 max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              System Notifications & Compliance Alerts
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    Daily Stock Reconcile Cutoff Reminder
                  </div>
                  <div className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                    Daily stock submission must be completed by 11:00 PM IST to avoid automated inspector alert generation.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-sky-900 dark:text-sky-200">
                    Pharmacy Council License Active
                  </div>
                  <div className="text-xs text-sky-700 dark:text-sky-400 mt-0.5">
                    Your establishment credentials and GPS geofence stamping are verified by the Licensing Authority.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 flex items-start gap-3">
                <Package className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-teal-900 dark:text-teal-200">
                    Low Stock Alert: Tramadol 50mg
                  </div>
                  <div className="text-xs text-teal-700 dark:text-teal-400 mt-0.5">
                    Only 1 unit remains in stock. Schedule secure batch requisition.
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

      </div>

      {/* =========================================================================
          MODAL: + ADD STOCK
      ========================================================================= */}
      {isAddStockOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Add Medicine Stock
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Record new received batch into the Pharmacy Stock Register
                </p>
              </div>
              <button 
                onClick={() => setIsAddStockOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStockSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Medicine Name & Strength *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Moxifloxacin 400mg"
                  value={newStock.name}
                  onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Regulatory Category *
                  </label>
                  <select
                    value={newStock.category}
                    onChange={(e) => setNewStock({ ...newStock, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Antibiotic">Antibiotic</option>
                    <option value="Narcotic">Narcotic (NDPS)</option>
                    <option value="Schedule H1">Schedule H1</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Batch Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MXF-5012"
                    value={newStock.batchNo}
                    onChange={(e) => setNewStock({ ...newStock, batchNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Received Quantity (Units) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 500"
                    value={newStock.quantity}
                    onChange={(e) => setNewStock({ ...newStock, quantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newStock.expiryDate}
                    onChange={(e) => setNewStock({ ...newStock, expiryDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddStockOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md shadow-teal-600/20"
                >
                  Confirm & Ingest Stock
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: MEDICINE ROW DETAILS / AUDIT TRAIL
      ========================================================================= */}
      {selectedMedicine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {selectedMedicine.schedule}
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {selectedMedicine.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedMedicine(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-400 block text-[10px]">Batch Number</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedMedicine.batchNo}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-400 block text-[10px]">Category</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedMedicine.category}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-400 block text-[10px]">Current Available</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedMedicine.currentBalance} units</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-400 block text-[10px]">Expiry Date</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedMedicine.expiryDate}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-teal-600" />
              <span>Immutable blockchain/digital audit hash verified by State Drug Inspector.</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedMedicine(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200"
              >
                Close Audit Log
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
