import React from 'react';
import imgtodo from '../IMG/Logo_FondoBlanco.jpeg';
import img2 from '../IMG/Estanque.jpeg';
// import BarraNavegacionPublica from './barraNavegacionPublica';

const HomePublica = () => {
  return (
    <>
      {/* <BarraNavegacionPublica /> */}
      <section className="container mt-5">
        {/* Sección principal con el logo y el título */}
        <Header title="GestiFish" />

        {/* Sección de contenido con la descripción del proyecto */}
        <ContentSection
          imageSrc={imgtodo}
          imageAlt="Logo"
          text="En el Centro Agropecuario 'La Granja del SENA Espinal, Regional Tolima', la unidad de Piscicultura ha avanzado en el manejo de inventario y la producción acuícola. Sin embargo, el uso de procesos manuales y herramientas como Excel ha causado ineficiencias y pérdida de datos importantes. Para abordar estos problemas y mejorar la eficiencia, el equipo de aprendices ha desarrollado GestiFish, una herramienta informática avanzada que optimiza la gestión de información, reduce errores y asegura datos precisos y actualizados."
          reverse={false}
        />
        
        <br />
        <br />
        <br />
        {/* Mover el segundo título al área deseada sobre la imagen */}
        <div className="title-over-image-container" style={{ position: 'relative' }}>
  <h1 style={{ ...titleOverImageStyle, top: '30%', left: '10%' }}>
    ¿Qué es GestiFish?
  </h1>
</div>

        <ContentSection
          imageSrc={img2}
          imageAlt="Estanques"
          text="GestiFish es una solución informática integral diseñada para optimizar el manejo de la información en la unidad de Piscicultura. Este innovador software permite una gestión eficiente de registros clave como alimentación, muestreo, cosecha, mortalidad, siembra, y más. Con su interfaz intuitiva y herramientas avanzadas, GestiFish facilita la integración del simulador para prever datos sobre siembra, alimentación y costos, mejorando así la toma de decisiones y la eficiencia operativa."
          reverse={true}
        />
      </section>
    </>
  );
};

// Componente Header reutilizable para los títulos de cada sección
const Header = ({ title }) => (
  <div className="text-center mb-5"> {/* Ajuste de margen */}
    <h1 style={styles.sectionHeader}>{title}</h1>
  </div>
);

// Componente ContentSection reutilizable para secciones de contenido
const ContentSection = ({ imageSrc, imageAlt, text, reverse }) => (
  <div className={`row align-items-center mb-5 ${reverse ? 'flex-row-reverse' : ''}`}> {/* Ajuste de margen */}
    <div className="col-md-5 text-center position-relative">
      <img 
        src={imageSrc} 
        alt={imageAlt} 
        className="img-fluid rounded" 
        style={styles.image} 
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
      />
    </div>
    <div className="col-md-7 text-center"> {/* Centramos el texto */}
      <p style={styles.textStyle}>{text}</p>
    </div>
  </div>
);

// Estilos en línea
const styles = {
  sectionHeader: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '3rem', // Aumentar tamaño del título
    color: '#000',
    marginBottom: '30px', // Aumentar margen inferior
  },
  image: {
    maxWidth: '450px', // Ajuste del tamaño de la imagen
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Animaciones para la imagen
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  textStyle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.2rem', // Aumentamos el tamaño del texto
    lineHeight: '1.8', // Aumentamos el interlineado para mejor legibilidad
    margin: '0 15px',
    textAlign: 'justify' // Justifica el texto
  }
};

// Estilo específico para posicionar el título sobre la imagen
const titleOverImageStyle = {
  position: '',
  top: '30%', // Ajusta este valor para mover el título hacia abajo
  left: '10%', // Ajusta este valor para mover el título hacia la izquierda
  transform: 'translate(0, -50%)', // Ajuste opcional según tu diseño
  color: '#000', // Cambié a negro, ajusta según prefieras
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente para legibilidad
  padding: '0px',
  borderRadius: '90px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 700,
  fontSize: '3rem',
  marginBottom: '20px',
};


export default HomePublica;
