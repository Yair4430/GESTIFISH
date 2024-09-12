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
        doc.save('Estanques.pdf');
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
        XLSX.writeFile(wb, 'Estanques.xlsx');
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
        link.download = 'Estanques.sql';
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
        <a class='text-primary align-middle btn-edit' data-id='${estanque.Id_Estanque}' onClick={handleAddClick}>
          <i class="fa-solid fa-pen-to-square"></i> 
        </a>
        <a class='text-danger align-middle m-1 btn-delete' data-id='${estanque.Id_Estanque}'>
          <i class="fa-solid fa-trash-can"></i> 
        </a>
      `
    ]);

        const titles = ['Nombre', 'Espejo Agua', 'Tipo', 'Largo', 'Ancho', 'Descripción', 'Imagen', 'Recambio Agua', 'Acciones']

    return (
        <>
                <div style={{ marginLeft: '-680px', paddingTop: '50px' }}>
                    {/* Ícono para agregar */}
                    <a
                        onClick={handleAddClick}
                        style={{ fontSize: '44px', color: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <i className="bi bi-plus-circle"></i>
                    </a>
                </div>
                
                <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                    <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',  // Alinea verticalmente
                            gap: '20px',  // Espacio entre los botones
                            position: 'absolute', 
                            top: '50%', 
                            left: '755px', 
                            transform: 'translate(-50%, -50%)'  // Centra completamente
                        }}>
                        {/* Botón para exportar a PDF (rojo) */}
                        <a
                        className="text-danger"
                        onClick={exportToPDF}
                        style={{ width: '80px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        title="Exportar a PDF">
                        <i className="bi bi-filetype-pdf" style={{ fontSize: '35px' }}></i>
                        </a>

                        {/* Botón para exportar a Excel (verde) */}
                        <a
                        className="text-success"
                        onClick={exportToExcel}
                        style={{ width: '80px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        title="Exportar a EXCEL">
                        <i className="bi bi-file-earmark-excel" style={{ fontSize: '35px' }}></i>
                        </a>

                        {/* Botón para exportar a SQL (gris) */}
                        <a
                        className="text-secondary"
                        onClick={exportToSQL}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80px', height: '45px' }}
                        title="Exportar a SQL">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-filetype-sql" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM0 14.841a1.13 1.13 0 0 0 .401.823q.194.162.478.252c.284.09.411.091.665.091q.507 0 .858-.158.355-.159.54-.44a1.17 1.17 0 0 0 .187-.656q0-.336-.135-.56a1 1 0 0 0-.375-.357 2 2 0 0 0-.565-.21l-.621-.144a1 1 0 0 1-.405-.176.37.37 0 0 1-.143-.299q0-.234.184-.384.187-.152.513-.152.214 0 .37.068a.6.6 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.199-.566 1.2 1.2 0 0 0-.5-.41 1.8 1.8 0 0 0-.78-.152q-.44 0-.776.15-.337.149-.528.421-.19.273-.19.639 0 .302.123.524t.351.367q.229.143.54.213l.618.144q.31.073.462.193a.39.39 0 0 1 .153.325q0 .165-.085.29A.56.56 0 0 1 2 15.31q-.167.07-.413.07-.176 0-.32-.04a.8.8 0 0 1-.248-.115.58.58 0 0 1-.255-.384zm6.878 1.489-.507-.739q.264-.243.401-.6.138-.358.138-.806v-.501q0-.556-.208-.967a1.5 1.5 0 0 0-.589-.636q-.383-.225-.917-.225-.527 0-.914.225-.384.223-.592.636a2.14 2.14 0 0 0-.205.967v.5q0 .554.205.965.208.41.592.636a1.8 1.8 0 0 0 .914.222 1.8 1.8 0 0 0 .6-.1l.294.422h.788ZM4.262 14.2v-.522q0-.369.114-.63a.9.9 0 0 1 .325-.398.9.9 0 0 1 .495-.138q.288 0 .495.138a.9.9 0 0 1 .325.398q.115.261.115.63v.522q0 .246-.053.445-.053.196-.155.34l-.106-.14-.105-.147h-.733l.451.65a.6.6 0 0 1-.251.047.87.87 0 0 1-.487-.147.9.9 0 0 1-.32-.404 1.7 1.7 0 0 1-.11-.644m3.986 1.057h1.696v.674H7.457v-3.999h.79z"/>
                        </svg>
                        </a>
                    </div>
                </div>

                <WriteTable 
                    titles={titles} 
                    data={data} 
                    onEditClick={handleEdit} 
                    onDeleteClick={handleDelete} 
                />

                {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%' }}>
                                    <h5 
                                        className="modal-title" 
                                        id="modalFormLabel"
                                        style={{ 
                                            fontWeight: 'bold',  /* Negrita */
                                            fontSize: '28px',    /* Tamaño de texto más grande */
                                            margin: '0',         /* Elimina márgenes para evitar desalineación */
                                            textAlign: 'center', /* Centra el texto dentro del h5 */
                                            flex: 1              /* Hace que el h5 ocupe el espacio disponible */
                                        }} 
                                    >
                                        {buttonForm === 'Actualizar' ? 'Actualizar Estanque' : 'Registrar Estanque'}
                                    </h5>
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={closeModal} 
                                        aria-label="Close" 
                                        style={{ position: 'absolute', right: '35px' }} /* Ajusta la posición del botón */
                                    ></button>
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