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
        info: "Página _PAGE_ de _PAGES_",
        infoEmpty: "No hay registros disponibles",
        infoFiltered: "(filtrado de _MAX_ registros en total)",
        lengthMenu: "Mostrar _MENU_ registros por página",
        oPaginate: {
          "sFirst": "Primero",
          "sLast": "Último",
          "sNext": "Siguiente",
          "sPrevious": "Anterior"
      }
      
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
      }
    });

    return () => {
      if ($.fn.DataTable.isDataTable($table)) {
        $table.DataTable().clear().destroy();
      }
    };
  }, [data, titles, onEditClick, onDeleteClick]);

  return (
    <>
      <Sidebar />
      <center>
        <div style={{ marginLeft: '300px', paddingTop: '30px' }} >
          <div className="table-container">
            <div className="dataTables_filter">
            </div>
          </div>
          <center>
            <table className="table table-responsive" id="TableDinamic" ref={tableRef}>
              <thead>
                <tr>
                  {titles.map((title, index) => (
                    <th key={index} scope="col">{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} dangerouslySetInnerHTML={{ __html: cell }}></td>
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
