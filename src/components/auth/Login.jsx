import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function Login() {
    const history = useNavigate();
    const [credenciales, guardarCredenciales] = useState({});

    const iniciarSesion = async e => {
        e.preventDefault();

        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            
            const { token } = respuesta.data;
            localStorage.setItem('token',token);

            Swal.fire({
                icon: "success",
                title: "Login Correcto",
                text: 'Has iniciado sesion'
            });

            history('/');

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Hubo un error",
                text: error.response.data.mensaje
            });
        }
    }

    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div className='login'>
            <h2>Iniciar Sesion</h2>

            <div className="contenedor-formulario">
                <form onSubmit={iniciarSesion}>
                    <div className="campo">
                        <label>Email</label>
                        <input type="text" name="email" placeholder='Email para Iniciar Sesion' required onChange={leerDatos}/>
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input type="password" name="password" placeholder='Password para Iniciar Sesion' required onChange={leerDatos}/>
                    </div>

                    <input type="submit" value="Iniciar Sesion" className='btn btn-verde btn-block'/>
                </form>
            </div>
        </div>
    )
}

export default Login;