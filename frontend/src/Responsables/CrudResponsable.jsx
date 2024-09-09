import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';  // Reemplaza con la ruta correcta
import FormResponsable from './FormResponsable.jsx';
import jsPDF from "jspdf";

const URI = process.env.ROUTER_PRINCIPAL + '/responsable/';

const CrudResponsable = () => {
    const [responsableList, setResponsableList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [responsable, setResponsable] = useState({
        Id_Responsable: '',
        Nom_Responsable: '',
        Ape_Responsable: '',
        Doc_Responsable: '',
        Tip_Responsable: '',
        Cor_Responsable: '',
        Num_Responsable: ''
    });

    useEffect(() => {
        getAllResponsable();
    }, []);

    const getAllResponsable = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setResponsableList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching responsables:', error.response?.status || error.message);
        }
    };

    const getResponsable = async (Id_Responsable) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Responsable}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setResponsable({ ...respuesta.data });
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching responsable:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteResponsable = async (Id_Responsable) => {
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
                    const respuesta = await axios.delete(`${URI}${Id_Responsable}`);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        // getAllResponsable(); // Refresh the list after deletion
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting responsable:', error.response?.status || error.message);
                }
            }else{
                getAllResponsable();
            }
        });
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const title = "Responsables";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Title position

        // Table configuration
        const tableBody = responsableList.map((responsable) => [
            responsable.Nom_Responsable,
            responsable.Ape_Responsable,
            responsable.Doc_Responsable,
            responsable.Tip_Responsable,
            responsable.Cor_Responsable,
            responsable.Num_Responsable
        ]);

        doc.autoTable({
            head: [['Nombre', 'Apellidos', 'Número Documento', 'Tipo Responsable', 'Correo', 'Número Teléfono']],
            body: tableBody,
            startY: 30, // Table start position
            theme: 'grid', // Table theme
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        doc.save('responsables.pdf');
    };

    const handleAddClick = () => {
        setButtonForm('Enviar');
        setShowForm(!showForm);
        if (!showForm) {
            setResponsable({
                Id_Responsable: '',
                Nom_Responsable: '',
                Ape_Responsable: '',
                Doc_Responsable: '',
                Tip_Responsable: '',
                Cor_Responsable: '',
                Num_Responsable: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Responsable) => {
        getResponsable(Id_Responsable);
        setIsModalOpen(true);

    };

    const handleDelete = (Id_Responsable) => {
        deleteResponsable(Id_Responsable);
    };

    const data = responsableList.map((responsable) => [
        responsable.Nom_Responsable,
        responsable.Ape_Responsable,
        responsable.Doc_Responsable,
        responsable.Tip_Responsable,
        responsable.Cor_Responsable,
        responsable.Num_Responsable,
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${responsable.Id_Responsable}'>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${responsable.Id_Responsable}'>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
        `
    ]);

    const titles = [
        "Nombre", "Apellidos", "Numero Documento", "Tipo Responsable", "Correo", "Número Teléfono", "Acciones"
    ];

    return (
        <>
            <div style={{ marginLeft: '-20px', paddingTop: '70px' }}>
                <button 
                    className="btn btn-primary mb-4 " 
                    onClick={handleAddClick}
                    style={{ width: '140px', height: '45px', padding: '0px', fontSize: '16px', marginLeft: '300px' }}>
                    Agregar Responsable
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
                                    <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Responsable' : 'Registrar Responsable'}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormResponsable
                                        buttonForm={buttonForm}
                                        responsable={responsable}
                                        URI={URI}
                                        updateTextButton={updateTextButton}
                                        getAllResponsable={getAllResponsable}
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

export default CrudResponsable;