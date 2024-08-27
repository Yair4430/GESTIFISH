import React from 'react';
import imgtodo from '../IMG/ImagenGrupalActualizada.jpeg';
import BarraNavegacionPublica from './barraNavegacionPublica';

const HomePublico = () => {
  return (
    <>
      < BarraNavegacionPublica/>
      <section className="seccion active align-items-center mt-4">
        <center>
          <h1 style={{
            fontFamily: 'Poppins, sans-serif',  // Fuente Poppins
            fontWeight: '700',                   // Negrita
            fontSize: '3.0rem',                  // Tamaño del texto
            textAlign: 'center',                 // Centro del texto
            color: '#000',                       // Color negro
            marginBottom: '20px',                // Margen inferior
            borderBottom: '2px solid #ddd',      // Línea inferior
            paddingBottom: '10px'                // Espacio inferior
          }}>
            Estas en la parte publica de home
          </h1>
        </center>
        <center>
          <p className="m-4 lead custom-font">La unidad de Piscicultura del Centro Agropecuario "La Granja del SENA Espinal Regional Tolima"</p>
        </center>
        <center>
          
        </center>
        <br />
        <br />
      </section>
    </>
  );
}

export default HomePublico;