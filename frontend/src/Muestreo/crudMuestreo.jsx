import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormMuestreo from './formMuestreo';

const URI = process.env.ROUTER_PRINCIPAL + '/muestreo/';

const CrudMuestreo = () => {
    const [muestreoList, setMuestreoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
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
        Pes_Promedio: '',
    });

    useEffect(() => {
        getAllMuestreo();
    }, []);

    const getAllMuestreo = async () => {
        try {
            const respuesta = await axios.get(URI);
            setMuestreoList(respuesta.data);
        } catch (error) {
            console.error('Error fetching muestreo:', error);
        }
    };

    const getMuestreo = async (Id_Muestreo) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Muestreo}`);
            setButtonForm('Actualizar');
            setMuestreo({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching muestreo:', error);
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
                    // getAllMuestreo(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting muestreo:', error);
                }
            }else{
                getAllMuestreo();
            }
        });
    };
    
    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

        if (!showForm) {
            // Reinicia los valores del formulario de muestreo
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
    };

    const handleEdit = (Id_Muestreo) => {
        getMuestreo(Id_Muestreo);
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
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${muestreo.Id_Muestreo}'>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${muestreo.Id_Muestreo}'>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
        `
    ]);
    
    const titles = [
        "Fecha Muestreo", "Número Peces", "Observaciones", "Peso Esperado", "Hora Muestreo", "Fecha Siembra", "Nombre Responsable", "Acciones"
    ];

    return (
        <>
                    {/* <div className="container mt-5"> */}
                    <div style={{ marginLeft: '320px', paddingTop: '70px' }}>

                <button className="btn btn-primary mb-4" onClick={handleAddClick}
                style={{ width: '140px', height: '45px', padding:'0px', fontSize: '16px'}}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Muestreo'}
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
                        <FormMuestreo getAllMuestreo={getAllMuestreo} buttonForm={buttonForm} muestreo={muestreo} URI={URI} updateTextButton={updateTextButton} />
                    </>
                )}
                            
        </>
    );
};

export default CrudMuestreo;
