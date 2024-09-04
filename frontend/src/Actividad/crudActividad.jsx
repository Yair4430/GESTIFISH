import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormActividad from './formActividad.jsx';


const URI = process.env.ROUTER_PRINCIPAL + '/Actividad/';

const CrudActividad = () => {
    const [ActividadList, setActividadList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [actividad, setActividad] = useState({
        Id_Actividad: '',
        Nom_Actividad: '',
        Des_Actividad: '',
        Id_Responsable: '',
        Fec_Actividad: '',
        Hor_Actividad: '',
        Fas_Produccion: '',
        Id_Estanque: ''
    });

    useEffect(() => {
        getAllActividad();
    }, []);

    const getAllActividad = async () => {
        try {
            const respuesta = await axios.get(URI);
            setActividadList(respuesta.data);
        } catch (error) {
            console.error('Error fetching actividades:', error);
        }
    };

    const getActividad = async (Id_Actividad) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}/${Id_Actividad}`);
            setButtonForm('Actualizar');
            setActividad({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching actividad:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteActividad = async (Id_Actividad) => {
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
                    await axios.delete(`${URI}/${Id_Actividad}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    // getAllActividad(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting actividad:', error);
                }
            }else{
                getAllActividad(); // Refresh the list after deletion

            }
        });
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

        if (!showForm) {
            setActividad({
                Nom_Actividad: '',
                Des_Actividad: '',
                Fec_Actividad: '',
                Hor_Actividad: '',
                Fas_Produccion: '',
                Id_Responsable: '',
                Id_Estanque: ''
            });
            setButtonForm('Enviar');
        }
    };

    const handleEdit = (Id_Actividad) => {
        getActividad(Id_Actividad);
    };

    const handleDelete = (Id_Actividad) => {
        deleteActividad(Id_Actividad);
    };

    const data = ActividadList.map((actividad) => [
        actividad.Nom_Actividad,
        actividad.Des_Actividad,
        actividad.responsable.Nom_Responsable,
        actividad.Fec_Actividad,
        actividad.Hor_Actividad,
        actividad.Fas_Produccion,
        actividad.estanque.Nom_Estanque,
        `
          <a class='btn btn-primary align-middle btn-edit' data-id='${actividad.Id_Actividad}'>
            <i class="fa-solid fa-pen-to-square"></i> 
          </a>
          <a class='btn btn-danger align-middle m-1 btn-delete' data-id='${actividad.Id_Actividad}'>
            <i class="fa-solid fa-trash-can"></i> 
          </a>
        `
    ]);
    
    const titles = [
        "Nombre", "Descripción", "Responsable", "Fecha", "Hora", "Fase Producción", "Estanque", "Acciones"
    ];

    return (
        <>
        {/* <div className="container mt-5"> */}
        <div style={{ marginLeft: '320px', paddingTop: '70px' }} >
        <button
            className="btn btn-success mb-4"
            onClick={handleAddClick}
            style={{ width: '140px', height: '45px', padding:'0px', fontSize: '16px'}}>
    {showForm ? 'Ocultar Formulario' : 'Agregar Actividad'}
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
                        <FormActividad buttonForm={buttonForm} actividad={actividad} URI={URI} updateTextButton={updateTextButton} getAllActividad={getAllActividad} />
                    </>
                )}
        </>
    );
};

export default CrudActividad;