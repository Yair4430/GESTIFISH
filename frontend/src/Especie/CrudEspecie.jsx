import axios from 'axios';
import { useState, useEffect } from 'react';
import FormEspecie from './FormEspecie';
import FormQueryEspecie from './FormQueryEspecie';
import Swal from 'sweetalert2';

const URI = 'http://localhost:3001/especie/';
const PATH_FOTOS = 'http://localhost:3001/public/uploads';

const CrudEspecie = () => {
    const [EspecieList, setEspecieList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
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
          setEspecieList(respuesta.data);
        } catch (error) {
          console.error('Error fetching especies:', error);
        }
      };
      

    const getEspecie = async (Id_Especie) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(URI + Id_Especie);
            setButtonForm('Actualizar');
            setEspecie({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching especie:', error);
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
                    await axios.delete(URI + Id_Especie);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    getAllEspecies(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting especie:', error);
                }
            }
        });
    };

    return (
        <>
            <table className="table table-bordered border-info text-center mt-4" style={{ border: "3px solid" }}>
                <thead>
                    <tr>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>ID</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Nombre</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Características</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Tamaño Promedio</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Densidad</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Imagen</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {EspecieList.map((especie) => (
                        <tr key={especie.Id_Especie} className='border-info font-monospace' style={{ border: "3px solid" }}>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{especie.Id_Especie}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{especie.Nom_Especie}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{especie.Car_Especie}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{especie.Tam_Promedio}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{especie.Den_Especie}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>
                                {especie.Img_Especie ? (
                                    <img width="80px" src={`${PATH_FOTOS}/${especie.Img_Especie}`} alt="Imagen de la especie" />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td>
                                <button className='btn btn-info align-middle' onClick={() => getEspecie(especie.Id_Especie)}>
                                    <i className="fa-solid fa-pen-to-square"></i> Editar
                                </button>
                                <button className='btn btn-info align-middle m-2' onClick={() => deleteEspecie(especie.Id_Especie)}>
                                    <i className="fa-solid fa-trash-can"></i> Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormEspecie getAllEspecies={getAllEspecies} buttonForm={buttonForm} especie={especie} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryEspecie URI={URI} getEspecie={getEspecie} deleteEspecie={deleteEspecie} buttonForm={buttonForm} />
        </>
    );
}

export default CrudEspecie;