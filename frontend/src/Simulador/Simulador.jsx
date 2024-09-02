import React, { useState } from 'react';
import SimuladorForm from './SimuladorForm';
import SimuladorTabla from './SimuladorTabla';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
      let numeroAnimales = Math.round(espejoAgua * densidad);
      const reducciones = [0.20, 0.10, 0.03, 0.03, 0.02, 0.02];

      data = data.map((row, i) => {
        if (i < reducciones.length) {
          numeroAnimales = Math.round(numeroAnimales * (1 - reducciones[i]));
        }

        const biomasa = Math.round(numeroAnimales * row.peso);
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

  const handleExportPdf = async () => {
    const input = document.getElementById('simulador-content');
    const pdf = new jsPDF('landscape', 'mm', 'a4'); // Mantiene orientación horizontal
    const pdfWidth = pdf.internal.pageSize.getWidth();
  
    // Captura de los valores de los campos del formulario
    const formData = {
      especie: document.querySelector('#especie').value,
      densidad: document.querySelector('#densidad').value,
      espejoAgua: document.querySelector('#espejoAgua').value,
      precioBulto: document.querySelector('#precioBulto').value,
    };
  
    // Título
    const title = "Informe del Simulador";
    pdf.setFontSize(24);
    pdf.setTextColor(0, 0, 0); // negro
    pdf.text(title, pdfWidth / 2, 15, { align: 'center' });
  
    // Espacio debajo del título
    let yPosition = 25;
  
    // Agregar narrativa al PDF
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0); // Negro para el texto
    pdf.setFont(undefined, 'bold'); // Texto en negrilla
  
    const narrativa = `
    
    Los datos ingresados en el simulador son los siguientes:
    
    Especie: ${formData.especie}
    Densidad: ${formData.densidad} por metro cuadrado
    Espejo de agua: ${formData.espejoAgua} m²
    Precio del Bulto: $${formData.precioBulto}
    
    Basado en estos datos, los resultados del simulador son los siguientes:`;
  
    const narrativaLineas = pdf.splitTextToSize(narrativa, pdfWidth - 20); // Ajusta el texto para que se ajuste al ancho del PDF
    pdf.text(narrativaLineas, 10, yPosition);
    yPosition += narrativaLineas.length * 5; // Ajusta el espacio vertical basado en el número de líneas usadas
  
    // Captura de la tabla como imagen
    const canvas = await html2canvas(input, {
      scale: 2,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    });
  
    const imgData = canvas.toDataURL('image/png', 0.5);
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * (pdfWidth - 20)) / imgProps.width;
  
    // Insertar la tabla capturada como imagen
    pdf.addImage(imgData, 'PNG', 10, yPosition + 10, pdfWidth - 20, pdfHeight); // Ajusta la imagen para que se centre y se ajuste al PDF
  
    // Manejo de múltiples páginas si la tabla es muy grande
    let heightLeft = pdfHeight;
    let position = yPosition + pdfHeight - pdf.internal.pageSize.getHeight();
  
    while (heightLeft > pdf.internal.pageSize.getHeight()) {
      pdf.addPage();
      position = heightLeft - pdfHeight;
      pdf.addImage(imgData, 'PNG', 10, position, pdfWidth - 20, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
  
    pdf.save('simulador.pdf');
  };

  const handleClearTable = () => {
    setTableData([]); // Esto limpiará los datos de la tabla
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="display-4 text-center" style={{ color: 'black', fontWeight: 'bold' }}>Simulador</h2>
        <br/>
        <SimuladorForm onSimulate={handleSimulate} onClear={handleClearTable} />
        <div id="simulador-content">
          <SimuladorTabla data={tableData} />
        </div>
        <br />
        <div className="d-flex justify-content-center mt-3">
          {tableData.length > 0 && (
            <button 
              className="btn btn-success"
              onClick={handleExportPdf}
              style={{ transition: 'all 0.3s ease-in-out' }}
            >
              Exportar a PDF
            </button>
          )}
        </div>
        <br />
      </div>
    </>
  );
};

export default Simulador;