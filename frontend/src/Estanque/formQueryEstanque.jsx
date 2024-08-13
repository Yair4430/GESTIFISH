import axios from "axios";
import { useEffect, useState } from "react";

const PATH_FOTOS = 'http://localhost:3001/public/uploads'

const FormQueryEstanque = ({ URI, getEstanque, deleteEstanque, buttonForm }) => {
    const [estanqueQuery, setEstanqueQuery] = useState([]);
    const [Id_Estanque, setId_Estanque] = useState('');

    const sendFormQuery = async (Id_Estanque) => {
        if (Id_Estanque) {
            const respuesta = await axios.get(URI + 'Id_Estanque/' + Id_Estanque);
            setEstanqueQuery(respuesta.data);
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
            <br />
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Estanque</h1>
                <form action="" id="queryForm" className="fw-bold m-2">
                    <label htmlFor="Id_EstanqueQuery" className="m-2">Número:</label>
                    <input type="number" id="Id_EstanqueQuery" value={Id_Estanque} onChange={(e) => { sendFormQuery(e.target.value); setId_Estanque(e.target.value); }} />
                </form>
            </div>

            {estanqueQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className="border-info" style={{ border: "3px solid" }}>Número</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Nombre</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Espejo de Agua</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Tipo</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Largo</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Ancho</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Descripción</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Imagen</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Recambio de Agua</th>
                            <th className="border-info align-middle" style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estanqueQuery.map((estanque) => (
                            <tr key={estanque.Id_Estanque} className="border-info align-middle font-monospace" style={{ border: "3px solid" }}>
                                <td className="border-info align-middle text-center" style={{ border: "3px solid" }}>{estanque.Id_Estanque}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{estanque.Nom_Estanque}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{estanque.Esp_Agua}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{estanque.Tip_Estanque}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{estanque.Lar_Estanque}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{estanque.Anc_Estanque}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{estanque.Des_Estanque}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{estanque.Img_Estanque}</td>
                                <td className="border-info align-middle" style={{ border: "3px solid" }}>{estanque.Rec_Agua}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>
                                    <img width="80px" src={`${PATH_FOTOS}/${estanque.Img_Estanque}`} alt="Imagen del estanque" />
                                </td>
                                <td>
                                    <button className="btn btn-info" onClick={() => getEstanque(estanque.Id_Estanque)}><i className="fa-solid fa-pen-to-square"></i>Editar</button>
                                    <button className="btn btn-info align-middle m-2" onClick={() => deleteEstanque(estanque.Id_Estanque)}><i className="fa-solid fa-trash-can"></i> Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : ''}
        </>
    );
}

export default FormQueryEstanque;