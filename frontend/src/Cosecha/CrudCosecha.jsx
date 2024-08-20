import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormCosecha from './FormCosecha'; // Asegúrate de tener este componente para el formulario de cosecha
import FormQueryCosecha from './FormQueryCosecha'; // Asegúrate de tener este componente para consultar cosechas por fecha

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

    return (
        <>
            <table className="table table-bordered border-info text-center mt-4" style={{ border: "3px solid" }}>
                <thead>
                    <tr>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha de Cosecha</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Cantidad de Peces</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Peso Eviscerado</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Peso Viscerado</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Porcentaje de Vísperas</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha Siembra</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Hora de Cosecha</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Valor de Cosecha</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Observaciones</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Nombre Responsable</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {CosechaList.map((cosecha) => (
                        <tr key={cosecha.Id_Cosecha} className='border-info font-monospace' style={{ border: "3px solid" }}>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{cosecha.Fec_Cosecha}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{cosecha.Can_Peces}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{cosecha.Pes_Eviscerado}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{cosecha.Pes_Viscerado}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{cosecha.Por_Visceras}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{cosecha.siembra.Fec_Siembra}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{cosecha.Hor_Cosecha}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{cosecha.Vlr_Cosecha}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{cosecha.Obs_Cosecha}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{cosecha.responsable.Nom_Responsable}</td>
                            <td>
                                <button className='btn btn-info align-middle' onClick={() => getCosecha(cosecha.Id_Cosecha)}>
                                    <i className="fa-solid fa-pen-to-square"></i> Editar
                                </button>
                                <button className='btn btn-info align-middle m-2' onClick={() => deleteCosecha(cosecha.Id_Cosecha)}>
                                    <i className="fa-solid fa-trash-can"></i> Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormCosecha getAllCosecha={getAllCosecha} buttonForm={buttonForm} cosecha={cosecha} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryCosecha URI={URI} getCosecha={getCosecha} deleteCosecha={deleteCosecha} buttonForm={buttonForm} />
        </>
    );
};

export default CrudCosecha;
