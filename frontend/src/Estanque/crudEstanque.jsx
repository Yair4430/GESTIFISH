import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormEstanque from './FormEstanque.jsx';
import jsPDF from 'jspdf'; // Añade jsPDF para exportar a PDF

const URI = process.env.ROUTER_PRINCIPAL + '/estanque/';
const PATH_FOTOS = process.env.ROUTER_FOTOS;

const CrudEstanque = () => {
    const [EstanqueList, setEstanqueList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
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
            if (respuesta.status === 200) {
                setEstanqueList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching estanques:', error.response?.status || error.message);
        }
    };

    const getEstanque = async (Id_Estanque) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Estanque}`);
            if (respuesta.status === 200) {
                setButtonForm('Actualizar');
                setEstanque({ ...respuesta.data });
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
            confirmButtonText: "Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const respuesta = await axios.delete(`${URI}${Id_Estanque}`);
                    if (respuesta.status === 200) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        getAllEstanques(); // Refresca la lista después de la eliminación
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting estanque:', error.response?.status || error.message);
                }
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
    };

    const data = EstanqueList.map((estanque) => [
        estanque.Id_Estanque,
        estanque.Nom_Estanque,
        estanque.Esp_Agua,
        estanque.Tip_Estanque,
        estanque.Lar_Estanque,
        estanque.Anc_Estanque,
        estanque.Des_Estanque,
        estanque.Img_Estanque ? (
            `<img width="80px" src="${PATH_FOTOS}/${estanque.Img_Estanque}" alt="Imagen del estanque" />`
        ) : (
            'No Image'
        ),
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
        "Número", "Nombre", "Espejo Agua", "Tipo", "Largo", "Ancho", "Descripción", "Imagen", "Recambio Agua", "Acciones"
    ];

    return (
        <>
            <div style={{ marginLeft: '320px', paddingTop: '70px' }}>
                <button className="btn btn-primary mb-4" onClick={handleAddClick}
                    style={{ width: '140px', height: '45px', padding: '0px', fontSize: '16px' }}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Estanque'}
                </button>
                <button
                    className="btn btn-danger mx-2"
                    onClick={exportToPDF}
                    style={{ position: 'absolute', top: '277px', right: '447px', width: '80px' }}
                >
                    <i className="bi bi-file-earmark-pdf"></i> PDF
                </button>
            </div>
            <WriteTable
                titles={titles}
                data={data}
                onEditClick={(Id_Estanque) => getEstanque(Id_Estanque)}
                onDeleteClick={(Id_Estanque) => deleteEstanque(Id_Estanque)}
            />
            {showForm && (
                <FormEstanque
                    getAllEstanques={getAllEstanques}
                    buttonForm={buttonForm}
                    estanque={estanque}
                    URI={URI}
                    updateTextButton={updateTextButton}
                />
            )}
        </>
    );
};

export default CrudEstanque;