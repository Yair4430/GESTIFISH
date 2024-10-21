import React from 'react';
import './ManualUsuario.css'; // Asegúrate de agregar los estilos aquí.

const ManualUsuario = () => {
    const handleDownload = () => {
        // Ruta al archivo PDF en el servidor
        const fileUrl = '/PDF/Manual de usuario.pdf';
        
        // Crea un enlace temporal para forzar la descarga
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'Manual de usuario.pdf'; // Nombre del archivo para descargar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Elimina el enlace temporal
    };

    return (
        <>
            <div className="manual-container">
                <h1 className="manual-title">Manual de Usuario - GESTIFISH</h1>
                <p className="manual-description">
                    Este manual explica el 
                    funcionamiento del software, incluyendo la gestión de estanques, siembras, traslados 
                    y cosechas, así como las características avanzadas para manejar las actividades diarias 
                    en el sistema. Por favor, consulta este documento para cualquier duda sobre el uso de la 
                    aplicación.
                </p>
                <div className="pdf-viewer-container">
                    <iframe
                        className="pdf-viewer"
                        src="/PDF/Manual de usuario.pdf"
                        title="Manual de usuario"
                        frameBorder="0"
                    />
                </div>

                {/* Enlace con icono para descargar el PDF */}
                <center>
                <a
                    className="text-danger"
                    onClick={handleDownload}
                    style={{
                        width: '80px',
                        height: '45px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '10px',
                        cursor: 'pointer'
                    }}
                    title="Descargar Manual en PDF"
                >
                    <i className="bi bi-file-earmark-pdf" style={{ fontSize: '35px' }}></i>
                </a>
                </center>
            </div>
        </>
    );
};

export default ManualUsuario;
