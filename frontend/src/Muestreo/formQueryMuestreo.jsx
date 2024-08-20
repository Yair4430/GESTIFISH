import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormQueryMuestreo = ({ URI, getMuestreo, deleteMuestreo, buttonForm }) => {
    const [muestreoQuery, setMuestreoQuery] = useState([]);
    const [Fec_Muestreo, setFec_Muestreo] = useState('');
    const [datosResponsable, setDatosResponsable] = useState([]);
    const [datosSiembra, setDatosSiembra] = useState([]);

    // Obtener responsables y siembras
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

    // Consultar muestreo por fecha
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
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Muestreo</h1>
                <form action="" id="queryForm" className="fw-bold m-2">
                    <label htmlFor="Fec_MuestreoQuery" className="m-2">Fecha de Muestreo:</label>
                    <input 
                        type="date" 
                        id="Fec_MuestreoQuery" 
                        value={Fec_Muestreo} 
                        onChange={(e) => {
                            setFec_Muestreo(e.target.value);
                            sendFormQuery(e.target.value);
                        }} 
                    />
                </form>
            </div>

            {muestreoQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Fecha de Muestreo</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Número de Peces</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Observaciones</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Peso Esperado</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Fecha Siembra</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Nombre Responsable</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {muestreoQuery.map((muestreo) => (
                            <tr key={muestreo.Id_Muestreo} className="border-info align-middle font-monospace" style={{ border: "3px solid" }}>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{muestreo.Fec_Muestreo}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{muestreo.Num_Peces}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{muestreo.Obs_Muestreo}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{muestreo.Pes_Esperado}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{datosSiembra.find(siembra => siembra.Id_Siembra === muestreo.Id_Siembra)?.Fec_Siembra || 'No disponible'}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{datosResponsable.find(responsable => responsable.Id_Responsable === muestreo.Id_Responsable)?.Nom_Responsable || 'No disponible'}</td>
                                <td>
                                    <button className="btn btn-info align-middle m-2" onClick={() => getMuestreo(muestreo.Id_Muestreo)}>
                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                    </button>
                                    <button className="btn btn-info align-middle m-2" onClick={() => deleteMuestreo(muestreo.Id_Muestreo)}>
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

export default FormQueryMuestreo;