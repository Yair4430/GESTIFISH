import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormTraslado = ({ buttonForm, traslado, URI, updateTextButton, getAllTraslados }) => {
    const [Fec_Traslado, setFec_Traslado] = useState('');
    const [Can_Peces, setCan_Peces] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Obs_Traslado, setObs_Traslado] = useState('');
    const [Hor_Traslado, setHor_Traslado] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);

    // Obtener la fecha actual en formato YYYY-MM-DD
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        // Establecer la fecha actual en el campo Fec_Cosecha por defecto
        setFec_Traslado(getTodayDate());
    }, []);  

    const sendForm = async (e) => {
        e.preventDefault();

        if (
            Fec_Traslado === traslado.Fec_Traslado &&
            Can_Peces === traslado.Can_Peces &&
            Id_Responsable === traslado.Id_Responsable &&
            Obs_Traslado === traslado.Obs_Traslado &&
            Hor_Traslado === traslado.Hor_Traslado
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
                Fec_Traslado,
                Can_Peces,
                Id_Responsable,
                Obs_Traslado,
                Hor_Traslado
            };

            if (buttonForm === 'Actualizar') {
                await axios.put(`${URI}${traslado.Id_Traslado}`, data);
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                });
                // updateTextButton('Enviar');
                getAllTraslados();
                clearForm(); // Limpiar el formulario después de la actualización
            } else if (buttonForm === 'Enviar') {
                const respuestaApi = await axios.post(URI, data);
                Swal.fire({
                    title: 'Guardado',
                    text: '¡Registro guardado exitosamente!',
                    icon: 'success'
                });
                if (respuestaApi.status === 201) {
                    clearForm();
                }
            }

            getAllTraslados(); // Refrescar la lista después de la operación
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el traslado.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setFec_Traslado('');
        setCan_Peces('');
        setId_Responsable('');
        setObs_Traslado('');
        setHor_Traslado('');
    };

    const setData = () => {
        setFec_Traslado(traslado.Fec_Traslado);
        setCan_Peces(traslado.Can_Peces);
        setId_Responsable(traslado.Id_Responsable);
        setObs_Traslado(traslado.Obs_Traslado);
        setHor_Traslado(traslado.Hor_Traslado);
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
            if (name === 'Obs_Traslado') {
                setObs_Traslado(value);
            }
        }
    };


    useEffect(() => {
        const getResponsable = async () => {
            try {
                const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/responsable/');
                setDatosResponsable(response.data);
            } catch (error) {
                console.error('Error al obtener responsables:', error);
            }
        };

        getResponsable();
    }, []);

    useEffect(() => {
        if (traslado) {
            setData();
        }
    }, [traslado]);

    return (
        <>
            {/*<div className="card-header text-dark" style={{ backgroundColor: '#adaca9' }}>
                    <h1 className="text-center">
                        {buttonForm === 'Actualizar' ? 'Actualizar Traslado' : 'Registrar Traslado'}
                    </h1>
                </div>*/}
            <div className="card-body">
                <form id="trasladoForm" onSubmit={sendForm} className="fw-bold m-2">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="Fec_Traslado" className="form-label">Fecha Traslado:</label>
                                <input className="form-control" type="date" id="Fec_Traslado" value={Fec_Traslado} onChange={(e) => setFec_Cosecha(e.target.value)} required min={getTodayDate()} max={getTodayDate()} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="Can_Peces" className="form-label">Cantidad Peces:</label>
                                <input className="form-control" type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => handleNumericInput(e, setCan_Peces)} onKeyDown={handleKeyDown} required />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="Id_Responsable" className="form-label">Responsable:</label>
                                <select className="form-control" id="Id_Responsable" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} required>
                                    <option value="">Seleccione Responsable</option>
                                    {DatosResponsable.map((responsable) => (
                                        <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                                            {responsable.Nom_Responsable}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="Hor_Traslado" className="form-label">Hora Traslado:</label>
                                <input className="form-control" type="time" id="Hor_Traslado" value={Hor_Traslado} onChange={(e) => setHor_Traslado(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="form-group mb-3">
                                <label htmlFor="Obs_Traslado" className="form-label">Observaciones:</label>
                                <textarea className="form-control" id="Obs_Traslado" name='Obs_Traslado' value={Obs_Traslado} onChange={handleInputChange} maxLength={90} rows="4" />
                                {Obs_Traslado.length === 90 && (
                                    <span className="text-danger">¡Has alcanzado el límite de 90 caracteres!</span>
                                )}
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

export default FormTraslado;