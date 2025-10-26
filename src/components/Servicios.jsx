import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Wrench } from 'lucide-react';

export default function Servicios({ servicios, setServicios, vehiculos }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('Todos');
  const [formData, setFormData] = useState({
    vehiculoId: '',
    tipoServicio: '',
    descripcion: '',
    costo: '',
    estado: 'Pendiente',
    fechaIngreso: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setServicios(servicios.map(s => 
        s.id === editingId ? { ...formData, id: editingId } : s
      ));
    } else {
      const nuevoServicio = {
        ...formData,
        id: Date.now()
      };
      setServicios([...servicios, nuevoServicio]);
    }

    resetForm();
  };

  const handleEdit = (servicio) => {
    setFormData(servicio);
    setEditingId(servicio.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      setServicios(servicios.filter(s => s.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      vehiculoId: '',
      tipoServicio: '',
      descripcion: '',
      costo: '',
      estado: 'Pendiente',
      fechaIngreso: new Date().toISOString().split('T')[0]
    });
    setEditingId(null);
    setShowForm(false);
  };

  const getVehiculoInfo = (vehiculoId) => {
    const vehiculo = vehiculos.find(v => v.id === parseInt(vehiculoId));
    return vehiculo ? `${vehiculo.placa} - ${vehiculo.marca} ${vehiculo.modelo}` : 'N/A';
  };

  const filteredServicios = servicios.filter(s => {
    const matchSearch = getVehiculoInfo(s.vehiculoId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                       s.tipoServicio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = filterEstado === 'Todos' || s.estado === filterEstado;
    return matchSearch && matchEstado;
  });

  const getEstadoBadge = (estado) => {
    const badges = {
      'Pendiente': 'badge-pending',
      'En Proceso': 'badge-progress',
      'Completado': 'badge-completed'
    };
    return badges[estado] || 'badge-pending';
  };

  return (
    <div className="fade-in">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h2 style={{ fontSize: '28px', color: 'white', margin: 0 }}>
          <Wrench style={{ display: 'inline', marginRight: '8px' }} />
          Gestión de Servicios
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-success"
        >
          <Plus size={18} />
          {showForm ? 'Cancelar' : 'Nuevo Servicio'}
        </button>
      </div>

      {showForm && (
        <div className="card fade-in" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>
            {editingId ? 'Editar Servicio' : 'Registrar Nuevo Servicio'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label>Vehículo *</label>
                <select
                  value={formData.vehiculoId}
                  onChange={(e) => setFormData({...formData, vehiculoId: e.target.value})}
                  required
                >
                  <option value="">Seleccionar vehículo...</option>
                  {vehiculos.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.placa} - {v.marca} {v.modelo} ({v.cliente})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de Servicio *</label>
                <select
                  value={formData.tipoServicio}
                  onChange={(e) => setFormData({...formData, tipoServicio: e.target.value})}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Cambio de aceite">Cambio de aceite</option>
                  <option value="Frenos">Frenos</option>
                  <option value="Suspensión">Suspensión</option>
                  <option value="Motor">Motor</option>
                  <option value="Transmisión">Transmisión</option>
                  <option value="Sistema eléctrico">Sistema eléctrico</option>
                  <option value="Aire acondicionado">Aire acondicionado</option>
                  <option value="Alineación y balanceo">Alineación y balanceo</option>
                  <option value="Diagnóstico general">Diagnóstico general</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              <div className="form-group">
                <label>Costo (Bs.) *</label>
                <input
                  type="number"
                  value={formData.costo}
                  onChange={(e) => setFormData({...formData, costo: e.target.value})}
                  placeholder="250.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Estado *</label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                  required
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>

              <div className="form-group">
                <label>Fecha de Ingreso *</label>
                <input
                  type="date"
                  value={formData.fechaIngreso}
                  onChange={(e) => setFormData({...formData, fechaIngreso: e.target.value})}
                  required
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Descripción *</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Describe el problema o servicio requerido..."
                  rows="3"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Actualizar' : 'Registrar'}
              </button>
              <button type="button" onClick={resetForm} className="btn" style={{ background: '#6b7280', color: 'white' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div className="form-group">
            <label>🔍 Buscar servicio</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por vehículo o tipo..."
            />
          </div>

          <div className="form-group">
            <label>Filtrar por estado</label>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Completado">Completado</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Vehículo</th>
                <th>Tipo de Servicio</th>
                <th>Descripción</th>
                <th>Costo</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredServicios.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                    No hay servicios registrados
                  </td>
                </tr>
              ) : (
                filteredServicios.map(servicio => (
                  <tr key={servicio.id}>
                    <td><strong>{getVehiculoInfo(servicio.vehiculoId)}</strong></td>
                    <td>{servicio.tipoServicio}</td>
                    <td style={{ maxWidth: '200px' }}>{servicio.descripcion}</td>
                    <td><strong>Bs. {parseFloat(servicio.costo).toFixed(2)}</strong></td>
                    <td>
                      <span className={`badge ${getEstadoBadge(servicio.estado)}`}>
                        {servicio.estado}
                      </span>
                    </td>
                    <td>{servicio.fechaIngreso}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEdit(servicio)}
                          className="btn btn-warning"
                          style={{ padding: '6px 12px' }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(servicio.id)}
                          className="btn btn-danger"
                          style={{ padding: '6px 12px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}