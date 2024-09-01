import axios from "axios";
import { useEffect, useState } from "react";

const PATH_FOTOS = process.env.ROUTER_FOTOS

const FormQueryEstanque = ({ URI, getEstanque, deleteEstanque, buttonForm }) => {
    const [estanqueQuery, setEstanqueQuery] = useState([]);
    const [Id_Estanque, setId_Estanque] = useState('');

    const sendFormQuery = async (Id_Estanque) => {
        if (Id_Estanque) {
            try {
                const respuesta = await axios.get(`${URI}Id_Estanque/${Id_Estanque}`);

                if (respuesta.status === 200) {
                    setEstanqueQuery(respuesta.data);
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                    setEstanqueQuery([]);
                }
            } catch (error) {
                console.error('Error en la consulta:', error.response?.status || error.message);
                setEstanqueQuery([]);
            }
        } else {
            setEstanqueQuery([]);
        }
    };

    useEffect(() => {
        setEstanqueQuery([]);
        setId_Estanque('');
    }, [buttonForm]);

    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Consultar Estanque</h1>
                    </div>
                    <div className="card-body">
                        <form action="" id="queryForm" className="fw-bold m-2">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Id_EstanqueQuery" className="col-sm-5 col-form-label text-end">Número:</label>
                                <div className="col-sm-4">
                                    <input type="number" id="Id_EstanqueQuery" className="form-control" value={Id_Estanque} onChange={(e) => {
                                        setId_Estanque(e.target.value);
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
                    {estanqueQuery.length > 0 ? (
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h1 className="text-center">Estanques Registrados</h1>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped table-dynamic mt-4">
                                        <thead>
                                            <tr>
                                                <th>Número</th>
                                                <th>Nombre</th>
                                                <th>Espejo de Agua</th>
                                                <th>Tipo</th>
                                                <th>Largo</th>
                                                <th>Ancho</th>
                                                <th>Descripción</th>
                                                <th>Imagen</th>
                                                <th>Recambio de Agua</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {estanqueQuery.map((estanque) => (
                                                <tr key={estanque.Id_Estanque}>
                                                    <td>{estanque.Id_Estanque}</td>
                                                    <td>{estanque.Nom_Estanque}</td>
                                                    <td>{estanque.Esp_Agua}</td>
                                                    <td>{estanque.Tip_Estanque}</td>
                                                    <td>{estanque.Lar_Estanque}</td>
                                                    <td>{estanque.Anc_Estanque}</td>
                                                    <td>{estanque.Des_Estanque}</td>
                                                    <td>
                                                        {estanque.Img_Estanque ? (
                                                            <img width="80px" src={`${PATH_FOTOS}/${estanque.Img_Estanque}`} alt="Imagen del estanque" />
                                                        ) : (
                                                            <span>No Image</span>
                                                        )}
                                                    </td>
                                                    <td>{estanque.Rec_Agua}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary m-1" onClick={() => getEstanque(estanque.Id_Estanque)}>
                                                            <i className="fa-solid fa-pen-to-square"></i> Editar
                                                        </button>
                                                        <button className="btn btn-sm btn-danger m-1" onClick={() => deleteEstanque(estanque.Id_Estanque)}>
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

export default FormQueryEstanque;
