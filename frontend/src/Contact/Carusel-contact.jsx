import React from "react";
import BarraNavegacionPublica from "../home/barraNavegacionPublica";

const CaruselContact = () => {
    return (
        <>
            <BarraNavegacionPublica />
            <link href="Init-Contacts.css" rel="stylesheet" />
            <div className="container marketing">

                <br />
                <br />
                <div id="text-descripcion">
                    <h4>Somos un equipo comprometido por mejorar y gestionar de manera más eficiente los procesos en la Unidad de Piscicultura del SENA Centro Agropecuario "La Granja". Con nuestro proyecto GestiFish, hemos creado una solución integral que cubre todo, desde el control de la siembra y alimentación, hasta el seguimiento de la mortalidad y el muestreo de peces. Nuestro objetivo es ofrecer una herramienta tecnológica que impulsen la productividad y garanticen la sostenibilidad en la Unidad de Piscicultura.</h4>
                </div>
                <hr className="featurette-divider"></hr>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="text-center">
                            <img src="/src/IMG/" alt="Yair Alexander Cardenas Guzman" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)" /></svg> */}
                            <h2 className="fw-normal">Yair Alexander Cardenas Guzman</h2>
                            <h3>Gerente</h3>
                            <p>Tengo 18 años, Soy de Flandes Tolima</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="text-center">
                            <img src="/src/IMG/Valentina.jpg" alt="Paula Valentina Muñoz Duran" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)" /></svg> */}
                            <h2 className="fw-normal">Paula Valentina Muñoz Duran</h2>
                            <h3>Sub-Gerente</h3>
                            <p>Tengo 21 años, Soy de Ibague Tolima</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="text-center">
                            <img src="/src/IMG/JuanDavid.jpg" alt="Juan David Rodriguez Barrero" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)" /></svg> */}
                            <h2 className="fw-normal">Juan David Rodriguez Barrero</h2>
                            <h3>Análista y Desarrollador</h3>
                            <p>Tengo 18 años, Soy de Flandes Tolima</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="text-center">
                            <img src="/src/IMG/Shirel.jpg" alt="Shirel Daniela Oyuela Saavedra" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)" /></svg> */}
                            <h2 className="fw-normal">Shirel Daniela Oyuela Saavedra</h2>
                            <h3>Análisita y Desarrolladora</h3>
                            <p>Tengo 18 años, Soy de Ibague Tolima</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="text-center">
                            <img src="/src/IMG/Saul.jpg" alt="Saúl Andrés Hernandez Acosta" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)" /></svg> */}
                            <h2 className="fw-normal">Saúl Andrés Hernandez Acosta</h2>
                            <h3>Análista y Desarrollador</h3>
                            <p>Tengo 23 años, Soy de Cajamarca Tolima</p>
                        </div>
                    </div>
                </div>



                <hr className="featurette-divider" />
                {/* FOTTER  */}
                <footer className="container">
                    <p className="float-end"><a href="#">Back to top</a></p>
                </footer>

            </div>
        </>
    );
}

export default CaruselContact;