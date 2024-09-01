import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormAlimentacion from './FormAlimentacion';
import FormQueryAlimentacion from './FormQueryAlimentacion';
import './Alimentacion.css'

const URI = process.env.ROUTER_PRINCIPAL + '/alimentacion/';

const CrudAlimentacion = () => {
    const [AlimentacionList, setAlimentacionList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [alimentacion, setAlimentacion] = useState({
        Id_Alimentacion: '',
        Fec_Alimentacion: '',
        Can_RacionKg: '',
        Id_Siembra: '',
        Id_Responsable: '',
        Tip_Alimento: '',
        Hor_Alimentacion: '',
        Vlr_Alimentacion: '',
    });

    useEffect(() => {
        getAllAlimentacion();
    }, []);

    const getAllAlimentacion = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setAlimentacionList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching alimentacion:', error.response?.status || error.message);
        }
    };

    const getAlimentacion = async (Id_Alimentacion) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Alimentacion}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setAlimentacion({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching alimentacion:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteAlimentacion = (Id_Alimentacion) => {
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
                    const respuesta = await axios.delete(`${URI}${Id_Alimentacion}`);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        getAllAlimentacion(); // Refrescar la lista después de la eliminación
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting alimentacion:', error.response?.status || error.message);
                }
            }
        });
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

        if (!showForm) {
            setAlimentacion({
                Id_Alimentacion: '',
                Fec_Alimentacion: '',
                Can_RacionKg: '',
                Tip_Alimento: '',
                Hor_Alimentacion: '',
                Vlr_Alimentacion: '',
                Fec_Siembra: '',
                Id_Responsable: ''
            });
            setButtonForm('Enviar');
        }
    };


    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-4 btn-custom" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Alimentación'}
                </button>

                {AlimentacionList.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Alimentaciones Registradas</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th className='align-middle'>Fecha de Alimentación</th>
                                            <th className='align-middle'>Cantidad de Ración (Kg)</th>
                                            <th className='align-middle'>Tipo de Alimento</th>
                                            <th className='align-middle'>Hora de Alimentación</th>
                                            <th className='align-middle'>Valor Alimentación</th>
                                            <th className='align-middle'>Fecha Siembra</th>
                                            <th className='align-middle'>Nombre Responsable</th>
                                            <th className='align-middle'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {AlimentacionList.map((alimentacion) => (
                                            <tr key={alimentacion.Id_Alimentacion}>
                                                <td className='align-middle'>{alimentacion.Fec_Alimentacion}</td>
                                                <td className='align-middle'>{alimentacion.Can_RacionKg}</td>
                                                <td className='align-middle'>{alimentacion.Tip_Alimento}</td>
                                                <td className='align-middle'>{alimentacion.Hor_Alimentacion}</td>
                                                <td className='align-middle'>{alimentacion.Vlr_Alimentacion}</td>
                                                <td className='align-middle'>{alimentacion.siembra.Fec_Siembra}</td>
                                                <td className='align-middle'>{alimentacion.responsable.Nom_Responsable}</td>
                                                <td className='align-middle'>
                                                    <button className='btn btn-sm btn-primary m-1' onClick={() => getAlimentacion(alimentacion.Id_Alimentacion)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className='btn btn-sm btn-danger m-1' onClick={() => deleteAlimentacion(alimentacion.Id_Alimentacion)}>
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
                        <FormAlimentacion getAllAlimentacion={getAllAlimentacion} buttonForm={buttonForm} alimentacion={alimentacion} URI={URI} updateTextButton={updateTextButton} />
                    </>
                )}

                <FormQueryAlimentacion URI={URI} getAlimentacion={getAlimentacion} deleteAlimentacion={deleteAlimentacion} buttonForm={buttonForm} />
            </div>

        </>

    );
};

export default CrudAlimentacion;
