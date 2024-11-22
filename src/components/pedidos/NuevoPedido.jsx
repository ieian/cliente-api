import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';


function NuevoPedido(props) {
    const { id } = useParams();

    const [cargando, setCargando] = useState(true);
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);

    const { nombre, apellido, telefono} = cliente;

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

    const buscarProducto = async e => {
        e.preventDefault();

        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        if(resultadoBusqueda.data[0]){
            let productoResultado = resultadoBusqueda.data[0];

            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            guardarProductos([...productos, productoResultado]);
        } else {
            Swal.fire({
                icon: "error",
                title: "No Resultados",
                text: "No hay resultados"
            });
        }
    }

    const leerDatosBusqueda = e => {
        guardarBusqueda( e.target.value );
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
                    {productos.map((producto, index) => (
                        <FormCantidadProducto 
                            key={producto.producto}
                            producto={producto}
                        />
                    ))}
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