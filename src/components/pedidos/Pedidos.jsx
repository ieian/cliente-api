import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';
import { CRMContext } from '../../context/CRMContext';

function Pedidos() {
    const history = useNavigate();
    const [pedidos, guardarPedidos] = useState([]);
    const [auth, guardarAuth] =useContext(CRMContext);

    useEffect(() =>{
        if(auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    const pedidosConsulta = await clienteAxios.get('/pedidos', {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
    
                    guardarPedidos(pedidosConsulta.data);
                } catch (error) {
                    if(error.response.status === 500){
                        history('/iniciar-sesion');
                    }
                }
            };

            consultarAPI();        
        } else {
            history('/iniciar-sesion');
        } 
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