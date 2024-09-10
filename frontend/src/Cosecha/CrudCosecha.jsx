import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de tener este componente para la tabla de datos
import FormCosecha from './FormCosecha'; // Asegúrate de tener este componente para el formulario de cosecha
import jsPDF from "jspdf";
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const URI = process.env.ROUTER_PRINCIPAL + '/cosecha/';

const CrudCosecha = () => {
    const [CosechaList, setCosechaList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cosecha, setCosecha] = useState({
        Id_Cosecha: '',
        Fec_Cosecha: '',
        Can_Peces: '',
        Pes_Eviscerado: '',
        Pes_Viscerado: '',
        Por_Visceras: '',
        Id_Responsable: '',
        Id_Siembra: '',
        Hor_Cosecha: '',
        Vlr_Cosecha: '',
        Obs_Cosecha: ''
    });

    useEffect(() => {
        getAllCosecha();
    }, []);

    const getAllCosecha = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setCosechaList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching cosecha:', error.response?.status || error.message);
        }
    };

    const getCosecha = async (Id_Cosecha) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Cosecha}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setCosecha({ ...respuesta.data });
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching cosecha:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteCosecha = async (Id_Cosecha) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${URI}${Id_Cosecha}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    //getAllCosecha(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting cosecha:', error.response?.status || error.message);
                }
            } else {
                getAllCosecha(); // Refrescar la lista después de la eliminación
            }
        });
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
          const ws = XLSX.utils.json_to_sheet(CosechaList.map((cosecha) => ({
            Fecha: cosecha.Fec_Cosecha,
            'Cantidad Peces': cosecha.Can_Peces,
            'Peso Eviscerado': cosecha.Pes_Eviscerado,
            'PesoViscerado': cosecha.Pes_Viscerado,
            'Porcentaje Viceras': cosecha.Por_Visceras,
            'Fecha Siembra': cosecha.siembra.Fec_Siembra,
            'Hora Cosecha': cosecha.Hor_Cosecha,
            'Valor Cosecha': cosecha.Vlr_Cosecha,
            'Observaciones': cosecha.Obs_Cosecha,
            'Nombre Responsable': cosecha.responsable.Nom_Responsable // Aquí
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Cosechas');
        XLSX.writeFile(wb, 'cosechas.xlsx');
    };

    // Función para exportar a SQL
    const exportToSQL = () => {
        let sqlStatements = `CREATE TABLE IF NOT EXISTS Cosechas (
            Id_Cosecha INT AUTO_INCREMENT PRIMARY KEY,
            Fec_Cosecha DATE,
            Can_Peces INT,
            Pes_Eviscerado FLOAT,
            Pes_Viscerado FLOAT,
            Por_Visceras FLOAT,
            Fec_Siembra DATE,
            Hor_Cosecha TIME,
            Vlr_Cosecha FLOAT,
            Obs_Cosecha TEXT,
            Nom_Responsable VARCHAR(255)
        );\n\n`;
    
        sqlStatements += "INSERT INTO Cosechas (Fec_Cosecha, Can_Peces, Pes_Eviscerado, Pes_Viscerado, Por_Visceras, Fec_Siembra, Hor_Cosecha, Vlr_Cosecha, Obs_Cosecha, Nom_Responsable) VALUES \n";
        
        sqlStatements += CosechaList.map((cosecha) => {
            return `('${cosecha.Fec_Cosecha}', ${cosecha.Can_Peces}, ${cosecha.Pes_Eviscerado}, ${cosecha.Pes_Viscerado}, ${cosecha.Por_Visceras}, '${cosecha.siembra.Fec_Siembra}', '${cosecha.Hor_Cosecha}', ${cosecha.Vlr_Cosecha}, '${cosecha.Obs_Cosecha.replace(/'/g, "''")}', '${cosecha.responsable.Nom_Responsable.replace(/'/g, "''")}')`; // Aquí
        }).join(",\n") + ";";
    
        // Imprimir el script SQL en la consola
        console.log(sqlStatements);
    
        // Opción para descargarlo como un archivo SQL
        const blob = new Blob([sqlStatements], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'cosechas.sql';
        link.click();
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
    
        const tableBody = CosechaList.map((cosecha) => [
            cosecha.Fec_Cosecha,
            cosecha.Can_Peces,
            cosecha.Pes_Eviscerado,
            cosecha.Pes_Viscerado,
            cosecha.Por_Visceras,
            cosecha.siembra.Fec_Siembra,
            cosecha.Hor_Cosecha,
            cosecha.Vlr_Cosecha,
            cosecha.Obs_Cosecha,
            cosecha.responsable.Nom_Responsable  // Aquí
        ]);
    
        doc.autoTable({
            head: [["Fecha Cosecha", "Cantidad Peces", "Peso Eviscerado", "Peso Viscerado",
                "Porcentaje Viceras", "Fecha Siembra", "Hora Cosecha", "Valor Cosecha",
                "Observaciones", "Nombre Responsable"]],
            body: tableBody,
            startY: 30,
            theme: 'grid',
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 },
            columnStyles: {
                0: { cellWidth: 25 },
                1: { cellWidth: 15 },
                2: { cellWidth: 15 },
                3: { cellWidth: 15 },
                4: { cellWidth: 15 },
                5: { cellWidth: 23 },
                6: { cellWidth: 20 },
                7: { cellWidth: 20 },
                8: { cellWidth: 15 },
                9: { cellWidth: 18 }
            }
        });
    
        doc.save("cosechas.pdf");
    };
    

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
        if (!showForm) {
            setCosecha({
                Fec_Cosecha: '',
                Can_Peces: '',
                Pes_Eviscerado: '',
                Pes_Viscerado: '',
                Por_Visceras: '',
                Id_Responsable: '',
                Id_Siembra: '',
                Hor_Cosecha: '',
                Vlr_Cosecha: '',
                Obs_Cosecha: ''
            });
            setButtonForm('Enviar');
        }

        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Cosecha) => {
        getCosecha(Id_Cosecha);
        setIsModalOpen(true);
    };

    const handleDelete = (Id_Cosecha) => {
        deleteCosecha(Id_Cosecha);
    };

    const data = CosechaList.map((cosecha) => [
        cosecha.Fec_Cosecha,
        cosecha.Can_Peces,
        cosecha.Pes_Eviscerado,
        cosecha.Pes_Viscerado,
        cosecha.Por_Visceras,
        cosecha.siembra.Fec_Siembra,
        cosecha.Hor_Cosecha,
        cosecha.Vlr_Cosecha,
        cosecha.Obs_Cosecha,
        cosecha.responsable.Nom_Responsable, // Aquí
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${cosecha.Id_Cosecha}' onClick={handleAddClick}>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${cosecha.Id_Cosecha}'>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
        
        `
    ]);
    
    
    const titles = [
       "Fecha Cosecha", "Cantidad Peces", "Peso Eviscerado", "Peso Viscerado",
        "Porcentaje Viceras", "Fecha Siembra", "Hora Cosecha", "Valor Cosecha",
        "Observaciones", "Nombre Responsable", "Acciones"
    ];


    return (
        <>
            <div style={{ marginLeft: '320px', paddingTop: '100px' }} >
                {/* Botón para agregar actividad */}
                <button
                    className="btn btn-primary mb-4"
                    onClick={handleAddClick}
                    style={{ width: '110px', height: '45px', padding: '0px', fontSize: '16px' }}
                >
                    <span style={{ fontSize: '24px', marginRight: '8px' }}>+</span> Agregar
                </button>

                {/* Botón para exportar a PDF */}
                <button
                    className="btn btn-danger mx-2"
                    onClick={exportToPDF}
                    style={{
                        width: '80px', height: '45px', padding: '0px', fontSize: '16px',
                        position: 'absolute', top: '269px', right: '880px'
                    }}
                >
                    <i className="bi bi-file-earmark-pdf"></i> PDF
                </button>

                {/* Botón para exportar a Excel (verde) */}
                <button
                    className="btn btn-success mx-2"
                    onClick={exportToExcel}
                    style={{
                        width: '90px', height: '45px', padding: '0px', fontSize: '16px',
                        position: 'absolute', top: '269px', right: '672px'
                    }}
                >
                    <i className="bi bi-file-earmark-excel"></i> Excel
                </button>

                {/* Botón para exportar a SQL (gris) */}
                <button
                    className="btn btn-secondary mx-2"
                    onClick={exportToSQL}
                    style={{
                        width: '80px', height: '45px', padding: '0px', fontSize: '16px',
                        position: 'absolute', top: '269px', right: '780px'
                    }}
                >
                    <i className="bi bi-file-earmark-code"></i> SQL
                </button>
            </div>

                <WriteTable
                    titles={titles} 
                    data={data} 
                    onEditClick={handleEdit} 
                    onDeleteClick={handleDelete} 
                />

            {isModalOpen && (
                 <div className="modal fade show d-block" id="modalForm" tabIndex="-1" aria-labelledby="modalFormLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                             <div className="modal-header">
                                <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Actividad' : 'Registrar Actividad'}</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <FormCosecha
                                buttonForm={buttonForm} 
                                cosecha={cosecha} 
                                URI={URI} 
                                updateTextButton={updateTextButton} 
                                getAllCosecha={getAllCosecha} 
                                closeModal ={() => {
                                    const modalElement = document.getElementById('modalForm');
                                    const modal = window.bootstrap.Modal.getInstance(modalElement);
                                    modal.hide();
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CrudCosecha;
