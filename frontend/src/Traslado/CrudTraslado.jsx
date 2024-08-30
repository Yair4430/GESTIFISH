import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormTraslado from './FormTraslado.jsx';
import FormQueryTraslado from './FormQueryTraslado.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/traslado/';

const CrudTraslado = () => {
    const [trasladoList, setTrasladoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
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
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setTrasladoList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching traslados:', error.response?.status || error.message);
        }
    };

    const getTraslado = async (Id_Traslado) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Traslado}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setTraslado({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching traslado:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteTraslado = async (Id_Traslado) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const respuesta = await axios.delete(`${URI}${Id_Traslado}`);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        getAllTraslados(); // Refrescar la lista después de la eliminación
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting traslado:', error.response?.status || error.message);
                }
            }
        });
    };

    // Extraer títulos y datos para la tabla
    const titles = [
        "Fecha de Traslado",
        "Cantidad de Peces",
        "Responsable",
        "Observaciones",
        "Hora de Traslado",
        "Acciones"
    ];

    const data = trasladoList.map((traslado) => [
        traslado.Fec_Traslado,
        traslado.Can_Peces,
        traslado.responsable?.Nom_Responsable || 'No disponible',
        traslado.Obs_Traslado,
        traslado.Hor_Traslado,
        <>
            <button className='btn btn-info align-middle' onClick={() => getTraslado(traslado.Id_Traslado)}>
                <i className="fa-solid fa-pen-to-square"></i> Editar
            </button>
            <button className='btn btn-info align-middle m-2' onClick={() => deleteTraslado(traslado.Id_Traslado)}>
                <i className="fa-solid fa-trash-can"></i> Borrar
            </button>
        </>
    ]);

    return (
        <>
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormTraslado 
                buttonForm={buttonForm} 
                traslado={traslado} 
                URI={URI} 
                updateTextButton={updateTextButton} 
                getAllTraslados={getAllTraslados} 
            />
            <hr />
            <FormQueryTraslado 
                URI={URI} 
                getTraslado={getTraslado} 
                deleteTraslado={deleteTraslado} 
                buttonForm={buttonForm} 
            />
        </>
    );
};

export default CrudTraslado;
