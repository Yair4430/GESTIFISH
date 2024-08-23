import React, { useState } from 'react';

const SimuladorForm = ({ onSimulate }) => {
  const [formData, setFormData] = useState({
    especie: '',
    densidad: '',
    espejoAgua: '',
    recambio: '',
    precioBulto: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimulate(formData);
  };

  const handleEspecieChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      especie: value,
      densidad: value === 'Cachama' ? 2 : '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="especie">Especie</label>
        <select
          id="especie"
          name="especie"
          value={formData.especie}
          onChange={handleEspecieChange}
          className="form-control"
        >
          <option value="" disabled>
            Seleccione uno...
          </option>
          <option value="Tilapia">Tilapia</option>
          <option value="Cachama">Cachama</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="densidad">Densidad</label>
        <input
          type="number"
          id="densidad"
          name="densidad"
          value={formData.densidad}
          onChange={handleChange}
          disabled={formData.especie === 'Cachama'}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="espejoAgua">Espejo de Agua (m²)</label>
        <input
          type="number"
          id="espejoAgua"
          name="espejoAgua"
          value={formData.espejoAgua}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="precioBulto">Precio del Bulto</label>
        <input
          type="number"
          id="precioBulto"
          name="precioBulto"
          value={formData.precioBulto}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <br />
      <button type="submit" className="btn btn-primary">Simular</button>
    </form>
  );
};

export default SimuladorForm;