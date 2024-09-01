import axios from "axios";
import { useEffect, useState } from "react";

const FormQueryResponsable = ({ URI, getResponsable, deleteResponsable, buttonForm }) => {
    const [ResponsableQuery, setResponsableQuery] = useState([]);
    const [Doc_Responsable, setDoc_Responsable] = useState('');

    const sendFormQueryR = async (Doc_Responsable) => {
        if (Doc_Responsable) {
            try {
                const respuesta = await axios.get(`${URI}Doc_Responsable/${Doc_Responsable}`);
                if (respuesta.status >= 200 && respuesta.status < 300) {
                    setResponsableQuery(respuesta.data);
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                    setResponsableQuery([]);
                }
            } catch (error) {
                console.error('Error fetching responsable:', error.response?.status || error.message);
                setResponsableQuery([]);
            }
        } else {
            setResponsableQuery([]);
        }
    }

    useEffect(() => {
        setResponsableQuery([]);
        setDoc_Responsable('');
    }, [buttonForm]);

    return (
        <>
            <br />
            {/* <div className="container card mt-5">
                <div className="card-header bg-primary text-white">
                    <h1 className="text-center">Consultar Responsable</h1>
                </div>
                <div className="card-body">
                    <form id="queryForm" >
                    <div className="form-group">
                        <label htmlFor="Doc_ResponsableQuery">Número de documento:</label>
                        <input
                        type="number"
                        className="form-control"
                        id="Doc_ResponsableQuery"
                        value={Doc_Responsable}
                        onChange={(e) => { setDoc_Responsable(e.target.value); sendFormQueryR(e.target.value) }}
                        required />
                    </div>
                    <br />
                    <button type="submit" id="botonConsultar" className="btn btn-primary btn-block">
                        Consultar
                    </button>
                    </form>
                </div>
            </div> */}


            <div className="container mt-5">
                {ResponsableQuery.length > 0 ? (
                    <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Responsables Registrados</h1>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                        <table className="table table-striped table-dynamic mt-4ñ">
                            <thead>
                            <tr>
                                <th>Númro de documento</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Tipo de responsable</th>
                                <th>Correo</th>
                                <th>Número de teléfono</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ResponsableQuery.map((responsable) => (
                                <tr key={responsable.Doc_Responsable}>
                                <td>{responsable.Doc_Responsable}</td>
                                <td>{responsable.Nom_Responsable}</td>
                                <td>{responsable.Ape_Responsable}</td>
                                <td>{responsable.Tip_Responsable}</td>
                                <td>{responsable.Cor_Responsable}</td>
                                <td>{responsable.Num_Responsable}</td>
                                <td>
                                    <button className="editButton btn btn-sm btn-primary" onClick={() => getResponsable(responsable.Doc_Responsable)}>
                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                    </button>
                                    <button className="deleteButton btn btn-sm btn-danger" onClick={() => deleteResponsable(responsable.Doc_Responsable)}>
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

            <br />
            <br />
        </>
    )
}

export default FormQueryResponsable;
