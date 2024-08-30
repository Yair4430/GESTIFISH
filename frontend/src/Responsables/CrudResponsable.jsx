import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormResponsable from './FormResponsable.jsx';
import FormQueryResponsable from './FormQueryResponsable.jsx';

const URI = `${process.env.ROUTER_PRINCIPAL}/responsable/`;

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
        fetchAllResponsable();
    }, []);

    const fetchAllResponsable = async () => {
        try {
            const response = await axios.get(URI);
            setResponsableList(response.data);
        } catch (error) {
            console.error('Error fetching responsables:', error);
        }
    };

    const fetchResponsable = async (Id_Responsable) => {
        setButtonForm('Enviar');
        try {
            const response = await axios.get(`${URI}${Id_Responsable}`);
            setButtonForm('Actualizar');
            setResponsable({ ...response.data });
        } catch (error) {
            console.error('Error fetching responsable:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteResponsable = (Id_Responsable) => {
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
                    await axios.delete(`${URI}${Id_Responsable}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    fetchAllResponsable(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting responsable:', error);
                }
            }
        });
    };

    // Extraer títulos y datos para la tabla
    const titles = [
        "Nombre",
        "Apellidos",
        "Documento de Identidad",
        "Tipo de Responsable",
        "Correo",
        "Número de Teléfono",
        "Acciones"
    ];

    const data = responsableList.map((responsable) => [
        responsable.Nom_Responsable,
        responsable.Ape_Responsable,
        responsable.Doc_Responsable,
        responsable.Tip_Responsable,
        responsable.Cor_Responsable,
        responsable.Num_Responsable,
        <>
            <button className='btn btn-info align-middle' onClick={() => fetchResponsable(responsable.Id_Responsable)}>
                <i className="fa-solid fa-pen-to-square"></i> Editar
            </button>
            <button className='btn btn-info align-middle m-2' onClick={() => deleteResponsable(responsable.Id_Responsable)}>
                <i className="fa-solid fa-trash-can"></i> Borrar
            </button>
        </>
    ]);

    return (
        <>
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormResponsable 
                buttonForm={buttonForm} 
                responsable={responsable} 
                URI={URI} 
                updateTextButton={updateTextButton} 
                getAllResponsable={fetchAllResponsable} 
            />
            <hr />
            <FormQueryResponsable 
                URI={URI} 
                getResponsable={fetchResponsable} 
                deleteResponsable={deleteResponsable} 
                buttonForm={buttonForm} 
            />
        </>
    );
}

export default CrudResponsable;
