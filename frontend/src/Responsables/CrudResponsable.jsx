import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';  // Reemplaza con la ruta correcta
import FormResponsable from './FormResponsable.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/responsable/';

const CrudResponsable = () => {
    const [responsableList, setResponsableList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [responsable, setResponsable] = useState({
        Id_Responsable: '',
        Nom_Responsable: '',
        Ape_Responsable: '',
        Doc_Responsable: '',
        Tip_Responsable: '',
        Cor_Responsable: '',
        Num_Responsable: ''
    });

    useEffect(() => {
        getAllResponsable();
    }, []);

    const getAllResponsable = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setResponsableList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching responsables:', error.response?.status || error.message);
        }
    };

    const getResponsable = async (Id_Responsable) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Responsable}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setResponsable({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching responsable:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteResponsable = async (Id_Responsable) => {
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
                    const respuesta = await axios.delete(`${URI}${Id_Responsable}`);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        // getAllResponsable(); // Refresh the list after deletion
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting responsable:', error.response?.status || error.message);
                }
            }else{
                getAllResponsable();
            }
        });
    };

    const data = responsableList.map((responsable) => [
        responsable.Nom_Responsable,
        responsable.Ape_Responsable,
        responsable.Doc_Responsable,
        responsable.Tip_Responsable,
        responsable.Cor_Responsable,
        responsable.Num_Responsable,
        `
          <button class='btn btn-info align-middle btn-edit' data-id='${responsable.Id_Responsable}'>
            <i class="fa-solid fa-pen-to-square"></i> Editar
          </button>
          <button class='btn btn-info align-middle m-2 btn-delete' data-id='${responsable.Id_Responsable}'>
            <i class="fa-solid fa-trash-can"></i> Borrar
          </button>
        `
    ]);

    const titles = [
        "Nombre", "Apellidos", "Documento de Identidad", "Tipo de Responsable", "Correo", "Número de Teléfono", "Acciones"
    ];

    return (
        <>
            <WriteTable 
                titles={titles} 
                data={data} 
                onEditClick={(id) => getResponsable(id)} 
                onDeleteClick={(id) => deleteResponsable(id)} 
            />
            <hr />
            <FormResponsable 
                buttonForm={buttonForm} 
                responsable={responsable} 
                URI={URI} 
                updateTextButton={updateTextButton} 
                getAllResponsable={getAllResponsable} 
            />
            <hr />
        </>
    );
};

export default CrudResponsable;
