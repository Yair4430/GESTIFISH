import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormActividad from './formActividad.jsx';
import FormQueryActividad from './formQueryActividad.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/Actividad/';

const CrudActividad = () => {
    const [ActividadList, setActividadList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [actividad, setActividad] = useState({
        Id_Actividad: '',
        Nom_Actividad: '',
        Des_Actividad: '',
        Id_Responsable: '',
        Fec_Actividad: '',
        Hor_Actividad: '',
        Fas_Produccion: '',
        Id_Estanque: ''
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
            const respuesta = await axios.get(`${URI}/${Id_Actividad} }}`); // Corregido
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

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

        if (!showForm) {
            setActividad({
                Nom_Actividad: '',
                Des_Actividad: '',
                Fec_Actividad: '',
                Hor_Actividad: '',
                Fas_Produccion: '',
                Id_Responsable: '',
                Id_Estanque: ''
            });
            setButtonForm('Enviar');
        }
    };


    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Actividad'}
                </button>

                {ActividadList.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Actividades Registradas</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th className='align-middle'>Nombre</th>
                                            <th className='align-middle'>Descripción</th>
                                            <th className='align-middle'>Responsable</th>
                                            <th className='align-middle'>Fecha</th>
                                            <th className='align-middle'>Hora</th>
                                            <th className='align-middle'>Fase Producción</th>
                                            <th className='align-middle'>Estanque</th>
                                            <th className='align-middle'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ActividadList.map((actividad) => (
                                            <tr key={actividad.Id_Actividad}>
                                                <td className='align-middle'>{actividad.Nom_Actividad}</td>
                                                <td className='align-middle'>{actividad.Des_Actividad}</td>
                                                <td className='align-middle'>{actividad.responsable.Nom_Responsable}</td>
                                                <td className='align-middle'>{actividad.Fec_Actividad}</td>
                                                <td className='align-middle'>{actividad.Hor_Actividad}</td>
                                                <td className='align-middle'>{actividad.Fas_Produccion}</td>
                                                <td className='align-middle'>{actividad.estanque.Nom_Estanque}</td>
                                                <td className='align-middle'>
                                                    <button className='btn btn-sm btn-primary m-1' onClick={() => getActividad(actividad.Id_Actividad)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className='btn btn-sm btn-danger m-1' onClick={() => deleteActividad(actividad.Id_Actividad)}>
                                                        <i className="fa-solid fa-trash-can"></i> Borrar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="alert alert-info mt-3" role="alert">
                        No hay resultados para mostrar.
                    </div>
                )}

                {showForm && (
                    <>
                        <hr />
                        <FormActividad buttonForm={buttonForm} actividad={actividad} URI={URI} updateTextButton={updateTextButton} getAllActividad={getAllActividad} />
                        <hr />
                    </>
                )}

                <FormQueryActividad URI={URI} getActividad={getActividad} deleteActividad={deleteActividad} buttonForm={buttonForm} />
            </div>
        </>
    );
}

export default CrudActividad;