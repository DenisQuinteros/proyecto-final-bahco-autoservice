import { LogOut, Moon, Sun, Home, Car, Wrench, User } from 'lucide-react';

export default function Navbar({ onLogout, darkMode, toggleDarkMode, currentView, setCurrentView }) {
  const username = localStorage.getItem('username');

  return (
    <nav style={{
      background: darkMode ? '#1a1a2e' : '#667eea',
      color: 'white',
      padding: '16px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'white',
            padding: '4px 12px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '24px' }}>🔧</span>
            <span style={{ 
              color: '#dc2626', 
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              BAHCO AutoService
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="btn"
            style={{
              background: currentView === 'dashboard' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <Home size={18} />
            Inicio
          </button>

          <button
            onClick={() => setCurrentView('vehiculos')}
            className="btn"
            style={{
              background: currentView === 'vehiculos' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <Car size={18} />
            Vehículos
          </button>

          <button
            onClick={() => setCurrentView('servicios')}
            className="btn"
            style={{
              background: currentView === 'servicios' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <Wrench size={18} />
            Servicios
          </button>

          <button
            onClick={() => setCurrentView('mecanicos')}
            className="btn"
            style={{
              background: currentView === 'mecanicos' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <User size={18} />
            Mecánicos
          </button>

          <button
            onClick={toggleDarkMode}
            className="btn"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onLogout}
            className="btn btn-danger"
          >
            <LogOut size={18} />
            Salir
          </button>
        </div>

        <div style={{ width: '100%', textAlign: 'right', fontSize: '14px' }}>
          Bienvenido, <strong>{username}</strong>
        </div>
      </div>
    </nav>
  );
}