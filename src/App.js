import React, {Fragment, useContext} from 'react';

// Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Layaout
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

// Componentes
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";

import Productos from "./components/productos/Productos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";

import Pedidos from "./components/pedidos/Pedidos";
import NuevoPedido from "./components/pedidos/NuevoPedido";

import Login from "./components/auth/Login";
import { CRMContext, CRMProvider } from "./context/CRMContext";

function App() {
  
  const [auth, guardarAuth] = useContext(CRMContext);

  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion />

            <main className="caja-contenido col-9">
              <Routes>
                <Route exact path="/" Component={Clientes} />
                <Route exact path="/clientes/nuevo" Component={NuevoCliente} />
                <Route exact path="/clientes/editar/:id" Component={EditarCliente} />

                <Route exact path="/productos" Component={Productos} />
                <Route exact path="/productos/nuevo" Component={NuevoProducto} />
                <Route exact path="/productos/editar/:id" Component={EditarProducto} />

                <Route exact path="/pedidos" Component={Pedidos} />
                <Route exact path="/pedidos/nuevo/:id" Component={NuevoPedido} />

                <Route exact path="/iniciar-sesion" Component={Login} />
              </Routes>
            </main>
          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  )
}

export default App;
