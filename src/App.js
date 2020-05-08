import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  //citas en local Storage.
  //si no hay citas almacenadas, entonces creo unas citas iniciales
  let citasIniciales = JSON.parse(localStorage.getItem("citas")); //ATENCION: debe ser let
  if (!citasIniciales) {
    citasIniciales = [];
  }
  const [citas, setcitas] = useState(citasIniciales);
  console.log('CUANTAS VECES EJECUTA ESTO?');  
  
  //useEffect: para realizar operaciones cuando cambia un State
  //similar a componentDidMount y componentDidUpdateMount en una misma función
  useEffect(() => {
    localStorage.setItem("citas", JSON.stringify(citas))
  }, [citas]); //agrego la dependencia sobre citas, es decir, que haga esto  
  //unicamente cuando citas cambie de estado.
  //Si no agrego una dependencia creo que se queda en un ciclo infinito
 
  //state del arreglo de todas las citas

  const crearCita = (cita) => {
    setcitas([...citas, cita]);
  };

  const eliminarCita = (id) => {
    const citasMenosUna = citas.filter((cita) => cita.id !== id); //retorna citas que cumplen la condición
    setcitas(citasMenosUna);
  };
  
  const tituloCondicional =
    citas.length === 0 ? "Crea tu primera cita" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Gestor de pacientes</h1>
      <div className="container">
        <div className="row">
          {/* shortcut .half-column */}
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{tituloCondicional}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
