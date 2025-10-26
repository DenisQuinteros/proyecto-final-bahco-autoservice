import { Car, Wrench, CheckCircle, Clock, DollarSign, User } from 'lucide-react';

export default function Dashboard({ vehiculos, servicios, mecanicos }) {
  const totalVehiculos = vehiculos.length;
  const totalMecanicos = mecanicos.length;
  const serviciosPendientes = servicios.filter(s => s.estado === 'Pendiente').length;
  const serviciosEnProceso = servicios.filter(s => s.estado === 'En Proceso').length;
  const serviciosCompletados = servicios.filter(s => s.estado === 'Completado').length;
  const ingresosTotal = servicios
    .filter(s => s.estado === 'Completado')
    .reduce((total, s) => total + parseFloat(s.costo || 0), 0);

  const stats = [
    {
      icon: <Car size={32} />,
      title: 'Vehículos Registrados',
      value: totalVehiculos,
      color: '#667eea',
      bg: '#e0e7ff'
    },
    {
      icon: <User size={32} />,
      title: 'Mecánicos Activos',
      value: totalMecanicos,
      color: '#06b6d4',
      bg: '#cffafe'
    },
    {
      icon: <Clock size={32} />,
      title: 'Servicios Pendientes',
      value: serviciosPendientes,
      color: '#f59e0b',
      bg: '#fef3c7'
    },
    {
      icon: <Wrench size={32} />,
      title: 'En Proceso',
      value: serviciosEnProceso,
      color: '#3b82f6',
      bg: '#dbeafe'
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Completados',
      value: serviciosCompletados,
      color: '#10b981',
      bg: '#d1fae5'
    },
    {
      icon: <DollarSign size={32} />,
      title: 'Ingresos Totales',
      value: `Bs. ${ingresosTotal.toFixed(2)}`,
      color: '#8b5cf6',
      bg: '#ede9fe'
    }
  ];

  return (
    <div className="fade-in">
      <h2 style={{ 
        fontSize: '28px', 
        marginBottom: '24px',
        color: 'white',
        textAlign: 'center'
      }}>
        📊 Panel de Control
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div style={{
              background: stat.bg,
              color: stat.color,
              padding: '16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                {stat.title}
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color }}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>
          🚀 Bienvenido al Sistema de Gestión
        </h3>
        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
          Este sistema te permite gestionar de manera eficiente todos los vehículos, servicios 
          y personal de tu taller mecánico BAHCO AutoService. Usa el menú superior para navegar entre las diferentes secciones.
        </p>
        <ul style={{ marginTop: '16px', color: '#6b7280', lineHeight: '1.8' }}>
          <li>✅ <strong>Vehículos:</strong> Registra y administra los vehículos de tus clientes</li>
          <li>✅ <strong>Servicios:</strong> Gestiona las reparaciones y su estado</li>
          <li>✅ <strong>Mecánicos:</strong> Administra tu equipo de trabajo</li>
          <li>✅ <strong>Dashboard:</strong> Visualiza estadísticas en tiempo real</li>
        </ul>
      </div>
    </div>
  );
}