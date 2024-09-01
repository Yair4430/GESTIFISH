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
                const respuesta = await axios.get(`${URI}Fec_Mortalidad/${Fec_Mortalidad}`);
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
            <div className="container mt-5">
                {/* Sección de consulta */}
                <div className="d-flex flex-column align-items-center mb-4">
                    <h1 className="fs-1 fw-bold text-primary">Consultar Mortalidad</h1>
                    <form id="queryForm" className="fw-bold m-2 d-flex flex-column align-items-center">
                        <div className="form-group row mb-3 gap-1 align-items-center">
                            <label htmlFor="Fec_MortalidadQuery" className="col-sm-5 col-form-label text-end">
                                Fecha de Mortalidad:
                            </label>
                            <div className="col-sm-4">
                                <input type="date" id="Fec_MortalidadQuery" className="form-control" value={Fec_Mortalidad} onChange={(e) => { setFec_Mortalidad(e.target.value); sendFormQuery(e.target.value); }}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Resultados de la consulta */}
                {mortalidadQuery.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h2 className="text-center">Resultados de Mortalidad</h2>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered text-center">
                                    <thead className="table-primary">
                                        <tr>
                                            <th>Fecha de Mortalidad</th>
                                            <th>Cantidad de Peces</th>
                                            <th>Motivo de Mortalidad</th>
                                            <th>Fecha Siembra</th>
                                            <th>Nombre Responsable</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mortalidadQuery.map((mortalidad) => (
                                            <tr key={mortalidad.Id_Mortalidad}>
                                                <td>{mortalidad.Fec_Mortalidad}</td>
                                                <td>{mortalidad.Can_Peces}</td>
                                                <td>{mortalidad.Mot_Mortalidad}</td>
                                                <td>{mortalidad.siembra.Fec_Siembra}</td>
                                                <td>{mortalidad.responsable.Nom_Responsable}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-primary m-1"
                                                        onClick={() => getMortalidad(mortalidad.Id_Mortalidad)}
                                                    >
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger m-1"
                                                        onClick={() => deleteMortalidad(mortalidad.Id_Mortalidad)}
                                                    >
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

export default FormQueryMortalidad;
