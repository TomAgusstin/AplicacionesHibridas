import { useState } from 'react'

function UserNew()
{

const endPoint = 'http://127.0.0.1:3000/users';
const [user, setUser] = useState({nombre: '', email: '', password:''});

function handlerChange(e){
    const value = e.target.value;
    const key = e.target.name;
    
    setUser({ ...user, [key]: value});
    console.log({user});
}

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


    return(
        <>
                <h2>Nuevo usuario</h2>

                            <hr />
                <form onSubmit={addUser}>
                            <label htmlFor='nombre'>Nombre</label><input type="text" name="nombre" value={user.nombre} onChange={handlerChange}/>
                                
                            <label htmlFor='email'>Email</label><input type="email" name="email" value={user.email} onChange={handlerChange}/>
                                    
                            <label htmlFor='password'>Password</label><input type="password" name="password" value={user.password} onChange={ handlerChange}/>

                            <button type='submit'>Guardar usuario</button>
                </form>
        </>
        
    )
};

export default UserNew;