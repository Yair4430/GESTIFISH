import imagen_tabla from '../GESTI.png';

const Formularios = () => {
  return (
    <>
     <section className="seccion active align-items-center mt-4">
      <center>
      <h1>Unidad de Piscicultura</h1>
      </center>
      <p className="m-4 lead custom-font">La unidad de Piscicultura del Centro Agropecuario "La Granja del SENA Espinal Regional Tolima" ha logrado un importante avance en el manejo del inventario de los peces bajo la dirección del instructor Carlos Gutiérrez En la unidad se manejan registros de: Inventario, Alimentación, Mortalidad, Muestreo, Cosecha, Producción y Traslado. Teniendo en cuenta la información de la tabla se tiene un aproximado de 750 peces de las especies tilapia roja y cachama negra.</p>
      <center>
      <img src={imagen_tabla} alt="Logo" style={{ width: '355px', height: '300px' }}/>
      </center>
      <br />
      <br />
      <p className="m-4 lead custom-font">Actualmente la información se maneja de forma manual y utilizando herramientas ofimáticas como Excel, a cargo de pasantes, aprendices, adicionalmente se lleva un cronograma en Excel donde se registran las actividades a realizar en la unidad, por lo anterior se están generando pérdidas parcial o total de la información en el momento de pasarlos a Sena Empresa, por el caso se lleva de manera impresa, en donde posiblemente se puede perder o dañar los formatos o las plantillas. Por tal razón para dar solución a esta problemática aprendices del programa ADSI (2012) desarrollaron SIRPEC, y los aprendices del programa ADSI del (2017) le realizaron una actualización llamada SIRPEC 2.0 pero a la fecha no ha sido funcional por la falta de interacción por parte del personal de la unidad. El software ha sido desarrollado en PHP y MySQL.
            La unidad requiere que se desarrolle una herramienta informática que sea funcional que le permita gestionar la información proveniente de la unidad de manera eficiente y oportuna, ya que las anteriores versiones el software no funciono por falta de uso y mantenimiento. Por lo anterior los aprendices del programa ADSO Ficha: 2671143 deciden desarrollar el software “GestiFish” en el marco del proyecto formativo, proporcionando una solución informática a esta problemática en una herramienta fácil y sobre todo funcional y operativa. Evitando a que se quede en un proyecto más, sino que sea utilizada por los involucrados en la unidad de piscicultura.</p>
      </section>

    </>
  );
}

export default Formularios;
