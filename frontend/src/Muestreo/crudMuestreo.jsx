import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormMuestreo from './formMuestreo';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';  // Importar XLSX para exportar a Excel

const URI = process.env.ROUTER_PRINCIPAL + '/muestreo/';

const CrudMuestreo = () => {
    const [muestreoList, setMuestreoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [muestreo, setMuestreo] = useState({
        Id_Muestreo: '',
        Fec_Muestreo: '',
        Num_Peces: '',
        Obs_Muestreo: '',
        Pes_Esperado: '',
        Id_Siembra: '',
        Id_Responsable: '',
        Hor_Muestreo: '',
        Pes_Promedio: ''
    });

    useEffect(() => {
        getAllMuestreo();
    }, []);

    const getAllMuestreo = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setMuestreoList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching muestreo:', error.response?.status || error.message);
        }
    };

    const getMuestreo = async (Id_Muestreo) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Muestreo}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setMuestreo({ ...respuesta.data });
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching muestreo:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteMuestreo = async (Id_Muestreo) => {
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
                    await axios.delete(`${URI}${Id_Muestreo}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    //getAllMuestreo(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting muestreo:', error);
                }
            } else {
                getAllMuestreo();
            }
        });
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(muestreoList.map((muestreo) => ({
            Fecha: muestreo.Fec_Muestreo,
            Número_Peces: muestreo.Num_Peces,
            Observaciones: muestreo.Obs_Muestreo,
            Peso_Esperado: muestreo.Pes_Esperado,
            Hora_Muestreo: muestreo.Hor_Muestreo,
            Siembra: muestreo.siembra.Fec_Siembra,
            Responsable: muestreo.responsable.Nom_Responsable,
            Peso_Promedio: muestreo.Pes_Promedio
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Muestreo');
        XLSX.writeFile(wb, 'Muestreos.xlsx');
    };

    // Función para exportar a SQL
    const exportToSQL = () => {
        let sqlStatements = `CREATE TABLE IF NOT EXISTS Muestreos (
            Id_Muestreo INT AUTO_INCREMENT PRIMARY KEY,
            Fec_Muestreo DATE,
            Num_Peces INT,
            Obs_Muestreo TEXT,
            Pes_Esperado DECIMAL(10,2),
            Fec_Siembra DATE, -- Cambiado de Id_Siembra a Fec_Siembra
            Nom_Responsable VARCHAR(255), -- Cambiado de Id_Responsable a Nom_Responsable
            Hor_Muestreo TIME,
            Pes_Promedio DECIMAL(10,2)
        );\n\n`;
    
        sqlStatements += "INSERT INTO Muestreos (Fec_Muestreo, Num_Peces, Obs_Muestreo, Pes_Esperado, Fec_Siembra, Nom_Responsable, Hor_Muestreo, Pes_Promedio) VALUES \n";
    
        sqlStatements += muestreoList.map((muestreo) => {
            return `('${muestreo.Fec_Muestreo}', ${muestreo.Num_Peces}, '${muestreo.Obs_Muestreo.replace(/'/g, "''")}', ${muestreo.Pes_Esperado}, '${muestreo.siembra.Fec_Siembra}', '${muestreo.responsable.Nom_Responsable}', '${muestreo.Hor_Muestreo}', ${muestreo.Pes_Promedio})`;
        }).join(",\n") + ";";
    
        // Imprimir el script SQL en la consola
        console.log(sqlStatements);
    
        // Opción para descargarlo como un archivo SQL
        const blob = new Blob([sqlStatements], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Muestreos.sql';
        link.click();
    };
    
    const exportToPDF = () => {
        const doc = new jsPDF();
        // Título de la tabla
        const title = "Muestreos";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título

        // Configuración de autoTable
        const tableBody = muestreoList.map((muestreo) => [
            muestreo.Fec_Muestreo,
            muestreo.Num_Peces,
            muestreo.Obs_Muestreo,
            muestreo.Pes_Esperado,
            muestreo.Hor_Muestreo,
            muestreo.siembra.Fec_Siembra,
            muestreo.responsable.Nom_Responsable,
            muestreo.Pes_Promedio
        ]);

        doc.autoTable({
            head: [['Fecha Muestreo', 'Número Peces', 'Observaciones', 'Peso Esperado', 'Hora Muestreo', 'Fecha Siembra', 'Nombre Responsable', 'Peso Promedio']],
            body: tableBody,
            startY: 30, // Posición donde empieza la tabla
            theme: 'grid', // Tema de la tabla
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        // Guarda el PDF
        doc.save('Muestreos.pdf');
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
        if (!showForm) {
            setMuestreo({
                Id_Muestreo: '',
                Fec_Muestreo: '',
                Num_Peces: '',
                Obs_Muestreo: '',
                Pes_Esperado: '',
                Id_Siembra: '',
                Id_Responsable: '',
                Hor_Muestreo: '',
                Pes_Promedio: ''
            });

            setButtonForm('Enviar');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Muestreo) => {
        getMuestreo(Id_Muestreo);
        setIsModalOpen(true);
    };

    const handleDelete = (Id_Muestreo) => {
        deleteMuestreo(Id_Muestreo);
    };

    const data = muestreoList.map((muestreo) => [
        muestreo.Fec_Muestreo,
        muestreo.Num_Peces,
        muestreo.Obs_Muestreo,
        muestreo.Pes_Esperado,
        muestreo.Hor_Muestreo,
        muestreo.siembra.Fec_Siembra,
        muestreo.responsable.Nom_Responsable,
        muestreo.Pes_Promedio,

        `
        <button class='btn btn-primary align-middle btn-edit' data-id='${muestreo.Id_Muestreo}' onClick={handleAddClick}>
          <i class="fa-solid fa-pen-to-square"></i> 
        </button>
        <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${muestreo.Id_Muestreo}'>
          <i class="fa-solid fa-trash-can"></i> 
        </button>
      `
    ]);

    const titles =[
        'Fecha Muestreo', 'Número Peces', 'Observaciones', 'Peso Esperado', 'Hora Muestreo', 'Fecha Siembra', 'Nombre Responsable', 'Peso Promedio', 'Acciones'
    ]
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
                                {/*<h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Muestreo' : 'Registrar Muestreo'}</h5>*/}
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                                <div className="modal-body">
                                    <FormMuestreo
                                        buttonForm={buttonForm}
                                        muestreo={muestreo}
                                        URI={URI}
                                        updateTextButton={updateTextButton}
                                        getAllMuestreo={getAllMuestreo}
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

export default CrudMuestreo;