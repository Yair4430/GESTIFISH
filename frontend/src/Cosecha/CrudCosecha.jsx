import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WriteTable from '../Tables/Data-Tables.jsx'; // Asegúrate de tener este componente para la tabla de datos
import FormCosecha from './FormCosecha'; // Asegúrate de tener este componente para el formulario de cosecha

const URI = process.env.ROUTER_PRINCIPAL + '/cosecha/';

const CrudCosecha = () => {
    const [CosechaList, setCosechaList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [showForm, setShowForm] = useState(false);
    const [cosecha, setCosecha] = useState({
        Id_Cosecha: '',
        Fec_Cosecha: '',
        Can_Peces: '',
        Pes_Eviscerado: '',
        Pes_Viscerado: '',
        Por_Visceras: '',
        Id_Responsable: '',
        Id_Siembra: '',
        Hor_Cosecha: '',
        Vlr_Cosecha: '',
        Obs_Cosecha: ''
    });

    useEffect(() => {
        getAllCosecha();
    }, []);

    const getAllCosecha = async () => {
        try {
            const respuesta = await axios.get(URI);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setCosechaList(respuesta.data);
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching cosecha:', error.response?.status || error.message);
        }
    };

    const getCosecha = async (Id_Cosecha) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Cosecha}`);
            if (respuesta.status >= 200 && respuesta.status < 300) {
                setCosecha({ ...respuesta.data });
            } else {
                console.warn('HTTP Status:', respuesta.status);
            }
        } catch (error) {
            console.error('Error fetching cosecha:', error.response?.status || error.message);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteCosecha = async (Id_Cosecha) => {
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
                    await axios.delete(`${URI}${Id_Cosecha}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Borrado exitosamente",
                        icon: "success"
                    });
                    // getAllCosecha(); // Refrescar la lista después de la eliminación
                } catch (error) {
                    console.error('Error deleting cosecha:', error.response?.status || error.message);
                }
            }else{
                getAllCosecha();
            }
        });
    };

    const handleAddClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

        if (!showForm) {
            setCosecha({
                Id_Cosecha: '',
                Fec_Cosecha: '',
                Can_Peces: '',
                Pes_Eviscerado: '',
                Pes_Viscerado: '',
                Por_Visceras: '',
                Id_Responsable: '',
                Id_Siembra: '',
                Hor_Cosecha: '',
                Vlr_Cosecha: '',
                Obs_Cosecha: ''
            });
            setButtonForm('Enviar');
        }
    };

    const handleEdit = (Id_Cosecha) => {
        getCosecha(Id_Cosecha);
    };

    const handleDelete = (Id_Cosecha) => {
        deleteCosecha(Id_Cosecha);
    };

    const data = CosechaList.map((cosecha) => [
        cosecha.Fec_Cosecha,
        cosecha.Can_Peces,
        cosecha.Pes_Eviscerado,
        cosecha.Pes_Viscerado,
        cosecha.Por_Visceras,
        cosecha.siembra.Fec_Siembra,
        cosecha.Hor_Cosecha,
        cosecha.Vlr_Cosecha,
        cosecha.Obs_Cosecha,
        cosecha.responsable.Nom_Responsable,
        `
          <button class='btn btn-primary align-middle btn-edit' data-id='${cosecha.Id_Cosecha}'>
            <i class="fa-solid fa-pen-to-square"></i> 
          </button>
          <button class='btn btn-danger align-middle m-1 btn-delete' data-id='${cosecha.Id_Cosecha}'>
            <i class="fa-solid fa-trash-can"></i> 
          </button>
        `
    ]);

    const titles = [
        "Fecha Cosecha", "Cantidad Peces", "Peso Eviscerado", "Peso Viscerado",
        "Porcentaje Viceras", "Fecha Siembra", "Hora Cosecha", "Valor Cosecha",
        "Observaciones", "Nombre Responsable", "Acciones"
    ];

    return (
        <>
                    {/* <div className="container mt-5"> */}
        <div style={{ marginLeft: '320px', paddingTop: '70px' }}>

                <button className="btn btn-primary mb-4" onClick={handleAddClick}
                style={{ width: '140px', height: '45px', padding:'0px', fontSize: '16px'}}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Cosecha'}
                </button>
                </div>
            <WriteTable
                titles={titles}
                data={data}
                onEditClick={handleEdit}
                onDeleteClick={handleDelete}
            />
            {showForm && (
                <>
                {/* <hr /> */}
                        <FormCosecha
                            getAllCosecha={getAllCosecha}
                            buttonForm={buttonForm}
                            cosecha={cosecha}
                            URI={URI}
                            updateTextButton={updateTextButton}
                        />
                    </>
                )}
        </>
    );
};

export default CrudCosecha;
