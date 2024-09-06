import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de que este componente esté disponible
import FormAlimentacion from './FormAlimentacion';
import jsPDF from "jspdf";

const URI = process.env.ROUTER_PRINCIPAL + '/alimentacion/';

const CrudAlimentacion = () => {
    const [AlimentacionList, setAlimentacionList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [alimentacion, setAlimentacion] = useState({
        Id_Alimentacion: '',
        Fec_Alimentacion: '',
        Can_RacionKg: '',
        Id_Siembra: '',
        Id_Responsable: '',
        Tip_Alimento: '',
        Hor_Alimentacion: '',
        Vlr_Alimentacion: '',
    });

    useEffect(() => {
        getAllAlimentacion();
    }, []);

    const getAllAlimentacion = async () => {
        try {
            const respuesta = await axios.get(URI);
            setAlimentacionList(respuesta.data);
        } catch (error) {
            console.error('Error fetching alimentacion:', error);
        }
    };

    const getAlimentacion = async (Id_Alimentacion) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Alimentacion}`);
            setButtonForm('Actualizar');
            setAlimentacion({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching alimentacion:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteAlimentacion = async (Id_Alimentacion) => {
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
                    await axios.delete(`${URI}${Id_Alimentacion}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    // getAllAlimentacion(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting alimentacion:', error);
                }
            } else {
                getAllAlimentacion();
            }
        });
    };


    const exportToPDF = () => {
        const doc = new jsPDF();

        // Título de la tabla
        const title = "Alimentacion";
        doc.setFontSize(16);
        doc.text(title, 14, 20); // Posición del título

        // Configuración de autoTable
        const tableBody = AlimentacionList.map((Alimentacion) => [
            Alimentacion.Fec_Alimentacion,
            Alimentacion.Can_RacionKg,
            Alimentacion.siembra.Fec_Siembra,
            Alimentacion.responsable.Nom_Responsable,
            Alimentacion.Tip_Alimento,
            Alimentacion.Hor_Alimentacion,
            Alimentacion.Vlr_Alimentacion
        ]);

        doc.autoTable({
            head: [['Fecha', 'Cantidad', 'Siembra', 'Responsable', 'Tipo', 'Hora', 'Valor']],
            body: tableBody,
            startY: 30, // Posición donde empieza la tabla
            theme: 'grid', // Tema de la tabla
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: { cellPadding: 2, fontSize: 10, minCellHeight: 10 }
        });

        // Guarda el PDF
        doc.save('alimentacion.pdf');
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

        if (!showForm) {
            setAlimentacion({
                Id_Alimentacion: '',
                Fec_Alimentacion: '',
                Can_RacionKg: '',
                Tip_Alimento: '',
                Hor_Alimentacion: '',
                Vlr_Alimentacion: '',
                Fec_Siembra: '',
                Id_Responsable: ''
            });
            setButtonForm('Enviar');
        }
    };

    const handleEdit = (Id_Alimentacion) => {
        getAlimentacion(Id_Alimentacion);
    };

    const handleDelete = (Id_Alimentacion) => {
        deleteAlimentacion(Id_Alimentacion);
    };

    const data = AlimentacionList.map((alimentacion) => [
        alimentacion.Fec_Alimentacion,
        alimentacion.Can_RacionKg,
        alimentacion.Tip_Alimento,
        alimentacion.Hor_Alimentacion,
        alimentacion.Vlr_Alimentacion,
        alimentacion.siembra.Fec_Siembra,
        alimentacion.responsable.Nom_Responsable,
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${alimentacion.Id_Alimentacion}'>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${alimentacion.Id_Alimentacion}'>
            <i class="fa-solid fa-trash-can"></i>
          </button>
        `
    ]);

    const titles = [
        "Fecha Alimentación", "Cantidad Ración (Kg)", "Tipo Alimento", "Hora Alimentación", "Valor Alimentación", "Fecha Siembra", "Nombre Responsable", "Acciones"
    ];

    return (
        <>
            {/* <div className="container mt-5"> */}
            <div style={{ marginLeft: '320px', paddingTop: '70px' }} >

                <button className="btn btn-primary mb-4" onClick={handleAddClick}
                    style={{ width: '143px', height: '45px', padding: '0px', fontSize: '13px' }}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Alimentación'}
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
                onEditClick={handleEdit}
                onDeleteClick={handleDelete}
            />
            {showForm && (
                <>
                    {/* <hr /> */}
                    <FormAlimentacion getAllAlimentacion={getAllAlimentacion} buttonForm={buttonForm} alimentacion={alimentacion} URI={URI} updateTextButton={updateTextButton} />
                </>
            )}
        </>
    );
};

export default CrudAlimentacion;
