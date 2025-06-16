import { Navigate, useNavigate } from "react-router-dom";

function TableCars(autos)
{
    const navigate = useNavigate();
    const endPoint = 'http://127.0.0.1:3000/autos';
    async function deleteAuto(id){
    const options = {
        method: 'DELETE',
        headers: {
                    Authorization: `Bearer ${token}`
                }
    }
    try{
       const response =  await fetch(`${endPoint}/${id}`, options);
       
       if(!response)
            {
                alert('Error al eliminar auto');
                return;
            }

            const {data} = await response.json();
            console.table(data);
            // getUsers();

            // setUser({...user, nombre: '', email: '', password:''})
    }
    catch(er)
    {
        console.error(er);
    }
}
    return(
        <>
                {
                    
                        <tr key={autos._id}>
                            <td>{autos.marca}</td>
                            <td>{autos.modelo}</td>
                            <td>-</td>
                            <td>{autos.alicuota}</td>
                            <td>
                                <button type="button" onClick={() => {navigate(`/editarAuto/${autos._id}`)}}>EDITAR</button>
                            </td>
                            <td>
                                <button type="button" onClick={() => deleteAuto(autos._id)}>ELIMINAR</button>
                            </td>
                        </tr>
                    
                }
        </>
    )
}

export default TableCars;