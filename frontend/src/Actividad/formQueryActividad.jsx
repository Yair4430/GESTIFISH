import axios from "axios";
import { useEffect, useState } from "react";

const FormQueryActividad = ({ URI, getActividad, deleteActividad, buttonForm }) => {
    const [ActividadQuery, setActividadQuery] = useState([]);
    const [Fec_Actividad, setFec_Actividad] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);
    const [DatosEstanque, setDatosEstanque] = useState([]);

    const getResponsable = async () => {
        try {
            const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/responsable/');
            setDatosResponsable(response.data);
        } catch (error) {
            console.error('Error al obtener responsables:', error);
        }
    };

    const getEstanque = async () => {
        try {
            const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/traslado/');
            setDatosEstanque(response.data);
        } catch (error) {
            console.error('Error al obtener estanques:', error);
        }
    };

    useEffect(() => {
        getResponsable();
        getEstanque();
    }, []);

    const sendFormQuery = async (Fec_Actividad) => {
        console.log(Fec_Actividad);
        if (Fec_Actividad) {
            try {
                const respuesta = await axios.get(`${URI}FechaActividad/${Fec_Actividad}`);
                setActividadQuery(respuesta.data);
            } catch (error) {
                console.error(error);
                setActividadQuery([]);
            }
        } else {
            setActividadQuery([]);
        }
    };

    useEffect(() => {
        setActividadQuery([]);
        setFec_Actividad('');
    }, [buttonForm]);

    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Consultar Actividades</h1>
                    </div>
                    <div className="card-body">
                        <form className="fw-bold m-2 d-flex flex-column align-items-center">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Fec_ActividadQuery" className="col-sm-5 col-form-label text-end">Fecha de Actividad:</label>
                                <div className="col-sm-6">
                                    <input type="date" id="Fec_ActividadQuery" className="form-control" value={Fec_Actividad} onChange={(e) => setFec_Actividad(e.target.value)} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <br />

                {ActividadQuery.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Actividades Registradas</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-dynamic mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th className="align-middle">Fecha</th>
                                            <th className="align-middle">Nombre</th>
                                            <th className="align-middle">Descripción</th>
                                            <th className="align-middle">Responsable</th>
                                            <th className="align-middle">Fecha</th>
                                            <th className="align-middle">Hora</th>
                                            <th className="align-middle">Fase Producción</th>
                                            <th className="align-middle">Estanque</th>
                                            <th className="align-middle">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ActividadQuery.map((actividad) => (
                                            <tr key={actividad.Id_Actividad}>
                                                <td className="align-middle">{actividad.Fec_Actividad}</td>
                                                <td className="align-middle">{actividad.Nom_Actividad}</td>
                                                <td className="align-middle">{actividad.Des_Actividad}</td>
                                                <td className="align-middle">{actividad.responsable.Nom_Responsable}</td>
                                                <td className="align-middle">{actividad.Fec_Actividad}</td>
                                                <td className="align-middle">{actividad.Hor_Actividad}</td>
                                                <td className="align-middle">{actividad.Fas_Produccion}</td>
                                                <td className="align-middle">{actividad.estanque.Nom_Estanque}</td>
                                                <td className="align-middle">
                                                    <button className="btn btn-sm btn-primary m-1" onClick={() => getActividad(actividad.Id_Actividad)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button className="btn btn-sm btn-danger m-1" onClick={() => deleteActividad(actividad.Id_Actividad)}>
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

export default FormQueryActividad;