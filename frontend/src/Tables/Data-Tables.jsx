import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import "./Data-Tables.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from '../home/Sidebar.jsx';

function WriteTable({ titles, data, onEditClick, onDeleteClick, formName }) {
  const tableRef = useRef(null);

  useEffect(() => {
    const $table = $(tableRef.current);

    if ($.fn.DataTable.isDataTable($table)) {
      $table.DataTable().clear().destroy();
    }

    const table = $table.DataTable({
      responsive: true,
      lengthChange: false,
      pageLength: 10,
      data: data,
      columns: titles.map((title, index) => ({
        title,
        render: index === titles.length - 1
          ? (data, type, row) => row[index]
          : undefined
      })),
      language: {
        search: "",
        searchPlaceholder: "Buscar...",
        info: "Página _PAGE_ de _PAGES_",
        infoEmpty: "No hay registros disponibles",
        infoFiltered: "(filtrado de _MAX_ registros en total)",
        lengthMenu: "Mostrar _MENU_ registros por página"
      },
      drawCallback: function () {
        $table.find('.btn-edit').off('click').on('click', function () {
          const id = $(this).data('id');
          onEditClick(id);
        });

        $table.find('.btn-delete').off('click').on('click', function () {
          const id = $(this).data('id');
          onDeleteClick(id);

          const filteredData = data.filter(row => !row[row.length - 1].includes(`data-id='${id}'`));
          table.clear().rows.add(filteredData).draw();
        });
      },
      // **Estilos de tabla agregados**
      createdRow: function (row, data, dataIndex) {
        $(row).css({
          'text-align': 'center',
          'vertical-align': 'middle',
          'font-size': '14px',
          'line-height': '20px',
        });
      },
      // **Ajuste de columnas para una mejor visualización**
      autoWidth: false,
      columnDefs: [
        { targets: "_all", className: "text-center" },
      ],
    });

    return () => {
      if ($.fn.DataTable.isDataTable($table)) {
        $table.DataTable().clear().destroy();
      }
    };
  }, [data, titles, onEditClick, onDeleteClick]);

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
      titles.slice(0, -1), // Excluir el título de la última columna
      ...data.map(row => 
        row.slice(0, -1).map(cell => {
          if (typeof cell === 'string' && cell.startsWith('<img')) {
            const match = cell.match(/src="([^"]*)"/);
            const imageUrl = match ? match[1] : '';
            return { v: imageUrl, l: { Target: imageUrl } }; // Crear un hipervínculo
          }
          return cell;
        })
      )
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `Reporte_${formName}.xlsx`);
  };

  const exportToPDF = async () => {
    const doc = new jsPDF();

    const loadImageAsBase64 = async (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = (err) => {
          reject(err);
        };
      });
    };

    const tableBody = await Promise.all(data.map(async (row) => {
      return await Promise.all(row.slice(0, -1).map(async (cell) => {
        if (typeof cell === 'string' && cell.startsWith('<img')) {
          const match = cell.match(/src="([^"]*)"/);
          if (match) {
            const base64Image = await loadImageAsBase64(match[1]);
            return { image: base64Image, fit: [50, 50] };
          }
        }
        return cell;
      }));
    }));

    doc.autoTable({
      head: [titles.slice(0, -1)],
      body: tableBody,
      startY: 30,
      theme: 'grid',
      columnStyles: {
        0: { cellWidth: 50 }
      },
      styles: {
        cellPadding: 3,
        minCellHeight: 10,
        valign: 'middle',
        halign: 'center',
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: [255, 255, 255],
        fontSize: 14,
        fontStyle: 'bold',
        halign: 'center',
        valign: 'middle',
      },
      didDrawCell: (data) => {
        if (data.cell.raw && data.cell.raw.image) {
          const { x, y, width, height } = data.cell;
          const imageWidth = Math.min(50, width - 2);
          const imageHeight = Math.min(50, height - 2);
          doc.addImage(data.cell.raw.image, 'PNG', x + 1, y + 1, imageWidth, imageHeight);
        }
      }
    });

    doc.save("table_data.pdf");
  };

  const exportToSQL = () => {
    const sqlData = data.map(row => {
      const values = row.slice(0, -1).map(value => {
        if (typeof value === 'string' && value.startsWith('<img')) {
          const match = value.match(/src="([^"]*)"/);
          value = match ? match[1] : '';
        }
        return typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value;
      });
      return `INSERT INTO your_table_name (${titles.slice(0, -1).join(", ")}) VALUES (${values.join(", ")});`;
    });

    console.log(sqlData.join("\n"));
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
      />
      <Sidebar />
      <center>
        <div style={{ marginLeft: "300px", paddingTop: "30px" }}>
          <div className="button-group" style={{ textAlign: "center", marginBottom: "20px" }}>
            <button className="btn btn-danger mx-2" onClick={exportToPDF}>
              <i className="bi bi-file-earmark-pdf"></i> PDF
            </button>
            <button className="btn btn-success mx-2" onClick={exportToExcel}>
              <i className="bi bi-file-earmark-excel"></i> EXCEL
            </button>
            <button className="btn btn-secondary mx-2" onClick={exportToSQL}>
              <i className="bi bi-file-earmark-code"></i> SQL
            </button>
          </div>

          <div className="table-container">
            <div className="dataTables_filter"></div>
          </div>

          <center>
            <table className="table table-responsive table-bordered" id="TableDinamic" ref={tableRef}>
              <thead>
                <tr>
                  {titles.slice(0, -1).map((title, index) => (
                    <th key={index} scope="col" style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'center' }}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.slice(0, -1).map((cell, cellIndex) => (
                      <td key={cellIndex} dangerouslySetInnerHTML={{ __html: cell }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </center>
        </div>
      </center>
    </>
  );
}

export default WriteTable;
