import React, { useState } from 'react';
import SimuladorForm from './SimuladorForm';
import SimuladorTabla from './SimuladorTabla';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; // Importa la librería xlsx

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
          numero: numeroAnimales.toLocaleString('es-ES'), // Formatear con separadores de miles
          biomasa: biomasa.toLocaleString('es-ES'), // Formatear con separadores de miles
          alimento: `${alimento.toLocaleString('es-ES')} g`, // Formatear con separadores de miles
          concentrado: `${concentradoMensual.toLocaleString('es-ES')} g`, // Formatear con separadores de miles
          bultos: `${bultos.toLocaleString('es-ES')} bultos`, // Formatear con separadores de miles
          precio: `$${precioTotal.toLocaleString('es-ES')}`, // Formatear con separadores de miles
        };
      });
  
      setTableData(data);
    } else {
      alert('Por favor, ingrese valores válidos para el espejo de agua, la densidad y el precio de bulto.');
    }
  };
  
  const handleExportExcel = () => {
    // Define los encabezados de la hoja de cálculo
    const worksheetData = [
      ["Mes", "Número de Animales", "Peso (g)", "Tasa de Alimentación", "Biomasa (g)", "Alimento Diario (g)", "Concentrado Mensual (g)", "Bultos", "Precio Total"]
    ];
  
    // Agrega los datos de la tabla
    tableData.forEach((row) => {
      worksheetData.push([row.mes, row.numero, row.peso, row.tasa, row.biomasa, row.alimento, row.concentrado, row.bultos, row.precio]);
    });
  
    // Crea un libro de Excel y una hoja
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Aplica bordes y formato básico a la tabla
    const range = XLSX.utils.decode_range(worksheet['!ref']); // Rango de la hoja
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cellAddress]) continue;
  
        // Agregar borde a cada celda
        worksheet[cellAddress].s = {
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } }
          }
        };
  
        // Negrita para la primera fila (encabezados)
        if (R === 0) {
          worksheet[cellAddress].s.font = { bold: true };
        }
      }
    }
  
    // Configura el ancho de las columnas
    worksheet['!cols'] = [
      { wpx: 50 }, // Mes
      { wpx: 120 }, // Número de Animales
      { wpx: 80 }, // Peso
      { wpx: 130 }, // Tasa de Alimentación
      { wpx: 110 }, // Biomasa
      { wpx: 150 }, // Alimento Diario
      { wpx: 180 }, // Concentrado Mensual
      { wpx: 90 }, // Bultos
      { wpx: 120 }, // Precio Total
    ];
  
    // Crea un libro de Excel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Simulador");
  
    // Genera el archivo Excel y lo descarga
    XLSX.writeFile(workbook, "simulador.xlsx");
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
    Precio del Bulto: $${formData.precioBulto.toLocaleString()}
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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
      />
  
      <br />
      <div className="container mt-4">
        <h2 className="display-4 text-center" style={{ color: 'black', fontWeight: 'bold' }}>
          Simulador
        </h2>
        <br />
        <p className="simulador-descripcion">
          Este simulador te permite calcular la proyección del número de animales por metro cuadrado, la biomasa, la cantidad de alimento necesario, y el costo total de alimentación
          para especies como la Tilapia y la Cachama en un estanque. Simplemente introduce los datos de densidad, tamaño del espejo
          de agua, y el precio del bulto de alimento para obtener una proyección mensual detallada del peso, la tasa de alimentación
          y los costos asociados.
        </p>
        <br />
        <SimuladorForm onSimulate={handleSimulate} onClear={handleClearTable} />
        <div id="simulador-content">
          <SimuladorTabla data={tableData} />
        </div>
        <br />
  
        {tableData.length > 0 && (
          <div className="d-flex justify-content-center mt-3">
            {/* Botón para exportar a PDF (rojo) */}
            <a
              className="text-danger"
              onClick={handleExportPdf}
              style={{
                width: '80px',
                height: '45px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
                cursor: 'pointer'
              }}
              title="Exportar a PDF"
            >
              <i className="bi bi-filetype-pdf" style={{ fontSize: '35px' }}></i>
            </a>

            {/* Botón para exportar a Excel (verde) */}
            <a
              className="text-success"
              onClick={handleExportExcel}
              style={{
                width: '80px',
                height: '45px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              title="Exportar a Excel"
            >
              <i className="bi bi-file-earmark-excel" style={{ fontSize: '35px' }}></i>
            </a>
          </div>
        )}

        <br />
      </div>
    </>
  );
}

export default Simulador;
