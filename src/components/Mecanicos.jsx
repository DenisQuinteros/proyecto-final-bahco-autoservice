import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, User, Wrench } from 'lucide-react';

export default function Mecanicos({ mecanicos, setMecanicos }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    especialidad: '',
    telefono: '',
    email: '',
    turno: '',
    fechaIngreso: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setMecanicos(mecanicos.map(m => 
        m.id === editingId ? { ...formData, id: editingId } : m
      ));
    } else {
      const nuevoMecanico = {
        ...formData,
        id: Date.now()
      };
      setMecanicos([...mecanicos, nuevoMecanico]);
    }

    resetForm();
  };

  const handleEdit = (mecanico) => {
    setFormData(mecanico);
    setEditingId(mecanico.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este mecánico?')) {
      setMecanicos(mecanicos.filter(m => m.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      especialidad: '',
      telefono: '',
      email: '',
      turno: '',
      fechaIngreso: new Date().toISOString().split('T')[0]
    });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredMecanicos = mecanicos.filter(m =>
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <User style={{ display: 'inline', marginRight: '8px' }} />
          Gestión de Mecánicos
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-success"
        >
          <Plus size={18} />
          {showForm ? 'Cancelar' : 'Nuevo Mecánico'}
        </button>
      </div>

      {showForm && (
        <div className="card fade-in" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>
            {editingId ? 'Editar Mecánico' : 'Registrar Nuevo Mecánico'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="form-group">
                <label>Especialidad *</label>
                <select
                  value={formData.especialidad}
                  onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Mecánica general">Mecánica general</option>
                  <option value="Motor">Motor</option>
                  <option value="Transmisión">Transmisión</option>
                  <option value="Electricidad automotriz">Electricidad automotriz</option>
                  <option value="Frenos y suspensión">Frenos y suspensión</option>
                  <option value="Aire acondicionado">Aire acondicionado</option>
                  <option value="Diagnóstico computarizado">Diagnóstico computarizado</option>
                  <option value="Pintura y chapa">Pintura y chapa</option>
                </select>
              </div>

              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  placeholder="71234567"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="mecanico@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label>Turno *</label>
                <select
                  value={formData.turno}
                  onChange={(e) => setFormData({...formData, turno: e.target.value})}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Mañana (8:00 - 14:00)">Mañana (8:00 - 14:00)</option>
                  <option value="Tarde (14:00 - 20:00)">Tarde (14:00 - 20:00)</option>
                  <option value="Completo (8:00 - 18:00)">Completo (8:00 - 18:00)</option>
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
        <div className="form-group">
          <label>🔍 Buscar mecánico</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o especialidad..."
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Especialidad</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Turno</th>
                <th>Fecha Ingreso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMecanicos.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                    No hay mecánicos registrados
                  </td>
                </tr>
              ) : (
                filteredMecanicos.map(mecanico => (
                  <tr key={mecanico.id}>
                    <td><strong>{mecanico.nombre}</strong></td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Wrench size={14} />
                        {mecanico.especialidad}
                      </span>
                    </td>
                    <td>{mecanico.telefono}</td>
                    <td>{mecanico.email || 'N/A'}</td>
                    <td>{mecanico.turno}</td>
                    <td>{mecanico.fechaIngreso}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEdit(mecanico)}
                          className="btn btn-warning"
                          style={{ padding: '6px 12px' }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(mecanico.id)}
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