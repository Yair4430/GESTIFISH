import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormMuestreo from './FormMuestreo.jsx';
import FormQueryMuestreo from './FormQueryMuestreo.jsx';

const URI = `${process.env.ROUTER_PRINCIPAL}/muestreo/`;

const CrudMuestreo = () => {
    const [muestreoList, setMuestreoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
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
        fetchAllMuestreo();
    }, []);

    const fetchAllMuestreo = async () => {
        try {
            const response = await axios.get(URI);
            setMuestreoList(response.data);
        } catch (error) {
            console.error('Error fetching muestreos:', error);
        }
    };

    const fetchMuestreo = async (Id_Muestreo) => {
        setButtonForm('Enviar');
        try {
            const response = await axios.get(`${URI}${Id_Muestreo}`);
            setButtonForm('Actualizar');
            setMuestreo({ ...response.data });
        } catch (error) {
            console.error('Error fetching muestreo:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteMuestreo = (Id_Muestreo) => {
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
                    fetchAllMuestreo(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting muestreo:', error);
                }
            }
        });
    };

    // Extraer títulos y datos para la tabla
    const titles = [
        "Fecha de Muestreo",
        "Número de Peces",
        "Observaciones",
        "Peso Esperado",
        "Hora de Muestreo",
        "Fecha Siembra",
        "Nombre Responsable",
        "Acciones"
    ];

    const data = muestreoList.map((muestreo) => [
        muestreo.Fec_Muestreo,
        muestreo.Num_Peces,
        muestreo.Obs_Muestreo,
        muestreo.Pes_Esperado,
        muestreo.Hor_Muestreo,
        muestreo.siembra.Fec_Siembra,
        muestreo.responsable.Nom_Responsable,
        <>
            <button className='btn btn-info align-middle' onClick={() => fetchMuestreo(muestreo.Id_Muestreo)}>
                <i className="fa-solid fa-pen-to-square"></i> Editar
            </button>
            <button className='btn btn-info align-middle m-2' onClick={() => deleteMuestreo(muestreo.Id_Muestreo)}>
                <i className="fa-solid fa-trash-can"></i> Borrar
            </button>
        </>
    ]);

    return (
        <>
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormMuestreo 
                buttonForm={buttonForm} 
                muestreo={muestreo} 
                URI={URI} 
                updateTextButton={updateTextButton} 
                getAllMuestreo={fetchAllMuestreo} 
            />
            <hr />
            <FormQueryMuestreo 
                URI={URI} 
                getMuestreo={fetchMuestreo} 
                deleteMuestreo={deleteMuestreo} 
                buttonForm={buttonForm} 
            />
        </>
    );
}

export default CrudMuestreo;
