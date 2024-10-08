import React from 'react';
import Slider from 'react-slick'; // Importa el componente Slider
import imgtodo from '/Imagenes/ImagenGrupalActualizada.jpeg';
import Cachama from '/Imagenes/Cachamas.jpeg';
import Estanque1 from '/Imagenes/Estanque1.jpeg';
import Estanque from '/Imagenes/Estanque.jpeg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Home.css'; // Archivo CSS personalizado

const Home = () => {
  const settings = {
    dots: true,  // Muestra los puntos de navegación
    infinite: true,  // Permite el desplazamiento infinito
    speed: 500,  // Velocidad de transición
    slidesToShow: 3,  // Cantidad de imágenes a mostrar
    slidesToScroll: 1,  // Número de imágenes a desplazar por vez
    autoplay: true,  // Reproducción automática
    autoplaySpeed: 3000,  // Velocidad de reproducción automática
    responsive: [ // Configuraciones para diferentes tamaños de pantalla
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="home-section active align-items-center mt-4">
      <div className="text-center">
        <h1 className="home-title">
          ¡Bienvenido al Software Unidad de Piscicultura!
        </h1>
        <p className="home-subtitle lead custom-font">
          La unidad de Piscicultura del Centro Agropecuario "La Granja del SENA Espinal Regional Tolima" le da la más cordial bienvenida.
        </p>
        <p className="home-description">
          Aquí podrás gestionar todas las actividades relacionadas con la piscicultura de manera eficiente y sencilla. 
          Nos enorgullece ser parte de tu desarrollo y crecimiento en este campo.
        </p>
        
        {/* Carrusel de Imágenes */}
        <div className="gallery-container">
          <Slider {...settings} className="gallery">
            <div>
              <img src={imgtodo} alt="Imagen Grupal de la Unidad de Piscicultura" className="gallery-item" />
            </div>
            <div>
              <img src={Cachama} alt="Cachamas en estanque" className="gallery-item" />
            </div>
            <div>
              <img src={Estanque1} alt="Primer Estanque" className="gallery-item" />
            </div>
            <div>
              <img src={Estanque} alt="Vista del Estanque" className="gallery-item" />
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Home;
