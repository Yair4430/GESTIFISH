import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de que este componente esté disponible
import FormAlimentacion from './FormAlimentacion';

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
        // Mostrar el modal
        const modalElement = document.getElementById('modalForm');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        try {
            const respuesta = await axios.get(`${URI}${Id_Alimentacion}`);
            setButtonForm('Actualizar');
            setAlimentacion({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching alimentacion:', error);
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
                    getAllAlimentacion(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting alimentacion:', error);
                }
            }else{
                getAllAlimentacion();
            }
        });
    };

    const handleAddClick = () => {
        setButtonForm('Enviar');
        setShowForm(!showForm);
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
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Alimentacion) => {
        getAlimentacion(Id_Alimentacion);
        // Usa Bootstrap para mostrar el modal
        const modalElement = document.getElementById('modalForm');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
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
        <button class='btn btn-primary align-middle btn-edit' data-id='${alimentacion.Id_Alimentacion}'>
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
            <div style={{ marginLeft: '320px', paddingTop: '70px' }}>
                <button
                    className="btn btn-primary mb-4"
                    onClick={handleAddClick}
                    style={{ width: '140px', height: '45px', padding: '0px', fontSize: '16px' }}>
                    Agregar Alimentación
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
                                    <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Alimentación' : 'Registrar Alimentación'}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormAlimentacion 
                                        buttonForm={buttonForm} 
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
            </div>
        </>
    );
}

export default CrudAlimentacion;
