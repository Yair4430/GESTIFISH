import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormCosecha from './FormCosecha'; // Asegúrate de tener este componente para el formulario de cosecha
import FormQueryCosecha from './FormQueryCosecha'; // Asegúrate de tener este componente para consultar cosechas por fecha

const URI = process.env.ROUTER_PRINCIPAL + '/cosecha/';

const CrudCosecha = () => {
    const [CosechaList, setCosechaList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [cosecha, setCosecha] = useState({
        Id_Cosecha: '',
        Fec_Cosecha: '',
        Can_Peces: '',
        Pes_Eviscerado: '',
        Pes_Viscerado: '',
        Por_Visceras: '',
        Id_Responsable: '',
        Id_Siembra: '',
        Hor_Cosecha: '',
        Vlr_Cosecha: '',
        Obs_Cosecha: ''
    });

    useEffect(() => {
        getAllCosecha();
    }, []);

    const getAllCosecha = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setCosechaList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching cosecha:', error.response?.status || error.message);
        }
    };

    const getCosecha = async (Id_Cosecha) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Cosecha}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setCosecha({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching cosecha:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteCosecha = (id_Cosecha) => {
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
                    const respuesta = await axios.delete(`${URI}${id_Cosecha}`);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        getAllCosecha(); // Refrescar la lista después de la eliminación
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting cosecha:', error.response?.status || error.message);
                }
            }
        });
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

        if (!showForm) {
            setCosecha({
                Id_Cosecha: '',
                Fec_Cosecha: '',
                Can_Peces: '',
                Pes_Eviscerado: '',
                Pes_Viscerado: '',
                Por_Visceras: '',
                Id_Responsable: '',
                Id_Siembra: '',
                Hor_Cosecha: '',
                Vlr_Cosecha: '',
                Obs_Cosecha: ''
            });
            setButtonForm('Enviar');
        }
    };


    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Cosecha'}
                </button>

                {CosechaList.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Cosechas Registradas</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th className='align-middle'>Fecha de Cosecha</th>
                                            <th className='align-middle'>Cantidad de Peces</th>
                                            <th className='align-middle'>Peso Eviscerado</th>
                                            <th className='align-middle'>Peso Viscerado</th>
                                            <th className='align-middle'>Porcentaje de Vísperas</th>
                                            <th className='align-middle'>Fecha Siembra</th>
                                            <th className='align-middle'>Hora de Cosecha</th>
                                            <th className='align-middle'>Valor de Cosecha</th>
                                            <th className='align-middle'>Observaciones</th>
                                            <th className='align-middle'>Nombre Responsable</th>
                                            <th className='align-middle'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CosechaList.map((cosecha) => (
                                            <tr key={cosecha.Id_Cosecha}>
                                                <td className='align-middle'>{cosecha.Fec_Cosecha}</td>
                                                <td className='align-middle'>{cosecha.Can_Peces}</td>
                                                <td className='align-middle'>{cosecha.Pes_Eviscerado}</td>
                                                <td className='align-middle'>{cosecha.Pes_Viscerado}</td>
                                                <td className='align-middle'>{cosecha.Por_Visceras}</td>
                                                <td className='align-middle'>{cosecha.siembra.Fec_Siembra}</td>
                                                <td className='align-middle'>{cosecha.Hor_Cosecha}</td>
                                                <td className='align-middle'>{cosecha.Vlr_Cosecha}</td>
                                                <td className='align-middle'>{cosecha.Obs_Cosecha}</td>
                                                <td className='align-middle'>{cosecha.responsable.Nom_Responsable}</td>
                                                <td className='align-middle'>
                                                    <button className='btn btn-sm btn-primary m-1' onClick={() => getCosecha(cosecha.Id_Cosecha)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className='btn btn-sm btn-danger m-1' onClick={() => deleteCosecha(cosecha.Id_Cosecha)}>
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
                        <FormCosecha
                            getAllCosecha={getAllCosecha}
                            buttonForm={buttonForm}
                            cosecha={cosecha}
                            URI={URI}
                            updateTextButton={updateTextButton}
                        />
                    </>
                )}

                <FormQueryCosecha
                    URI={URI}
                    getCosecha={getCosecha}
                    deleteCosecha={deleteCosecha}
                    buttonForm={buttonForm}
                />
            </div>
        </>

    );
};

export default CrudCosecha;
