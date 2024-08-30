import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormEspecie from './FormEspecie';
import FormQueryEspecie from './FormQueryEspecie';

const URI = process.env.ROUTER_PRINCIPAL + '/especie/';
const PATH_FOTOS = process.env.ROUTER_FOTOS;

const CrudEspecie = () => {
    const [EspecieList, setEspecieList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
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
            setEspecieList(respuesta.data);
        } catch (error) {
            console.error('Error fetching especies:', error);
        }
    };

    const getEspecie = async (Id_Especie) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}/${Id_Especie}`);
            setButtonForm('Actualizar');
            setEspecie({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching especie:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteEspecie = (Id_Especie) => {
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
                    await axios.delete(`${URI}/${Id_Especie}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    getAllEspecies(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting especie:', error);
                }
            }
        });
    };

    // Extraer títulos y datos para la tabla
    const titles = [
        "Nombre", 
        "Características", 
        "Tamaño Promedio", 
        "Densidad", 
        "Imagen", 
        "Acciones"
    ];

    const data = EspecieList.map((especie) => [
        especie.Nom_Especie,
        especie.Car_Especie,
        especie.Tam_Promedio,
        especie.Den_Especie,
        especie.Img_Especie ? (
            <img width="80px" src={`${PATH_FOTOS}/${especie.Img_Especie}`} alt="Imagen de la especie" />
        ) : (
            <span>No Image</span>
        ),
        <>
            <button className='btn btn-info align-middle' onClick={() => getEspecie(especie.Id_Especie)}>
                <i className="fa-solid fa-pen-to-square"></i> Editar
            </button>
            <button className='btn btn-info align-middle m-2' onClick={() => deleteEspecie(especie.Id_Especie)}>
                <i className="fa-solid fa-trash-can"></i> Borrar
            </button>
        </>
    ]);

    return (
        <>
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormEspecie buttonForm={buttonForm} especie={especie} URI={URI} updateTextButton={updateTextButton} getAllEspecies={getAllEspecies} />
            <hr />
            <FormQueryEspecie URI={URI} getEspecie={getEspecie} deleteEspecie={deleteEspecie} buttonForm={buttonForm} />
        </>
    );
}

export default CrudEspecie;
