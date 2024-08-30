import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de que esta ruta sea correcta
import FormMortalidad from './FormMortalidad.jsx'; // Asegúrate de que esta ruta sea correcta

const URI = process.env.ROUTER_PRINCIPAL + '/mortalidad/';

const CrudMortalidad = () => {
    const [MortalidadList, setMortalidadList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
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
            setMortalidadList(respuesta.data);
        } catch (error) {
            console.error('Error fetching mortalidades:', error);
        }
    };

    const getMortalidad = async (Id_Mortalidad) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Mortalidad}`);
            setButtonForm('Actualizar');
            setMortalidad({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching mortalidad:', error);
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
                    // getAllMortalidad(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting mortalidad:', error);
                }
            }else{
                getAllMortalidad();
            }
        });
    };

    const handleEdit = (Id_Mortalidad) => {
        getMortalidad(Id_Mortalidad);
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
          <button class='btn btn-info align-middle btn-edit' data-id='${mortalidad.Id_Mortalidad}'>
            <i class="fa-solid fa-pen-to-square"></i> Editar
          </button>
          <button class='btn btn-info align-middle m-2 btn-delete' data-id='${mortalidad.Id_Mortalidad}'>
            <i class="fa-solid fa-trash-can"></i> Borrar
          </button>
        `
    ]);

    const titles = [
        "Fecha de Mortalidad", "Cantidad de Peces", "Motivo de Mortalidad", "Fecha Siembra", "Nombre Responsable", "Acciones"
    ];

    return (
        <>
            <WriteTable 
                titles={titles} 
                data={data} 
                onEditClick={handleEdit} 
                onDeleteClick={handleDelete} 
            />
            <hr />
            <FormMortalidad 
                buttonForm={buttonForm} 
                mortalidad={mortalidad} 
                URI={URI} 
                updateTextButton={updateTextButton} 
                getAllMortalidad={getAllMortalidad} 
            />
            <hr />
        </>
    );
};

export default CrudMortalidad;
