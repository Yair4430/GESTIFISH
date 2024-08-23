import React, { useState } from 'react';
import SimuladorForm from './SimuladorForm';
import SimuladorTabla from './SimuladorTabla';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Simulador.css';
import Navbar from '../Menus/Navbar';

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
      let numeroAnimales = Math.round(espejoAgua * densidad );
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
    const dataInputs = document.querySelectorAll('.data-input'); // Suponiendo que los datos están en elementos con la clase 'data-input'

    if (!input) {
        console.error("Element with ID 'simulador-content' not found.");
        return;
    }

    // Ajustar la escala para mejorar la calidad, pero controlando el tamaño
    const canvas = await html2canvas(input, {
        scale: 2, // Reducir la escala para disminuir el tamaño del archivo
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
    });

    const imgData = canvas.toDataURL('image/png', 0.5); // Ajustar la calidad de la imagen
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Agregar título
    const title = "Informe del Simulador";
    pdf.setFontSize(18);
    pdf.text(title, pdfWidth / 2, 20, { align: 'center' });

    // Espacio entre el título y la imagen
    const spaceBelowTitle = 30;

    // Agregar datos de entrada al PDF
    pdf.setFontSize(12);
    let yPosition = 25; // Espacio inicial para los datos

    dataInputs.forEach((input, index) => {
        pdf.text(`Dato ${index + 1}: ${input.value}`, 10, yPosition);
        yPosition += 10; // Espacio entre líneas
    });

    // Agrega la imagen debajo de los datos de entrada
    pdf.addImage(imgData, 'PNG', 0, yPosition + 10, pdfWidth, pdfHeight);

    let heightLeft = pdfHeight;
    let position = yPosition + pdfHeight - pdf.internal.pageSize.getHeight();

    // Agregar más páginas si es necesario
    while (heightLeft > pdf.internal.pageSize.getHeight()) {
        pdf.addPage();
        position = heightLeft - pdfHeight;
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save('simulador.pdf');
}; 



  return (
    <>
    <Navbar/>
      <div className="container mt-4">
        <h2 className="display-4 text-center text-primary font-weight-bold">Simulador</h2>
        <SimuladorForm onSimulate={handleSimulate} />
        <div id="simulador-content">
          <SimuladorTabla data={tableData} />
        </div>
        <button 
          className="btn btn-success mt-3" 
          onClick={handleExportPdf}
          disabled={tableData.length === 0}
        >
          Exportar a PDF
        </button>
      </div>
    </>
  );
};

export default Simulador;