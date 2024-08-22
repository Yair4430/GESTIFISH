import React, { useState, useEffect } from 'react';

const SimuladorForm = ({ onSimulate }) => {
  const [espejoAgua, setEspejoAgua] = useState('');
  const [recambio, setRecambio] = useState('');
  const [especie, setEspecie] = useState('');
  const [densidad, setDensidad] = useState('');
  const [precioBulto, setPrecioBulto] = useState('');

  // UseEffect para actualizar la densidad y la simulación al cambiar la especie
  useEffect(() => {
    if (especie === 'Cachama') {
      setDensidad(2);
    } else if (especie === 'Tilapia') {
      setDensidad('');
    }
    onSimulate({ espejoAgua, recambio, especie, densidad: especie === 'Cachama' ? 2 : densidad, precioBulto });
  }, [especie, espejoAgua, recambio, densidad, precioBulto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Se mantiene para futuras funciones al enviar
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
          <option value="" disabled>Seleccione uno...</option>
          <option value="Tilapia">Tilapia</option>
          <option value="Cachama">Cachama</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="densidad">Densidad:</label>
        <input
          type="number"
          id="densidad"
          className="form-control"
          value={especie === 'Cachama' ? 2 : densidad}
          onChange={(e) => setDensidad(e.target.value)}
          disabled={especie === 'Cachama'}
        />
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
