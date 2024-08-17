import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormQueryMortalidad = ({ URI, getMortalidad, deleteMortalidad, buttonForm }) => {
    const [mortalidadQuery, setMortalidadQuery] = useState([]);
    const [Fec_Mortalidad, setFec_Mortalidad] = useState('');
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

    const sendFormQuery = async (Fec_Mortalidad) => {
        if (Fec_Mortalidad) {
            try {
                const respuesta = await axios.get(`${URI}fecha/${Fec_Mortalidad}`);
                if (respuesta.status >= 200 && respuesta.status < 300) {
                    setMortalidadQuery(Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]);
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                }
            } catch (error) {
                console.error('Error fetching mortalidad:', error.response?.status || error.message);
                setMortalidadQuery([]);
            }
        } else {
            setMortalidadQuery([]);
        }
    };

    useEffect(() => {
        setMortalidadQuery([]);
        setFec_Mortalidad('');
    }, [buttonForm]);

    return (
        <>
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Mortalidad</h1>
                <form action="" id="queryForm" className="fw-bold m-2">
                    <label htmlFor="Fec_MortalidadQuery" className="m-2">Fecha de Mortalidad:</label>
                    <input 
                        type="date" 
                        id="Fec_MortalidadQuery" 
                        value={Fec_Mortalidad} 
                        onChange={(e) => {
                            setFec_Mortalidad(e.target.value);
                            sendFormQuery(e.target.value);
                        }} 
                    />
                </form>
            </div>

            {mortalidadQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className="border-info" style={{ border: "3px solid" }}>ID Mortalidad</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Fecha de Mortalidad</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Cantidad de Peces</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Motivo de Mortalidad</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>ID Siembra</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>ID Responsable</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mortalidadQuery.map((mortalidad) => (
                            <tr key={mortalidad.Id_Mortalidad} className="border-info align-middle font-monospace" style={{ border: "3px solid" }}>
                                <td className="border-info align-middle text-center" style={{ border: "3px solid" }}>{mortalidad.Id_Mortalidad}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{mortalidad.Fec_Mortalidad}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{mortalidad.Can_Peces}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{mortalidad.Mot_Mortalidad}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{mortalidad.Id_Siembra}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{mortalidad.Id_Responsable}</td>
                                <td>
                                    <button className="btn btn-info align-middle m-2" onClick={() => getMortalidad(mortalidad.Id_Mortalidad)}>
                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                    </button>
                                    <button className="btn btn-info align-middle m-2" onClick={() => deleteMortalidad(mortalidad.Id_Mortalidad)}>
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

export default FormQueryMortalidad;
