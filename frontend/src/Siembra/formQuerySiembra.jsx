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
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Consultar Siembra</h1>
                    </div>
                    <div className="card-body">
                        <form className="fw-bold m-2 d-flex flex-column align-items-center">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Fec_SiembraQuery" className="col-sm-5 col-form-label text-end">Fecha de Siembra:</label>
                                <div className="col-sm-6">
                                    <input type="date" id="Fec_SiembraQuery" className="form-control" value={Fec_Siembra} onChange={(e) => setFec_Siembra(e.target.value)} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <br />

                {siembraQuery.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Siembras Registradas</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-dynamic mt-4">
                                    <thead>
                                        <tr>
                                            <th>Cantidad de Peces</th>
                                            <th>Fecha de Siembra</th>
                                            <th>Fecha Posible de Cosecha</th>
                                            <th>Responsable</th>
                                            <th>Especie</th>
                                            <th>Estanque</th>
                                            <th>Peso Actual</th>
                                            <th>Observaciones</th>
                                            <th>Hora de Siembra</th>
                                            <th>Ganancia de Peso</th>
                                            <th>Valor de Siembra</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siembraQuery.map((siembra) => (
                                            <tr key={siembra.Id_Siembra}>
                                                <td>{siembra.Can_Peces}</td>
                                                <td>{siembra.Fec_Siembra}</td>
                                                <td>{siembra.Fec_PosibleCosecha}</td>
                                                <td>{siembra.responsable.Nom_Responsable}</td>
                                                <td>{siembra.especie.Nom_Especie}</td>
                                                <td>{siembra.estanque.Nom_Estanque}</td>
                                                <td>{siembra.Pes_Actual}</td>
                                                <td>{siembra.Obs_Siembra}</td>
                                                <td>{siembra.Hor_Siembra}</td>
                                                <td>{siembra.Gan_Peso}</td>
                                                <td>{siembra.Vlr_Siembra}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary m-1" onClick={() => getSiembra(siembra.Id_Siembra)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className="btn btn-sm btn-danger m-1" onClick={() => deleteSiembra(siembra.Id_Siembra)}>
                                                        <i className="fa-solid fa-trash-can"></i> Borrar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No hay resultados para mostrar.</p>
                )}
            </div>
        </>

    );
};

export default FormQuerySiembra;
