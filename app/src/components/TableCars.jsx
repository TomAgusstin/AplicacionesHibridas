import { Navigate, useNavigate } from "react-router-dom";

function TableCars(autos) {
    const navigate = useNavigate();
    const endPoint = 'http://127.0.0.1:3000/autos';
    const token = localStorage.getItem('token');
    
    async function deleteAuto(id) {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await fetch(`${endPoint}/${id}`, options);

            if (!response) {
                alert('Error al eliminar auto');
                return;
            }

            const { data } = await response.json();
            console.table(data);
            autos.setCars();
            autos.mensaje = "Auto eliminado con exito";
            autos.tipoAlerta = "alert-success"

            // setUser({...user, nombre: '', email: '', password:''})
        }
        catch (er) {
            console.error(er);
        }
    }

const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este auto?')) {
        deleteAuto(id);
    }
};

    return (
        <>
            {
                                
                <tr key={autos._id}>
                    <td>{autos.marca}</td>
                    <td>{autos.modelo}</td>
                    <td>  
                            {autos.categoriaId.titulo} - {autos.categoriaId.estado}
                        </td>
                    <td>
                        <ul>
                            {autos.infoPrecio.map(precio => (
                                <li key={precio._id}>
                                    {precio.tipoCuota}: ${precio.precio.toLocaleString('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
                                </li>
                            ))}
                        </ul>
                    </td>
                    <td>{autos.alicuota.toLocaleString('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}</td>
                    <td>
                        <button className="btn btn-primary" type="button" onClick={() => { navigate(`/editarAuto/${autos._id}`) }}>
                            <i className="bi bi-pen-fill"></i>
                        </button>
                    </td>
                    <td>
                        <button  className="btn btn-primary" type="button" onClick={() => handleDelete(autos._id)}>
                           <i className="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>

            }
        </>
    )
}

export default TableCars;