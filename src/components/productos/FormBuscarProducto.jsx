import React from 'react';

function FormBuscarProducto(props) {
    return(
        <form onSubmit={props.FormBuscarProducto}>
            <legend>Busca un Producto y agrega una cantidad</legend>

            <div className="campo">
                <label>Productos:</label>
                <input type="text" placeholder="Nombre Productos" name="productos" onChange={props.leerDatosBusqueda}/>
            </div>
            
            <input type="sumit" className='btn btn-azul btn-block' defaultValue="Buscar Producto"/>
        </form>
    )
}

export default FormBuscarProducto;