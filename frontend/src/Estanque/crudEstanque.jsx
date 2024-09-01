import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormEstanque from './formEstanque'
import FormQueryEstanque from './formQueryEstanque'
import Swal from 'sweetalert2'

const URI = process.env.ROUTER_PRINCIPAL + '/estanque/'
const PATH_FOTOS = process.env.ROUTER_FOTOS

const CrudEstanque = () => {
    const [EstanqueList, setEstanqueList] = useState([])
    const [buttonForm, setButtonForm] = useState('Enviar')
    const [showForm, setShowForm] = useState(false);
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
    })

    useEffect(() => {
        getAllEstanques();
    }, []);

    const getAllEstanques = async () => {
        try {
            const respuesta = await axios.get(URI)
            if (respuesta.status === 200) {
                setEstanqueList(respuesta.data)
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching estanques:', error.response?.status || error.message);
        }
    }

    const getEstanque = async (Id_Estanque) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(URI + Id_Estanque);
            if (respuesta.status === 200) {
                setButtonForm('Actualizar');
                setEstanque({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching estanque:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }

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
                    const respuesta = await axios.delete(URI + Id_Estanque);
                    if (respuesta.status === 200) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        getAllEstanques(); // Refresh the list after deletion
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting estanque:', error.response?.status || error.message);
                }
            }
        });
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

        if (!showForm) {
            setEstanque({
                Id_Estanque: '',
                Nom_Estanque: '',
                Esp_Agua: '',
                Tip_Estanque: '',
                Lar_Estanque: '',
                Anc_Estanque: '',
                Des_Estanque: '',
                Img_Estanque: '',
                Rec_Agua: ''
            });
            setButtonForm('Enviar');
        }
    };

    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Estanque'}
                </button>

                {EstanqueList.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Estanques Registrados</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped mt-4">
                                    <thead>
                                        <tr>
                                            <th className='text-center'>Número</th>
                                            <th className='text-center'>Nombre</th>
                                            <th className='text-center'>Espejo de Agua</th>
                                            <th className='text-center'>Tipo</th>
                                            <th className='text-center'>Largo</th>
                                            <th className='text-center'>Ancho</th>
                                            <th className='text-center'>Descripción</th>
                                            <th className='text-center'>Imagen</th>
                                            <th className='text-center'>Recambio de Agua</th>
                                            <th className='text-center'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {EstanqueList.map((estanque) => (
                                            <tr key={estanque.Id_Estanque}>
                                                <td className='text-center'>{estanque.Id_Estanque}</td>
                                                <td className='text-center'>{estanque.Nom_Estanque}</td>
                                                <td className='text-center'>{estanque.Esp_Agua}</td>
                                                <td className='text-center'>{estanque.Tip_Estanque}</td>
                                                <td className='text-center'>{estanque.Lar_Estanque}</td>
                                                <td className='text-center'>{estanque.Anc_Estanque}</td>
                                                <td className='text-center'>{estanque.Des_Estanque}</td>
                                                <td className='text-center'>
                                                    {estanque.Img_Estanque ? (
                                                        <img width="80px" src={`${PATH_FOTOS}/${estanque.Img_Estanque}`} alt="Imagen del estanque" />
                                                    ) : (
                                                        <span>No Image</span>
                                                    )}
                                                </td>
                                                <td className='text-center'>{estanque.Rec_Agua}</td>
                                                <td className='text-center'>
                                                    <button className='btn btn-sm btn-primary m-1' onClick={() => getEstanque(estanque.Id_Estanque)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className='btn btn-sm btn-danger m-1' onClick={() => deleteEstanque(estanque.Id_Estanque)}>
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
                        <FormEstanque
                            getAllEstanques={getAllEstanques}
                            buttonForm={buttonForm}
                            estanque={estanque}
                            URI={URI}
                            updateTextButton={updateTextButton}
                        />
                        <hr />
                    </>
                )}

                <FormQueryEstanque
                    URI={URI}
                    getEstanque={getEstanque}
                    deleteEstanque={deleteEstanque}
                    buttonForm={buttonForm}
                />
            </div>
        </>
    );
}

export default CrudEstanque
