import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import "./Data-Tables.css";
import Sidebar from '../home/Sidebar.jsx';

function WriteTable({ titles, data, onEditClick, onDeleteClick }) {
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
        info: "Página PAGE de PAGES",
        infoEmpty: "No hay registros disponibles",
        infoFiltered: "(filtrado de MAX registros en total)",
        lengthMenu: "Mostrar MENU registros por página"
      },
      drawCallback: function () {
        $table.find('.btn-edit').off('click').on('click', function () {
          const id = $(this).data('id');
          onEditClick(id);
        });

        $table.find('.btn-delete').off('click').on('click', function () {
          const id = $(this).data('id');
          onDeleteClick(id);

          // Corregido el filtrado de datos
          const filteredData = data.filter(row => !row[row.length - 1].includes(`data-id='${id}'`));
          // const filteredData = data.filter(row => row[row.length - 1] !== id);
          table.clear().rows.add(filteredData).draw();
        });
      },
      createdRow: function (row, data, dataIndex) {
        $(row).css({
          'text-align': 'center',
          'vertical-align': 'middle',
          'font-size': '14px',
          'line-height': '20px',
        });
      },
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

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
      />
      <Sidebar />
      <div style={{ marginLeft: "300px", paddingTop: "30px" }}>
        <div className="table-container">
          <div className="dataTables_filter"></div>
        </div>

        <div style={{ textAlign: "center" }}>
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
        </div>
      </div>
    </>
  );
}

export default WriteTable;
