import React from 'react';

const SimuladorTabla = ({ data }) => {
  return (
    <table className="table table-bordered mt-4">
      <thead className="thead-light">
        <tr>
          <th>Mes</th>
          <th>Número de animales</th>
          <th>Peso promedio</th>
          <th>% Tasa alimentaria</th>
          <th>Biomasa</th>
          <th>Alimento concentrado (kg)</th>
          <th>Concentrado mensual (kg)</th>
          <th>% Proteína</th>
          <th>Bultos</th>
          <th>Precio de Bultos</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.mes}</td>
            <td>{row.numero}</td>
            <td>{row.peso}</td>
            <td>{row.tasa}</td>
            <td>{row.biomasa}</td>
            <td>{row.alimento}</td>
            <td>{row.concentrado}</td>
            <td>{row.proteina}</td>
            <td>{row.bultos}</td>
            <td>{row.precio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimuladorTabla;
