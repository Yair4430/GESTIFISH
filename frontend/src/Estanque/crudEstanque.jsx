import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormEstanque from './formEstanque';
import FormQueryEstanque from './formQueryEstanque';

const URI = process.env.ROUTER_PRINCIPAL + '/estanque/';
const PATH_FOTOS = process.env.ROUTER_FOTOS;

const CrudEstanque = () => {
    const [EstanqueList, setEstanqueList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [estanque, setEstanque] = useState({
        Id_Estanque: '',
        Nom_Estanque: '',
        Esp_Agua: '',
        Tip_Estanque: '',
        Lar_Estanque: '',
        Anc_Estanque: '',
        Des_Estanque: '',
        Img_Estanque: null,
        Rec_Agua: ''
    });

    useEffect(() => {
        getAllEstanques();
    }, []);

    const getAllEstanques = async () => {
        try {
            const respuesta = await axios.get(URI);
            setEstanqueList(respuesta.data);
        } catch (error) {
            console.error('Error fetching estanques:', error);
        }
    };

    const getEstanque = async (Id_Estanque) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}/${Id_Estanque}`);
            setButtonForm('Actualizar');
            setEstanque({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching estanque:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteEstanque = (Id_Estanque) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${URI}/${Id_Estanque}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    getAllEstanques(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting estanque:', error);
                }
            }
        });
    };

    // Extraer títulos y datos para la tabla
    const titles = [
        "Número", 
        "Nombre", 
        "Espejo de Agua", 
        "Tipo", 
        "Largo", 
        "Ancho", 
        "Descripción", 
        "Imagen", 
        "Recambio de agua", 
        "Acciones"
    ];

    const data = EstanqueList.map((estanque) => [
        estanque.Id_Estanque,
        estanque.Nom_Estanque,
        estanque.Esp_Agua,
        estanque.Tip_Estanque,
        estanque.Lar_Estanque,
        estanque.Anc_Estanque,
        estanque.Des_Estanque,
        <img width="80px" src={`${PATH_FOTOS}/${estanque.Img_Estanque}`} alt="Imagen del estanque" />,
        estanque.Rec_Agua,
        <>
            <button className='btn btn-info align-middle' onClick={() => getEstanque(estanque.Id_Estanque)}>
                <i className="fa-solid fa-pen-to-square"></i> Editar
            </button>
            <button className='btn btn-info align-middle m-2' onClick={() => deleteEstanque(estanque.Id_Estanque)}>
                <i className="fa-solid fa-trash-can"></i> Borrar
            </button>
        </>
    ]);

    return (
        <>
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormEstanque getAllEstanques={getAllEstanques} buttonForm={buttonForm} estanque={estanque} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryEstanque URI={URI} getEstanque={getEstanque} deleteEstanque={deleteEstanque} buttonForm={buttonForm} />
        </>
    );
};

export default CrudEstanque;
