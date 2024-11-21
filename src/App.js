import React, {Fragment} from 'react';

// Routing
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Layaout
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

// Componentes
////import Clientes from "./components/clientes/Clientes";
function App() {
  return (

      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />

          <main className="caja-contenido col-9">
         
          </main>
        </div>
      </Fragment>
    
  )
}

export default App;
