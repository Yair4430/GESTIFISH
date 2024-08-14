// components/CrudActividad.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormActividad from './formActividad.jsx';
import FormQueryActividad from './formQueryActividad.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/Actividad/';

const CrudActividad = () => {
    const [ActividadList, setActividadList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [actividad, setActividad] = useState({
        Id_Actividad: '',
        Nom_Actividad: '',
        Des_Actividad: '',
        Id_Responsable:'',
        Fec_Actividad: '',
        Hor_Actividad : '',
        Fas_Produccion: '',
        Id_Estanque:''
    });

    useEffect(() => {
        getAllActividad();
    }, []);

    const getAllActividad = async () => {
        try {
            const respuesta = await axios.get(URI);
            setActividadList(respuesta.data);
        } catch (error) {
            console.error('Error fetching actividades:', error);
        }
    };

 const getActividad = async (Id_Actividad) => {
    setButtonForm('Enviar');
    try {
        const respuesta = await axios.get(`${URI}/${Id_Actividad}`); // Corregido
        setButtonForm('Actualizar');
        setActividad({ ...respuesta.data });
    } catch (error) {
        console.error('Error fetching actividad:', error);
    }
};


    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteActividad = (Id_Actividad) => {
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
                    await axios.delete(`${URI}/${Id_Actividad}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    getAllActividad(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting actividad:', error);
                }
            }
        });
    };

    return (
        <>
            <table className="table table-bordered border-info text-center mt-4" style={{ border: "3px solid" }}>
                <thead>
                    <tr>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Nombre</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Descripción</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Responsable</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Hora</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fase Produccion</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Estanque</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ActividadList.map((actividad) => (
                        <tr key={actividad.Id_Actividad} className='border-info font-monospace' style={{ border: "3px solid" }}>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.Nom_Actividad}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.Des_Actividad}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.responsable.Nom_Responsable}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.Fec_Actividad}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.Hor_Actividad}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.Fas_Produccion}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.estanque.Nom_Estanque}</td>
                            <td>
                                <button className='btn btn-info align-middle' onClick={() => getActividad(actividad.Id_Actividad)}>
                                    <i className="fa-solid fa-pen-to-square"></i> Editar
                                </button>
                                <button className='btn btn-info align-middle m-2' onClick={() => deleteActividad(actividad.Id_Actividad)}>
                                    <i className="fa-solid fa-trash-can"></i> Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormActividad buttonForm={buttonForm} actividad={actividad} URI={URI} updateTextButton={updateTextButton} getAllActividad={getAllActividad} />
            <hr />
            <FormQueryActividad URI={URI} getActividad={getActividad} deleteActividad={deleteActividad} buttonForm={buttonForm} />
        </>
    );
}

export default CrudActividad;
