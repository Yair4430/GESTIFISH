import axios from "axios";
import { useEffect, useState } from "react";

const PATH_FOTOS = process.env.ROUTER_FOTOS;

const FormQueryEspecie = ({ URI, getEspecie, deleteEspecie, buttonForm }) => {
    const [especieQuery, setEspecieQuery] = useState([]);
    const [Nom_Especie, setNom_Especie] = useState('');

    const sendFormQuery = async (Nom_Especie) => {
        if (Nom_Especie) {
            try {
                const respuesta = await axios.get(`${URI}nombre/${Nom_Especie}`);
                if (respuesta.status >= 200 && respuesta.status < 300) {
                    setEspecieQuery(respuesta.data);
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                }
            } catch (error) {
                console.error('Error al consultar la especie:', error.response?.status || error.message);
            }
        } else {
            setEspecieQuery([]);
        }
    };

    useEffect(() => {
        setEspecieQuery([]);
        setNom_Especie('');
    }, [buttonForm]);

    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Consultar Especie</h1>
                    </div>
                    <div className="card-body">
                        <form action="" id="queryForm" className="fw-bold m-2">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Nom_EspecieQuery" className="col-sm-5 col-form-label text-end">Nombre:</label>
                                <div className="col-sm-4">
                                    <input type="text" id="Nom_EspecieQuery" className="form-control" value={Nom_Especie} onChange={(e) => {
                                        setNom_Especie(e.target.value);
                                        sendFormQuery(e.target.value);
                                    }} required />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <br />
                <br />

                <div className="container mt-5">
                    {especieQuery.length > 0 ? (
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h1 className="text-center">Especies Registradas</h1>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped table-dynamic mt-4">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Características</th>
                                                <th>Tamaño Promedio</th>
                                                <th>Densidad</th>
                                                <th>Imagen</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {especieQuery.map((especie) => (
                                                <tr key={especie.Id_Especie}>
                                                    <td>{especie.Nom_Especie}</td>
                                                    <td>{especie.Car_Especie}</td>
                                                    <td>{especie.Tam_Promedio}</td>
                                                    <td>{especie.Den_Especie}</td>
                                                    <td>
                                                        {especie.Img_Especie ? (
                                                            <img width="80px" src={`${PATH_FOTOS}/${especie.Img_Especie}`} alt="Imagen de la especie" />
                                                        ) : (
                                                            <span>No Image</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary m-1" onClick={() => getEspecie(especie.Id_Especie)}>
                                                            <i className="fa-solid fa-pen-to-square"></i> Editar
                                                        </button>
                                                        <button className="btn btn-sm btn-danger m-1" onClick={() => deleteEspecie(especie.Id_Especie)}>
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

            </div>
        </>
    );
}

export default FormQueryEspecie;
