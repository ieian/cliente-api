import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CRMContext } from "../../context/CRMContext";

const Header = () => {
    const history = useNavigate();

    const [auth, guardarAuth] =useContext(CRMContext);

    const cerrarSesion = () => {
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');

        history('/iniciar-sesion');
    }

    return(
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>YEYO - Pedidos de Camisas</h1>
                    { auth.auth ? (
                        <button type="button" className="btn btn-rojo" onClick={cerrarSesion}>
                            <i className="far fa-times-circle"></i>
                            Cerrar Sesion
                        </button>
                    ) : null }
                </div>
            </div>
        </header>
    )
}

export default Header;