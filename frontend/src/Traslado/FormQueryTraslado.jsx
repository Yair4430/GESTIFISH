import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormQueryTraslado = ({ URI, getTraslado, deleteTraslado, buttonForm }) => {
    const [trasladoQuery, setTrasladoQuery] = useState([]);
    const [Fec_Traslado, setFec_Traslado] = useState('');
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
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Consultar Traslado</h1>
                    </div>
                    <div className="card-body">
                        <form className="fw-bold m-2 d-flex flex-column align-items-center">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Fec_TrasladoQuery" className="col-sm-5 col-form-label text-end">Fecha de Traslado:</label>
                                <div className="col-sm-6">
                                    <input type="date" id="Fec_TrasladoQuery" className="form-control" value={Fec_Traslado} onChange={(e) => { setFec_Traslado(e.target.value); sendFormQuery(e.target.value); }} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <br />

                {trasladoQuery.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Traslados Registrados</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped mt-4">
                                    <thead>
                                        <tr>
                                            <th className="align-middle">Fecha de Traslado</th>
                                            <th className="align-middle">Cantidad de Peces</th>
                                            <th className="align-middle">Responsable</th>
                                            <th className="align-middle">Observaciones</th>
                                            <th className="align-middle">Hora de Traslado</th>
                                            <th className="align-middle">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trasladoQuery.map((traslado) => (
                                            <tr key={traslado.Id_Traslado}>
                                                <td className="align-middle">{traslado.Fec_Traslado}</td>
                                                <td className="align-middle">{traslado.Can_Peces}</td>
                                                <td className="align-middle">{traslado.responsable.Nom_Responsable}</td>
                                                <td className="align-middle">{traslado.Obs_Traslado}</td>
                                                <td className="align-middle">{traslado.Hor_Traslado}</td>
                                                <td className="align-middle">
                                                    <button className="btn btn-sm btn-primary m-1" onClick={() => getTraslado(traslado.Id_Traslado)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className="btn btn-sm btn-danger m-1" onClick={() => deleteTraslado(traslado.Id_Traslado)}>
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
                    <div className="alert alert-info mt-3 text-center" role="alert">
                        No se encontraron resultados
                    </div>
                )}
            </div>
        </>

    );
};

export default FormQueryTraslado;
