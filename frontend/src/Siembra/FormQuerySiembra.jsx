import axios from 'axios';
import { useEffect, useState } from 'react';

const FormQuerySiembra = ({ URI, getSiembra, deleteSiembra, buttonForm }) => {
    const [siembraQuery, setSiembraQuery] = useState([]);
    const [Fec_Siembra, setFec_Siembra] = useState('');

    // Efecto para consultar automáticamente cuando cambia la fecha
    useEffect(() => {
        if (Fec_Siembra) {
            console.log('Consultando siembra para la fecha:', Fec_Siembra);  // Añade este console.log
            const fetchSiembras = async () => {
                try {
                    const response = await axios.get(`${URI}/Fec_Siembra/${Fec_Siembra}`);
                    setSiembraQuery(response.data);
                    alert("Consulta realizada con éxito");
                } catch (error) {
                    console.error("Error realizando la consulta:", error);
                    alert("Hubo un error realizando la consulta");
                }
            };
    
            fetchSiembras();
        }
    }, [Fec_Siembra, URI]);
    

    useEffect(() => {
        setSiembraQuery([]);
        setFec_Siembra('');
    }, [buttonForm]);

    return (
        <>
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Siembra</h1>
                <div className="fw-bold m-2">
                    <label htmlFor="Fec_SiembraQuery" className="m-2">Fecha de Siembra:</label>
                    <input
                        type="date"
                        id="Fec_SiembraQuery"
                        value={Fec_Siembra}
                        onChange={(e) => setFec_Siembra(e.target.value)}
                    />
                </div>
            </div>

            {siembraQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
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
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Can_Peces}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Fec_Siembra}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.Fec_PosibleCosecha}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.responsable.Nom_Responsable}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.especie.Nom_Especie}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{siembra.estanque.Nom_Estanque}</td>
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
