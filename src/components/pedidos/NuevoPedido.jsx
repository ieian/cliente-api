import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';


function NuevoPedido(props) {
    const history = useNavigate();
    const { id } = useParams();

    const [cargando, setCargando] = useState(true);
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);

    const { nombre, apellido, telefono} = cliente;

    const actualizarTotal = () => {
        if(productos.length === 0){
            guardarTotal(0);
            return;
        }

        let nuevoTotal = 0;

        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        guardarTotal(nuevoTotal);
    }

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

        actualizarTotal();
    }, [productos]);   

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

    const restarProducto = i => {
        const todosProductos = [...productos];

        if(todosProductos[i].cantidad === 0) return;

        todosProductos[i].cantidad--;

        guardarProductos(todosProductos);
    }

    const sumarProducto = i => {
        const todosProductos = [...productos];

        todosProductos[i].cantidad++;

        guardarProductos(todosProductos);
    }

    const eliminarProductoPedido = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id);

        guardarProductos(todosProductos);
    }
    
    const realizarPedido = async e => {
        e.preventDefault();

        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total" : total
        }

        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

        if(resultado.status === 200){
            Swal.fire({
                icon: "success",
                title: "Correcto",
                text: resultado.data.mensaje
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Hubo un error",
                text: "Vuelva a intentarlo"
            });
        }

        history('/pedidos');
    }
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
                        index={index}
                        sumarProducto={sumarProducto}
                        restarProducto={restarProducto}
                        eliminarProductoPedido={eliminarProductoPedido}
                    />
                ))}
            </ul>

            <p className='total'>Total a pagar: <span>$ {total}</span></p>

            { total > 0 ? (
                <form onSubmit={realizarPedido}>
                    <input type="submit" className="btn btn-verde btn-block" value="Realizar Pedido"/>
                </form>
            ) : null} 
        </Fragment>
    )   
}

export default NuevoPedido;