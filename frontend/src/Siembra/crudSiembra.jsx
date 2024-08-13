import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormQuerySiembra from './formQuerySiembra.jsx';

import FormSiembra from './formSiembra.jsx';

const URI = 'http://localhost:3001/siembra/';
const URI_RESPONSABLE = 'http://localhost:3001/responsable/';
const URI_ESPECIE = 'http://localhost:3001/especie/';
const URI_ESTANQUE = 'http://localhost:3001/estanque/';

const CrudSiembra = () => {
    const [siembraList, setSiembraList] = useState([]);
    const [responsables, setResponsables] = useState([]);
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
            setSiembraList(respuesta.data);
        } catch (error) {
            console.error('Error fetching siembras:', error);
        }
    };

    const getAllResponsables = async () => {
        try {
            const respuesta = await axios.get(URI_RESPONSABLE);
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

    return (
        <>
            <table className="table table-bordered border-info text-center mt-4" style={{ border: "3px solid" }}>
                <thead>
                    <tr>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>ID</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Cantidad de Peces</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha de Siembra</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha Posible de Cosecha</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Responsable</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Especie</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Estanque</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Peso Actual</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Observaciones</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Hora de Siembra</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Ganancia de Peso</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Valor de Siembra</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {siembraList.map((siembra) => (
                        <tr key={siembra.Id_Siembra} className='border-info font-monospace' style={{ border: "3px solid" }}>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Id_Siembra}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Can_Peces}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Fec_Siembra}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Fec_PosibleCosecha}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Responsable.Nom_Responsable}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Especie.Nom_Especie}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Estanque.Nom_Estanque}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Pes_Actual}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Obs_Siembra}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Hor_Siembra}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Gan_Peso}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{siembra.Vlr_Siembra}</td>
                            <td>
                                <button className='btn btn-info align-middle' onClick={() => getSiembra(siembra.Id_Siembra)}>
                                    <i className="fa-solid fa-pen-to-square"></i> Editar
                                </button>
                                <button className='btn btn-info align-middle m-2' onClick={() => deleteSiembra(siembra.Id_Siembra)}>
                                    <i className="fa-solid fa-trash-can"></i> Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormSiembra 
                getAllSiembras={getAllSiembras} 
                buttonForm={buttonForm} 
                siembra={siembra} 
                responsables={responsables} 
                especies={especies} 
                estanques={estanques} 
                URI={URI} 
                updateTextButton={updateTextButton} 
            />
            <hr />
            <FormQuerySiembra 
                URI={URI} 
                getSiembra={getSiembra} 
                deleteSiembra={deleteSiembra} 
                buttonForm={buttonForm} 
            />
        </>
    );
};

export default CrudSiembra;
