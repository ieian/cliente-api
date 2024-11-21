import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

function EditarProducto(props) {
    const history = useNavigate();
    const { id } = useParams();

    const [ producto, datosProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

    const [cargando, setCargando] = useState(true);

    const { nombre, precio, imagen} = producto;

    const [archivo, guardarArchivo] = useState('');

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const productoConsulta = await clienteAxios.get(`/productos/${id}`);
                datosProducto(productoConsulta.data);
            } catch (error) {
                console.error('Error al consultar la API:', error);
            } finally {
                setCargando(false);
            }
        };
        consultarAPI();
    }, [id]);

    const leerInfoProducto = e => {
        datosProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] );
    }

    if (cargando) return <Spinner />;

    return(
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInfoProducto} defaultValue={nombre}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="1" placeholder="Precio" onChange={leerInfoProducto} defaultValue={precio}/>
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    { imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} alt='imagen' width="300" />
                    ) : null }
                    <input type="file"  name="imagen" onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Editar Producto" />
                </div>
            </form>
        </Fragment>
    )
}
export default EditarProducto;