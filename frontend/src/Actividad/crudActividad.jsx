import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormActividad from './formActividad.jsx';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import * as XLSX from 'xlsx'

const URI = process.env.ROUTER_PRINCIPAL + '/Actividad/';

const CrudActividad = () => {
    const [ActividadList, setActividadList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [actividad, setActividad] = useState({
        Id_Actividad: '',
        Nom_Actividad: '',
        Des_Actividad: '',
        Id_Responsable: '',
        Fec_Actividad: '',
        Hor_Actividad: '',
        Fas_Produccion: '',
        Id_Estanque: ''
    });

    useEffect(() => {
        getAllActividad();
    }, []);

    const getAllActividad = async () => {
        try {
            const respuesta = await axios.get(URI);
            setActividadList(respuesta.data);
        } catch (error) {
            console.error('Error fetching actividades:', error);
        }
    };

    const getActividad = async (Id_Actividad) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}/${Id_Actividad}`);
            setButtonForm('Actualizar');
            setActividad(respuesta.data);
            //Mostrar el modal
            const modalElement = document.getElementById('modalForm');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } catch (error) {
            console.error('Error fetching actividad:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteActividad = async (Id_Actividad) => {
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
                    await axios.delete(`${URI}/${Id_Actividad}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    //getAllActividad(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting actividad:', error);
                }
            }else{
                getAllActividad(); // Refresh the list after deletion

            }
        });
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(ActividadList.map((actividad) => ({
            Nombre: actividad.Nom_Actividad,
            Descripción: actividad.Des_Actividad,
            Responsable: actividad.responsable.Nom_Responsable,
            Fecha: actividad.Fec_Actividad,
            Hora: actividad.Hor_Actividad,
            'Fase Producción': actividad.Fas_Produccion,
            Estanque: actividad.estanque.Nom_Estanque
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Actividades');
        XLSX.writeFile(wb, 'actividades.xlsx');
    };

 
    const exportToSQL = () => {
        let sqlStatements = `CREATE TABLE IF NOT EXISTS Actividades (
            Id_Actividad INT AUTO_INCREMENT PRIMARY KEY,
            Nom_Actividad VARCHAR(255),
            Des_Actividad TEXT,
            Responsable VARCHAR(255),
            Fec_Actividad DATE,
            Hor_Actividad TIME,
            Fas_Produccion VARCHAR(255),
            Estanque VARCHAR(255)
        );\n\n`;
    
        sqlStatements += "INSERT INTO Actividades (Nom_Actividad, Des_Actividad, Responsable, Fec_Actividad, Hor_Actividad, Fas_Produccion, Estanque) VALUES \n";
        
        sqlStatements += ActividadList.map((actividad) => {
            return `('${actividad.Nom_Actividad.replace(/'/g, "''")}', '${actividad.Des_Actividad.replace(/'/g, "''")}', '${actividad.responsable.Nom_Responsable.replace(/'/g, "''")}', '${actividad.Fec_Actividad}', '${actividad.Hor_Actividad}', '${actividad.Fas_Produccion.replace(/'/g, "''")}', '${actividad.estanque.Nom_Estanque.replace(/'/g, "''")}')`;
        }).join(",\n") + ";";
    
        // Imprimir el script SQL en la consola
        console.log(sqlStatements);
    
        // Opción para descargarlo como un archivo SQL
        const blob = new Blob([sqlStatements], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'actividades.sql';
        link.click();
    };
    

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Título de la tabla
        const title = "Actividades";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título

        // Configuración de autoTable
        const tableBody = ActividadList.map((actividad) => [
            actividad.Nom_Actividad,
            actividad.Des_Actividad,
            actividad.responsable.Nom_Responsable,
            actividad.Fec_Actividad,
            actividad.Hor_Actividad,
            actividad.Fas_Produccion,
            actividad.estanque.Nom_Estanque
        ]);

        doc.autoTable({
            head: [['Nombre', 'Descripción', 'Responsable', 'Fecha', 'Hora', 'Fase Producción', 'Estanque']],
            body: tableBody,
            startY: 30, // Posición donde empieza la tabla
            theme: 'grid', // Tema de la tabla
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        // Guarda el PDF
        doc.save('actividades.pdf');
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
        if (!showForm) {
            setActividad({
                Nom_Actividad: '',
                Des_Actividad: '',
                Fec_Actividad: '',
                Hor_Actividad: '',
                Fas_Produccion: '',
                Id_Responsable: '',
                Id_Estanque: ''
            });
            setButtonForm('Enviar');

        }

        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Actividad) => {
        getActividad(Id_Actividad);
        setIsModalOpen(true);
    };

    const handleDelete = (Id_Actividad) => {
        deleteActividad(Id_Actividad);
    };

    const data = ActividadList.map((actividad) => [
        actividad.Nom_Actividad,
        actividad.Des_Actividad,
        actividad.responsable.Nom_Responsable,
        actividad.Fec_Actividad,
        actividad.Hor_Actividad,
        actividad.Fas_Produccion,
        actividad.estanque.Nom_Estanque,
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${actividad.Id_Actividad}' onClick={handleAddClick}>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${actividad.Id_Actividad}'>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
        `
    ]);
    
    const titles = [
        "Nombre", "Descripción", "Responsable", "Fecha", "Hora", "Fase Producción", "Estanque", "Acciones"
    ];

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
                                    <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Actividad' : 'Registrar Actividad'}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormActividad 
                                        buttonForm={buttonForm} 
                                        actividad={actividad} 
                                        URI={URI} 
                                        updateTextButton={updateTextButton} 
                                        getAllActividad={getAllActividad} 
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

export default CrudActividad;
