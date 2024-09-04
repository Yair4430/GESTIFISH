import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx';  // Reemplaza con la ruta correcta
import FormResponsable from './FormResponsable.jsx';

const URI = process.env.ROUTER_PRINCIPAL + '/responsable/';

const CrudResponsable = () => {
    const [responsableList, setResponsableList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
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
            const respuesta = await axios.get(`${URI}${Id_Responsable}`);
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

    const deleteResponsable = async (Id_Responsable) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const respuesta = await axios.delete(`${URI}${Id_Responsable}`);
                    if (respuesta.status >= 200 && respuesta.status < 300) {
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "Borrado exitosamente",
                            icon: "success"
                        });
                        // getAllResponsable(); // Refresh the list after deletion
                    } else {
                        console.warn('HTTP Status:', respuesta.status);
                    }
                } catch (error) {
                    console.error('Error deleting responsable:', error.response?.status || error.message);
                }
            }else{
                getAllResponsable();
            }
        });
    };

    const handleAddClick = () => {
        // Alterna la visibilidad del formulario
        setShowForm(prevShowForm => !prevShowForm);
        
        // Si el formulario se va a mostrar, reinicia los valores
        if (!showForm) {
            setResponsable({
                Id_Responsable: '',
                Nom_Responsable: '',
                Ape_Responsable: '',
                Doc_Responsable: '',
                Tip_Responsable: '',
                Cor_Responsable: '',
                Num_Responsable: ''
            });
            setButtonForm('Enviar');
        }
    };

    const data = responsableList.map((responsable) => [
        responsable.Nom_Responsable,
        responsable.Ape_Responsable,
        responsable.Doc_Responsable,
        responsable.Tip_Responsable,
        responsable.Cor_Responsable,
        responsable.Num_Responsable,
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${responsable.Id_Responsable}'>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${responsable.Id_Responsable}'>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
        `
    ]);

    const titles = [
        "Nombre", "Apellidos", "Numero Documento", "Tipo Responsable", "Correo", "Número Teléfono", "Acciones"
    ];

    return (
        <>
         {/* <div className="container mt-5"> */}
         <div style={{ marginLeft: '320px', paddingTop: '70px' }}>

            <button className="btn btn-primary mb-4 " onClick={handleAddClick}
            style={{ width: '144px', height: '45px', padding:'0px', fontSize: '15px'}}>
                {showForm ? 'Ocultar Formulario' : 'Agregar Responsable'}
            </button>
            </div>
            <WriteTable 
                titles={titles} 
                data={data} 
                onEditClick={(id) => getResponsable(id)} 
                onDeleteClick={(id) => deleteResponsable(id)} 
            />
            {showForm && (
            <>
            {/* <hr /> */}
            <FormResponsable buttonForm={buttonForm} responsable={responsable} URI={URI} updateTextButton={updateTextButton} getAllResponsable={getAllResponsable} />
            </>
        )}

        </>
    );
};

export default CrudResponsable;
