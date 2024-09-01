import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormQueryAlimentacion = ({ URI, getAlimentacion, deleteAlimentacion, buttonForm }) => {
    const [alimentacionQuery, setAlimentacionQuery] = useState([]);
    const [Fec_Alimentacion, setFec_Alimentacion] = useState('');
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

    const sendFormQuery = async (Fec_Alimentacion) => {
        if (Fec_Alimentacion) {
            try {
                const respuesta = await axios.get(`${URI}Fec_Alimentacion/${Fec_Alimentacion}`);
                if (respuesta.status >= 200 && respuesta.status < 300) {
                    setAlimentacionQuery(Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]);
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                }
            } catch (error) {
                console.error('Error fetching alimentacion:', error.response?.status || error.message);
                setAlimentacionQuery([]);
            }
        } else {
            setAlimentacionQuery([]);
        }
    };

    useEffect(() => {
        setAlimentacionQuery([]);
        setFec_Alimentacion('');
    }, [buttonForm]);

    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Consultar Alimentación</h1>
                    </div>
                    <div className="card-body">
                        <form className="fw-bold m-2 d-flex flex-column align-items-center">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Fec_AlimentacionQuery" className="col-sm-5 col-form-label text-end">
                                    Fecha de Alimentación:
                                </label>
                                <div className="col-sm-4">
                                    <input type="date" id="Fec_AlimentacionQuery" className="form-control" value={Fec_Alimentacion} onChange={(e) => { setFec_Alimentacion(e.target.value); sendFormQuery(e.target.value); }} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <br />

                {alimentacionQuery.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Alimentaciones Registradas</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-dynamic mt-4">
                                    <thead>
                                        <tr>
                                            <th>Fecha de Alimentación</th>
                                            <th>Cantidad de Ración (Kg)</th>
                                            <th>Tipo de Alimento</th>
                                            <th>Hora de Alimentación</th>
                                            <th>Valor Alimentación</th>
                                            <th>Fecha Siembra</th>
                                            <th>Nombre Responsable</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alimentacionQuery.map((alimentacion) => (
                                            <tr key={alimentacion.Id_Alimentacion}>
                                                <td>{alimentacion.Fec_Alimentacion}</td>
                                                <td>{alimentacion.Can_RacionKg}</td>
                                                <td>{alimentacion.Tip_Alimento}</td>
                                                <td>{alimentacion.Hor_Alimentacion}</td>
                                                <td>{alimentacion.Vlr_Alimentacion}</td>
                                                <td>{alimentacion.siembra.Fec_Siembra}</td>
                                                <td>{alimentacion.responsable.Nom_Responsable}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary m-1" onClick={() => getAlimentacion(alimentacion.Id_Alimentacion)} >
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className="btn btn-sm btn-danger m-1" onClick={() => deleteAlimentacion(alimentacion.Id_Alimentacion)} >
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

export default FormQueryAlimentacion;
