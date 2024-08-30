import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';
import FormSiembra from './FormSiembra.jsx';
import FormQuerySiembra from './FormQuerySiembra.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/siembra/';
const URI_RESPONSABLE = process.env.ROUTER_PRINCIPAL + '/responsable/';
const URI_ESPECIE = process.env.ROUTER_PRINCIPAL + '/especie/';
const URI_ESTANQUE = process.env.ROUTER_PRINCIPAL + '/estanque/';

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

    const fetchData = async (uri, setState) => {
        try {
            const response = await axios.get(uri);
            setState(response.data);
        } catch (error) {
            console.error(`Error fetching data from ${uri}:`, error);
        }
    };

    const getAllSiembras = () => fetchData(URI, setSiembraList);
    const getAllResponsables = () => fetchData(URI_RESPONSABLE, setResponsables);
    const getAllEspecies = () => fetchData(URI_ESPECIE, setEspecies);
    const getAllEstanques = () => fetchData(URI_ESTANQUE, setEstanques);

    const getSiembra = async (Id_Siembra) => {
        setButtonForm('Enviar');
        try {
            const response = await axios.get(`${URI}${Id_Siembra}`);
            setButtonForm('Actualizar');
            setSiembra(response.data);
        } catch (error) {
            console.error('Error fetching siembra:', error);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteSiembra = (Id_Siembra) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${URI}${Id_Siembra}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    getAllSiembras(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting siembra:', error);
                }
            }
        });
    };

    // Extraer títulos y datos para la tabla
    const titles = [
        "Cantidad de Peces",
        "Fecha de Siembra",
        "Fecha Posible de Cosecha",
        "Responsable",
        "Especie",
        "Estanque",
        "Peso Actual",
        "Observaciones",
        "Hora de Siembra",
        "Ganancia de Peso",
        "Valor de Siembra",
        "Acciones"
    ];

    const data = siembraList.map((siembra) => [
        siembra.Can_Peces,
        siembra.Fec_Siembra,
        siembra.Fec_PosibleCosecha,
        siembra.responsable?.Nom_Responsable || 'No disponible',
        siembra.especie?.Nom_Especie || 'No disponible',
        siembra.estanque?.Nom_Estanque || 'No disponible',
        siembra.Pes_Actual,
        siembra.Obs_Siembra,
        siembra.Hor_Siembra,
        siembra.Gan_Peso,
        siembra.Vlr_Siembra,
        <>
            <button className='btn btn-info align-middle' onClick={() => getSiembra(siembra.Id_Siembra)}>
                <i className="fa-solid fa-pen-to-square"></i> Editar
            </button>
            <button className='btn btn-info align-middle m-2' onClick={() => deleteSiembra(siembra.Id_Siembra)}>
                <i className="fa-solid fa-trash-can"></i> Borrar
            </button>
        </>
    ]);

    return (
        <>
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormSiembra 
                buttonForm={buttonForm} 
                siembra={siembra} 
                responsables={responsables} 
                especies={especies} 
                estanques={estanques} 
                URI={URI} 
                updateTextButton={updateTextButton} 
                getAllSiembras={getAllSiembras} 
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
