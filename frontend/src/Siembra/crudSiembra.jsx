import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormSiembra from './FormSiembra.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/siembra/';
const URI_RESPONSABLE = process.env.ROUTER_PRINCIPAL + '/responsable/';
const URI_ESPECIE = process.env.ROUTER_PRINCIPAL + '/especie/';
const URI_ESTANQUE = process.env.ROUTER_PRINCIPAL + '/estanque/';

const CrudSiembra = () => {
    const [siembraList, setSiembraList] = useState([]);
    const [responsables, setResponsables] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [especies, setEspecies] = useState([]);
    const [estanques, setEstanques] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [siembra, setSiembra] = useState({
        Id_Siembra: '',
        Can_Peces: '',
        Fec_Siembra: '',
        Fec_PosibleCosecha: '',
        Id_Responsable: '',
        Id_Especie: '',
        Id_Estanque: '',
        Pes_Actual: '',
        Obs_Siembra: '',
        Hor_Siembra: '',
        Gan_Peso: '',
        Vlr_Siembra: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    getAllSiembras(),
                    getAllResponsables(),
                    getAllEspecies(),
                    getAllEstanques()
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const getAllSiembras = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setSiembraList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching siembras:', error.response?.status || error.message);
        }
    };

    const getAllResponsables = async () => {
        try {
            const { data } = await axios.get(URI_RESPONSABLE);
            setResponsables(data);
        } catch (error) {
            console.error('Error fetching responsables:', error);
        }
    };

    const getAllEspecies = async () => {
        try {
            const { data } = await axios.get(URI_ESPECIE);
            setEspecies(data);
        } catch (error) {
            console.error('Error fetching especies:', error);
        }
    };

    const getAllEstanques = async () => {
        try {
            const { data } = await axios.get(URI_ESTANQUE);
            setEstanques(data);
        } catch (error) {
            console.error('Error fetching estanques:', error);
        }
    };

    const getSiembra = async (Id_Siembra) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Siembra}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setSiembra({ ...respuesta.data });
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching siembra:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteSiembra = async (Id_Siembra) => {
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
                    await axios.delete(`${URI}${Id_Siembra}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    // getAllSiembras(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting siembra:', error);
                }
            }else{
                getAllSiembras();
            }
        });
    };

    const handleAddClick = () => {
        setButtonForm('Enviar');
        setShowForm(!showForm);
        if (!showForm) {
            setSiembra({
                Id_Siembra: '',
                Can_Peces: '',
                Fec_Siembra: '',
                Fec_PosibleCosecha: '',
                Id_Responsable: '',
                Id_Especie: '',
                Id_Estanque: '',
                Pes_Actual: '',
                Obs_Siembra: '',
                Hor_Siembra: '',
                Gan_Peso: '',
                Vlr_Siembra: ''
            });
        }
        setIsModalOpen(true);
    };


    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Siembra) => {
        getSiembra(Id_Siembra);
        const modalElement = document.getElementById('modalForm');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    };

    const handleDelete = (Id_Siembra) => {
        deleteSiembra(Id_Siembra);
    };

    const data = siembraList.map((siembra) => [
        siembra.Can_Peces,
        siembra.Fec_Siembra,
        siembra.Fec_PosibleCosecha,
        siembra.responsable?.Nom_Responsable || 'N/A',
        siembra.especie?.Nom_Especie || 'N/A',
        siembra.estanque?.Nom_Estanque || 'N/A',
        siembra.Pes_Actual,
        siembra.Obs_Siembra,
        siembra.Hor_Siembra,
        siembra.Gan_Peso,
        siembra.Vlr_Siembra,
  `
          <button class='btn btn-primary align-middle btn-edit' data-id='${siembra.Id_Siembra}'>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${siembra.Id_Siembra}'>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
        `
    ]);

    const titles = [
        "Cantidad Peces", "Fecha Siembra", "Fecha Posible Cosecha", "Responsable", "Especie", "Estanque", "Peso Actual", "Observaciones", "Hora Siembra", "Ganancia Peso", "Valor Siembra", "Acciones"
    ];

    return (
        <>
            <div style={{ marginLeft: '320px', paddingTop: '70px' }}>
                <button 
                    className="btn btn-primary" 
                    onClick={handleAddClick}
                    style={{ width: '140px', height: '45px', padding:'0px', fontSize: '16px'}}>  
                    Agregar Siembra
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
                                    <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Siembra' : 'Registrar Siembra'}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormSiembra
                                        buttonForm={buttonForm}
                                        siembra={siembra}
                                        URI={URI}
                                        updateTextButton={updateTextButton}
                                        getAllSiembras={getAllSiembras}
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

export default CrudSiembra;
