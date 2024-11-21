import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import Cliente from './Cliente';

function Clientes() {
    const [clientes, guardarClientes] = useState([]);

    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes');

        guardarClientes(clientesConsulta.data);
    };

    useEffect(() => {
        consultarAPI();
    }, [clientes]); 

    if(!clientes.length) return <Spinner />
    

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

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
