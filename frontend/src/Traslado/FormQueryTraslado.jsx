import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormQueryTraslado = ({ URI, getTraslado, deleteTraslado, buttonForm }) => {
    const [trasladoQuery, setTrasladoQuery] = useState([]);
    const [Fec_Traslado, setFec_Traslado] = useState('');

    const sendFormQuery = async (Fec_Traslado) => {
        if (Fec_Traslado) {
            try {
                const respuesta = await axios.get(`${URI}fecha/${Fec_Traslado}`);
                if (respuesta.status >= 200 && respuesta.status < 300) {
                    setTrasladoQuery(Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]); // Asegurar que el resultado sea un array
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                }
            } catch (error) {
                console.error('Error fetching traslado:', error.response?.status || error.message);
                setTrasladoQuery([]);
            }
        } else {
            setTrasladoQuery([]);
        }
    };

    useEffect(() => {
        setTrasladoQuery([]);
        setFec_Traslado('');
    }, [buttonForm]);

    return (
        <>
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Traslado</h1>
                <form action="" id="queryForm" className="fw-bold m-2">
                    <label htmlFor="Fec_TrasladoQuery" className="m-2">Fecha de Traslado:</label>
                    <input 
                        type="date" 
                        id="Fec_TrasladoQuery" 
                        value={Fec_Traslado} 
                        onChange={(e) => {
                            setFec_Traslado(e.target.value);
                            sendFormQuery(e.target.value);
                        }} 
                    />
                </form>
            </div>

            {trasladoQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className="border-info" style={{ border: "3px solid" }}>ID Traslado</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Fecha de Traslado</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Cantidad de Peces</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>ID Responsable</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Observaciones</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Hora de Traslado</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trasladoQuery.map((traslado) => (
                            <tr key={traslado.Id_Traslado} className="border-info align-middle font-monospace" style={{ border: "3px solid" }}>
                                <td className="border-info align-middle text-center" style={{ border: "3px solid" }}>{traslado.Id_Traslado}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{traslado.Fec_Traslado}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{traslado.Can_Peces}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{traslado.Id_Responsable}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{traslado.Obs_Traslado}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{traslado.Hor_Traslado}</td>
                                <td>
                                    <button className="btn btn-info align-middle m-2" onClick={() => getTraslado(traslado.Id_Traslado)}>
                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                    </button>
                                    <button className="btn btn-info align-middle m-2" onClick={() => deleteTraslado(traslado.Id_Traslado)}>
                                        <i className="fa-solid fa-trash-can"></i> Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No se encontraron resultados</p>
            )}
        </>
    );
};

export default FormQueryTraslado;
