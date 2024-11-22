import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

import DetallesPedido from './DetallesPedido';

function Pedidos() {
    const [pedidos, guardarPedidos] = useState([]);

    useEffect(() =>{
        const consultarAPI = async () => {
            const resultado = await clienteAxios.get('/pedidos');
    
            guardarPedidos(resultado.data);
        };

        consultarAPI();
    }, [pedidos]);

    const eliminarPedido = id => {
        Swal.fire({   
            title: "Estas seguro?",
            text: "Un pedido eliminado no se puede recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText: "Cancelar"          
        }).then((result) => {            
            if (result.value) {                             
                clienteAxios.delete(`/pedidos/${id}`).then(res => {
                    Swal.fire(
                        'Eliminado!',
                        'El pedido se ha eliminado.',
                        'success'
                    )
                })
            }
        })
    }

    return(
        <Fragment>
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                {pedidos.map(pedido => (
                    <DetallesPedido
                        key={pedido._id}
                        pedido={pedido}
                        eliminarPedido={eliminarPedido}
                    />
                ))}
            </ul>
        </Fragment>
    )
}
export default Pedidos;