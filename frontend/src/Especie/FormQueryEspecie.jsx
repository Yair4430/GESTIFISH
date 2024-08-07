import axios from "axios";
import { useEffect, useState } from "react";

const PATH_FOTOS = 'http://localhost:3001/public/uploads';

const FormQueryEspecie = ({ URI, getEspecie, deleteEspecie, buttonForm }) => {
    const [especieQuery, setEspecieQuery] = useState([]);
    const [Nom_Especie, setNom_Especie] = useState('');

    const sendFormQuery = async (Nom_Especie) => {
        if (Nom_Especie) {
            const respuesta = await axios.get(`${URI}nombre/${Nom_Especie}`);
            setEspecieQuery(respuesta.data);
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
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Especie</h1>
                <form action="" id="queryForm" className="fw-bold m-2">
                    <label htmlFor="Nom_EspecieQuery" className="m-2">Nombre:</label>
                    <input type="text" id="Nom_EspecieQuery" value={Nom_Especie} onChange={(e) => { setNom_Especie(e.target.value); sendFormQuery(e.target.value); }} />
                </form>
            </div>

            {especieQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className="border-info" style={{ border: "3px solid" }}>Nombre</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Características</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Tamaño Promedio</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Densidad</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Imagen</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {especieQuery.map((especie) => (
                            <tr key={especie.Id_Especie} className="border-info align-middle font-monospace" style={{ border: "3px solid" }}>
                                <td className="border-info align-middle text-center" style={{ border: "3px solid" }}>{especie.Nom_Especie}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{especie.Car_Especie}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{especie.Tam_Promedio}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{especie.Den_Especie}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>
                                    {especie.Img_Especie ? (
                                        <img width="80px" src={`${PATH_FOTOS}/${especie.Img_Especie}`} alt="Imagen de la especie" />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-info" onClick={() => getEspecie(especie.Id_Especie)}><i className="fa-solid fa-pen-to-square"></i> Editar</button>
                                    <button className="btn btn-info align-middle m-2" onClick={() => deleteEspecie(especie.Id_Especie)}><i className="fa-solid fa-trash-can"></i> Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : ''}
        </>
    );
}

export default FormQueryEspecie;
