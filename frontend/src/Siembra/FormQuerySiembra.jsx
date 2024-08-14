import axios from 'axios';
import { useEffect, useState } from 'react';

const FormQuerySiembra = ({ URI, getSiembra, deleteSiembra, buttonForm }) => {
    const [siembraQuery, setSiembraQuery] = useState([]);
    const [Id_Siembra, setId_Siembra] = useState('');

    const sendFormQuery = async (Id_Siembra) => {
        if (Id_Siembra) {
            const respuesta = await axios.get(`${URI}Id_Siembra/${Id_Siembra}`);
            setSiembraQuery([respuesta.data]); // Asegurarse de que la respuesta esté en un array
        } else {
            setSiembraQuery([]);
        }
    };

    useEffect(() => {
        setSiembraQuery([]);
        setId_Siembra('');
    }, [buttonForm]);

    return (
        <>
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Siembra</h1>
                <form id="queryForm" className="fw-bold m-2">
                    <label htmlFor="Id_SiembraQuery" className="m-2">Número:</label>
                    <input
                        type="number"
                        id="Id_SiembraQuery"
                        value={Id_Siembra}
                        onChange={(e) => {
                            sendFormQuery(e.target.value);
                            setId_Siembra(e.target.value);
                        }}
                    />
                </form>
            </div>

            {siembraQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className="border-info" style={{ border: "3px solid" }}>Número</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Cantidad de Peces</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Fecha de Siembra</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Fecha Posible de Cosecha</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Responsable</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Especie</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Estanque</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Peso Actual</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Observaciones</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Hora de Siembra</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Ganancia de Peso</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Valor de Siembra</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siembraQuery.map((siembra) => (
                            <tr key={siembra.Id_Siembra} className="border-info align-middle font-monospace" style={{ border: "3px solid" }}>
                                <td className="border-info align-middle text-center" style={{ border: "3px solid" }}>{siembra.Id_Siembra}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Can_Peces}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Fec_Siembra}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Fec_PosibleCosecha}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Responsable.Nom_Responsable}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Especie.Nom_Especie}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Estanque.Num_Estanque}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Pes_Actual}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Obs_Siembra}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Hor_Siembra}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Gan_Peso}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Vlr_Siembra}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => getSiembra(siembra.Id_Siembra)}>
                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                    </button>
                                    <button className="btn btn-info align-middle m-2" onClick={() => deleteSiembra(siembra.Id_Siembra)}>
                                        <i className="fa-solid fa-trash-can"></i> Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : ''}
        </>
    );
};

export default FormQuerySiembra;