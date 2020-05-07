import React, { Fragment, useState } from "react"; //shortcut "rafcp" react+propTypes
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types"; //shortcut "impt"

const Formulario = ({ crearCita }) => {
  const [cita, setcita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  //es conveniente usar un nuevo state, para separar formulario de error
  const [error, seterror] = useState(false);

  const actualizarState = (e) => {
    setcita({
      ...cita, //IMPORTANTE HACER usar spread operator para que no se reemplaze
      [e.target.name]: e.target.value, //ATENCION: se asgina al .name el .value
    });
  };
  //extraigo valores y los asigno a los value de los elementos del form, para facilitar el refresco de campos
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const onSubmitCita = (e) => {
    e.preventDefault();

    //valído
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      seterror(true);
      return; //IMPORTANTE USAR EL return para que se detenga la ejecución
    }
    seterror(false);

    //creo el id
    cita.id = uuid(); //agrego atributos a la cita (por qué no atraves del useState?)

    //creo la cita
    crearCita(cita);

    //refresco campos
    setcita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear cita</h2>
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={onSubmitCita}>
        <label htmlFor="">Nombre mascota</label>
        <input
          type="text"
          name="mascota"
          value={mascota}
          className="u-full-width"
          placeholder="nombre mascota"
          onChange={actualizarState}
        />

        <label htmlFor="">Propietario</label>
        <input
          type="text"
          name="propietario"
          value={propietario}
          className="u-full-width"
          placeholder="nombre del propietario mascota"
          onChange={actualizarState}
        />

        <label htmlFor="">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={fecha}
          className="u-full-width"
          onChange={actualizarState}
        />

        <label htmlFor="">Hora</label>
        <input
          type="time"
          name="hora"
          value={hora}
          className="u-full-width"
          onChange={actualizarState}
        />

        <label htmlFor="">Síntomas</label>
        {/* el textarea a diferencia del input, tiene más de una línea */}
        <textarea
          className="u-full-width"
          name="sintomas"
          value={sintomas}
          onChange={actualizarState}
        ></textarea>
        <button className="u-full-width button-primary" type="submit">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired, //ptfr
};

export default Formulario;
