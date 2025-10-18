import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProductsContainer from '../components/ProductsContainer';
import ButtonPrimary from '../components/ButtonPrimary';
import Alert from '../components/Alert';
// let users = [{id: 1, nombre: 'Tom', email: 'asd@gmail.com'},
//                 {id:2, nombre: 'Lu', email: 'asdasd@gmail.com'}
// ]

function Dashboard()
{

const endPoint = 'http://127.0.0.1:3000/users';
const [users, setUsers] = useState([]);
// const [user, setUser] = useState({nombre: '', email: '', password:''});
const navigate = useNavigate();
const {logout} = useContext(AuthContext);
const token = localStorage.getItem('token');
const [error, setError] = useState(null);

const location = useLocation();
const mensaje = location.state?.mensaje;
const tipo = location.state?.tipo;

async function getUsers(){
    try{
        
            const options = {
                 headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(endPoint, options);
            
             if (!response.ok) {
                if (response.status === 403) {
                    localStorage.removeItem('token');
                    throw new Error('Acceso denegado. No tenés permiso para ver esta información (su sesión expiro o no tiene permiso).');
                } else if (response.status === 401) {
                    localStorage.removeItem('token');
                    throw new Error('No estás autorizado. Iniciá sesión nuevamente.');
                } else {
                    throw new Error(`Error inesperado: ${response.status}`);
                }
            }

            const {data} = await response.json();
            console.table(data);
            setUsers(data);
    }
    catch(ex)
    {
        console.error(ex);
        setError(ex.message);
    }
};

async function deleteUser(id){
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
                console.error('Error al eliminar usuario');
                return;
            }

            const {data} = await response.json();
            console.table(data);

            setError("Usuario eliminado con exito");
            getUsers();
            console.log(error)
            // setUser({...user, nombre: '', email: '', password:''})
    }
    catch(er)
    {
        console.error(er);
    }
}

useEffect(  () => {
    getUsers();

}, token)

    return(
        <>
                <h2>Dashboard</h2>
                <hr />
        </>
        
    )
};

export default Dashboard;