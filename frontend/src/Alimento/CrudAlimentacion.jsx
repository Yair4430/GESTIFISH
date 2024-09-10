import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormAlimentacion from './FormAlimentacion';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const URI = process.env.ROUTER_PRINCIPAL + '/alimentacion/';

const CrudAlimentacion = () => {
    const [AlimentacionList, setAlimentacionList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alimentacion, setAlimentacion] = useState({
        Id_Alimentacion: '',
        Fec_Alimentacion: '',
        Can_RacionKg: '',
        Id_Siembra: '',
        Id_Responsable: '',
        Tip_Alimento: '',
        Hor_Alimentacion: '',
        Vlr_Alimentacion: '',
    });

    useEffect(() => {
        getAllAlimentacion();
    }, []);

    const getAllAlimentacion = async () => {
        try {
            const respuesta = await axios.get(URI);
            setAlimentacionList(respuesta.data);
        } catch (error) {
            console.error('Error fetching alimentacion:', error);
        }
    };

    const getAlimentacion = async (Id_Alimentacion) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Alimentacion}`);
            setButtonForm('Actualizar');
            setAlimentacion(respuesta.data);
            const modalElement = document.getElementById('modalForm');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } catch (error) {
            console.error('Error fetching Alimento:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteAlimentacion = async (Id_Alimentacion) => {
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
                    await axios.delete(`${URI}${Id_Alimentacion}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                } catch (error) {
                    console.error('Error deleting alimentacion:', error);
                }
            } else {
                getAllAlimentacion();
            }
        });
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(AlimentacionList.map((alimentacion) => ({
            Fecha: alimentacion.Fec_Alimentacion,
            Cantidad: alimentacion.Can_RacionKg,
            Siembra: alimentacion.siembra.Fec_Siembra,
            Responsable: alimentacion.responsable.Nom_Responsable,
            Tipo: alimentacion.Tip_Alimento,
            Hora: alimentacion.Hor_Alimentacion,
            Valor: alimentacion.Vlr_Alimentacion
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Alimentacion');
        XLSX.writeFile(wb, 'Alimentaciones.xlsx');
    };

    // Función para exportar a SQL
    const exportToSQL = () => {
        let sqlStatements = `CREATE TABLE IF NOT EXISTS Alimentacion (
            Id_Alimentacion INT AUTO_INCREMENT PRIMARY KEY,
            Fec_Alimentacion DATE,
            Can_RacionKg DECIMAL(10, 2),
            Fec_Siembra DATE,
            Nom_Responsable VARCHAR(255),
            Tip_Alimento VARCHAR(255),
            Hor_Alimentacion TIME,
            Vlr_Alimentacion DECIMAL(10, 2)
        );\n\n`;

        AlimentacionList.forEach((alimentacion) => {
            sqlStatements += `INSERT INTO Alimentacion (Fec_Alimentacion, Can_RacionKg, Fec_Siembra, Nom_Responsable, Tip_Alimento, Hor_Alimentacion, Vlr_Alimentacion) VALUES (
                '${alimentacion.Fec_Alimentacion}', ${alimentacion.Can_RacionKg}, '${alimentacion.siembra.Fec_Siembra}', '${alimentacion.responsable.Nom_Responsable}', '${alimentacion.Tip_Alimento}', '${alimentacion.Hor_Alimentacion}', ${alimentacion.Vlr_Alimentacion}
            );\n`;

        });

        const blob = new Blob([sqlStatements], { type: 'text/sql' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Alimentaciones.sql';
        a.click();
        URL.revokeObjectURL(url);
    };


    const exportToPDF = () => {
        const doc = new jsPDF();
        const title = "Alimentacion";
        doc.setFontSize(16);
        doc.text(title, 14, 20);

        const tableBody = AlimentacionList.map((Alimentacion) => [
            Alimentacion.Fec_Alimentacion,
            Alimentacion.Can_RacionKg,
            Alimentacion.siembra.Fec_Siembra,
            Alimentacion.responsable.Nom_Responsable,
            Alimentacion.Tip_Alimento,
            Alimentacion.Hor_Alimentacion,
            Alimentacion.Vlr_Alimentacion
        ]);

        doc.autoTable({
            head: [['Fecha', 'Cantidad', 'Siembra', 'Responsable', 'Tipo', 'Hora', 'Valor']],
            body: tableBody,
            startY: 30,
            theme: 'grid',
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        doc.save('Alimentaciones.pdf');
    };


    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
        if (!showForm) {
            setAlimentacion({
                Id_Alimentacion: '',
                Fec_Alimentacion: '',
                Can_RacionKg: '',
                Tip_Alimento: '',
                Hor_Alimentacion: '',
                Vlr_Alimentacion: '',
                Fec_Siembra: '',
                Id_Responsable: ''
            });
            setButtonForm('Enviar');
        }

        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Alimentacion) => {
        getAlimentacion(Id_Alimentacion);
        setIsModalOpen(true);
    };

    const handleDelete = (Id_Alimentacion) => {
        deleteAlimentacion(Id_Alimentacion);
    };

    const data = AlimentacionList.map((alimentacion) => [
        alimentacion.Fec_Alimentacion,
        alimentacion.Can_RacionKg,
        alimentacion.Tip_Alimento,
        alimentacion.Hor_Alimentacion,
        alimentacion.Vlr_Alimentacion,
        alimentacion.siembra.Fec_Siembra,
        alimentacion.responsable.Nom_Responsable,
        `
            <button class='btn btn-primary align-middle btn-edit' data-id='${alimentacion.Id_Alimentacion}' onClick={handleAddClick}>
            <i class="fa-solid fa-pen-to-square"></i> 
            </button>
            <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${alimentacion.Id_Alimentacion}'>
            <i class="fa-solid fa-trash-can"></i>
            </button>

        `
    ]);

    const titles = [
        "Fecha Alimentación", "Cantidad Ración (Kg)", "Tipo Alimento", "Hora Alimentación", "Valor Alimentación", "Fecha Siembra", "Nombre Responsable", "Acciones"
    ];

    return (
        <>
            <div style={{ marginLeft: '320px', paddingTop: '100px' }} >
                {/* Botón para agregar */}
                <button
                    className="btn btn-primary mb-4 d-flex align-items-center justify-content-center"
                    onClick={handleAddClick}
                    style={{ width: '115px', height: '45px', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                       <span
                            style={{
                                fontSize: '30px',
                                marginRight: '8px',
                                lineHeight: '1',
                                position: 'relative',
                                top: '-3px' // Ajusta el valor para subir o bajar el símbolo
                            }}
                        > + </span>
                    Agregar
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
                                <FormAlimentacion
                                    buttonText={buttonForm}
                                    alimentacion={alimentacion}
                                    URI={URI}
                                    updateTextButton={updateTextButton}
                                    getAllAlimentacion={getAllAlimentacion}
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

export default CrudAlimentacion;