import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProductsContainer from '../components/ProductsContainer';
import ButtonPrimary from '../components/ButtonPrimary';
import Alert from '../components/Alert';

function Category()
{

const endPoint = 'http://127.0.0.1:3000/categorias';
const [cat, setCat] = useState([]);
// const [user, setUser] = useState({nombre: '', email: '', password:''});
const navigate = useNavigate();
const {logout} = useContext(AuthContext);
const token = localStorage.getItem('token');
const location = useLocation();
const mensaje = location.state?.mensaje;
const tipo = location.state?.tipo;
const [error, setError] = useState(null);

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
            setError("Categoria eliminada con exito");
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

const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
        deleteCat(id);
    }
};

    return(
        <>
                <h2>Panel de Categorias</h2>
                <hr />
                <ButtonPrimary
                    to="/nuevaCategoria"
                    label="Nueva Categoria"
                />
            {mensaje && <Alert
                                tipoAlerta={tipo}
                                texto={mensaje}
                                dismissAlert={mensaje}
            />}
              {error && 
                            <Alert
                                tipoAlerta="alert-danger"
                                texto={error}
                                dismissAlert={setError}
                            />
                            }
            <ProductsContainer>
<table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Estado</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        
                              {
                                cat != null && cat.map(c => (
                                <tr key={c._id}>
                                    <td>{c.titulo}</td>
                                    <td>{c.estado}</td>
                                    <td>
                                    <button className='btn btn-primary' onClick={() => {navigate(`/editarCategoria/${c._id}`)}} >
                                        <i className='bi bi-pen-fill'></i>
                                    </button>
                                    </td>
                                    <td>
                                    <button className='btn btn-primary'  onClick={() => handleDelete(c._id)}>  <i className='bi bi-trash-fill'></i></button>
                                    </td>
                                </tr>
                                ))
                            }
                        
                    </tbody>
                </table>
            </ProductsContainer>
                

        </>
        
    )
};

export default Category;