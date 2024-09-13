import React, { useState } from 'react';

const SimuladorForm = ({ onSimulate, onClear }) => {
  const [formData, setFormData] = useState({
    especie: '',
    densidad: '',
    espejoAgua: '',
    precioBulto: '',
  });

  // Función para formatear los números con comas o puntos
  const formatNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Remover formato para obtener el valor numérico real
  const unformatNumber = (value) => {
    return value.replace(/,/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'densidad' || name === 'espejoAgua' || name === 'precioBulto') {
      // Formatear el número mientras se escribe
      const unformattedValue = unformatNumber(value);
      if (!isNaN(unformattedValue)) {
        setFormData({
          ...formData,
          [name]: formatNumber(unformattedValue),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Al enviar el formulario, desformatear los números para obtener el valor real
    if (formData.especie && formData.densidad && formData.espejoAgua && formData.precioBulto) {
      const formattedData = {
        ...formData,
        densidad: unformatNumber(formData.densidad),
        espejoAgua: unformatNumber(formData.espejoAgua),
        precioBulto: unformatNumber(formData.precioBulto),
      };
      onSimulate(formattedData);
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
    });
  };

  const handleReset = () => {
    setFormData({
      especie: '',
      densidad: '',
      espejoAgua: '',
      precioBulto: '',
    });
    onClear();
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css" />

      <style>{`
        .form-container {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
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
            type="text"
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
            type="text"
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
            type="text"
            id="precioBulto"
            name="precioBulto"
            value={formData.precioBulto}
            onChange={handleChange}
            disabled={!formData.espejoAgua}
            className="form-control"
          />
        </div>
        <div className="col-md-12 text-center">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-play-circle me-2"></i> Simular
          </button>
          <button type="button" className="btn btn-secondary ms-2" onClick={handleReset}>
            <i className="bi bi-trash me-2"></i> Limpiar
          </button>
        </div>
      </form>
      <br />
    </>
  );
};

export default SimuladorForm;
