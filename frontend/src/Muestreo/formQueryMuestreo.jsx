import axios from "axios";
import { useEffect, useState } from "react";

const FromQueryMuestreo = ({ URI, getMuestreo, deleteMuestreo, buttonForm }) => {
    const [MuestreoQuery, setMuestreoQuery] = useState([]);
    const [Id_Muestreo, setId_Muestreo] = useState('');

    const sendFormQueryM = async (Id_Muestreo) => {
        if (Id_Muestreo) {
            try {
                const respuesta = await axios.get(`${URI}Id_Muestreo/${Id_Muestreo}`);
                if (respuesta.status >= 200 && respuesta.status < 300) {
                    setMuestreoQuery(respuesta.data);
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                    setMuestreoQuery([]);
                }
            } catch (error) {
                console.error('Error fetching muestreo:', error.response?.status || error.message);
                setMuestreoQuery([]);
            }
        } else {
            setMuestreoQuery([]);
        }
    }

    useEffect(() => {
        setMuestreoQuery([]);
        setId_Muestreo('');
    }, [buttonForm]);

    return (
        <>
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Muestreo</h1>
                <form action="" id="queryForm" className="fw-bold m-2">
                    <label htmlFor="Id_MuestreoQuery" className="m-2">ID del Muestreo: </label>
                    <input
                        type="text"
                        id="Id_MuestreoQuery"
                        value={Id_Muestreo}
                        onChange={(e) => { setId_Muestreo(e.target.value); sendFormQueryM(e.target.value) }}
                    />
                </form>
            </div>

            {MuestreoQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className='border-info' style={{ border: "3px solid" }}>ID del Muestreo</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Número de Peces</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Observaciones</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Peso Esperado</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>ID de la Siembra</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>ID del Responsable</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Hora del Muestreo</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Peso Promedio</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MuestreoQuery.map((muestreo) => (
                            <tr key={muestreo.Id_Muestreo} className='border-info align-middle font-monospace' style={{ border: "3px solid" }}>
                                <td className='border-info align-middle text-center' style={{ border: "3px solid" }}>{muestreo.Id_Muestreo}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Fec_Muestreo}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Num_Peces}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Obs_Muestreo}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Pes_Esperado}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Id_Siembra}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Id_Responsable}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Hor_Muestreo}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{muestreo.Pes_Promedio}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => getMuestreo(muestreo.Id_Muestreo)}>
                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                    </button>
                                    <button className="btn btn-info align-middle m-2" onClick={() => deleteMuestreo(muestreo.Id_Muestreo)}>
                                        <i className="fa-solid fa-trash-can"></i> Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : ''}
        </>
    )
}

export default FromQueryMuestreo;
