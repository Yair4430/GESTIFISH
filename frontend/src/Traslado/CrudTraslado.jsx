import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormTraslado from './FormTraslado'; 
import FormQueryTraslado from './FormQueryTraslado'; 

const URI = 'http://localhost:3001/traslado/';

const CrudTraslado = () => {
    const [TrasladoList, setTrasladoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [traslado, setTraslado] = useState({
        Id_Traslado:'',
        Fec_Traslado: '',
        Can_Peces: '',
        Id_Responsable: '',
        Obs_Traslado: '',
        Hor_Traslado: ''
    });

    useEffect(() => {
        getAllTraslados();
    }, []);
    
    const getAllTraslados = async () => {
        try {
            const respuesta = await axios.get(URI);
            setTrasladoList(respuesta.data);
        } catch (error) {
            console.error('Error fetching traslados:', error);
        }
    };
    

    const getTraslado = async (id_Traslado) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(`${URI}${id_Traslado}`);
            setButtonForm('Actualizar');
            setTraslado({ ...respuesta.data });
        } catch (error) {
            console.error('Error fetching traslado:', error);
        }
    };
    

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteTraslado = (id_Traslado) => {
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
                    await axios.delete(`${URI}${id_Traslado}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    getAllTraslados(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting traslado:', error);
                }
            }
        });
    };
    

    return (
        <>
            <table className="table table-bordered border-info text-center mt-4" style={{ border: "3px solid" }}>
                <thead>
                    <tr>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Id Traslado</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Fecha de Traslado</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Cantidad de Peces</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>ID Responsable</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Observaciones</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Hora de Traslado</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    {TrasladoList.map((traslado) => (
        <tr key={traslado.Id_Traslado} className='border-info font-monospace' style={{ border: "3px solid" }}>
            <td className='border-info align-middle' style={{ border: "3px solid" }}>{traslado.Id_Traslado}</td>
            <td className='border-info align-middle' style={{ border: "3px solid" }}>{traslado.Fec_Traslado}</td>
            <td className='border-info align-middle' style={{ border: "3px solid" }}>{traslado.Can_Peces}</td>
            <td className='border-info align-middle' style={{ border: "3px solid" }}>{traslado.Id_Responsable}</td>
            <td className='border-info align-middle' style={{ border: "3px solid" }}>{traslado.Obs_Traslado}</td>
            <td className='border-info align-middle' style={{ border: "3px solid" }}>{traslado.Hor_Traslado}</td>
            <td>
                <button className='btn btn-info align-middle' onClick={() => getTraslado(traslado.Id_Traslado)}>
                    <i className="fa-solid fa-pen-to-square"></i> Editar
                </button>
                <button className='btn btn-info align-middle m-2' onClick={() => deleteTraslado(traslado.Id_Traslado)}>
                    <i className="fa-solid fa-trash-can"></i> Borrar
                </button>
            </td>
        </tr>
    ))}
</tbody>

            </table>
            <hr />
            <FormTraslado getAllTraslados={getAllTraslados} buttonForm={buttonForm} traslado={traslado} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryTraslado URI={URI} getTraslado={getTraslado} deleteTraslado={deleteTraslado} buttonForm={buttonForm} />
        </>
    );
};

export default CrudTraslado;