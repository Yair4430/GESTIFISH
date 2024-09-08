import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de tener este componente para la tabla de datos
import FormCosecha from './FormCosecha'; // Asegúrate de tener este componente para el formulario de cosecha
import jsPDF from "jspdf";

const URI = process.env.ROUTER_PRINCIPAL + '/cosecha/';

const CrudCosecha = () => {
    const [CosechaList, setCosechaList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cosecha, setCosecha] = useState({
        Id_Cosecha: '',
        Fec_Cosecha: '',
        Can_Peces: '',
        Pes_Eviscerado: '',
        Pes_Viscerado: '',
        Por_Visceras: '',
        Id_Responsable: '',
        Id_Siembra: '',
        Hor_Cosecha: '',
        Vlr_Cosecha: '',
        Obs_Cosecha: ''
    });

    useEffect(() => {
        getAllCosecha();
    }, []);

    const getAllCosecha = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setCosechaList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching cosecha:', error.response?.status || error.message);
        }
    };

    const getCosecha = async (Id_Cosecha) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Cosecha}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setCosecha({ ...respuesta.data });
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching cosecha:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteCosecha = async (Id_Cosecha) => {
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
                    await axios.delete(`${URI}${Id_Cosecha}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    // getAllCosecha(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting cosecha:', error.response?.status || error.message);
                }
            }else{
                getAllCosecha();
            }
        });
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Título de la tabla
        const title = "Cosecha";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título

        // Configuración de autoTable
        const tableBody = CosechaList.map((cosecha) => [
            cosecha.Fec_Cosecha,
            cosecha.Can_Peces,
            cosecha.Pes_Eviscerado,
            cosecha.Pes_Viscerado,
            cosecha.Por_Visceras,
            cosecha.siembra.Fec_Siembra,
            cosecha.Hor_Cosecha,
            cosecha.Vlr_Cosecha,
            cosecha.Obs_Cosecha,
            cosecha.responsable.Nom_Responsable
        ]);

        doc.autoTable({
            head: [["Fecha Cosecha", "Cantidad Peces", "Peso Eviscerado", "Peso Viscerado",
                "Porcentaje Viceras", "Fecha Siembra", "Hora Cosecha", "Valor Cosecha",
                "Observaciones", "Nombre Responsable"]],
            body: tableBody,
            startY: 30,
            theme: 'grid',
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 },
            columnStyles: {
                0: { cellWidth: 25 }, // Ancho de la primera columna
                1: { cellWidth: 15 },
                2: { cellWidth: 15 },
                3: { cellWidth: 15 },
                4: { cellWidth: 15 },
                5: { cellWidth: 23 }, // Ajusta el ancho de las columnas según sea necesario
                6: { cellWidth: 20 },
                7: { cellWidth: 20 },
                8: { cellWidth: 15 },
                9: { cellWidth: 18 } // Aumentar el ancho para "Nombre Responsable"
            }
        });
        
        // Guarda el PDF
        doc.save('cosecha.pdf');
    };

    const handleAddClick = () => {
        setButtonForm('Enviar');
        setShowForm(!showForm);
        if (!showForm) {
            setCosecha({
                Id_Cosecha: '',
                Fec_Cosecha: '',
                Can_Peces: '',
                Pes_Eviscerado: '',
                Pes_Viscerado: '',
                Por_Visceras: '',
                Id_Responsable: '',
                Id_Siembra: '',
                Hor_Cosecha: '',
                Vlr_Cosecha: '',
                Obs_Cosecha: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Cosecha) => {
        getCosecha(Id_Cosecha);
        const modalElement = document.getElementById('modalForm');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    };

    const handleDelete = (Id_Cosecha) => {
        deleteCosecha(Id_Cosecha);
    };

    const data = CosechaList.map((cosecha) => [
        cosecha.Fec_Cosecha,
        cosecha.Can_Peces,
        cosecha.Pes_Eviscerado,
        cosecha.Pes_Viscerado,
        cosecha.Por_Visceras,
        cosecha.siembra.Fec_Siembra,
        cosecha.Hor_Cosecha,
        cosecha.Vlr_Cosecha,
        cosecha.Obs_Cosecha,
        cosecha.responsable.Nom_Responsable,
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${cosecha.Id_Cosecha}'>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${cosecha.Id_Cosecha}'>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
        `
    ]);

    const titles = [
        "Fecha Cosecha", "Cantidad Peces", "Peso Eviscerado", "Peso Viscerado",
        "Porcentaje Viceras", "Fecha Siembra", "Hora Cosecha", "Valor Cosecha",
        "Observaciones", "Nombre Responsable", "Acciones"
    ];

    return (
        <>
            <div style={{ marginLeft: '-20px', paddingTop: '70px' }}>
                <button 
                    className="btn btn-primary mb-4" 
                    onClick={handleAddClick}
                    style={{ width: '140px', height: '45px', padding: '0px', fontSize: '16px', marginLeft: '300px' }}>
                    Agregar Cosecha
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
                                    <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Cosecha' : 'Registrar Cosecha'}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormCosecha
                                        buttonForm={buttonForm}
                                        cosecha={cosecha}
                                        URI={URI}
                                        updateTextButton={updateTextButton}
                                        getAllCosecha={getAllCosecha}
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

export default CrudCosecha;