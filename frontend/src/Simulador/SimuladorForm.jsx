import React, { useState } from 'react';

const SimuladorForm = ({ onSimulate }) => {
  const [espejoAgua, setEspejoAgua] = useState('');
  const [recambio, setRecambio] = useState('');
  const [especie, setEspecie] = useState('');
  const [densidad, setDensidad] = useState('');
  const [precioBulto, setPrecioBulto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimulate({ espejoAgua, recambio, especie, densidad, precioBulto });
    // Limpiar los campos después de enviar
    setEspejoAgua('');
    setRecambio('');
    setEspecie('');
    setDensidad('');
    setPrecioBulto('');
  };

  return (
    <form className="input-section" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="espejoAgua">Espejo de agua:</label>
        <input type="number" id="espejoAgua" className="form-control" value={espejoAgua} onChange={(e) => setEspejoAgua(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="recambio">Recambio:</label>
        <input type="number" id="recambio" className="form-control" value={recambio} onChange={(e) => setRecambio(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="especie">Especie:</label>
        <select id="especie" className="form-control" value={especie} onChange={(e) => setEspecie(e.target.value)}>
          <option selected disabled>Seleccione uno...</option>
          <option value="Tilapia">Tilapia</option>
          <option value="Cachama">Cachama</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="densidad">Densidad:</label>
        <input type="number" id="densidad" className="form-control" value={densidad} onChange={(e) => setDensidad(e.target.value)} disabled={especie !== 'Tilapia'} />
      </div>
      <div className="form-group">
        <label htmlFor="precioBulto">Precio de un bulto:</label>
        <input type="number" id="precioBulto" className="form-control" value={precioBulto} onChange={(e) => setPrecioBulto(e.target.value)} />
      </div>
      <div className="form-group">
        <button id="enviar" className="btn btn-primary btn-block mt-4">Enviar</button>
      </div>
    </form>
  );
};

export default SimuladorForm;
