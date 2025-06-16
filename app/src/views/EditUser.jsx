import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';



function EditUser (){
    const endpoint = 'http://127.0.0.1:3000/users'
    const [ user, setUser] = useState({nombre: '', email: '', password: ''})
    const {id} = useParams();
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    async function getUserById(){
        try {
            const options = {
                 headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(`${endpoint}/${id}`, options);
            if( !response.ok){
                alert('Error al solicitar el usuarios')
                return
            } 
            const {data} = await response.json();
            setUser( data );
            
            console.log(data);
    
        } catch (error) {
            console.error(error);
            alert('Error en el servidor');
        }
    }
    useEffect(  () => {
       
        getUserById();

    }, [] )




    function handlerChange ( e) {
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    
async function editUser(e){
    e.preventDefault();
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    try{
       const response =  await fetch(`${endpoint}/${id}`, options);
       
       if(!response)
            {
                console.error('Error al editar usuario');
                return;
            }

            const data = await response.json();
           
            setUser({...user, name: ''});
            // Navegación 
            navigate('/users');
            // setUser({...user, nombre: '', email: '', password:''})
    }
    catch(er)
    {
        console.error(er);
    }
}



    return (
        <>
            <h2> Actualizar Usuario {id}</h2>
            <hr />

            <form onSubmit={ editUser }>
                <label htmlFor="name">Nombre</label>
                <input
                    name='nombre' 
                    value={user.nombre}
                    type="text" 
                    onChange={ handlerChange }
                />

                <label htmlFor="email">Email</label>
                <input 
                    name='email'
                    value={user.email}
                    onChange={ handlerChange }
                    type="email" 
                />

                <label htmlFor="password">Contraseña</label>
                <input 
                    name='password'
                    value={user.password}
                    onChange={ handlerChange }
                    type="password" 
                />

                <button type='submit'>Guardar</button>
            </form>
        
        </>
    )
}

export default EditUser;