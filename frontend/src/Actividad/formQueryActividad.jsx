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
                const respuesta = await axios.get(`${URI}Fec_Actividad/${Fec_Actividad}`);
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
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Actividades</h1>
                <form className="fw-bold m-2" id="queryForm">
                        <label className="m-2" htmlFor="fechaQuery">Fecha Inicial</label>
                        <input className="form-control w-100" type="date"
                            id="fechaQuery"
                            value={Fec_Actividad}
                            onChange={(e) => {
                                sendFormQuery(e.target.value); setFec_Actividad(e.target.value);}}
                        />
                </form>
            </div>

            {ActividadQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className="border-info" style={{ border: "3px solid" }}>Fecha</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Nombre</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Descripción</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Responsable</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Hora</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Fase Produccion</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Estanque</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ActividadQuery.map((actividad) => (
                            <tr key={actividad.Fec_Actividad} className="border-info align-middle font-monospace" style={{ border: "3px solid" }}>
                                <td className="border-info align-middle text-center" style={{ border: "3px solid" }}>{actividad.Fec_Actividad}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.Nom_Actividad}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.Des_Actividad}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.responsable.Nom_Responsable}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.Fec_Actividad}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.Hor_Actividad}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.Fas_Produccion}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{actividad.estanque.Nom_Estanque}</td>
                                <td>
                                    <button onClick={() => getActividad(actividad.Fec_Actividad)} value="Editar" title="Editar" className="btn btn-primary">
                                        <i className="fa-solid fa-pen-to-square"></i>Editar
                                    </button>
                                    <button onClick={() => deleteActividad(actividad.Fec_Actividad)} className="btn btn-danger">
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

export default FormQueryActividad;