import imgtodo from '../IMG/FOTOGRUPAL.png.jpeg'



const Home = () => {
  return (
    <>
     <section className="seccion active align-items-center mt-4">
      <center>
      <h1>Bienvenido al Software Unidad de Piscicultura</h1>
      </center>
      <center>
      <p className="m-4 lead custom-font">La unidad de Piscicultura del Centro Agropecuario "La Granja del SENA Espinal Regional Tolima"</p>
      </center>
      <center>
      <img src={imgtodo} alt="Logo" style={{ width: '465px', height: '340px' }}/>
      </center>

      
      <br />
      <br />
      </section>

    </>
  );
}

export default Home;
