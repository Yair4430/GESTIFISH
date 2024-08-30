import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormMortalidad from './FormMortalidad.jsx';
import FormQueryMortalidad from './FormQueryMortalidad.jsx';

const URI = `${process.env.ROUTER_PRINCIPAL}/mortalidad/`;

const CrudMortalidad = () => {
    const [mortalidadList, setMortalidadList] = useState([]);
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
        fetchAllMortalidad();
    }, []);

    const fetchAllMortalidad = async () => {
        try {
            const response = await axios.get(URI);
            setMortalidadList(response.data);
        } catch (error) {
            console.error('Error fetching mortalidades:', error);
        }
    };

    const fetchMortalidad = async (Id_Mortalidad) => {
        setButtonForm('Enviar');
        try {
            const response = await axios.get(`${URI}${Id_Mortalidad}`);
            setButtonForm('Actualizar');
            setMortalidad({ ...response.data });
        } catch (error) {
            console.error('Error fetching mortalidad:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteMortalidad = (Id_Mortalidad) => {
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
                    fetchAllMortalidad(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting mortalidad:', error);
                }
            }
        });
    };

    // Extraer títulos y datos para la tabla
    const titles = [
        "Fecha de Mortalidad",
        "Cantidad de Peces",
        "Motivo de Mortalidad",
        "Fecha Siembra",
        "Nombre Responsable",
        "Acciones"
    ];

    const data = mortalidadList.map((mortalidad) => [
        mortalidad.Fec_Mortalidad,
        mortalidad.Can_Peces,
        mortalidad.Mot_Mortalidad,
        mortalidad.siembra.Fec_Siembra,
        mortalidad.responsable.Nom_Responsable,
        <>
            <button className='btn btn-info align-middle' onClick={() => fetchMortalidad(mortalidad.Id_Mortalidad)}>
                <i className="fa-solid fa-pen-to-square"></i> Editar
            </button>
            <button className='btn btn-info align-middle m-2' onClick={() => deleteMortalidad(mortalidad.Id_Mortalidad)}>
                <i className="fa-solid fa-trash-can"></i> Borrar
            </button>
        </>
    ]);

    return (
        <>
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormMortalidad 
                buttonForm={buttonForm} 
                mortalidad={mortalidad} 
                URI={URI} 
                updateTextButton={updateTextButton} 
                getAllMortalidad={fetchAllMortalidad} 
            />
            <hr />
            <FormQueryMortalidad 
                URI={URI} 
                getMortalidad={fetchMortalidad} 
                deleteMortalidad={deleteMortalidad} 
                buttonForm={buttonForm} 
            />
        </>
    );
}

export default CrudMortalidad;
