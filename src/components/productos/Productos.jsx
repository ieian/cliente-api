import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import Producto from './Producto';
import { CRMContext } from '../../context/CRMContext';

function Productos() {
    const history = useNavigate();
    const [productos, guardarProductos] = useState([]);
    const [auth, guardarAuth] =useContext(CRMContext);

    useEffect(()  => {
        if(auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    const productosConsulta = await clienteAxios.get('/productos', {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });

                    guardarProductos(productosConsulta.data);
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
    }, [productos]);

    if(!productos.length) return <Spinner />

    return(
        <Fragment>
            <h2>Productos</h2>

            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(producto => (
                    <Producto 
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </ul>
        </Fragment>
    )
}
export default Productos;