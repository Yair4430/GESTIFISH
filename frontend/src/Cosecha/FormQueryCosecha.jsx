import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormQueryCosecha = ({ URI, getCosecha, deleteCosecha, buttonForm }) => {
    const [cosechaQuery, setCosechaQuery] = useState([]);
    const [Fec_Cosecha, setFec_Cosecha] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);

    const getResponsable = async () => {
        try {
            const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/responsable/');
            setDatosResponsable(response.data);
        } catch (error) {
            console.error('Error al obtener responsables:', error);
        }
    };

    useEffect(() => {
        getResponsable();
    }, []);

    const sendFormQuery = async (Fec_Cosecha) => {
        if (Fec_Cosecha) {
            try {
                const respuesta = await axios.get(`${URI}Fec_Cosecha/${Fec_Cosecha}`);
                if (respuesta.status >= 200 && respuesta.status < 300) {
                    setCosechaQuery(Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]);
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
            <div className="container mt-5">
                {/* Card para el formulario de consulta */}
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Consultar Cosecha</h1>
                    </div>
                    <div className="card-body">
                        <form id="queryForm" className="fw-bold m-2 d-flex flex-column align-items-center">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Fec_CosechaQuery" className="col-sm-5 col-form-label text-end">Fecha de Cosecha:</label>
                                <div className="col-sm-6">
                                    <input type="date" id="Fec_CosechaQuery" className="form-control" value={Fec_Cosecha} onChange={(e) => { setFec_Cosecha(e.target.value); sendFormQuery(e.target.value); }} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <br />

                {/* Card para la tabla de resultados */}
                {cosechaQuery.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Cosechas Registradas</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-dynamic mt-4">
                                    <thead>
                                        <tr>
                                            <th>Fecha de Cosecha</th>
                                            <th>Cantidad de Peces</th>
                                            <th>Peso Eviscerado</th>
                                            <th>Peso Viscerado</th>
                                            <th>Porcentaje de Vísperas</th>
                                            <th>Fecha Siembra</th>
                                            <th>Hora de Cosecha</th>
                                            <th>Valor de Cosecha</th>
                                            <th>Observaciones</th>
                                            <th>Nombre Responsable</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cosechaQuery.map((cosecha) => (
                                            <tr key={cosecha.Id_Cosecha}>
                                                <td>{cosecha.Fec_Cosecha}</td>
                                                <td>{cosecha.Can_Peces}</td>
                                                <td>{cosecha.Pes_Eviscerado}</td>
                                                <td>{cosecha.Pes_Viscerado}</td>
                                                <td>{cosecha.Por_Visceras}</td>
                                                <td>{cosecha.siembra?.Fec_Siembra}</td>
                                                <td>{cosecha.Hor_Cosecha}</td>
                                                <td>{cosecha.Vlr_Cosecha}</td>
                                                <td>{cosecha.Obs_Cosecha}</td>
                                                <td>{cosecha.responsable?.Nom_Responsable}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary m-1" onClick={() => getCosecha(cosecha.Id_Cosecha)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className="btn btn-sm btn-danger m-1" onClick={() => deleteCosecha(cosecha.Id_Cosecha)}>
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
                    <p className="text-center">No se encontraron resultados</p>
                )}
            </div>
        </>

    );
};

export default FormQueryCosecha;
