import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de que esta ruta sea correcta
import FormMortalidad from './FormMortalidad.jsx'; // Asegúrate de que esta ruta sea correcta
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const URI = process.env.ROUTER_PRINCIPAL + '/mortalidad/';

const CrudMortalidad = () => {
    const [MortalidadList, setMortalidadList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [mortalidad, setMortalidad] = useState({
        Id_Mortalidad: '',
        Fec_Mortalidad: '',
        Can_Peces: '',
        Mot_Mortalidad: '',
        Id_Siembra: '',
        Id_Responsable: '',
    });

    useEffect(() => {
        getAllMortalidad();
    }, []);

    const getAllMortalidad = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setMortalidadList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching mortalidad:', error.response?.status || error.message);
        }
    };

    const getMortalidad = async (Id_Mortalidad) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Mortalidad}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setMortalidad({ ...respuesta.data });
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching mortalidad:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteMortalidad = async (Id_Mortalidad) => {
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
                    await axios.delete(`${URI}${Id_Mortalidad}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    getAllMortalidad(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting mortalidad:', error.response?.status || error.message);
                }
            } else {
                getAllMortalidad();
            }
        });
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(MortalidadList.map((mortalidad) => ({
            Fecha: mortalidad.Fec_Mortalidad,
            Cantidad: mortalidad.Can_Peces,
            Motivo: mortalidad.Mot_Mortalidad,
            FechaSiembra: mortalidad.siembra.Fec_Siembra,
            Responsable: mortalidad.responsable.Nom_Responsable
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Mortalidades');
        XLSX.writeFile(wb, 'mortalidades.xlsx');
    };

// Función para exportar a SQL
const exportToSQL = () => {
    // Creación de la tabla Mortalidades
    let sqlStatements = `CREATE TABLE IF NOT EXISTS Mortalidades (
        Id_Mortalidad INT AUTO_INCREMENT PRIMARY KEY,
        Fec_Mortalidad DATE,
        Can_Peces INT,
        Mot_Mortalidad TEXT,
        Siembra_Fec DATE,
        Responsable_Nombre VARCHAR(255)
    );\n\n`;

    // Sentencia para insertar datos en la tabla Mortalidades
    sqlStatements += "INSERT INTO Mortalidades (Fec_Mortalidad, Can_Peces, Mot_Mortalidad, Siembra_Fec, Responsable_Nombre) VALUES \n";

    // Mapear la lista de mortalidades a sentencias SQL
    sqlStatements += MortalidadList.map((mortalidad) => {
        return `('${mortalidad.Fec_Mortalidad}', ${mortalidad.Can_Peces}, '${mortalidad.Mot_Mortalidad.replace(/'/g, "''")}', '${mortalidad.siembra.Fec_Siembra}', '${mortalidad.responsable.Nom_Responsable.replace(/'/g, "''")}')`;
    }).join(",\n") + ";";

    // Imprimir el script SQL en la consola
    console.log(sqlStatements);

    // Opción para descargarlo como un archivo SQL
    const blob = new Blob([sqlStatements], { type: 'text/sql' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mortalidades.sql';
    link.click();
};

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Título de la tabla
        const title = "Mortalidad";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título

        // Configuración de autoTable
        const tableBody = MortalidadList.map((mortalidad) => [
            mortalidad.Fec_Mortalidad,
            mortalidad.Can_Peces,
            mortalidad.Mot_Mortalidad,
            mortalidad.siembra.Fec_Siembra,
            mortalidad.responsable.Nom_Responsable
        ]);

        doc.autoTable({
            head: [['Fecha Mortalidad', 'Cantidad Peces', 'Motivo Mortalidad', 'Fecha Siembra', 'Nombre Responsable']],
            body: tableBody,
            startY: 30, // Posición donde empieza la tabla
            theme: 'grid', // Tema de la tabla
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        // Guarda el PDF
        doc.save('mortalidad.pdf');
    };

    const handleAddClick = () => {
        setButtonForm('Enviar');
        setShowForm(!showForm);
        if (!showForm) {
            setMortalidad({
                Id_Mortalidad: '',
                Fec_Mortalidad: '',
                Can_Peces: '',
                Mot_Mortalidad: '',
                Id_Siembra: '',
                Id_Responsable: '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Mortalidad) => {
        getMortalidad(Id_Mortalidad);
        setIsModalOpen(true);
    };

    const handleDelete = (Id_Mortalidad) => {
        deleteMortalidad(Id_Mortalidad);
    };

    const data = MortalidadList.map((mortalidad) => [
        mortalidad.Fec_Mortalidad,
        mortalidad.Can_Peces,
        mortalidad.Mot_Mortalidad,
        mortalidad.siembra.Fec_Siembra,
        mortalidad.responsable.Nom_Responsable,
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${mortalidad.Id_Mortalidad}' onClick={() => handleEdit(mortalidad.Id_Mortalidad)}>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${mortalidad.Id_Mortalidad}' onClick={() => handleDelete(mortalidad.Id_Mortalidad)}>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
        `
    ]);

    const titles = [
        "Fecha Mortalidad", "Cantidad Peces", "Motivo Mortalidad", "Fecha Siembra", "Nombre Responsable", "Acciones"
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
                                {/* <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Mortalidad' : 'Registrar Mortalidad'}</h5> */}
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <FormMortalidad
                                    buttonForm={buttonForm}
                                    mortalidad={mortalidad}
                                    URI={URI}
                                    updateTextButton={updateTextButton}
                                    getAllMortalidad={getAllMortalidad}
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

export default CrudMortalidad;