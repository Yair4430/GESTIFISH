import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormEspecie from './FormEspecie';
import jsPDF from "jspdf"; // Añade jsPDF para exportar a PDF

const URI = process.env.ROUTER_PRINCIPAL + '/especie/';
const PATH_FOTOS = process.env.ROUTER_FOTOS;

const CrudEspecie = () => {
    const [EspecieList, setEspecieList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
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

    const deleteEspecie = async (Id_Especie) => {
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
                        getAllEspecies(); // Refresca la lista después de la eliminación
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting especie:', error.response?.status || error.message);
                }
            }
        });
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
                Img_Especie: '' // Ajusta esto según cómo manejes la imagen
            });
            setButtonForm('Enviar');
        }
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
            <button class='btn btn-primary align-middle btn-edit' data-id='${especie.Id_Especie}'>
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
            <div style={{ marginLeft: '320px', paddingTop: '70px' }} >
                <button className="btn btn-primary mb-4" onClick={handleAddClick}
                    style={{ width: '140px', height: '45px', padding: '0px', fontSize: '16px' }}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Especie'}
                </button>
                <button
                    className="btn btn-danger mx-2"
                    onClick={exportToPDF}
                    style={{ position: 'absolute', top: '277px', right: '447px', width:'80px' }}
                >
                    <i className="bi bi-file-earmark-pdf"></i> PDF
                </button>
            </div>
            <WriteTable
                titles={titles}
                data={data}
                onEditClick={(Id_Especie) => getEspecie(Id_Especie)}
                onDeleteClick={(Id_Especie) => deleteEspecie(Id_Especie)}
            />
            {showForm && (
                <FormEspecie
                    getAllEspecies={getAllEspecies}
                    buttonForm={buttonForm}
                    especie={especie}
                    URI={URI}
                    updateTextButton={updateTextButton}
                />
            )}
        </>
    );
}

export default CrudEspecie;
    