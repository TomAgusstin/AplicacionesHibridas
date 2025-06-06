import { useState, useEffect } from 'react'

// let users = [{id: 1, nombre: 'Tom', email: 'asd@gmail.com'},
//                 {id:2, nombre: 'Lu', email: 'asdasd@gmail.com'}
// ]

function Users()
{

const endPoint = 'http://127.0.0.1:3000/users';
const [users, setUsers] = useState([]);
const [user, setUser] = useState({nombre: '', email: '', password:''});

async function addUser(event){
    event.preventDefault();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    try{
       const response =  await fetch(endPoint, options);
       
       if(!response)
            {
                console.error('Error al guardar usuario');
                return;
            }

            const {data} = await response.json();
            console.table(data);
            getUsers();

            setUser({...user, nombre: '', email: '', password:''})
    }
    catch(er)
    {
        console.error(er);
    }
}

    async function getUsers(){
    try{
            const response = await fetch(endPoint);
            
            if(!response)
            {
                console.error('Error obteniendo los datos');
                return;
            }

            const {data} = await response.json();
            console.table(data);
            setUsers(data);
    }
    catch(ex)
    {
        console.error(error);
    }
};

useEffect(  () => {
    getUsers();
}, {}    )

    return(
        <>
                <h2>Inicio de Usuarios</h2>
                <hr />

                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                            {
                                users.map( user => <tr key={user._id}><td>{user.nombre}</td><td>{user.email}</td></tr>)
                            }
                        
                    </tbody>
                </table>

                            <hr />
                <form onSubmit={addUser}>
                            <label htmlFor='nombre'>Nombre</label><input type="text" value={user.nombre} onChange={(e)=> { setUser({...user, nombre: e.target.value})}}/>
                                
                            <label htmlFor='email'>Email</label><input type="email" value={user.email} onChange={(e)=> { setUser({...user, email: e.target.value})}}/>
                                    
                            <label htmlFor='password'>Password</label><input type="password" value={user.password} onChange={(e)=> { setUser({...user, password: e.target.value})}}/>

                            <button type='submit'>Guardar usuario</button>
                </form>
        </>
        
    )
};

export default Users;