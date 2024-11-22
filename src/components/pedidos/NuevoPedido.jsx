import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import FormBuscarProducto from '../productos/FormBuscarProducto';

function NuevoPedido(props) {
    const { id } = useParams();

    const [cargando, setCargando] = useState(true);

    const [cliente, guardarCliente] = useState({

    });

    const { nombre, apellido, empresa, email, telefono} = cliente;


    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const resultado = await clienteAxios.get(`/clientes/${id}`);
                guardarCliente(resultado.data);
            } catch (error) {
                console.error('Error al consultar la API:', error);
            } finally {
                setCargando(false);
            }
        }
        consultarAPI();
    }, [id]);   

    const buscarProducto = () => {

    }

    const leerDatosBusqueda = () => {

    }

    if (cargando) return <Spinner />;

    return(
        <Fragment>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {nombre} {apellido}</p>
                <p>Telefono: {telefono}</p>
            </div>

                <FormBuscarProducto
                    buscarProducto={buscarProducto}
                    leerDatosBusqueda={leerDatosBusqueda}
                />

                <ul className="resumen">
                    <li>
                        <div className="texto-producto">
                            <p className="nombre">Macbook Pro</p>
                            <p className="precio">$250</p>
                        </div>
                        <div className="acciones">
                            <div className="contenedor-cantidad">
                                <i className="fas fa-minus"></i>
                                <input type="text" name="cantidad" />
                                <i className="fas fa-plus"></i>
                            </div>
                            <button type="button" className="btn btn-rojo">
                                <i className="fas fa-minus-circle"></i>
                                    Eliminar Producto
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="texto-producto">
                            <p className="nombre">Macbook Pro</p>
                            <p className="precio">$250</p>
                        </div>
                        <div className="acciones">
                            <div className="contenedor-cantidad">
                                <i className="fas fa-minus"></i>
                                <input type="text" name="cantidad" />
                                <i className="fas fa-plus"></i>
                            </div>
                            <button type="button" className="btn btn-rojo">
                                <i className="fas fa-minus-circle"></i>
                                    Eliminar Producto
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="texto-producto">
                            <p className="nombre">Macbook Pro</p>
                            <p className="precio">$250</p>
                        </div>
                        <div className="acciones">
                            <div className="contenedor-cantidad">
                                <i className="fas fa-minus"></i>
                                <input type="text" name="cantidad" />
                                <i className="fas fa-plus"></i>
                            </div>
                            <button type="button" className="btn btn-rojo">
                                <i className="fas fa-minus-circle"></i>
                                    Eliminar Producto
                            </button>
                        </div>
                    </li>
                </ul>
            <div className="campo">
                <label>Total:</label>
                <input type="number" name="precio" placeholder="Precio" readOnly="readOnly" />
            </div>
            <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
            </div>
        </Fragment>
    )   
}

export default NuevoPedido;