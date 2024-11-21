import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

function EditarProducto(props) {
    const history = useNavigate();
    const { id } = useParams();

    const [ producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    })

    useEffect(() => {
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);
            console.log(productoConsulta.data);
            guardarProducto(productoConsulta.data);
        }
        consultarAPI();
    }, []);

    return(
        <Fragment>
            <h2>Productos</h2>
        </Fragment>
    )
}
export default EditarProducto;