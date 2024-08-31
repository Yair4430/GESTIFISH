import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import "./Data-Tables.css";

function WriteTable({ titles, data, onEditClick, onDeleteClick }) {
  const tableRef = useRef(null);

  useEffect(() => {
    const $table = $(tableRef.current);

    // Destruye la tabla si ya está inicializada
    if ($.fn.DataTable.isDataTable($table)) {
      $table.DataTable().clear().destroy();
    }

    // Inicializa la tabla
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
      },
      
      drawCallback: function () {
        // Asigna eventos a los botones después de que la tabla ha sido redibujada
        $table.find('.btn-edit').off('click').on('click', function () {
          const id = $(this).data('id');
          onEditClick(id);
        });

        $table.find('.btn-delete').off('click').on('click', function () {
          const id = $(this).data('id');
          onDeleteClick(id);
        //   console.log(this.parentNode.parentNode)
        // Elimina la fila que contiene el botón
     // Filtra los elementos que no contienen el id del botón presionado
     const filteredData = data.filter(row => {
      // Verifica si el último elemento de la fila (el que contiene los botones) NO tiene el data-id del botón presionado
      return !row[row.length - 1].includes(`data-id='${id}'`);
    });

    // Actualiza la tabla con los datos filtrados
    table.clear().rows.add(filteredData).draw();

    // Esto actualizará el estado del componente padre si es necesario
    // setData(filteredData);  // Si estás manejando el estado de `data` en un componente superior
  });
}
});

return () => {
// Limpia la tabla cuando el componente se desmonta
if ($.fn.DataTable.isDataTable($table)) {
  $table.DataTable().clear().destroy();
}
};
}, [data, titles, onEditClick, onDeleteClick]);

return (
<div className="container">
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
</div>
);
}

export default WriteTable;