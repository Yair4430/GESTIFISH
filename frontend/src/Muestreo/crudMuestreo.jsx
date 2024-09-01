import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormMuestreo from './formMuestreo';
import FormQueryMuestreo from './formQueryMuestreo';

const URI = process.env.ROUTER_PRINCIPAL + '/muestreo/';

const CrudMuestreo = () => {
    const [muestreoList, setMuestreoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [muestreo, setMuestreo] = useState({
        Id_Muestreo: '',
        Fec_Muestreo: '',
        Num_Peces: '',
        Obs_Muestreo: '',
        Pes_Esperado: '',
        Id_Siembra: '',
        Id_Responsable: '',
        Hor_Muestreo: '',
        Pes_Promedio: '',
    });

    useEffect(() => {
        getAllMuestreo();
    }, []);

    const getAllMuestreo = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setMuestreoList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching muestreo:', error.response?.status || error.message);
        }
    };

    const getMuestreo = async (Id_Muestreo) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Muestreo}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setMuestreo({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching muestreo:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteMuestreo = (id_Muestreo) => {
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
                    const respuesta = await axios.delete(`${URI}${id_Muestreo}`);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        getAllMuestreo(); // Refrescar la lista después de la eliminación
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting muestreo:', error.response?.status || error.message);
                }
            }
        });
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

        if (!showForm) {
            // Reinicia los valores del formulario de muestreo
            setMuestreo({
                Id_Muestreo: '',
                Fec_Muestreo: '',
                Num_Peces: '',
                Obs_Muestreo: '',
                Pes_Esperado: '',
                Id_Siembra: '',
                Id_Responsable: '',
                Hor_Muestreo: '',
                Pes_Promedio: ''
            });
            setButtonForm('Enviar');
        }
    };


    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Muestreo'}
                </button>

                {muestreoList.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Muestreos Registrados</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th className='align-middle'>Fecha de Muestreo</th>
                                            <th className='align-middle'>Número de Peces</th>
                                            <th className='align-middle'>Peso Esperado</th>
                                            <th className='align-middle'>Observaciones</th>
                                            <th className='align-middle'>Hora de Muestreo</th>
                                            <th className='align-middle'>Fecha de Siembra</th>
                                            <th className='align-middle'>Responsable</th>
                                            <th className='align-middle'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {muestreoList.map((muestreo) => (
                                            <tr key={muestreo.Id_Muestreo}>
                                                <td className='align-middle'>{muestreo.Fec_Muestreo}</td>
                                                <td className='align-middle'>{muestreo.Num_Peces}</td>
                                                <td className='align-middle'>{muestreo.Pes_Esperado}</td>
                                                <td className='align-middle'>{muestreo.Obs_Muestreo}</td>
                                                <td className='align-middle'>{muestreo.Hor_Muestreo}</td>
                                                <td className='align-middle'>{muestreo.siembra.Fec_Siembra}</td>
                                                <td className='align-middle'>{muestreo.responsable.Nom_Responsable}</td>
                                                <td className='align-middle'>
                                                    <button className='btn btn-sm btn-info m-1' onClick={() => getMuestreo(muestreo.Id_Muestreo)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className='btn btn-sm btn-danger m-1' onClick={() => deleteMuestreo(muestreo.Id_Muestreo)}>
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
                        <FormMuestreo getAllMuestreo={getAllMuestreo} buttonForm={buttonForm} muestreo={muestreo} URI={URI} updateTextButton={updateTextButton} />
                    </>
                )}

                <FormQueryMuestreo URI={URI} getMuestreo={getMuestreo} deleteMuestreo={deleteMuestreo} buttonForm={buttonForm} />
            </div>
        </>

    );
};

export default CrudMuestreo;
