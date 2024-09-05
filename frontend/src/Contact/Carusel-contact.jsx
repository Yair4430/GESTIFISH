import React from "react";
// import BarraNavegacionPublica from "../home/barraNavegacionPublica";

const CaruselContact = () => {
  const teamMembers = [
    {
      img: "/src/IMG/Yair.jpg",
      alt: "Yair Alexander Cardenas Guzman",
      name: "Yair Alexander Cardenas Guzman",
      title: "Gerente",
      birthdate: "2006-05-25", // Fecha de nacimiento en formato YYYY-MM-DD
      place: "Soy de Flandes Tolima"
    },
    {
      img: "/src/IMG/Valentina.jpg",
      alt: "Paula Valentina Muñoz Duran",
      name: "Paula Valentina Muñoz Duran",
      title: "Sub-Gerente",
      birthdate: "2002-12-31",
      place: "Soy de Ibague Tolima"
    },
    {
      img: "/src/IMG/Shirel.jpg",
      alt: "Shirel Daniela Oyuela Saavedra",
      name: "Shirel Daniela Oyuela Saavedra",
      title: "Analista y Desarrolladora",
      birthdate: "2006-09-02",
      place: "Soy de Ibague Tolima"
    },
    {
      img: "/src/IMG/JuanDavid.jpg",
      alt: "Juan David Rodriguez Barrero",
      name: "Juan David Rodriguez Barrero",
      title: "Analista y Desarrollador",
      birthdate:"2005-03-31",
      place: "Soy de Flandes Tolima"
    },
    {
      img: "/src/IMG/Saul.jpg",
      alt: "Saúl Andrés Hernandez Olaya",
      name: "Saúl Andrés Hernandez Olaya",
      title: "Analista y Desarrollador",
      birthdate: "2001-08-25",
      place: "Soy de Cajamarca Tolima"
    }
  ];
  

  return (
    <>
      {/* <BarraNavegacionPublica /> */}
      <div style={{
        paddingTop: '3rem',
        paddingBottom: '3rem',
        color: '#333',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Poppins, sans-serif'
      }}>
        {/* Título de la sección */}
        <h2 style={styles.sectionHeader}>¿Quiénes Somos?</h2>

        {/* Contenedor flex para el texto y la imagen */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '4rem', // Espacio entre los títulos
          padding: '0 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Columna de texto */}
          <div style={{
            flex: '1 1 50%',
            paddingRight: '5rem',
            boxSizing: 'border-box'
          }}>
            <p style={styles.textStyle}>
              Un equipo comprometido con mejorar y gestionar de manera más eficiente los procesos en la Unidad de Piscicultura del SENA Centro Agropecuario "La Granja". Con nuestro proyecto GestiFish, hemos creado una solución integral que cubre todo, desde el control de la siembra y alimentación, hasta el seguimiento de la mortalidad y el muestreo de peces. Nuestro objetivo es ofrecer una herramienta tecnológica que impulse la productividad y garantice la sostenibilidad en la Unidad de Piscicultura.
            </p>
          </div>

          {/* Columna de imagen */}
          <div style={{
            flex: '1 1 50%',
            textAlign: 'center'
          }}>
            <img 
              src="/src/IMG/ImagenGrupalActualizada.jpeg" 
              alt="Foto grupal del equipo"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }} 
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
        </div>
        <br/><br/><br/>

        {/* Título "Integrantes" */}
        <h2 style={styles.sectionHeader}>Integrantes Del Proyecto</h2>
        <br/>

        {/* Filas de miembros del equipo */}
        <div className="row text-center justify-content-center">
          {/* Primera fila */}
          {teamMembers.slice(0, 3).map((member, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={index} style={{ margin: '0 15px' }}>
              <div style={{
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                borderRadius: '10px',
                backgroundColor: '#fff',
                textAlign: 'center',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}>
                <img 
                  src={member.img} 
                  alt={member.alt} 
                  style={{
                    objectFit: 'cover',
                    display: 'block',
                    margin: '0 auto',
                    border: '3px solid #ddd',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '50%',
                    width: '140px',
                    height: '140px',
                    marginBottom: '1.5rem',
                    transition: 'transform 0.3s ease-in-out'
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <h4 style={styles.memberName}>{member.name}</h4>
                <h5 style={styles.memberTitle}>{member.title}</h5>
                <p style={styles.memberDescription}> Tengo {calculateAge(member.birthdate)} años, {member.place}</p>
      </div>
            </div>
          ))}
        </div>

        {/* Segunda fila */}
        <div className="row text-center justify-content-center">
          {teamMembers.slice(3).map((member, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={index + 3} style={{ margin: '0 15px' }}>
              <div style={{
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                borderRadius: '10px',
                backgroundColor: '#fff',
                textAlign: 'center',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}>
                <img 
                  src={member.img} 
                  alt={member.alt} 
                  style={{
                    objectFit: 'cover',
                    display: 'block',
                    margin: '0 auto',
                    border: '3px solid #ddd',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '50%',
                    width: '140px',
                    height: '140px',
                    marginBottom: '1.5rem',
                    transition: 'transform 0.3s ease-in-out'
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <h4 style={styles.memberName}>{member.name}</h4>
                <h5 style={styles.memberTitle}>{member.title}</h5>
                <p style={styles.memberDescription}>Tengo {calculateAge(member.birthdate)} años, {member.place}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

// Estilos en línea
const styles = {
  sectionHeader: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '2.5rem',
    color: '#000',
    textAlign: 'center', // Asegura que el texto esté centrado
    marginBottom: '3rem', // Ajusta el margen inferior para mantener el espacio adecuado
  },
  textStyle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.2rem',
    lineHeight: '1.8',
    margin: '0 auto',
    maxWidth: '600px', // Limita el ancho para mejorar la legibilidad
    textAlign: 'justify' // Justifica el texto
  },
  memberName: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  memberTitle: {
    fontFamily: 'Poppins, sans-serif',
    color: '#6c757d',
    fontSize: '16px',
  },
  memberDescription: {
    fontFamily: 'Poppins, sans-serif',
    color: '#6c757d',
    fontSize: '15px',
  }
};

export default CaruselContact;
