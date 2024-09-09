import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormTraslado from './FormTraslado'; 
import jsPDF from "jspdf";

const URI = process.env.ROUTER_PRINCIPAL + '/traslado/';

const CrudTraslado = () => {
    const [trasladoList, setTrasladoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [traslado, setTraslado] = useState({
        Id_Traslado: '',
        Fec_Traslado: '',
        Can_Peces: '',
        Id_Responsable: '',
        Obs_Traslado: '',
        Hor_Traslado: ''
    });

    useEffect(() => {
        getAllTraslados();
    }, []);

    const getAllTraslados = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setTrasladoList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching traslados:', error.response?.status || error.message);
        }
    };

    const getTraslado = async (Id_Traslado) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}/${Id_Traslado}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setTraslado({ ...respuesta.data });
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching traslado:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteTraslado = async (Id_Traslado) => {
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
                    await axios.delete(`${URI}/${Id_Traslado}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    // getAllTraslados(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting traslado:', error);
                }
            }else{
                getAllTraslados();
            }
        });
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Título de la tabla
        const title = "Traslados";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título

        // Configuración de autoTable
        const tableBody = trasladoList.map((traslado) => [
            traslado.Fec_Traslado,
            traslado.Can_Peces,
            traslado.responsable.Nom_Responsable,
            traslado.Obs_Traslado,
            traslado.Hor_Traslado
        ]);

        doc.autoTable({
            head: [['Fecha Traslado', 'Cantidad Peces', 'Responsable', 'Observaciones', 'Hora Traslado']],
            body: tableBody,
            startY: 30, // Posición donde empieza la tabla
            theme: 'grid', // Tema de la tabla
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        // Guarda el PDF
        doc.save('traslados.pdf');
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
        
        if (!showForm) {
            setTraslado({
                Id_Traslado: '',
                Fec_Traslado: '',
                Can_Peces: '',
                Id_Responsable: '',
                Obs_Traslado: '',
                Hor_Traslado: ''
            });
            setButtonForm('Enviar');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Traslado) => {
        getTraslado(Id_Traslado);
        setIsModalOpen(true);

    };

    const handleDelete = (Id_Traslado) => {
        deleteTraslado(Id_Traslado);
    };

    const data = trasladoList.map((traslado) => [
        traslado.Fec_Traslado,
        traslado.Can_Peces,
        traslado.responsable.Nom_Responsable,
        traslado.Obs_Traslado,
        traslado.Hor_Traslado,
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${traslado.Id_Traslado}' onClick={handleAddClick}>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${traslado.Id_Traslado}'>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
      `
    ]);

    const titles = [
        "Fecha Traslado", "Cantidad Peces", "Responsable", "Observaciones", "Hora Traslado", "Acciones"
    ];

    return (
        <>
        {/* <div className="container mt-5"> */}
            <div style={{ marginLeft: '-20px', paddingTop: '70px' }}>
                <button 
                    className="btn btn-primary mb-4" 
                    onClick={handleAddClick}
                    style={{ width: '140px', height: '45px', padding: '0px', fontSize: '16px', marginLeft: '300px' }}>
                    Agregar Traslado
                </button>

                <button
                    className="btn btn-danger mx-2"
                    onClick={exportToPDF}
                    style={{ position: 'absolute', top: '269px', right: '622px', width:'80px' }}
                >
                    <i className="bi bi-file-earmark-pdf"></i> PDF
                </button>

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
                                    {/* <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Traslado' : 'Registrar Traslado'}</h5> */}
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormTraslado
                                        buttonForm={buttonForm}
                                        traslado={traslado}
                                        URI={URI}
                                        updateTextButton={updateTextButton}
                                        getAllTraslados={getAllTraslados}
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
            </div>
        </>
    );
};

export default CrudTraslado;