import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormMortalidad from './FormMortalidad'; 
import FormQueryMortalidad from './FormQueryMortalidad'; 
import BarraNavegacionPrivada from '../home/barraNavegacionPrivada';

const URI = process.env.ROUTER_PRINCIPAL + '/mortalidad/';

const CrudMortalidad = () => {
    const [MortalidadList, setMortalidadList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [mortalidad, setMortalidad] = useState({
        Id_Mortalidad: '',
        Fec_Mortalidad: '',
        Can_Peces: '',
        Mot_Mortalidad: '',
        Id_Siembra: '',
        Id_Responsable: '',
    });

    useEffect(() => {
        getAllMortalidad();
    }, []);

    const getAllMortalidad = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setMortalidadList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching mortalidad:', error.response?.status || error.message);
        }
    };

    const getMortalidad = async (Id_Mortalidad) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Mortalidad}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setMortalidad({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching mortalidad:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteMortalidad = (id_Mortalidad) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const respuesta = await axios.delete(`${URI}${id_Mortalidad}`);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        getAllMortalidad(); // Refrescar la lista después de la eliminación
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting mortalidad:', error.response?.status || error.message);
                }
            }
        });
    };

    return (
        <>
        <BarraNavegacionPrivada />
            <table className="table table-bordered border-info text-center mt-4" style={{ border: "3px solid" }}>
                <thead>
                    <tr>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha de Mortalidad</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Cantidad de Peces</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Motivo de Mortalidad</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha Siembra</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Nombre Responsable</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {MortalidadList.map((mortalidad) => (
                        <tr key={mortalidad.Id_Mortalidad} className='border-info font-monospace' style={{ border: "3px solid" }}>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{mortalidad.Fec_Mortalidad}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{mortalidad.Can_Peces}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{mortalidad.Mot_Mortalidad}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{mortalidad.siembra.Fec_Siembra}</td>
                            <td className='border-info align-middle' style={{ border: "3px solid" }}>{mortalidad.responsable.Nom_Responsable}</td>
                            <td>
                                <button className='btn btn-info align-middle' onClick={() => getMortalidad(mortalidad.Id_Mortalidad)}>
                                    <i className="fa-solid fa-pen-to-square"></i> Editar
                                </button>
                                <button className='btn btn-info align-middle m-2' onClick={() => deleteMortalidad(mortalidad.Id_Mortalidad)}>
                                    <i className="fa-solid fa-trash-can"></i> Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormMortalidad getAllMortalidad={getAllMortalidad} buttonForm={buttonForm} mortalidad={mortalidad} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryMortalidad URI={URI} getMortalidad={getMortalidad} deleteMortalidad={deleteMortalidad} buttonForm={buttonForm} />
        </>
    );
};

export default CrudMortalidad;
