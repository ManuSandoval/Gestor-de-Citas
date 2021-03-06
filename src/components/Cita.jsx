import React from "react"; //shortcut "rafcp" react+propTypes
import PropTypes from "prop-types"; //shortcut "impt"

const Cita = ({ cita, eliminarCita }) => (
  <div className="cita">
    <p>
      Mascota: <span>{cita.mascota}</span>
    </p>
    <p>
      Propietario: <span>{cita.propietario}</span>
    </p>
    <p>
      Fecha: <span>{cita.fecha}</span>
    </p>
    <p>
      Hora: <span>{cita.hora}</span>
    </p>
    <p>
      Sintomas: <span>{cita.sintomas}</span>
    </p>

    <button
      className="button eliminar u-full-width"
      onClick={() => eliminarCita(cita.id)} //NO sé si hay que hacer así en todos los onClick
    >
      Eliminar cita
    </button>
  </div>
);

Cita.propTypes = {
  cita: PropTypes.object.isRequired, //ptor
  eliminarCita: PropTypes.func.isRequired, //ptfr
};

export default Cita;
