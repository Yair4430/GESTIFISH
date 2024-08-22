import React, { useState } from 'react';
import SimuladorForm from './SimuladorForm';
import SimuladorTabla from './SimuladorTabla';
import './Simulador.css';

const Simulador = () => {
  const [tableData, setTableData] = useState([]);
  
  const handleSimulate = (formData) => {
    const { especie, densidad, espejoAgua, precioBulto } = formData;
    let data = [];
    
    if (especie === 'Tilapia') {
      data = [
        { mes: 1, numero: '', peso: 8, tasa: '10%', biomasa: '', alimento: '', concentrado: '', proteina: 45, bultos: '', precio: '' },
        { mes: 2, numero: '', peso: 32.5, tasa: '6%', biomasa: '', alimento: '', concentrado: '', proteina: 38, bultos: '', precio: '' },
        { mes: 3, numero: '', peso: 75, tasa: '4%', biomasa: '', alimento: '', concentrado: '', proteina: 32, bultos: '', precio: '' },
        { mes: 4, numero: '', peso: 135, tasa: '3%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
        { mes: 5, numero: '', peso: 220, tasa: '2%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
        { mes: 6, numero: '', peso: 330, tasa: '1.5%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
      ];
    } else if (especie === 'Cachama') {
      data = [
        { mes: 1, numero: '', peso: 10.5, tasa: '20%', biomasa: '', alimento: '', concentrado: '', proteina: 45, bultos: '', precio: '' },
        { mes: 2, numero: '', peso: 50, tasa: '10%', biomasa: '', alimento: '', concentrado: '', proteina: 38, bultos: '', precio: '' },
        { mes: 3, numero: '', peso: 130, tasa: '3%', biomasa: '', alimento: '', concentrado: '', proteina: 32, bultos: '', precio: '' },
        { mes: 4, numero: '', peso: 250, tasa: '3%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
        { mes: 5, numero: '', peso: 395, tasa: '2%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
        { mes: 6, numero: '', peso: 560, tasa: '2%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
      ];
    }

    if (espejoAgua && densidad && precioBulto) {
      let numeroAnimales = Math.round(espejoAgua * densidad * 0.8); // 80% del total
      const reducciones = [0.10, 0.03, 0.03, 0.02, 0.02];

      data = data.map((row, i) => {
        const biomasa = Math.round(numeroAnimales * row.peso);
        const tasaDecimal = parseFloat(row.tasa) / 100;
        const alimento = Math.round(biomasa * tasaDecimal);
        const concentradoMensual = alimento * 30;
        const bultos = Math.round(concentradoMensual / 40);
        const precioTotal = Math.round(bultos * precioBulto);

        if (i < reducciones.length) {
          numeroAnimales = Math.round(numeroAnimales - (numeroAnimales * reducciones[i]));
        }

        return {
          ...row,
          numero: numeroAnimales,
          biomasa: biomasa,
          alimento: `${alimento} kg`,
          concentrado: `${concentradoMensual} kg`,
          bultos: `${bultos} bultos`,
          precio: `$${precioTotal}`,
        };
      });

      setTableData(data);
    } else {
      alert('Por favor, ingrese valores válidos para el espejo de agua, la densidad y el precio de bulto.');
    }
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
