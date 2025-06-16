import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Category()
{

const endPoint = 'http://127.0.0.1:3000/categorias';
const [cat, setCat] = useState([]);
// const [user, setUser] = useState({nombre: '', email: '', password:''});
const navigate = useNavigate();
const {logout} = useContext(AuthContext);
const token = localStorage.getItem('token');

async function getCategorias(){
    try{
        
            const options = {
                 headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(endPoint, options);
            
            if(!response)
            {
                console.error('Error obteniendo las categorias');
                return;
            }

            const {data} = await response.json();
            console.table(data);
            setCat(data);
    }
    catch(ex)
    {
        console.error(error);
    }
};

async function deleteCat(id){
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
                console.error('Error al eliminar la categoria');
                return;
            }

            const {data} = await response.json();
            console.table(data);
            getCategorias();
    }
    catch(er)
    {
        console.error(er);
    }
}



useEffect(  () => {
    getCategorias();
}, token)

    return(
        <>
                <h2>Panel de Categorias</h2>
                <hr />
            <button onClick={ () => { navigate('/nuevaCategoria')}}> Nueva categoria</button>
           {
            token != null && 
            (
                <button onClick={ () => { logout() }}> Cerrar sesion</button>
            )
            } 
            
            
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                              {
                                cat != null && cat.map(c => (
                                <tr key={c._id}>
                                    <td>{c.titulo}</td>
                                    <td>{c.estado}</td>
                                    <td>
                                    <button onClick={() => {navigate(`/editarCategoria/${c._id}`)}} >E</button>
                                    </td>
                                    <td>
                                    <button onClick={() => deleteCat(c._id)}>D</button>
                                    </td>
                                </tr>
                                ))
                            }
                        
                    </tbody>
                </table>

        </>
        
    )
};

export default Category;