import axios from 'axios';
import { useState, useEffect } from 'react';
import FormEspecie from './FormEspecie';
import FormQueryEspecie from './FormQueryEspecie';
import Swal from 'sweetalert2';

const URI = process.env.ROUTER_PRINCIPAL + '/especie/';
const PATH_FOTOS = process.env.ROUTER_FOTOS;

const CrudEspecie = () => {
    const [EspecieList, setEspecieList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
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
            if (respuesta.status === 200) {
                setEspecieList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching especies:', error.response?.status || error.message);
        }
    };

    const getEspecie = async (Id_Especie) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Especie}`);
            if (respuesta.status === 200) {
                setButtonForm('Actualizar');
                setEspecie({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching especie:', error.response?.status || error.message);
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
            confirmButtonText: "Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const respuesta = await axios.delete(`${URI}${Id_Especie}`);
                    if (respuesta.status === 200) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        getAllEspecies(); // Refresh the list after deletion
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting especie:', error.response?.status || error.message);
                }
            }
        });
    };

    const handleAddClick = () => {
        // Alterna la visibilidad del formulario
        setShowForm(prevShowForm => !prevShowForm);
    
        // Si el formulario se va a mostrar, reinicia los valores
        if (!showForm) {
            setEspecie({
                Id_Especie: '',
                Nom_Especie: '',
                Car_Especie: '',
                Tam_Promedio: '',
                Den_Especie: '',
                Img_Especie: '' // Ajusta esto según cómo manejes la imagen
            });
            setButtonForm('Enviar');
        }
    };
    

    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Especie'}
                </button>

                {EspecieList.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Especies Registradas</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-dynamic mt-4">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Nombre</th>
                                            <th className="text-center">Características</th>
                                            <th className="text-center">Tamaño Promedio</th>
                                            <th className="text-center">Densidad</th>
                                            <th className="text-center">Imagen</th>
                                            <th className="text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {EspecieList.map((especie) => (
                                            <tr key={especie.Id_Especie}>
                                                <td className="text-center">{especie.Nom_Especie}</td>
                                                <td className="text-center">{especie.Car_Especie}</td>
                                                <td className="text-center">{especie.Tam_Promedio}</td>
                                                <td className="text-center">{especie.Den_Especie}</td>
                                                <td className="text-center">
                                                    {especie.Img_Especie ? (
                                                        <img width="80px" src={`${PATH_FOTOS}/${especie.Img_Especie}`} alt="Imagen de la especie" />
                                                    ) : (
                                                        <span>No Image</span>
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-sm btn-primary m-1"
                                                        onClick={() => getEspecie(especie.Id_Especie)}
                                                    >
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger m-1"
                                                        onClick={() => deleteEspecie(especie.Id_Especie)}
                                                    >
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
                    <FormEspecie
                        getAllEspecies={getAllEspecies}
                        buttonForm={buttonForm}
                        especie={especie}
                        URI={URI}
                        updateTextButton={updateTextButton}
                    />
                )}
                <FormQueryEspecie
                    URI={URI}
                    getEspecie={getEspecie}
                    deleteEspecie={deleteEspecie}
                    buttonForm={buttonForm}
                />
            </div>

        </>
    );
}

export default CrudEspecie;
