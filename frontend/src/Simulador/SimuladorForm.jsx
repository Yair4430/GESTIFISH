import React, { useState } from 'react';

const SimuladorForm = ({ onSimulate }) => {
  const [formData, setFormData] = useState({
    especie: '',
    densidad: '',
    espejoAgua: '',
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
    if (formData.especie && formData.densidad && formData.espejoAgua && formData.precioBulto) {
      onSimulate(formData);
      setFormData({
        especie: '',
        densidad: '',
        espejoAgua: '',
        precioBulto: '',
      });
    } else {
      alert('Por favor complete todos los campos en el orden correcto.');
    }
  };

  const handleEspecieChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      especie: value,
      densidad: value === 'Cachama' ? 2 : '',
      espejoAgua: '',
      precioBulto: '',
    });
  };

  return (
    <>
      <style>{`
        .form-container {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .form-container h2 {
          margin-bottom: 20px;
        }
        .form-container .form-label {
          font-weight: bold;
        }
        .form-container .btn {
          margin-top: 20px;
          width: auto;
          display: inline-block;
          font-weight: 500;
          transition: all 0.3s ease-in-out;
        }
        .form-container .btn:hover {
          background-color: #004085;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 91, 234, 0.5);
        }
      `}</style>

      <form onSubmit={handleSubmit} className="row g-3 form-container">
        <div className="col-md-6">
          <label htmlFor="especie" className="form-label">Especie</label>
          <select
            id="especie"
            name="especie"
            value={formData.especie}
            onChange={handleEspecieChange}
            className="form-select"
          >
            <option value="" disabled>
              Seleccione uno...
            </option>
            <option value="Tilapia">Tilapia</option>
            <option value="Cachama">Cachama</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="densidad" className="form-label">Densidad</label>
          <input
            type="number"
            id="densidad"
            name="densidad"
            value={formData.densidad}
            onChange={handleChange}
            disabled={!formData.especie || formData.especie === 'Cachama'}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="espejoAgua" className="form-label">Espejo de agua</label>
          <input
            type="number"
            id="espejoAgua"
            name="espejoAgua"
            value={formData.espejoAgua}
            onChange={handleChange}
            disabled={!formData.densidad}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="precioBulto" className="form-label">Precio del Bulto</label>
          <input
            type="number"
            id="precioBulto"
            name="precioBulto"
            value={formData.precioBulto}
            onChange={handleChange}
            disabled={!formData.espejoAgua}
            className="form-control"
          />
        </div>
        <div className="col-md-12 text-center">
          <button type="submit" className="btn btn-primary">Simular</button>
        </div>
      </form>
    </>
  );
};

export default SimuladorForm;