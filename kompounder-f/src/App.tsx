import { useState, useEffect } from 'react'
import Landing from './pages/auth/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PharmacistDashboard from './pages/pharmacist/PharmacistDashboard'
import InspectorDashboard from './pages/inspector/InspectorDashboard'

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'register' | 'pharmacist-dashboard' | 'inspector-dashboard'>(() => {
    const saved = localStorage.getItem('kompounder_view');
    if (saved === 'landing' || saved === 'login' || saved === 'register' || saved === 'pharmacist-dashboard' || saved === 'inspector-dashboard') {
      return saved;
    }
    return 'landing';
  });

  useEffect(() => {
    localStorage.setItem('kompounder_view', currentView);
  }, [currentView]);

  return (
    <>
      {currentView === 'landing' && <Landing onNavigate={setCurrentView} />}
      {currentView === 'login' && <Login onNavigate={setCurrentView} />}
      {currentView === 'register' && <Register onNavigate={setCurrentView} />}
      
      {/* Pharmacist Dashboard */}
      {currentView === 'pharmacist-dashboard' && (
        <PharmacistDashboard onNavigate={setCurrentView} />
      )}

      {/* Drug Inspector Portal */}
      {currentView === 'inspector-dashboard' && (
        <InspectorDashboard onNavigate={setCurrentView} />
      )}
    </>
  )
}

export default App
