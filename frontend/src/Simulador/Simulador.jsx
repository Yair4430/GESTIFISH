import React, { useState } from 'react';
import SimuladorForm from './SimuladorForm';
import SimuladorTabla from './SimuladorTabla';
import './Simulador.css';

const Simulador = () => {
  const [tableData, setTableData] = useState([]);

  const handleSimulate = (formData) => {
    const { especie, densidad, espejoAgua, precioBulto } = formData;
    let data = [];

    const tilapiaData = [
      { mes: 1, numero: '', peso: 8, tasa: '10%', biomasa: '', alimento: '', concentrado: '', proteina: 45, bultos: '', precio: '' },
      { mes: 2, numero: '', peso: 32.5, tasa: '6%', biomasa: '', alimento: '', concentrado: '', proteina: 38, bultos: '', precio: '' },
      { mes: 3, numero: '', peso: 75, tasa: '4%', biomasa: '', alimento: '', concentrado: '', proteina: 32, bultos: '', precio: '' },
      { mes: 4, numero: '', peso: 135, tasa: '3%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
      { mes: 5, numero: '', peso: 220, tasa: '2%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
      { mes: 6, numero: '', peso: 330, tasa: '1.5%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
    ];

    const cachamaData = [
      { mes: 1, numero: '', peso: 10.5, tasa: '20%', biomasa: '', alimento: '', concentrado: '', proteina: 45, bultos: '', precio: '' },
      { mes: 2, numero: '', peso: 50, tasa: '10%', biomasa: '', alimento: '', concentrado: '', proteina: 38, bultos: '', precio: '' },
      { mes: 3, numero: '', peso: 130, tasa: '3%', biomasa: '', alimento: '', concentrado: '', proteina: 32, bultos: '', precio: '' },
      { mes: 4, numero: '', peso: 250, tasa: '3%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
      { mes: 5, numero: '', peso: 395, tasa: '2%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
      { mes: 6, numero: '', peso: 560, tasa: '2%', biomasa: '', alimento: '', concentrado: '', proteina: 24, bultos: '', precio: '' },
    ];

    if (especie === 'Tilapia') {
      data = tilapiaData;
    } else if (especie === 'Cachama') {
      data = cachamaData;
    }

    if (espejoAgua && densidad && precioBulto) {
      let numeroAnimales = Math.round(espejoAgua * densidad ); // 80% del total
      const reducciones = [0.20, 0.10, 0.03, 0.03, 0.02, 0.02];

      data = data.map((row, i) => {
        // Depuración: Verificar número de animales antes de la reducción
        console.log(`Mes ${row.mes}, Número de animales antes de reducción: ${numeroAnimales}`);
      
        if (i < reducciones.length) {
          // Aplicar la reducción correspondiente para el mes actual
          numeroAnimales = Math.round(numeroAnimales * (1 - reducciones[i]));
        }
      
        // Depuración: Verificar número de animales después de la reducción
        console.log(`Mes ${row.mes}, Número de animales después de reducción: ${numeroAnimales}`);
      
        // Cálculo de la biomasa con el número de animales reducido
        const biomasa = Math.round(numeroAnimales * row.peso);
      
        // Depuración: Verificar cálculo de biomasa
        console.log(`Mes ${row.mes}, Peso promedio: ${row.peso}, Biomasa calculada: ${biomasa}`);
      
        const tasaDecimal = parseFloat(row.tasa) / 100;
        const alimento = Math.round(biomasa * tasaDecimal);
        const concentradoMensual = alimento * 30;
        const bultos = Math.round(concentradoMensual / 40);
        const precioTotal = Math.round(bultos * precioBulto);
      
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
