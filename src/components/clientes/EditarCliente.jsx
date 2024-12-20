import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

function EditarCliente(props) {
    const history = useNavigate();
    const { id } = useParams();

    const [cliente, datosClientes] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    const [cargando, setCargando] = useState(true);

    const { nombre, apellido, empresa, email, telefono} = cliente;

    useEffect(() => {
        const consultarAPI = async () => {
            try {
            const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
            datosClientes(clienteConsulta.data);
            } catch (error) {
                console.error('Error al consultar la API:', error);
            } finally {
                setCargando(false);
            }
        }
        consultarAPI();
    }, [id]);

    const actualizarState = e => {
        datosClientes({
            ...cliente, [e.target.name] : e.target.value
        })
    }

    const actualizarCliente = e => {
        e.preventDefault();

        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                if(res.data.code === 11000) {
                    Swal.fire({
                        title: "Hubo un error!",
                        text: 'Ese correo ya esta registrado',
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Correcto!",
                        text: "Se actualizo correctamente",
                        icon: "success"
                    });
                }
                history('/');
            }
        );
    }

    const validarCliente = () => {
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }

    if (cargando) return <Spinner />;

    return (
        <Fragment>
            <h2>Editar Cliente</h2>

            <form onSubmit={actualizarCliente}>
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
                    <input type="submit" className="btn btn-azul" value="Guardar Cambios" disabled={validarCliente()}/>
                </div>
            </form>
        </Fragment>
    )
}

export default EditarCliente;