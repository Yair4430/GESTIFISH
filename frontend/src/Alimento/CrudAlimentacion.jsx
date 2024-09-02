import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de que este componente esté disponible
import FormAlimentacion from './FormAlimentacion';

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
            }else{
                getAllAlimentacion();
            }
        });
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
            <i class="fa-solid fa-pen-to-square"></i> Editar
          </button>
          <button class='btn btn-danger align-middle m-2 btn-delete' data-id='${alimentacion.Id_Alimentacion}'>
            <i class="fa-solid fa-trash-can"></i> Borrar
          </button>
        `
    ]);
    
    const titles = [
        "Fecha de Alimentación", "Cantidad de Ración (Kg)", "Tipo de Alimento", "Hora de Alimentación", "Valor Alimentación", "Fecha Siembra", "Nombre Responsable", "Acciones"
    ];

    return (
        <>
        <div className="container mt-5">
                <button className="btn btn-primary mb-4 btn-custom" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Alimentación'}
                </button>
                </div>
            <WriteTable 
                titles={titles} 
                data={data} 
                onEditClick={handleEdit} 
                onDeleteClick={handleDelete} 
            />
            <hr />
            {showForm && (
                    <>
                        <FormAlimentacion getAllAlimentacion={getAllAlimentacion} buttonForm={buttonForm} alimentacion={alimentacion} URI={URI} updateTextButton={updateTextButton} />
                    </>
                )}
            <hr />
        </>
    );
};

export default CrudAlimentacion;
