import React from 'react';
import './SimuladorTabla.css'; // Asegúrate de que el camino sea correcto

const SimuladorTabla = ({ data }) => {
  return (
    <table className="table-custom mt-4">
      <thead>
        <tr>
          <th>Mes</th>
          <th>Número de animales</th>
          <th>Peso promedio</th>
          <th>% Tasa alimentaria</th>
          <th>Biomasa</th>
          <th>Alimento diario</th>
          <th>Concentrado mensual</th>
          <th>Proteína</th>
          <th>Bultos</th>
          <th>Costo mensual</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <tr key={index}>
              <td>{row.mes}</td>
              <td>{row.numero}</td>
              <td>{row.peso} g</td>
              <td>{row.tasa}</td>
              <td>{row.biomasa} g</td>
              <td>{row.alimento}</td>
              <td>{row.concentrado}</td>
              <td>{row.proteina}%</td>
              <td>{row.bultos}</td>
              <td>{row.precio}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10">No hay datos para mostrar. Por favor, realice una simulación.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SimuladorTabla;
