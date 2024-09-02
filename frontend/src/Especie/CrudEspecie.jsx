import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormEspecie from './FormEspecie';

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
                        // getAllEspecies(); // Refresh the list after deletion
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting especie:', error.response?.status || error.message);
                }
            }else{
                getAllEspecies();
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

    const data = EspecieList.map((especie) => [
        especie.Nom_Especie,
        especie.Car_Especie,
        especie.Tam_Promedio,
        especie.Den_Especie,
        especie.Img_Especie ? (
            `<img width="80px" src="${PATH_FOTOS}/${especie.Img_Especie}" alt="Imagen de la especie" />`
        ) : (
            'No Image'
        ),
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${especie.Id_Especie}'>
            <i class="fa-solid fa-pen-to-square"></i> Editar
          </button>
          <button class='btn btn-danger align-middle m-2 btn-delete' data-id='${especie.Id_Especie}'>
            <i class="fa-solid fa-trash-can"></i> Borrar
          </button>
        `
    ]);

    const titles = [
        "Nombre", "Características", "Tamaño Promedio", "Densidad", "Imagen", "Acciones"
    ];

    return (
        <>
                    {/* <div className="container mt-5"> */}
                    <div style={{ marginLeft: '490px', paddingTop: '70px' }} >

                <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Especie'}
                </button>
                </div>
            <WriteTable 
                titles={titles} 
                data={data} 
                onEditClick={(Id_Especie) => getEspecie(Id_Especie)} 
                onDeleteClick={(Id_Especie) => deleteEspecie(Id_Especie)} 
            />
            {showForm && (
                <>
                <hr />

                    <FormEspecie
                        getAllEspecies={getAllEspecies}
                        buttonForm={buttonForm}
                        especie={especie}
                        URI={URI}
                        updateTextButton={updateTextButton}
                    />
                    </>
                )}
        </>
    );
}

export default CrudEspecie;
