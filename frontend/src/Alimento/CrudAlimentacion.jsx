import axios from 'axios';
import { useState, useEffect } from 'react';
import FormAlimentacion from './FormAlimentacion';
import FormQueryAlimentacion from './FormQueryAlimentacion';

const URI = process.env.ROUTER_PRINCIPAL + '/alimentacion/';

const CrudAlimentacion = () => {
    const [AlimentacionList, setAlimentacionList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [alimentacion, setAlimentacion] = useState({
        Id_Alimentacion: '',
        Fec_Alimentacion: '',
        Can_RacionKg: '',
        Id_Siembra: '',
        Id_Responsable: '',
        Tip_Alimento: '',
        Hor_Alimentacion: '',
        Vlr_Alimentacion: '',
    });

    useEffect(() => {
        getAllAlimentacion();
    }, []);

    const getAllAlimentacion = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setAlimentacionList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching alimentacion:', error.response?.status || error.message);
        }
    };

    const getAlimentacion = async (Id_Alimentacion) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Alimentacion}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setAlimentacion({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching alimentacion:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteAlimentacion = (Id_Alimentacion) => {
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
                    const respuesta = await axios.delete(`${URI}${Id_Alimentacion}`);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        getAllAlimentacion(); // Refrescar la lista después de la eliminación
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting alimentacion:', error.response?.status || error.message);
                }
            }
        });
    };

    return (
        <>
            <table className="table table-bordered border-info text-center mt-4" style={{ border: "3px solid" }}>
                <thead>
                    <tr>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha de Alimentación</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Cantidad de Ración (Kg)</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Tipo de Alimento</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Hora de Alimentación</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Valor Alimentación</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha Siembra</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Nombre Responsable</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {AlimentacionList.map((alimentacion) => (
                        <tr key={alimentacion.Id_Alimentacion} className='border-info font-monospace' style={{ border: "3px solid" }}>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.Fec_Alimentacion}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.Can_RacionKg}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.Tip_Alimento}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.Hor_Alimentacion}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.Vlr_Alimentacion}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.siembra.Fec_Siembra}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.responsable.Nom_Responsable}</td>
                            <td>
                                <button className='btn btn-info align-middle' onClick={() => getAlimentacion(alimentacion.Id_Alimentacion)}>
                                    <i className="fa-solid fa-pen-to-square"></i> Editar
                                </button>
                                <button className='btn btn-info align-middle m-2' onClick={() => deleteAlimentacion(alimentacion.Id_Alimentacion)}>
                                    <i className="fa-solid fa-trash-can"></i> Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormAlimentacion getAllAlimentacion={getAllAlimentacion} buttonForm={buttonForm} alimentacion={alimentacion} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryAlimentacion URI={URI} getAlimentacion={getAlimentacion} deleteAlimentacion={deleteAlimentacion} buttonForm={buttonForm} />
        </>
    );
};

export default CrudAlimentacion;
