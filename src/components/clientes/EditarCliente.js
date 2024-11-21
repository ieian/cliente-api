import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function EditarCliente(props) {
    const { id } = useParams();

    const [cliente, datosClientes] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

        datosClientes(clienteConsulta.data);
    }

    useEffect( () => {
        consultarAPI();
    }, []);

    const actualizarState = e => {
        datosClientes({
            ...cliente, [e.target.name] : e.target.value
        })
    }

    const validarCliente = () => {
        const { nombre, apellido, empresa, email, telefono} = cliente;

        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }

    return (
        <Fragment>
            <h2>Editar Cliente</h2>

            <form>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} value={cliente.nombre}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} value={cliente.apellido}/>
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} value={cliente.empresa}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} value={cliente.email}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} value={cliente.telefono}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar Cambios" disabled={validarCliente() }/>
                </div>
            </form>
        </Fragment>
    )
}

export default EditarCliente;