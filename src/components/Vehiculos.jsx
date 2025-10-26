import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Car } from 'lucide-react';

export default function Vehiculos({ vehiculos, setVehiculos }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    año: '',
    cliente: '',
    telefono: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Actualizar
      setVehiculos(vehiculos.map(v => 
        v.id === editingId ? { ...formData, id: editingId } : v
      ));
    } else {
      // Crear
      const nuevoVehiculo = {
        ...formData,
        id: Date.now()
      };
      setVehiculos([...vehiculos, nuevoVehiculo]);
    }

    resetForm();
  };

  const handleEdit = (vehiculo) => {
    setFormData(vehiculo);
    setEditingId(vehiculo.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este vehículo?')) {
      setVehiculos(vehiculos.filter(v => v.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      placa: '',
      marca: '',
      modelo: '',
      año: '',
      cliente: '',
      telefono: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredVehiculos = vehiculos.filter(v =>
    v.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.marca.toLowerCase().includes(searchTerm.toLowerCase())
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
          <Car style={{ display: 'inline', marginRight: '8px' }} />
          Gestión de Vehículos
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-success"
        >
          <Plus size={18} />
          {showForm ? 'Cancelar' : 'Nuevo Vehículo'}
        </button>
      </div>

      {showForm && (
        <div className="card fade-in" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>
            {editingId ? 'Editar Vehículo' : 'Registrar Nuevo Vehículo'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label>Placa *</label>
                <input
                  type="text"
                  value={formData.placa}
                  onChange={(e) => setFormData({...formData, placa: e.target.value.toUpperCase()})}
                  placeholder="ABC-123"
                  required
                />
              </div>

              <div className="form-group">
                <label>Marca *</label>
                <select
                  value={formData.marca}
                  onChange={(e) => setFormData({...formData, marca: e.target.value})}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Chevrolet">Chevrolet</option>
                  <option value="Honda">Honda</option>
                  <option value="Ford">Ford</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Mazda">Mazda</option>
                  <option value="Suzuki">Suzuki</option>
                </select>
              </div>

              <div className="form-group">
                <label>Modelo *</label>
                <input
                  type="text"
                  value={formData.modelo}
                  onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                  placeholder="Corolla"
                  required
                />
              </div>

              <div className="form-group">
                <label>Año *</label>
                <input
                  type="number"
                  value={formData.año}
                  onChange={(e) => setFormData({...formData, año: e.target.value})}
                  placeholder="2020"
                  min="1990"
                  max="2025"
                  required
                />
              </div>

              <div className="form-group">
                <label>Cliente *</label>
                <input
                  type="text"
                  value={formData.cliente}
                  onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                  placeholder="Juan Pérez"
                  required
                />
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
          <label>🔍 Buscar vehículo</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por placa, cliente o marca..."
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Placa</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Cliente</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehiculos.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                    No hay vehículos registrados
                  </td>
                </tr>
              ) : (
                filteredVehiculos.map(vehiculo => (
                  <tr key={vehiculo.id}>
                    <td><strong>{vehiculo.placa}</strong></td>
                    <td>{vehiculo.marca}</td>
                    <td>{vehiculo.modelo}</td>
                    <td>{vehiculo.año}</td>
                    <td>{vehiculo.cliente}</td>
                    <td>{vehiculo.telefono}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEdit(vehiculo)}
                          className="btn btn-warning"
                          style={{ padding: '6px 12px' }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(vehiculo.id)}
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