import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormResponsable from './FormResponsable.jsx';
import FormQueryResponsable from './FormQueryResponsable.jsx';
import NavbarForm from '../Menus/NavbarForm.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/responsable/';

const CrudResponsable = () => {
    const [ResponsableList, setResponsableList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [responsable, setResponsable] = useState({
        Id_Responsable: '',
        Nom_Responsable: '',
        Ape_Responsable: '',
        Doc_Responsable: '',
        Tip_Responsable: '',
        Cor_Responsable: '',
        Num_Responsable: ''
    });

    useEffect(() => {
        getAllResponsable();
    }, []);

    const getAllResponsable = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setResponsableList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching responsables:', error.response?.status || error.message);
        }
    };

    const getResponsable = async (Id_Responsable) => {
        setButtonForm('Enviar');
        try {
            const respuesta = await axios.get(URI + Id_Responsable);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setButtonForm('Actualizar');
                setResponsable({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching responsable:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteResponsable = (Id_Responsable) => {
        Swal.fire({
            title: "Estas Seguro?",
            text: "No Podras Revertir Esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const respuesta = await axios.delete(URI + Id_Responsable);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "Borrado!!",
                            text: "Borrado Exitosamente",
                            icon: "success"
                        });
                        getAllResponsable(); // Refresh the list after deletion
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting responsable:', error.response?.status || error.message);
                }
            }
        });
    };

    return (
        <>
            <NavbarForm />
            <div className="container mt-5">
                {ResponsableList.length > 0 ? (
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h1 className="text-center">Responsables Registrados</h1>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-dynamic mt-4">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Nombre</th>
                                            <th className="text-center">Apellidos</th>
                                            <th className="text-center">Documento de Identidad</th>
                                            <th className="text-center">Tipo de Responsable</th>
                                            <th className="text-center">Correo</th>
                                            <th className="text-center">Número de Teléfono</th>
                                            <th className="text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ResponsableList.map((responsable) => (
                                            <tr key={responsable.Id_Responsable}>
                                                <td className="text-center">{responsable.Nom_Responsable}</td>
                                                <td className="text-center">{responsable.Ape_Responsable}</td>
                                                <td className="text-center">{responsable.Doc_Responsable}</td>
                                                <td className="text-center">{responsable.Tip_Responsable}</td>
                                                <td className="text-center">{responsable.Cor_Responsable}</td>
                                                <td className="text-center">{responsable.Num_Responsable}</td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-sm btn-primary m-1"
                                                        onClick={() => getResponsable(responsable.Id_Responsable)}
                                                    >
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger m-1"
                                                        onClick={() => deleteResponsable(responsable.Id_Responsable)}
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
                    <div className="alert alert-info mt-3" role="alert">
                        No hay resultados para mostrar.
                    </div>
                )}
            </div>
            
            <FormResponsable buttonForm={buttonForm} responsable={responsable} URI={URI} updateTextButton={updateTextButton} getAllResponsable={getAllResponsable} />
            
            <FormQueryResponsable URI={URI} getResponsable={getResponsable} deleteResponsable={deleteResponsable} buttonForm={buttonForm} />
        </>
    );
}

export default CrudResponsable;