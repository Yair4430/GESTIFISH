import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de tener este componente para la tabla de datos
import FormSiembra from './FormSiembra'; // Asegúrate de tener este componente para el formulario de siembra
import jsPDF from 'jspdf';

const URI = process.env.ROUTER_PRINCIPAL + '/siembra/';

const CrudSiembra = () => {
    const [SiembraList, setSiembraList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [siembra, setSiembra] = useState({
        Id_Siembra: '',
        Can_Peces: '',
        Fec_Siembra: '',
        Fec_PosibleCosecha: '',
        Id_Responsable: '',
        Id_Especie: '',
        Id_Estanque: '',
        Obs_Siembra: '',
        Pes_Actual: '', 
        Hor_Siembra: '',
        Gan_Peso: '', 
        Vlr_Siembra: ''
    });

    useEffect(() => {
        getAllSiembra();
    }, []);

    const getAllSiembra = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setSiembraList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching siembra:', error.response?.status || error.message);
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
            confirmButtonText: "Sí, ¡borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${URI}${Id_Siembra}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    //getAllSiembra(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting siembra:', error.response?.status || error.message);
                }
            }
        });
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
    
        // Título de la tabla
        const title = "Siembras";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título
    
        // Configuración de autoTable
        const tableBody = SiembraList.map((siembra) => [  // Cambié siembraList a SiembraList
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
            siembra.Vlr_Siembra
        ]);
    
        doc.autoTable({
            head: [['Cantidad Peces', 'Fecha Siembra', 'Fecha Posible Cosecha', 'Responsable', 'Especie', 'Estanque', 'Peso Actual', 'Observaciones', 'Hora Siembra', 'Ganancia Peso', 'Valor Siembra']],
            body: tableBody,
            startY: 30, // Posición donde empieza la tabla
            theme: 'grid', // Tema de la tabla
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });
    
        // Guarda el PDF
        doc.save('siembra.pdf');
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
                Obs_Siembra: '',
                Pes_Actual: '', 
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

    const data = SiembraList.map((siembra) => [
        siembra.Fec_Siembra,
        siembra.Can_Peces,
        siembra.Fec_Siembra,
        siembra.Fec_PosibleCosecha,
        siembra.responsable.Nom_Responsable,
        siembra.especie.Nom_Especie,
        siembra.estanque.Nom_Estanque,
        siembra.Obs_Siembra,
        siembra.Pes_Actual, 
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
        "Fecha Siembra", "Cantidad Peces", "Responsable", "Especie", "Estanque", "Observaciones", "Acciones"
    ];

    return (
        <>
            <div style={{ marginLeft: '-20px', paddingTop: '70px' }}>
                <button 
                    className="btn btn-primary mb-4" 
                    onClick={handleAddClick}
                    style={{ width: '140px', height: '45px', padding: '0px', fontSize: '16px', marginLeft: '300px' }}>
                    Agregar Siembra
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
                                    <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Siembra' : 'Registrar Siembra'}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormSiembra
                                        buttonForm={buttonForm}
                                        siembra={siembra}
                                        URI={URI}
                                        updateTextButton={updateTextButton}
                                        getAllSiembra={getAllSiembra}
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
