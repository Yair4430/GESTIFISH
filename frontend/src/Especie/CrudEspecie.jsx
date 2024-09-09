import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormEspecie from './FormEspecie';
import jsPDF from "jspdf"; // Añade jsPDF para exportar a PDF
import * as XLSX from 'xlsx'; // Añade XLSX para exportar a Excel

const URI = process.env.ROUTER_PRINCIPAL + '/especie/';
const PATH_FOTOS = process.env.ROUTER_FOTOS;

const CrudEspecie = () => {
    const [EspecieList, setEspecieList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [especie, setEspecie] = useState({
        Id_Especie: '',
        Nom_Especie: '',
        Car_Especie: '',
        Tam_Promedio: '',
        Den_Especie: '',
        Img_Especie: null
    });

    useEffect(() => {
        getAllEspecies();
    }, []);

    const getAllEspecies = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status === 200) {
                setEspecieList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching especies:', error.response?.status || error.message);
        }
    };

    const getEspecie = async (Id_Especie) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Especie}`);
            if (respuesta.status === 200) {
                setButtonForm('Actualizar');
                setEspecie({ ...respuesta.data });
                // Mostrar el modal
                const modalElement = document.getElementById('modalForm');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching especie:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteEspecie = (Id_Especie) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const respuesta = await axios.delete(`${URI}${Id_Especie}`);
                    if (respuesta.status === 200) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        // getAllEspecies(); // Refresh the list after deletion
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting especie:', error.response?.status || error.message);
                }
            } else {
                getAllEspecies();
            }
        });
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(EspecieList.map((especie) => ({
            Nombre: especie.Nom_Especie,
            Características: especie.Car_Especie,
            'Tamaño Promedio': especie.Tam_Promedio,
            Densidad: especie.Den_Especie,
            Imagen: especie.Img_Especie ? `${PATH_FOTOS}/${especie.Img_Especie}` : 'No Image'
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Especies');
        XLSX.writeFile(wb, 'especies.xlsx');
    };

    const exportToSQL = () => {
        let sqlStatements = `CREATE TABLE IF NOT EXISTS Especies (
            Id_Especie INT AUTO_INCREMENT PRIMARY KEY,
            Nom_Especie VARCHAR(255),
            Car_Especie TEXT,
            Tam_Promedio VARCHAR(255),
            Den_Especie VARCHAR(255),
            Img_Especie VARCHAR(255)
        );\n\n`;
    
        sqlStatements += "INSERT INTO Especies (Nom_Especie, Car_Especie, Tam_Promedio, Den_Especie, Img_Especie) VALUES \n";
    
        sqlStatements += EspecieList.map((especie) => {
            // Asegúrate de que Tam_Promedio es una cadena y reemplaza caracteres
            const tamPromedio = typeof especie.Tam_Promedio === 'string' ? especie.Tam_Promedio.replace(/'/g, " ") : '';
            
            // Maneja valores null o undefined de manera adecuada
            const nomEspecie = especie.Nom_Especie ? especie.Nom_Especie.replace(/'/g, "''") : '';
            const carEspecie = especie.Car_Especie ? especie.Car_Especie.replace(/'/g, "''") : '';
            const denEspecie = especie.Den_Especie ? especie.Den_Especie.replace(/'/g, "''") : '';
            const imgEspecie = especie.Img_Especie ? `${PATH_FOTOS}/${especie.Img_Especie}` : '';
    
            // Retorna la línea SQL con todos los campos
            return `('${nomEspecie}', '${carEspecie}', '${tamPromedio}', '${denEspecie}', '${imgEspecie}')`;
        }).join(",\n") + ";";
    
        // Imprimir el script SQL en la consola
        console.log(sqlStatements);
    
        // Opción para descargarlo como un archivo SQL
        const blob = new Blob([sqlStatements], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'especies.sql';
        link.click();
    };
    
    

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Título de la tabla
        const title = "Especies";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título

        // Configuración de autoTable
        const tableBody = EspecieList.map((especie) => [
            especie.Nom_Especie,
            especie.Car_Especie,
            especie.Tam_Promedio,
            especie.Den_Especie,
            especie.Img_Especie ? (
                doc.addImage(`${PATH_FOTOS}/${especie.Img_Especie}`, 'JPEG', 14, 60, 50, 50)
            ) : (
                'No Image'
            )
        ]);

        doc.autoTable({
            head: [['Nombre', 'Características', 'Tamaño Promedio', 'Densidad', 'Imagen']],
            body: tableBody,
            startY: 30, // Posición donde empieza la tabla
            theme: 'grid', // Tema de la tabla
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        // Guarda el PDF
        doc.save('especies.pdf');
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
        if (!showForm) {
            setEspecie({
                Id_Especie: '',
                Nom_Especie: '',
                Car_Especie: '',
                Tam_Promedio: '',
                Den_Especie: '',
                Img_Especie: null
            });
            setButtonForm('Enviar');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (Id_Especie) => {
        getEspecie(Id_Especie);
        setIsModalOpen(true);
    };

    const handleDelete = (Id_Especie) => {
        deleteEspecie(Id_Especie);
    };

    const data = EspecieList.map((especie) => [
        especie.Nom_Especie,
        especie.Car_Especie,
        especie.Tam_Promedio,
        especie.Den_Especie,
        especie.Img_Especie ? (
            `<img width="80px" src="${PATH_FOTOS}/${especie.Img_Especie}" alt="Imagen de la especie" />`
        ) : (
            'No Image'
        ),
        `
        <button class='btn btn-primary align-middle btn-edit' data-id='${especie.Id_Especie}' onClick={handleAddClick}>
          <i class="fa-solid fa-pen-to-square"></i> 
        </button>
        <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${especie.Id_Especie}'>
          <i class="fa-solid fa-trash-can"></i> 
        </button>
      `
    ]);

    const titles = [
        "Nombre", "Características", "Tamaño Promedio", "Densidad", "Imagen", "Acciones"
    ];
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
                                    <h5 className="modal-title" id="modalFormLabel">{buttonForm === 'Actualizar' ? 'Actualizar Especie' : 'Registrar Especie'}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <FormEspecie 
                                        buttonForm={buttonForm} 
                                        especie={especie} 
                                        URI={URI} 
                                        updateTextButton={updateTextButton} 
                                        getAllEspecies={getAllEspecies} 
                                        closeModal ={() => {
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
}

export default CrudEspecie;