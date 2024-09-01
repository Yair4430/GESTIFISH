import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormQuerySiembra from './FormQuerySiembra.jsx';
import FormSiembra from './FormSiembra.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/siembra/';
const URI_RESPONSABLE = process.env.ROUTER_PRINCIPAL + '/responsable/'
const URI_ESPECIE = process.env.ROUTER_PRINCIPAL + '/especie/';
const URI_ESTANQUE = process.env.ROUTER_PRINCIPAL + '/estanque/';

const CrudSiembra = () => {
    const [siembraList, setSiembraList] = useState([]);
    const [responsables, setResponsables] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [especies, setEspecies] = useState([]);
    const [estanques, setEstanques] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [siembra, setSiembra] = useState({
        Id_Siembra: '',
        Can_Peces: '',
        Fec_Siembra: '',
        Fec_PosibleCosecha: '',
        Id_Responsable: '',
        Id_Especie: '',
        Id_Estanque: '',
        Pes_Actual: '',
        Obs_Siembra: '',
        Hor_Siembra: '',
        Gan_Peso: '',
        Vlr_Siembra: ''
    });

    useEffect(() => {
        getAllSiembras();
        getAllResponsables();
        getAllEspecies();
        getAllEstanques();
    }, []);

    const getAllSiembras = async () => {
        try {
            const respuesta = await axios.get(URI);
            console.log(respuesta)
            setSiembraList(respuesta.data);
            // console.log(siembraList)
        } catch (error) {
            console.error('Error fetching siembras:', error);
        }
    };

    const getAllResponsables = async () => {
        try {
            const respuesta = await axios.get(URI_RESPONSABLE);
            console.log(respuesta.data)
            setResponsables(respuesta.data);
        } catch (error) {
            console.error('Error fetching responsables:', error);
        }
    };

    const getAllEspecies = async () => {
        try {
            const respuesta = await axios.get(URI_ESPECIE);
            setEspecies(respuesta.data);
        } catch (error) {
            console.error('Error fetching especies:', error);
        }
    };

    const getAllEstanques = async () => {
        try {
            const respuesta = await axios.get(URI_ESTANQUE);
            console.log(respuesta.data)
            setEstanques(respuesta.data);
        } catch (error) {
            console.error('Error fetching estanques:', error);
        }
    };

    const getSiembra = async (Id_Siembra) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(URI + Id_Siembra);
            setButtonForm('Actualizar');
            setSiembra({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching siembra:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteSiembra = (Id_Siembra) => {
        Swal.fire({
            title: "Estas Seguro?",
            text: "No Podras Revertir Esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(URI + Id_Siembra);
                    Swal.fire({
                        title: "Borrado!!",
                        text: "Borrado Exitosamente",
                        icon: "success"
                    });
                    getAllSiembras(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting siembra:', error);
                }
            }
        });
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
    
        if (!showForm) {
            setSiembra({
                Id_Siembra: '',
                Can_Peces: '',
                Fec_Siembra: '',
                Fec_PosibleCosecha: '',
                Id_Responsable: '',
                Id_Especie: '',
                Id_Estanque: '',
                Pes_Actual: '',
                Obs_Siembra: '',
                Hor_Siembra: '',
                Gan_Peso: '',
                Vlr_Siembra: ''
            });
            setButtonForm('Enviar');
        }
    };

    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Siembra'}
                </button>

                {siembraList.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Siembras Registradas</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th className='align-middle'>Cantidad de Peces</th>
                                            <th className='align-middle'>Fecha de Siembra</th>
                                            <th className='align-middle'>Fecha Posible de Cosecha</th>
                                            <th className='align-middle'>Responsable</th>
                                            <th className='align-middle'>Especie</th>
                                            <th className='align-middle'>Estanque</th>
                                            <th className='align-middle'>Peso Actual</th>
                                            <th className='align-middle'>Observaciones</th>
                                            <th className='align-middle'>Hora de Siembra</th>
                                            <th className='align-middle'>Ganancia de Peso</th>
                                            <th className='align-middle'>Valor de Siembra</th>
                                            <th className='align-middle'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siembraList.map((siembra) => (
                                            <tr key={siembra.Id_Siembra}>
                                                <td className='align-middle'>{siembra.Can_Peces}</td>
                                                <td className='align-middle'>{siembra.Fec_Siembra}</td>
                                                <td className='align-middle'>{siembra.Fec_PosibleCosecha}</td>
                                                <td className='align-middle'>{siembra.responsable.Nom_Responsable}</td>
                                                <td className='align-middle'>{siembra.especie.Nom_Especie}</td>
                                                <td className='align-middle'>{siembra.estanque.Nom_Estanque}</td>
                                                <td className='align-middle'>{siembra.Pes_Actual}</td>
                                                <td className='align-middle'>{siembra.Obs_Siembra}</td>
                                                <td className='align-middle'>{siembra.Hor_Siembra}</td>
                                                <td className='align-middle'>{siembra.Gan_Peso}</td>
                                                <td className='align-middle'>{siembra.Vlr_Siembra}</td>
                                                <td className='align-middle'>
                                                    <button className='btn btn-sm btn-primary m-1' onClick={() => getSiembra(siembra.Id_Siembra)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className='btn btn-sm btn-danger m-1' onClick={() => deleteSiembra(siembra.Id_Siembra)}>
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
                        <FormSiembra getAllSiembras={getAllSiembras} buttonForm={buttonForm} siembra={siembra} responsables={responsables} especies={especies} estanques={estanques} URI={URI} updateTextButton={updateTextButton}
                        />
                    </>
                )}

                <FormQuerySiembra URI={URI} getSiembra={getSiembra} deleteSiembra={deleteSiembra} buttonForm={buttonForm}
                />
            </div>
        </>

    );
};

export default CrudSiembra;
