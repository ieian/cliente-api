import React, { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';

function Clientes() {
    const [clientes, guardarClientes] = useState([]);

    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes');

        guardarClientes(clientesConsulta.data);
    };

    useEffect(() => {
        consultarAPI();
    }, []); 

    return (
        <Fragment>
            <h2>Clientes</h2>

            <ul className='listado-clientes'>
                {clientes.map(cliente => (
                    <Cliente 
                        key={cliente._id}
                        cliente = {cliente}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Clientes;
