import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de que esta ruta sea correcta
import FormMortalidad from './FormMortalidad.jsx'; // Asegúrate de que esta ruta sea correcta
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const URI = process.env.ROUTER_PRINCIPAL + '/mortalidad/';

const CrudMortalidad = () => {
    const [MortalidadList, setMortalidadList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [mortalidad, setMortalidad] = useState({
        Id_Mortalidad: '',
        Fec_Mortalidad: '',
        Can_Peces: '',
        Mot_Mortalidad: '',
        Id_Siembra: '',
        Id_Responsable: '',
    });

    useEffect(() => {
        getAllMortalidad();
    }, []);

    const getAllMortalidad = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setMortalidadList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching mortalidad:', error.response?.status || error.message);
        }
    };

    const getMortalidad = async (Id_Mortalidad) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Mortalidad}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setMortalidad({ ...respuesta.data });
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching mortalidad:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteMortalidad = async (Id_Mortalidad) => {
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
                    await axios.delete(`${URI}${Id_Mortalidad}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    getAllMortalidad(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting mortalidad:', error.response?.status || error.message);
                }
            } else {
                getAllMortalidad();
            }
        });
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(MortalidadList.map((mortalidad) => ({
            Fecha: mortalidad.Fec_Mortalidad,
            Cantidad: mortalidad.Can_Peces,
            Motivo: mortalidad.Mot_Mortalidad,
            FechaSiembra: mortalidad.siembra.Fec_Siembra,
            Responsable: mortalidad.responsable.Nom_Responsable
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Mortalidades');
        XLSX.writeFile(wb, 'Mortalidades.xlsx');
    };

    // Función para exportar a SQL
    const exportToSQL = () => {
        // Creación de la tabla Mortalidades
        let sqlStatements = `CREATE TABLE IF NOT EXISTS Mortalidades (
        Id_Mortalidad INT AUTO_INCREMENT PRIMARY KEY,
        Fec_Mortalidad DATE,
        Can_Peces INT,
        Mot_Mortalidad TEXT,
        Siembra_Fec DATE,
        Responsable_Nombre VARCHAR(255)
    );\n\n`;

        // Sentencia para insertar datos en la tabla Mortalidades
        sqlStatements += "INSERT INTO Mortalidades (Fec_Mortalidad, Can_Peces, Mot_Mortalidad, Siembra_Fec, Responsable_Nombre) VALUES \n";

        // Mapear la lista de mortalidades a sentencias SQL
        sqlStatements += MortalidadList.map((mortalidad) => {
            return `('${mortalidad.Fec_Mortalidad}', ${mortalidad.Can_Peces}, '${mortalidad.Mot_Mortalidad.replace(/'/g, "''")}', '${mortalidad.siembra.Fec_Siembra}', '${mortalidad.responsable.Nom_Responsable.replace(/'/g, "''")}')`;
        }).join(",\n") + ";";

        // Imprimir el script SQL en la consola
        console.log(sqlStatements);

        // Opción para descargarlo como un archivo SQL
        const blob = new Blob([sqlStatements], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Mortalidades.sql';
        link.click();
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        // Título de la tabla
        const title = "Mortalidades";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título

        // Configuración de autoTable
        const tableBody = MortalidadList.map((mortalidad) => [
            mortalidad.Fec_Mortalidad,
            mortalidad.Can_Peces,
            mortalidad.Mot_Mortalidad,
            mortalidad.siembra.Fec_Siembra,
            mortalidad.responsable.Nom_Responsable
        ]);

        doc.autoTable({
            head: [['Fecha Mortalidad', 'Cantidad Peces', 'Motivo Mortalidad', 'Fecha Siembra', 'Nombre Responsable']],
            body: tableBody,
            startY: 30, // Posición donde empieza la tabla
            theme: 'grid', // Tema de la tabla
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        // Guarda el PDF
        doc.save('Mortalidades.pdf');
    };

    const handleAddClick = () => {
        setButtonForm('Enviar');
        setShowForm(!showForm);
        if (!showForm) {
            setMortalidad({
                Id_Mortalidad: '',
                Fec_Mortalidad: '',
                Can_Peces: '',
                Mot_Mortalidad: '',
                Id_Siembra: '',
                Id_Responsable: '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Mortalidad) => {
        getMortalidad(Id_Mortalidad);
        setIsModalOpen(true);
    };

    const handleDelete = (Id_Mortalidad) => {
        deleteMortalidad(Id_Mortalidad);
    };

    const data = MortalidadList.map((mortalidad) => [
        mortalidad.Fec_Mortalidad,
        mortalidad.Can_Peces,
        mortalidad.Mot_Mortalidad,
        mortalidad.siembra.Fec_Siembra,
        mortalidad.responsable.Nom_Responsable,
        `
            <button class='btn btn-primary align-middle btn-edit' data-id='${mortalidad.Id_Mortalidad}' onClick={handleAddClick}>
            <i class="fa-solid fa-pen-to-square"></i> 
            </button>
            <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${mortalidad.Id_Mortalidad}'>
            <i class="fa-solid fa-trash-can"></i> 
            </button>

        `
    ]);

    const titles = [
        "Fecha Mortalidad", "Cantidad Peces", "Motivo Mortalidad", "Fecha Siembra", "Nombre Responsable", "Acciones"
    ];

    return (
        <>
            <div style={{ marginLeft: '304px', paddingTop: '100px' }}>
                {/* Botón para agregar */}
                <button
                    className="btn btn-success mb-4 d-flex align-items-center justify-content-center"
                    onClick={handleAddClick}
                    style={{ width: '115px', height: '45px', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <span
                        style={{
                            fontSize: '30px',
                            marginRight: '8px',
                            lineHeight: '1',
                            position: 'relative',
                            top: '-3px' // Ajusta el valor para subir o bajar el símbolo
                        }}
                    > + </span>
                    Agregar
                </button>
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
                        >
                        <i className="bi bi-filetype-pdf" style={{ fontSize: '35px' }}></i>
                        </a>

                        {/* Botón para exportar a Excel (verde) */}
                        <a
                        className="text-success"
                        onClick={exportToExcel}
                        style={{ width: '80px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                        <i className="bi bi-file-earmark-excel" style={{ fontSize: '35px' }}></i>
                        </a>

                        {/* Botón para exportar a SQL (gris) */}
                        <a
                        className="text-secondary"
                        onClick={exportToSQL}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80px', height: '45px' }}
                        >
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
                <div className="modal fade show d-block" id="modalForm" tabIndex="-1" aria-labelledby="modalFormLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                        <div className="modal-header">
                                {/*<h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Mortalidad' : 'Registrar Mortalidad'}</h5>*/}
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <FormMortalidad
                                    buttonForm={buttonForm}
                                    mortalidad={mortalidad}
                                    URI={URI}
                                    updateTextButton={updateTextButton}
                                    getAllMortalidad={getAllMortalidad}
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

export default CrudMortalidad;