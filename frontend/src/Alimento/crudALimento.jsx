import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormQueryAlimentacion from './formQueryAlimento'; // Asegúrate de tener este componente
import FormAlimento from './formALimento';

const URI = process.env.ROUTER_PRINCIPAL + '/alimentacion/';

const CrudAlimento = () => {
    const [alimentacionList, setAlimentacionList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [alimento, setalimento] = useState({
        Id_Alimentacion: '',
        Fec_Alimentacion: '',
        Can_RacionKg: '',
        Id_Responsable: '',
        Id_Siembra: '',
        Tip_Alimento: '',
        Hor_Alimentacion: '',
        Vlr_Alimentacion: ''
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
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Alimentacion}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setalimento({ ...respuesta.data });
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

    const deleteAlimentacion = async (Id_Alimentacion) => {
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
            <table className='table table-bordered border-info text-center mt-4' style={{ border: "3px solid" }}>
                <thead>
                    <tr>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha de Alimentación</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Cantidad (Kg)</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Tipo de Alimento</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Hora de Alimentación</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Valor</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Siembra</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Responsable</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alimentacionList.map((alimentacion) => (
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
            <FormAlimento buttonForm={buttonForm} alimento={alimento} URI={URI} updateTextButton={updateTextButton} getAllAlimentacion={getAllAlimentacion} />
            <hr />
            <FormQueryAlimentacion URI={URI} getAlimentacion={getAlimentacion} deleteAlimentacion={deleteAlimentacion} buttonForm={buttonForm} />
        </>
    );
};

export default CrudAlimento;
