import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormEstanque from './formEstanque.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/estanque/';
const PATH_FOTOS = process.env.ROUTER_FOTOS;

const CrudEstanque = () => {
    const [EstanqueList, setEstanqueList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [estanque, setEstanque] = useState({
        Id_Estanque: '',
        Nom_Estanque: '',
        Esp_Agua: '',
        Tip_Estanque: '',
        Lar_Estanque: '',
        Anc_Estanque: '',
        Des_Estanque: '',
        Img_Estanque: null,
        Rec_Agua: ''
    });

    useEffect(() => {
        getAllEstanques();
    }, []);

    const getAllEstanques = async () => {
        try {
            const respuesta = await axios.get(URI);
            setEstanqueList(respuesta.data);
        } catch (error) {
            console.error('Error fetching estanques:', error);
        }
    };

    const getEstanque = async (Id_Estanque) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Estanque}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setEstanque({ ...respuesta.data });
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching estanque:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteEstanque = async (Id_Estanque) => {
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
                    await axios.delete(`${URI}${Id_Estanque}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    // getAllEstanques(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting estanque:', error);
                }
            }else{
                getAllEstanques();
            }
        });
    };

    const handleAddClick = () => {
        setButtonForm('Enviar');
        setShowForm(!showForm);
        if (!showForm) {
            setEstanque({
                Id_Estanque: '',
                Nom_Estanque: '',
                Esp_Agua: '',
                Tip_Estanque: '',
                Lar_Estanque: '',
                Anc_Estanque: '',
                Des_Estanque: '',
                Img_Estanque: null,
                Rec_Agua: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Estanque) => {
        getEstanque(Id_Estanque);
        const modalElement = document.getElementById('modalForm');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    };

    const handleDelete = (Id_Estanque) => {
        deleteEstanque(Id_Estanque);
    };

    const data = EstanqueList.map((estanque) => [
        estanque.Id_Estanque,
        estanque.Nom_Estanque,
        estanque.Esp_Agua,
        estanque.Tip_Estanque,
        estanque.Lar_Estanque,
        estanque.Anc_Estanque,
        estanque.Des_Estanque,
        `<img width="80px" src="${PATH_FOTOS}/${estanque.Img_Estanque}" alt="Imagen del estanque" />`,
        estanque.Rec_Agua,
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${estanque.Id_Estanque}'>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${estanque.Id_Estanque}'>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
        `
    ]);
    
    const titles = [
        "Número", "Nombre", "Espejo Agua", "Tipo", "Largo", "Ancho", "Descripción", "Imagen", "Recambio agua", "Acciones"
    ];

    return (
        <>
        {/* <div className="container mt-5"> */}
            <div style={{ marginLeft: '320px', paddingTop: '70px' }}>
                <button 
                    className="btn btn-primary mb-4" 
                    onClick={handleAddClick}
                    style={{ width: '140px', height: '45px', padding:'0px', fontSize: '16px'}}>
                    Agregar Estanque
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
                                    <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Estanque' : 'Registrar Estanque'}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormEstanque
                                        buttonForm={buttonForm}
                                        estanque={estanque}
                                        URI={URI}
                                        updateTextButton={updateTextButton}
                                        getAllEstanques={getAllEstanques}
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

export default CrudEstanque;
