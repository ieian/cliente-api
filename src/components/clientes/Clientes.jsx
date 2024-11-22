import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import Cliente from './Cliente';
import { CRMContext } from '../../context/CRMContext';

function Clientes() {
    const history = useNavigate();
    const [clientes, guardarClientes] = useState([]);
    const [auth, guardarAuth] =useContext(CRMContext);

    useEffect(() => {
        if(auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
        
                    guardarClientes(clientesConsulta.data);
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
    }, [clientes]); 

    if(!auth.auth) { history('/iniciar-sesion'); }

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
