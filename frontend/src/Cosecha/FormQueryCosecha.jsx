import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormQueryCosecha = ({ URI, getCosecha, deleteCosecha, buttonForm }) => {
    const [cosechaQuery, setCosechaQuery] = useState([]);
    const [Fec_Cosecha, setFec_Cosecha] = useState('');

    const sendFormQuery = async (Fec_Cosecha) => {
        if (Fec_Cosecha) {
            try {
                const respuesta = await axios.get(`${URI}fecha/${Fec_Cosecha}`);
                if (respuesta.status >= 200 && respuesta.status < 300) {
                    setCosechaQuery(Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]); // Asegurar que el resultado sea un array
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                }
            } catch (error) {
                console.error('Error fetching cosecha:', error.response?.status || error.message);
                setCosechaQuery([]);
            }
        } else {
            setCosechaQuery([]);
        }
    };

    useEffect(() => {
        setCosechaQuery([]);
        setFec_Cosecha('');
    }, [buttonForm]);

    return (
        <>
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Cosecha</h1>
                <form action="" id="queryForm" className="fw-bold m-2">
                    <label htmlFor="Fec_CosechaQuery" className="m-2">Fecha de Cosecha:</label>
                    <input 
                        type="date" 
                        id="Fec_CosechaQuery" 
                        value={Fec_Cosecha} 
                        onChange={(e) => {
                            setFec_Cosecha(e.target.value);
                            sendFormQuery(e.target.value);
                        }} 
                    />
                </form>
            </div>

            {cosechaQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className="border-info" style={{ border: "3px solid" }}>ID Cosecha</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Fecha de Cosecha</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Cantidad de Peces</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Peso Eviscerado</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Peso Viscerado</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Porcentaje de Vísceras</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>ID Responsable</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Hora de Cosecha</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Valor de la Cosecha</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Observaciones</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cosechaQuery.map((cosecha) => (
                            <tr key={cosecha.Id_Cosecha} className="border-info align-middle font-monospace" style={{ border: "3px solid" }}>
                                <td className="border-info align-middle text-center" style={{ border: "3px solid" }}>{cosecha.Id_Cosecha}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{cosecha.Fec_Cosecha}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{cosecha.Can_Peces}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{cosecha.Pes_Eviscerado}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{cosecha.Pes_Viscerado}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{cosecha.Por_Visceras}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{cosecha.Id_Responsable}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{cosecha.Hor_Cosecha}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{cosecha.Vlr_Cosecha}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{cosecha.Obs_Cosecha}</td>
                                <td>
                                    <button className="btn btn-info align-middle m-2" onClick={() => getCosecha(cosecha.Id_Cosecha)}>
                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                    </button>
                                    <button className="btn btn-info align-middle m-2" onClick={() => deleteCosecha(cosecha.Id_Cosecha)}>
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

export default FormQueryCosecha;