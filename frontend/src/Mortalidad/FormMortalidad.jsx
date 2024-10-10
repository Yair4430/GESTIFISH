import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormMortalidad = ({ buttonForm, mortalidad, URI, updateTextButton, getAllMortalidad, closeModal }) => {
    const [Fec_Mortalidad, setFec_Mortalidad] = useState('');
    const [Can_Peces, setCan_Peces] = useState('');
    const [Mot_Mortalidad, setMot_Mortalidad] = useState('');
    const [Id_Siembra, setId_Siembra] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);
    const [DatosSiembra, setDatosSiembra] = useState([]);

    // Estados para el rango de fechas de la semana actual
    const [weekRange, setWeekRange] = useState({ start: '', end: '' });

    useEffect(() => {
        // Obtener la fecha de inicio y fin de la semana actual en formato YYYY-MM-DD
        const today = new Date();

        // Calcular el día de la semana (donde lunes es 1 y domingo es 0)
        const dayOfWeek = today.getDay();

        // Ajustar el primer día de la semana al lunes
        const firstDay = new Date(today);
        firstDay.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Si es domingo, ajustar a lunes anterior

        // Ajustar el último día de la semana al domingo
        const lastDay = new Date(firstDay);
        lastDay.setDate(firstDay.getDate() + 6); // El último día será 6 días después del lunes

        // Función para formatear las fechas en YYYY-MM-DD
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        setWeekRange({ start: formatDate(firstDay), end: formatDate(lastDay) });
    }, []);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const { start, end } = weekRange;

        if (selectedDate < start || selectedDate > end) {
            Swal.fire({
                title: 'Fecha Inválida',
                text: `Solo se permite registrar fechas dentro de la semana actual (del ${start} al ${end}).`,
                icon: 'warning'
            });
            e.target.value = Fec_Mortalidad; // Restablecer el valor del campo
            return; // No actualizar el estado con una fecha fuera del rango
        }
        setFec_Mortalidad(selectedDate); // Actualizar el estado solo si la fecha es válida
    };


    const sendForm = async (e) => {
        e.preventDefault();

        if (
            Fec_Mortalidad === mortalidad.Fec_Mortalidad &&
            Can_Peces === mortalidad.Can_Peces &&
            Mot_Mortalidad === mortalidad.Mot_Mortalidad &&
            Id_Siembra === mortalidad.Id_Siembra &&
            Id_Responsable === mortalidad.Id_Responsable
        ) {
            Swal.fire({
                title: 'Sin cambios',
                text: 'No ha realizado ningún cambio.',
                icon: 'info'
            });
            return; // Salir de la función sin hacer la solicitud
        }

        try {
            const data = {
                Fec_Mortalidad,
                Can_Peces,
                Mot_Mortalidad,
                Id_Siembra,
                Id_Responsable
            };

            if (buttonForm === 'Actualizar') {
                const user = JSON.parse(localStorage.getItem('usuario'));
                await axios.put(`${URI}${mortalidad.Id_Mortalidad}`, data,{
                    headers: { Authorization: `Bearer ${user.tokenUser }` },
                });
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                });
                updateTextButton('Enviar');
                clearForm(); // Limpiar el formulario después de la actualización
                closeModal()

            } else if (buttonForm === 'Enviar') {
                const user = JSON.parse(localStorage.getItem('usuario'));
                const respuestaApi = await axios.post(URI, data,{
                    headers: { Authorization: `Bearer ${user.tokenUser }` },
                },);
                Swal.fire({
                    title: 'Guardado',
                    text: '¡Registro guardado exitosamente!',
                    icon: 'success'
                });
                if (respuestaApi.status === 201) {
                    clearForm();
                }
            }

            getAllMortalidad(); // Refrescar la lista después de la operación
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el registro de mortalidad.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setFec_Mortalidad('');
        setCan_Peces('');
        setMot_Mortalidad('');
        setId_Siembra('');
        setId_Responsable('');
    };

    const setData = () => {
        setFec_Mortalidad(mortalidad.Fec_Mortalidad);
        setCan_Peces(mortalidad.Can_Peces);
        setMot_Mortalidad(mortalidad.Mot_Mortalidad);
        setId_Siembra(mortalidad.Id_Siembra);
        setId_Responsable(mortalidad.Id_Responsable);
    };

    // Función para evitar la entrada de caracteres inválidos
    const handleKeyDown = (e) => {
        if (["e", "E", "+", "-", ","].includes(e.key)) {
            e.preventDefault();  // Evita que el carácter sea ingresado
        }
    };

    // Función para validar que solo números sean permitidos
    const handleNumericInput = (e, setValue) => {
        const value = e.target.value;

        // Solo permite dígitos y puntos decimales
        if (!isNaN(value) && !value.includes("e")) {
            setValue(value);  // Actualiza el estado si es un número válido
        }
    };

    // Función para manejar cambios en los campos de texto
    const handleInputChange = (e) => {
        const { name, value, maxLength } = e.target;

        if (value.length <= maxLength) {
            if (name === 'Mot_Mortalidad') {
                setMot_Mortalidad(value);
            }
        }
    };

    useEffect(() => {
        const getResponsable = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('usuario'));
                const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/responsable/', {
                    headers: { Authorization: `Bearer ${user.tokenUser }` },
                  })
                setDatosResponsable(response.data);
            } catch (error) {
                console.error('Error al obtener responsables:', error);
            }
        };

        const getSiembras = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('usuario'));
                const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/siembra/' , {
                    headers: { Authorization: `Bearer ${user.tokenUser }` },
                  })
                setDatosSiembra(response.data);
            } catch (error) {
                console.error('Error al obtener siembras:', error);
            }
        };

        getResponsable();
        getSiembras();
    }, []);

    useEffect(() => {
        if (mortalidad) {
            setData();
        }
    }, [mortalidad]);

    return (
        <>

            {/*<div className="card-header text-dark" style={{ backgroundColor: '#adaca9' }}>
                    <h1 className="text-center">
                        {buttonForm === 'Actualizar' ? 'Actualizar Mortalidad' : 'Registrar Mortalidad'}
                    </h1>
                </div>*/}
            <div className="card-body">
                <form id="mortalidadForm" onSubmit={sendForm} className="fw-bold m-2">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Fec_Mortalidad" className="form-label">Fecha Mortalidad:</label>
                                <input className="form-control" type="date" id="Fec_Mortalidad" value={Fec_Mortalidad} onChange={handleDateChange} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Can_Peces" className="form-label">Cantidad Peces:</label>
                                <input className="form-control" type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => handleNumericInput(e, setCan_Peces)} onKeyDown={handleKeyDown} required />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Mot_Mortalidad" className="form-label">Motivo Mortalidad:</label>
                                <input className="form-control" type="text" id="Mot_Mortalidad" name='Mot_Mortalidad' value={Mot_Mortalidad} onChange={handleInputChange} maxLength={90} required />
                                {Mot_Mortalidad.length === 90 && (
                                    <span className="text-danger">¡Has alcanzado el límite de 90 caracteres!</span>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Id_SiembraSelect" className="form-label">Fecha Siembra:</label>
                                <select className="form-control" id="Id_SiembraSelect" value={Id_Siembra} onChange={(e) => setId_Siembra(e.target.value)} required>
                                    <option value="">Selecciona uno...</option>
                                    {DatosSiembra.map((siembra) => (
                                        <option key={siembra.Id_Siembra} value={siembra.Id_Siembra}>
                                            {siembra.Fec_Siembra}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Id_ResponsableSelect" className="form-label">Nombre Responsable:</label>
                                <select className="form-control" id="Id_ResponsableSelect" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} required>
                                    <option value="">Selecciona uno...</option>
                                    {DatosResponsable.map((responsable) => (
                                        <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                                            {responsable.Nom_Responsable}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            id="boton"
                            className={`btn btn-block m-2 ${buttonForm === 'Actualizar' ? 'btn-success' : 'btn-primary'}`}
                        >
                            {buttonForm === 'Actualizar' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                                    <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
                                </svg>
                            )}
                            {buttonForm === 'Enviar' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                                </svg>
                            )}
                            {buttonForm}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );

};
export default FormMortalidad;