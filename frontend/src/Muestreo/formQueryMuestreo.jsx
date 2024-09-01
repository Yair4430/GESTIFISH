import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormQueryMuestreo = ({ URI, getMuestreo, deleteMuestreo, buttonForm }) => {
    const [muestreoQuery, setMuestreoQuery] = useState([]);
    const [Fec_Muestreo, setFec_Muestreo] = useState('');
    const [datosResponsable, setDatosResponsable] = useState([]);
    const [datosSiembra, setDatosSiembra] = useState([]);

    const getResponsable = async () => {
        try {
            const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/responsable/');
            setDatosResponsable(response.data);
        } catch (error) {
            console.error('Error al obtener responsables:', error);
        }
    };

    const getSiembra = async () => {
        try {
            const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/siembra/');
            setDatosSiembra(response.data);
        } catch (error) {
            console.error('Error al obtener siembras:', error);
        }
    };

    useEffect(() => {
        getResponsable();
        getSiembra();
    }, []);

    const sendFormQuery = async (Fec_Muestreo) => {
        if (Fec_Muestreo) {
            try {
                const respuesta = await axios.get(`${URI}Fec_Muestreo/${Fec_Muestreo}`);
                if (respuesta.status >= 200 && respuesta.status < 300) {
                    setMuestreoQuery(Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]);
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                }
            } catch (error) {
                console.error('Error fetching muestreo:', error.response?.status || error.message);
                setMuestreoQuery([]);
            }
        } else {
            setMuestreoQuery([]);
        }
    };

    useEffect(() => {
        setMuestreoQuery([]);
        setFec_Muestreo('');
    }, [buttonForm]);

    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Consultar Muestreo</h1>
                    </div>
                    <div className="card-body">
                        <form className="fw-bold m-2 d-flex flex-column align-items-center">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Fec_MuestreoQuery" className="col-sm-5 col-form-label text-end">Fecha de Muestreo:</label>
                                <div className="col-sm-6">
                                    <input
                                        type="date"
                                        id="Fec_MuestreoQuery"
                                        className="form-control"
                                        value={Fec_Muestreo}
                                        onChange={(e) => {
                                            setFec_Muestreo(e.target.value);
                                            sendFormQuery(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <br />

                {muestreoQuery.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Muestreos Registrados</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-dynamic mt-4">
                                    <thead>
                                        <tr>
                                            <th className="align-middle">Fecha de Muestreo</th>
                                            <th className="align-middle">Número de Peces</th>
                                            <th className="align-middle">Observaciones</th>
                                            <th className="align-middle">Peso Esperado</th>
                                            <th className="align-middle">Hora de Muestreo</th>
                                            <th className="align-middle">Fecha Siembra</th>
                                            <th className="align-middle">Nombre Responsable</th>
                                            <th className="align-middle">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {muestreoQuery.map((muestreo) => (
                                            <tr key={muestreo.Id_Muestreo}>
                                                <td className="align-middle">{muestreo.Fec_Muestreo}</td>
                                                <td className="align-middle">{muestreo.Num_Peces}</td>
                                                <td className="align-middle">{muestreo.Obs_Muestreo}</td>
                                                <td className="align-middle">{muestreo.Pes_Esperado}</td>
                                                <td className="align-middle">{muestreo.Hor_Muestreo}</td>
                                                <td className="align-middle">{muestreo.siembra.Fec_Siembra}</td>
                                                <td className="align-middle">{muestreo.responsable.Nom_Responsable}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary m-1" onClick={() => getMuestreo(muestreo.Id_Muestreo)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className="btn btn-sm btn-danger m-1" onClick={() => deleteMuestreo(muestreo.Id_Muestreo)}>
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
                    <div className="alert alert-info mt-3" role="alert">
                        No se encontraron resultados.
                    </div>
                )}
            </div>
        </>

    );
};

export default FormQueryMuestreo;
