import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormMortalidad from './FormMortalidad';
import FormQueryMortalidad from './FormQueryMortalidad';

const URI = process.env.ROUTER_PRINCIPAL + '/mortalidad/';

const CrudMortalidad = () => {
    const [MortalidadList, setMortalidadList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [mortalidad, setMortalidad] = useState({
        Id_Mortalidad: '',
        Fec_Mortalidad: '',
        Can_Peces: '',
        Mot_Mortalidad: '',
        Id_Siembra: '',
        Id_Responsable: '',
    });

    useEffect(() => {
        getAllMortalidad();
    }, []);

    const getAllMortalidad = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setMortalidadList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching mortalidad:', error.response?.status || error.message);
        }
    };

    const getMortalidad = async (Id_Mortalidad) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Mortalidad}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setMortalidad({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching mortalidad:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteMortalidad = (id_Mortalidad) => {
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
                    const respuesta = await axios.delete(`${URI}${id_Mortalidad}`);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        getAllMortalidad(); // Refrescar la lista después de la eliminación
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting mortalidad:', error.response?.status || error.message);
                }
            }
        });
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

        if (!showForm) {
            setMortalidad({
                Fec_Mortalidad: '',
                Can_Peces: '',
                Mot_Mortalidad: '',
                Id_Siembra: '',
                Id_Responsable: ''
            });
            setButtonForm('Enviar');
        }
    };

    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Mortalidad'}
                </button>

                {MortalidadList.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Mortalidades Registradas</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th className='align-middle'>Fecha de Mortalidad</th>
                                            <th className='align-middle'>Cantidad de Peces</th>
                                            <th className='align-middle'>Motivo de Mortalidad</th>
                                            <th className='align-middle'>Fecha de Siembra</th>
                                            <th className='align-middle'>Nombre Responsable</th>
                                            <th className='align-middle'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MortalidadList.map((mortalidad) => (
                                            <tr key={mortalidad.Id_Mortalidad}>
                                                <td className='align-middle'>{mortalidad.Fec_Mortalidad}</td>
                                                <td className='align-middle'>{mortalidad.Can_Peces}</td>
                                                <td className='align-middle'>{mortalidad.Mot_Mortalidad}</td>
                                                <td className='align-middle'>{mortalidad.siembra.Fec_Siembra}</td>
                                                <td className='align-middle'>{mortalidad.responsable.Nom_Responsable}</td>
                                                <td className='align-middle'>
                                                    <button className='btn btn-sm btn-primary m-1' onClick={() => getMortalidad(mortalidad.Id_Mortalidad)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className='btn btn-sm btn-danger m-1' onClick={() => deleteMortalidad(mortalidad.Id_Mortalidad)}>
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
                        <FormMortalidad getAllMortalidad={getAllMortalidad} buttonForm={buttonForm} mortalidad={mortalidad} URI={URI} updateTextButton={updateTextButton} />
                    </>
                )}
                <FormQueryMortalidad URI={URI} getMortalidad={getMortalidad} deleteMortalidad={deleteMortalidad} buttonForm={buttonForm} />
            </div>
        </>

    );
};

export default CrudMortalidad;
