import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormTraslado from './FormTraslado';
import FormQueryTraslado from './FormQueryTraslado';

const URI = process.env.ROUTER_PRINCIPAL + '/traslado/';

const CrudTraslado = () => {
    const [TrasladoList, setTrasladoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
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

    const getTraslado = async (id_Traslado) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${id_Traslado}`);
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

    const deleteTraslado = (id_Traslado) => {
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
                    const respuesta = await axios.delete(`${URI}${id_Traslado}`);
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

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
    
        if (!showForm) {
            setTraslado({
                Id_Traslado: '',
                Fec_Traslado: '',
                Can_Peces: '',
                Id_Responsable: '',
                Obs_Traslado: '',
                Hor_Traslado: ''
            });
            setButtonForm('Enviar');
        }
    };
    

    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Traslado'}
                </button>

                {TrasladoList.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Traslados Registrados</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th className='align-middle'>Fecha de Traslado</th>
                                            <th className='align-middle'>Cantidad de Peces</th>
                                            <th className='align-middle'>Responsable</th>
                                            <th className='align-middle'>Observaciones</th>
                                            <th className='align-middle'>Hora de Traslado</th>
                                            <th className='align-middle'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TrasladoList.map((traslado) => (
                                            <tr key={traslado.Id_Traslado}>
                                                <td className='align-middle'>{traslado.Fec_Traslado}</td>
                                                <td className='align-middle'>{traslado.Can_Peces}</td>
                                                <td className='align-middle'>{traslado.responsable.Nom_Responsable}</td>
                                                <td className='align-middle'>{traslado.Obs_Traslado}</td>
                                                <td className='align-middle'>{traslado.Hor_Traslado}</td>
                                                <td className='align-middle'>
                                                    <button className='btn btn-sm btn-info m-1' onClick={() => getTraslado(traslado.Id_Traslado)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className='btn btn-sm btn-danger m-1' onClick={() => deleteTraslado(traslado.Id_Traslado)}>
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
                        <FormTraslado getAllTraslados={getAllTraslados} buttonForm={buttonForm} traslado={traslado} URI={URI} updateTextButton={updateTextButton} />
                    </>
                )}

                <FormQueryTraslado URI={URI} getTraslado={getTraslado} deleteTraslado={deleteTraslado} buttonForm={buttonForm} />
            </div>
        </>

    );
};

export default CrudTraslado;
