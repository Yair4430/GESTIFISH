import axios from "axios";
import { useEffect, useState } from "react";

const FromQueryResponsable = ({ URI, getResponsable, deleteResponsable, buttonForm }) => {
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
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Responsable</h1>
                <form action="" id="queryForm" className="fw-bold m-2">
                    <label htmlFor="Doc_ResponsableQuery" className="m-2">Cedula: </label>
                    <input
                        type="text"
                        id="Doc_ResponsableQuery"
                        value={Doc_Responsable}
                        onChange={(e) => { setDoc_Responsable(e.target.value); sendFormQueryR(e.target.value) }}
                    />
                </form>
            </div>

            {ResponsableQuery.length > 0 ? (
                <table className="table table-bordered border-info text-center" style={{ border: "3px solid" }}>
                    <thead>
                        <tr>
                            <th className='border-info' style={{ border: "3px solid" }}>Documento del Responsable:</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Nombre</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Apellidos</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Tipo de Responsable</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Correo</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Número de Telefono</th>
                            <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ResponsableQuery.map((responsable) => (
                            <tr key={responsable.Doc_Responsable} className='border-info align-middle font-monospace' style={{ border: "3px solid" }}>
                                <td className='border-info align-middle text-center' style={{ border: "3px solid" }}>{responsable.Doc_Responsable}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{responsable.Nom_Responsable}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{responsable.Ape_Responsable}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{responsable.Tip_Responsable}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{responsable.Cor_Responsable}</td>
                                <td className='border-info align-middle' style={{ border: "3px solid" }}>{responsable.Num_Responsable}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => getResponsable(responsable.Doc_Responsable)}>
                                        <i className="fa-solid fa-pen-to-square"></i>Editar
                                    </button>
                                    <button className="btn btn-info align-middle m-2" onClick={() => deleteResponsable(responsable.Doc_Responsable)}>
                                        <i className="fa-solid fa-trash-can"></i> Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : ''}
        </>
    )
}

export default FromQueryResponsable;

