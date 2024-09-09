import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormActividad from './formActividad.jsx';
import jsPDF from "jspdf";


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
        {/* <div className="container mt-5"> */}
        <div style={{ marginLeft: '320px', paddingTop: '70px' }} >
        <button
             className="btn btn-primary mb-4"
             onClick={handleAddClick}
             style={{ width: '140px', height: '45px', padding: '0px', fontSize: '16px' }}>
            Agregar Actividad
        </button>

                {/* Botón para exportar a PDF */}
                <button
                    className="btn btn-danger mx-2"
                    onClick={exportToPDF}
                    style={{ position: 'absolute', top: '269px', right: '622px', width:'80px' }}
                >
                    <i className="bi bi-file-earmark-pdf"></i> PDF
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
