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
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Alimentación</h1>
                <form action="" id="queryForm" className="fw-bold m-2">
                    <label htmlFor="Fec_AlimentacionQuery" className="m-2">Fecha de Alimentación:</label>
                    <input 
                        type="date" 
                        id="Fec_AlimentacionQuery" 
                        value={Fec_Alimentacion} 
                        onChange={(e) => {
                            setFec_Alimentacion(e.target.value);
                            sendFormQuery(e.target.value);
                        }} 
                    />
                </form>
            </div>

            {alimentacionQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Fecha de Alimentación</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Cantidad de Ración (Kg)</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Tipo de Alimento</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Hora de Alimentación</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Valor Alimentación</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Fecha Siembra</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Nombre Responsable</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alimentacionQuery.map((alimentacion) => (
                            <tr key={alimentacion.Id_Alimentacion} className="border-info align-middle font-monospace" style={{ border: "3px solid" }}>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{alimentacion.Fec_Alimentacion}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{alimentacion.Can_RacionKg}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{alimentacion.Tip_Alimento}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{alimentacion.Hor_Alimentacion}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{alimentacion.Vlr_Alimentacion}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{alimentacion.siembra.Fec_Siembra}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{alimentacion.responsable.Nom_Responsable}</td>
                                <td>
                                    <button className="btn btn-info align-middle m-2" onClick={() => getAlimentacion(alimentacion.Id_Alimentacion)}>
                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                    </button>
                                    <button className="btn btn-info align-middle m-2" onClick={() => deleteAlimentacion(alimentacion.Id_Alimentacion)}>
                                        <i className="fa-solid fa-trash-can"></i> Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No se encontraron resultados</p>
            )}
        </>
    );
};

export default FormQueryAlimentacion;
