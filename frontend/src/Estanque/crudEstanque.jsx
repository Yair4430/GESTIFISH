import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormEstanque from './formEstanque.jsx';
import jsPDF from 'jspdf'; // Añade jsPDF para exportar a PDF
import * as XLSX from 'xlsx'; // Añade XLSX para exportar a Excel

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
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Estanque}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setEstanque(respuesta.data);
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
                    //getAllEstanques(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting estanque:', error);
                }
            }else{
                getAllEstanques()
            }
        });
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Título de la tabla
        const title = "Estanques";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título

        // Configuración de autoTable
        const tableBody = EstanqueList.map((estanque) => [
            estanque.Nom_Estanque,
            estanque.Esp_Agua,
            estanque.Tip_Estanque,
            estanque.Lar_Estanque,
            estanque.Anc_Estanque,
            estanque.Des_Estanque,
            estanque.Img_Estanque ? (
                doc.addImage(`${PATH_FOTOS}/${estanque.Img_Estanque}`, 'JPEG', 14, 60, 50, 50)
            ) : (
                'No Image'
            ),
            estanque.Rec_Agua
        ]);

        doc.autoTable({
            head: [['Nombre', 'Espejo Agua', 'Tipo', 'Largo', 'Ancho', 'Descripción', 'Imagen', 'Recambio Agua']],
            body: tableBody,
            startY: 30, // Posición donde empieza la tabla
            theme: 'grid', // Tema de la tabla
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        // Guarda el PDF
        doc.save('estanques.pdf');
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(EstanqueList.map((estanque) => ({
            Nombre: estanque.Nom_Estanque,
            Espejo_Agua: estanque.Esp_Agua,
            Tipo: estanque.Tip_Estanque,
            Largo: estanque.Lar_Estanque,
            Ancho: estanque.Anc_Estanque,
            Descripción: estanque.Des_Estanque,
            Imagen: estanque.Img_Estanque ? `${PATH_FOTOS}/${estanque.Img_Estanque}` : 'No Image',
            Recambio_Agua: estanque.Rec_Agua
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Estanques');
        XLSX.writeFile(wb, 'estanques.xlsx');
    };

    // Función para exportar a SQL
    const exportToSQL = () => {
        let sqlStatements = `CREATE TABLE IF NOT EXISTS Estanques (
            Id_Estanque INT AUTO_INCREMENT PRIMARY KEY,
            Nom_Estanque VARCHAR(255),
            Esp_Agua VARCHAR(255),
            Tip_Estanque VARCHAR(255),
            Lar_Estanque VARCHAR(255),
            Anc_Estanque VARCHAR(255),
            Des_Estanque TEXT,
            Img_Estanque VARCHAR(255),
            Rec_Agua VARCHAR(255)
        );\n\n`;

        sqlStatements += "INSERT INTO Estanques (Nom_Estanque, Esp_Agua, Tip_Estanque, Lar_Estanque, Anc_Estanque, Des_Estanque, Img_Estanque, Rec_Agua) VALUES \n";

        sqlStatements += EstanqueList.map((estanque) => {
            const nomEstanque = estanque.Nom_Estanque ? estanque.Nom_Estanque.replace(/'/g, "''") : '';
            const espAgua = estanque.Esp_Agua ? estanque.Esp_Agua.replace(/'/g, "''") : '';
            const tipEstanque = estanque.Tip_Estanque ? estanque.Tip_Estanque.replace(/'/g, "''") : '';
            const larEstanque = estanque.Lar_Estanque ? estanque.Lar_Estanque.replace(/'/g, "''") : '';
            const ancEstanque = estanque.Anc_Estanque ? estanque.Anc_Estanque.replace(/'/g, "''") : '';
            const desEstanque = estanque.Des_Estanque ? estanque.Des_Estanque.replace(/'/g, "''") : '';
            const imgEstanque = estanque.Img_Estanque ? `${PATH_FOTOS}/${estanque.Img_Estanque}` : '';
            const recAgua = estanque.Rec_Agua ? estanque.Rec_Agua.replace(/'/g, "''") : '';

            return `('${nomEstanque}', '${espAgua}', '${tipEstanque}', '${larEstanque}', '${ancEstanque}', '${desEstanque}', '${imgEstanque}', '${recAgua}')`;
        }).join(",\n") + ";";

        // Imprimir el script SQL en la consola
        console.log(sqlStatements);

        // Opción para descargarlo como un archivo SQL
        const blob = new Blob([sqlStatements], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'estanques.sql';
        link.click();
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
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
            setButtonForm('Enviar');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Estanque) => {
        getEstanque(Id_Estanque);
        setIsModalOpen(true);
    };

    const handleDelete = (Id_Estanque) => {
        deleteEstanque(Id_Estanque);
    };

    const data = EstanqueList.map((estanque) => [
        estanque.Nom_Estanque,
        estanque.Esp_Agua,
        estanque.Tip_Estanque,
        estanque.Lar_Estanque,
        estanque.Anc_Estanque,
        estanque.Des_Estanque,
        estanque.Img_Estanque ? (
            `<img width="80px" src="${PATH_FOTOS}/${estanque.Img_Estanque}" alt="Imagen de Estanque" />`
        ) : (
            'No Image'
        ),
        estanque.Rec_Agua,
        `
        <button class='btn btn-primary align-middle btn-edit' data-id='${estanque.Id_Estanque}' onClick={handleAddClick}>
          <i class="fa-solid fa-pen-to-square"></i> 
        </button>
        <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${estanque.Id_Estanque}'>
          <i class="fa-solid fa-trash-can"></i> 
        </button>
      `
    ]);

        const titles = ['Nombre', 'Espejo Agua', 'Tipo', 'Largo', 'Ancho', 'Descripción', 'Imagen', 'Recambio Agua', 'Acciones']

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
        </>
    );
};

export default CrudEstanque;