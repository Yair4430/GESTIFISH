import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormMuestreo = ({ buttonForm, muestreo, URI, updateTextButton, getAllMuestreo, closeModal }) => {
    const [Fec_Muestreo, setFec_Muestreo] = useState('');
    const [Num_Peces, setNum_Peces] = useState('');
    const [Obs_Muestreo, setObs_Muestreo] = useState('');
    const [Pes_Esperado, setPes_Esperado] = useState('');
    const [Id_Siembra, setId_Siembra] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Hor_Muestreo, setHor_Muestreo] = useState('');
    const [Pes_Promedio, setPes_Promedio] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);
    const [DatosSiembra, setDatosSiembra] = useState([]);

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
        setFec_Muestreo(getTodayDate());
    }, []);  

    const sendForm = async (e) => {
        e.preventDefault();

        if (
            Fec_Muestreo === muestreo.Fec_Muestreo &&
            Num_Peces === muestreo.Num_Peces &&
            Obs_Muestreo === muestreo.Obs_Muestreo &&
            Pes_Esperado === muestreo.Pes_Esperado &&
            Id_Siembra === muestreo.Id_Siembra &&
            Id_Responsable === muestreo.Id_Responsable &&
            Hor_Muestreo === muestreo.Hor_Muestreo &&
            Pes_Promedio === muestreo.Pes_Promedio
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
                Fec_Muestreo,
                Num_Peces,
                Obs_Muestreo,
                Pes_Esperado,
                Id_Siembra,
                Id_Responsable,
                Hor_Muestreo,
                Pes_Promedio
            };

            if (buttonForm === 'Actualizar') {
                await axios.put(`${URI}${muestreo.Id_Muestreo}`, data);
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                });
                // updateTextButton('Enviar');
                getAllMuestreo()
                clearForm(); // Limpiar el formulario después de actualizar
                closeModal()

            } else if (buttonForm === 'Enviar') {
                const respuestaApi = await axios.post(URI, data);
                Swal.fire({
                    title: 'Guardado',
                    text: '¡Registro guardado exitosamente!',
                    icon: 'success'
                });
                if (respuestaApi.status === 201) {
                    clearForm(); // Limpiar el formulario después de guardar
                }
            }

            getAllMuestreo(); // Refrescar la lista después de la operación
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el registro de muestreo.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setFec_Muestreo('');
        setNum_Peces('');
        setObs_Muestreo('');
        setPes_Esperado('');
        setId_Siembra('');
        setId_Responsable('');
        setHor_Muestreo('');
        setPes_Promedio('');
    };

    const setData = () => {
        setFec_Muestreo(muestreo.Fec_Muestreo);
        setNum_Peces(muestreo.Num_Peces);
        setObs_Muestreo(muestreo.Obs_Muestreo);
        setPes_Esperado(muestreo.Pes_Esperado);
        setId_Siembra(muestreo.Id_Siembra);
        setId_Responsable(muestreo.Id_Responsable);
        setHor_Muestreo(muestreo.Hor_Muestreo);
        setPes_Promedio(muestreo.Pes_Promedio);
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
          if (name === 'Obs_Muestreo') {
            setObs_Muestreo(value);
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

        const getSiembras = async () => {
            try {
                const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/siembra/');
                setDatosSiembra(response.data);
            } catch (error) {
                console.error('Error al obtener siembras:', error);
            }
        };

        getResponsable();
        getSiembras();
    }, []);

    useEffect(() => {
        if (muestreo) {
            setData();
        }
    }, [muestreo]);

    return (
        <>

                {/*<div className="card-header text-dark" style={{ backgroundColor: '#adaca9' }}>
                    <h1 className="text-center">
                        {buttonForm === 'Actualizar' ? 'Actualizar Muestreo' : 'Registrar Muestreo'}
                    </h1>
                </div>*/}
                <div className="card-body">
                    <form id="muestreoForm" onSubmit={sendForm} className="fw-bold m-2">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Fec_Muestreo" className="form-label">Fecha Muestreo:</label>
                                    <input className="form-control" type="date" id="Fec_Muestreo" value={Fec_Muestreo} onChange={(e) => setFec_Muestreo(e.target.value)} required min={getTodayDate()} max={getTodayDate()}  />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Num_Peces" className="form-label">Número Peces:</label>
                                    <input className="form-control" type="number" id="Num_Peces" value={Num_Peces} onChange={(e) => handleNumericInput (e, setNum_Peces)} onKeyDown={handleKeyDown}  required />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Obs_Muestreo" className="form-label">Observaciones:</label>
                                    <input className="form-control" type="text" id="Obs_Muestreo" name='Obs_Muestreo' value={Obs_Muestreo} onChange={handleInputChange} maxLength={90} />
                                    {Obs_Muestreo.length === 90 && (
                                        <span className="text-danger">¡Has alcanzado el límite de 90 caracteres!</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Pes_Esperado" className="form-label">Peso Esperado (kg):</label>
                                    <input className="form-control" type="number" id="Pes_Esperado" value={Pes_Esperado} onChange={(e) => handleNumericInput (e, setPes_Esperado)} onKeyDown={handleKeyDown} required />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
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
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Hor_Muestreo" className="form-label">Hora Muestreo:</label>
                                    <input className="form-control" type="time" id="Hor_Muestreo" value={Hor_Muestreo} onChange={(e) => setHor_Muestreo(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Pes_Promedio" className="form-label">Peso Promedio (kg):</label>
                                    <input className="form-control" type="number" id="Pes_Promedio" value={Pes_Promedio} onChange={(e) => handleNumericInput (e, setPes_Promedio)} onKeyDown={handleKeyDown} required />
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
                                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                                        <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                                    </svg>
                                )}
                                {buttonForm === 'Enviar' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
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


export default FormMuestreo;