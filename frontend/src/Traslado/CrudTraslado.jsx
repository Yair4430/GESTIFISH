import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormTraslado from './FormTraslado'; 

const URI = process.env.ROUTER_PRINCIPAL + '/traslado/';

const CrudTraslado = () => {
    const [trasladoList, setTrasladoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [traslado, setTraslado] = useState({
        Id_Traslado: '',
        Fec_Traslado: '',
        Can_Peces: '',
        Id_Responsable: '',
        Obs_Traslado: '',
        Hor_Traslado: ''
    });

    useEffect(() => {
        getAllTraslados();
    }, []);

    const getAllTraslados = async () => {
        try {
            const respuesta = await axios.get(URI);
            setTrasladoList(respuesta.data);
        } catch (error) {
            console.error('Error fetching traslados:', error);
        }
    };

    const getTraslado = async (id_Traslado) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${id_Traslado}`);
            setTraslado({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching traslado:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteTraslado = async (id_Traslado) => {
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
                    await axios.delete(`${URI}${id_Traslado}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    // getAllTraslados(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting traslado:', error);
                }
            }else{
                getAllTraslados();
            }
        });
    };
    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
    
        if (!showForm) {
            setTraslado({
                Id_Traslado: '',
                Fec_Traslado: '',
                Can_Peces: '',
                Id_Responsable: '',
                Obs_Traslado: '',
                Hor_Traslado: ''
            });
            setButtonForm('Enviar');
        }
    };

    
    const handleEdit = (id_Traslado) => {
        getTraslado(id_Traslado);
    };

    const handleDelete = (id_Traslado) => {
        deleteTraslado(id_Traslado);
    };

    const data = trasladoList.map((traslado) => [
        traslado.Fec_Traslado,
        traslado.Can_Peces,
        traslado.responsable.Nom_Responsable,
        traslado.Obs_Traslado,
        traslado.Hor_Traslado,
        `
        <button class='btn btn-primary' align-middle btn-edit' data-id='${traslado.id_Traslado}'>
          <i class="fa-solid fa-pen-to-square"></i> 
        </button>
        <button class='btn btn-danger' align-middle m-1 btn-delete' data-id='${traslado.id_Traslado}'>
          <i class="fa-solid fa-trash-can"></i> 
        </button>
      `
    ]);

    const titles = [
        "Fecha de Traslado", "Cantidad de Peces", "Responsable", "Observaciones", "Hora de Traslado", "Acciones"
    ];

    return (
        <>
        {/* <div className="container mt-5"> */}
        <div style={{ marginLeft: '320px', paddingTop: '70px' }}>

                <button className="btn btn-primary mb-4" onClick={handleAddClick}
                style={{ width: '140px', height: '45px', padding:'0px', fontSize: '16px'}}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Traslado'}
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
                        <FormTraslado getAllTraslados={getAllTraslados} buttonForm={buttonForm} traslado={traslado} URI={URI} updateTextButton={updateTextButton} />
                    </>
                )}
        </>
    );
};

export default CrudTraslado;
