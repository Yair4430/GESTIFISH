import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormMuestreo from './formMuestreo';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';  // Importar XLSX para exportar a Excel

const URI = process.env.ROUTER_PRINCIPAL + '/muestreo/';

const CrudMuestreo = () => {
    const [muestreoList, setMuestreoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [muestreo, setMuestreo] = useState({
        Id_Muestreo: '',
        Fec_Muestreo: '',
        Num_Peces: '',
        Obs_Muestreo: '',
        Pes_Esperado: '',
        Id_Siembra: '',
        Id_Responsable: '',
        Hor_Muestreo: '',
        Pes_Promedio: ''
    });

    useEffect(() => {
        getAllMuestreo();
    }, []);

    const getAllMuestreo = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setMuestreoList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching muestreo:', error.response?.status || error.message);
        }
    };

    const getMuestreo = async (Id_Muestreo) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Muestreo}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setMuestreo({ ...respuesta.data });
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching muestreo:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteMuestreo = async (Id_Muestreo) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${URI}${Id_Muestreo}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    //getAllMuestreo(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting muestreo:', error);
                }
            } else {
                getAllMuestreo();
            }
        });
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(muestreoList.map((muestreo) => ({
            Fecha: muestreo.Fec_Muestreo,
            Número_Peces: muestreo.Num_Peces,
            Observaciones: muestreo.Obs_Muestreo,
            Peso_Esperado: muestreo.Pes_Esperado,
            Hora_Muestreo: muestreo.Hor_Muestreo,
            Siembra: muestreo.siembra.Fec_Siembra,
            Responsable: muestreo.responsable.Nom_Responsable,
            Peso_Promedio: muestreo.Pes_Promedio
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Muestreo');
        XLSX.writeFile(wb, 'muestreo.xlsx');
    };

    // Función para exportar a SQL
    const exportToSQL = () => {
        let sqlStatements = `CREATE TABLE IF NOT EXISTS Muestreos (
            Id_Muestreo INT AUTO_INCREMENT PRIMARY KEY,
            Fec_Muestreo DATE,
            Num_Peces INT,
            Obs_Muestreo TEXT,
            Pes_Esperado DECIMAL(10,2),
            Fec_Siembra DATE, -- Cambiado de Id_Siembra a Fec_Siembra
            Nom_Responsable VARCHAR(255), -- Cambiado de Id_Responsable a Nom_Responsable
            Hor_Muestreo TIME,
            Pes_Promedio DECIMAL(10,2)
        );\n\n`;
    
        sqlStatements += "INSERT INTO Muestreos (Fec_Muestreo, Num_Peces, Obs_Muestreo, Pes_Esperado, Fec_Siembra, Nom_Responsable, Hor_Muestreo, Pes_Promedio) VALUES \n";
    
        sqlStatements += muestreoList.map((muestreo) => {
            return `('${muestreo.Fec_Muestreo}', ${muestreo.Num_Peces}, '${muestreo.Obs_Muestreo.replace(/'/g, "''")}', ${muestreo.Pes_Esperado}, '${muestreo.siembra.Fec_Siembra}', '${muestreo.responsable.Nom_Responsable}', '${muestreo.Hor_Muestreo}', ${muestreo.Pes_Promedio})`;
        }).join(",\n") + ";";
    
        // Imprimir el script SQL en la consola
        console.log(sqlStatements);
    
        // Opción para descargarlo como un archivo SQL
        const blob = new Blob([sqlStatements], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'muestreos.sql';
        link.click();
    };
    
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Título de la tabla
        const title = "Muestreo";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título

        // Configuración de autoTable
        const tableBody = muestreoList.map((muestreo) => [
            muestreo.Fec_Muestreo,
            muestreo.Num_Peces,
            muestreo.Obs_Muestreo,
            muestreo.Pes_Esperado,
            muestreo.Hor_Muestreo,
            muestreo.siembra.Fec_Siembra,
            muestreo.responsable.Nom_Responsable,
            muestreo.Pes_Promedio
        ]);

        doc.autoTable({
            head: [['Fecha Muestreo', 'Número Peces', 'Observaciones', 'Peso Esperado', 'Hora Muestreo', 'Fecha Siembra', 'Nombre Responsable', 'Peso Promedio']],
            body: tableBody,
            startY: 30, // Posición donde empieza la tabla
            theme: 'grid', // Tema de la tabla
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        // Guarda el PDF
        doc.save('muestreo.pdf');
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
        if (!showForm) {
            setMuestreo({
                Id_Muestreo: '',
                Fec_Muestreo: '',
                Num_Peces: '',
                Obs_Muestreo: '',
                Pes_Esperado: '',
                Id_Siembra: '',
                Id_Responsable: '',
                Hor_Muestreo: '',
                Pes_Promedio: ''
            });

            setButtonForm('Enviar');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Muestreo) => {
        getMuestreo(Id_Muestreo);
        setIsModalOpen(true);
    };

    const handleDelete = (Id_Muestreo) => {
        deleteMuestreo(Id_Muestreo);
    };

    const data = muestreoList.map((muestreo) => [
        muestreo.Fec_Muestreo,
        muestreo.Num_Peces,
        muestreo.Obs_Muestreo,
        muestreo.Pes_Esperado,
        muestreo.Hor_Muestreo,
        muestreo.siembra.Fec_Siembra,
        muestreo.responsable.Nom_Responsable,
        muestreo.Pes_Promedio,

        `
        <button class='btn btn-primary align-middle btn-edit' data-id='${muestreo.Id_Muestreo}' onClick={handleAddClick}>
          <i class="fa-solid fa-pen-to-square"></i> 
        </button>
        <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${muestreo.Id_Muestreo}'>
          <i class="fa-solid fa-trash-can"></i> 
        </button>
      `
    ]);

    const titles =[
        'Fecha Muestreo', 'Número Peces', 'Observaciones', 'Peso Esperado', 'Hora Muestreo', 'Fecha Siembra', 'Nombre Responsable', 'Peso Promedio', 'Acciones'
    ]
    return (
        <>
            <div style={{ marginLeft: '320px', paddingTop: '100px' }} >
                {/* Botón para agregar actividad */}
                <button
                    className="btn btn-primary mb-4"
                    onClick={handleAddClick}
                    style={{ width: '140px', height: '45px', padding: '0px', fontSize: '16px' }}
                >
                    Agregar Actividad
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
                                    <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Muestreo' : 'Registrar Muestreo'}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormMuestreo
                                        buttonForm={buttonForm}
                                        muestreo={muestreo}
                                        URI={URI}
                                        updateTextButton={updateTextButton}
                                        getAllMuestreo={getAllMuestreo}
                                        closeModal={() => {
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

export default CrudMuestreo;