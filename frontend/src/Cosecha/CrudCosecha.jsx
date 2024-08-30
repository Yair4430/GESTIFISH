import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de tener este componente
import FormCosecha from './FormCosecha'; 
import FormQueryCosecha from './FormQueryCosecha';

const URI = process.env.ROUTER_PRINCIPAL + '/cosecha/';

const CrudCosecha = () => {
    const [CosechaList, setCosechaList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
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
            setCosechaList(respuesta.data);
        } catch (error) {
            console.error('Error fetching cosechas:', error);
        }
    };

    const getCosecha = async (Id_Cosecha) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Cosecha}`);
            setButtonForm('Actualizar');
            setCosecha({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching cosecha:', error);
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
                    await axios.delete(`${URI}${id_Cosecha}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    getAllCosecha(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting cosecha:', error);
                }
            }
        });
    };

    // Extraer títulos y datos para la tabla
    const titles = [
        "Fecha de Cosecha",
        "Cantidad de Peces",
        "Peso Eviscerado",
        "Peso Viscerado",
        "Porcentaje de Vísperas",
        "Fecha Siembra",
        "Hora de Cosecha",
        "Valor de Cosecha",
        "Observaciones",
        "Nombre Responsable",
        "Acciones"
    ];

    const data = CosechaList.map((cosecha) => [
        cosecha.Fec_Cosecha,
        cosecha.Can_Peces,
        cosecha.Pes_Eviscerado,
        cosecha.Pes_Viscerado,
        cosecha.Por_Visceras,
        cosecha.siembra.Fec_Siembra,
        cosecha.Hor_Cosecha,
        cosecha.Vlr_Cosecha,
        cosecha.Obs_Cosecha,
        cosecha.responsable.Nom_Responsable,
        <>
            <button className='btn btn-info align-middle' onClick={() => getCosecha(cosecha.Id_Cosecha)}>
                <i className="fa-solid fa-pen-to-square"></i> Editar
            </button>
            <button className='btn btn-info align-middle m-2' onClick={() => deleteCosecha(cosecha.Id_Cosecha)}>
                <i className="fa-solid fa-trash-can"></i> Borrar
            </button>
        </>
    ]);

    return (
        <>
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormCosecha buttonForm={buttonForm} cosecha={cosecha} URI={URI} updateTextButton={updateTextButton} getAllCosecha={getAllCosecha} />
            <hr />
            <FormQueryCosecha URI={URI} getCosecha={getCosecha} deleteCosecha={deleteCosecha} buttonForm={buttonForm} />
        </>
    );
};

export default CrudCosecha;
