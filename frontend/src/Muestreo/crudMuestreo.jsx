import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormMuestreo from './formMuestreo.jsx';
import FromQueryMuestreo from './formQueryMuestreo.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/muestreo/';

const CrudMuestreo = () => {
    const [MuestreoList, setMuestreoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [muestreo, setMuestreo] = useState({
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
            console.error('Error fetching muestreos:', error.response?.status || error.message);
        }
    };

    const getMuestreo = async (Id_Muestreo) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(URI + Id_Muestreo);
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

    const deleteMuestreo = (Id_Muestreo) => {
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
                    const respuesta = await axios.delete(URI + Id_Muestreo);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "Borrado!!",
                            text: "Borrado Exitosamente",
                            icon: "success"
                        });
                        getAllMuestreo(); // Refresh the list after deletion
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting muestreo:', error.response?.status || error.message);
                }
            }
        });
    };

    return (
        <>
            <table className="table table-bordered border-info text-center mt-4" style={{ border: "3px solid" }}>
                <thead>
                    <tr>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Número de Peces</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Observaciones</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Peso Esperado</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Siembra</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Responsable</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Hora</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Peso Promedio</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {MuestreoList.map((muestreo) => (
                        <tr key={muestreo.Id_Muestreo} className='border-info font-monospace' style={{ border: "3px solid" }}>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Fec_Muestreo}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Num_Peces}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Obs_Muestreo}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Pes_Esperado}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Id_Siembra}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Id_Responsable}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Hor_Muestreo}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Pes_Promedio}</td>
                            <td>
                                <button className='btn btn-info align-middle' onClick={() => getMuestreo(muestreo.Id_Muestreo)}>
                                    <i className="fa-solid fa-pen-to-square"></i> Editar
                                </button>
                                <button className='btn btn-info align-middle m-2' onClick={() => deleteMuestreo(muestreo.Id_Muestreo)}>
                                    <i className="fa-solid fa-trash-can"></i> Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormMuestreo buttonForm={buttonForm} muestreo={muestreo} URI={URI} updateTextButton={updateTextButton} getAllMuestreo={getAllMuestreo} />
            <hr />
            <FromQueryMuestreo URI={URI} getMuestreo={getMuestreo} deleteMuestreo={deleteMuestreo} buttonForm={buttonForm} />
        </>
    );
}

export default CrudMuestreo;