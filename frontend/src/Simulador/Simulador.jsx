import React, { useState } from 'react';
import SimuladorForm from './SimuladorForm';
import SimuladorTabla from './SimuladorTabla';
import './Simulador.css';

const Simulador = () => {
  const [tableData, setTableData] = useState([]);

  const handleSimulate = (formData) => {
    const { especie } = formData;
    let data = [];

    if (especie === 'Tilapia') {
      data = [
        { mes: 1, numero: '', peso: 8, tasa: '10%', biomasa: '', alimento: '', concentrado: '', proteina: 45, bultos: '', precio: '' },
        // Resto de los datos de Tilapia...
      ];
    } else if (especie === 'Cachama') {
      data = [
        { mes: 1, numero: '', peso: 10.5, tasa: '20%', biomasa: '', alimento: '', concentrado: '', proteina: 45, bultos: '', precio: '' },
        // Resto de los datos de Cachama...
      ];
    }

    // Procesar los cálculos aquí y actualizar `tableData`
    setTableData(data);
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="display-4 text-center text-primary font-weight-bold">Simulador</h2>
        <SimuladorForm onSimulate={handleSimulate} />
        <SimuladorTabla data={tableData} />
      </div>
    </>
  );
};

export default Simulador;
