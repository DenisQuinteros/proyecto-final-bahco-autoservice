import { useState, useEffect } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Vehiculos from './components/Vehiculos';
import Servicios from './components/Servicios';
import Mecanicos from './components/Mecanicos';
import './styles/global.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [vehiculos, setVehiculos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);

  // Cargar autenticación
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Cargar datos del localStorage
  useEffect(() => {
    const savedVehiculos = localStorage.getItem('vehiculos');
    const savedServicios = localStorage.getItem('servicios');
    const savedMecanicos = localStorage.getItem('mecanicos');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedVehiculos) setVehiculos(JSON.parse(savedVehiculos));
    if (savedServicios) setServicios(JSON.parse(savedServicios));
    if (savedMecanicos) setMecanicos(JSON.parse(savedMecanicos));
    if (savedDarkMode === 'true') setDarkMode(true);
  }, []);

  // Guardar vehículos
  useEffect(() => {
    localStorage.setItem('vehiculos', JSON.stringify(vehiculos));
  }, [vehiculos]);

  // Guardar servicios
  useEffect(() => {
    localStorage.setItem('servicios', JSON.stringify(servicios));
  }, [servicios]);

  // Guardar mecánicos
  useEffect(() => {
    localStorage.setItem('mecanicos', JSON.stringify(mecanicos));
  }, [mecanicos]);

  // Aplicar modo oscuro
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <Navbar
        onLogout={handleLogout}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div className="container" style={{ paddingTop: '24px', paddingBottom: '40px' }}>
        {currentView === 'dashboard' && (
          <Dashboard 
            vehiculos={vehiculos} 
            servicios={servicios}
            mecanicos={mecanicos}
          />
        )}

        {currentView === 'vehiculos' && (
          <Vehiculos vehiculos={vehiculos} setVehiculos={setVehiculos} />
        )}

        {currentView === 'servicios' && (
          <Servicios
            servicios={servicios}
            setServicios={setServicios}
            vehiculos={vehiculos}
          />
        )}

        {currentView === 'mecanicos' && (
          <Mecanicos mecanicos={mecanicos} setMecanicos={setMecanicos} />
        )}
      </div>
    </div>
  );
}

export default App;