import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login()
{

const endPoint = 'http://127.0.0.1:3000/users';
const [user, setUser] = useState({email: '', password:''});
const {login} = useContext(AuthContext);
const navigate = useNavigate();

function handlerForm(e){
    e.preventDefault();
    addUser(user);
}

function handlerChange(e){
    const value = e.target.value;
    const key = e.target.name;
    
    setUser({ ...user, [key]: value});
    console.log({user});
}


async function addUser(user){
    // event.preventDefault();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    try{
       const response =  await fetch(`${endPoint}/auth`, options);
       
       if(!response)
            {
                console.error('Error al ingresar usuario');
                return;
            }

            const data = await response.json();
            console.log(data);

            if(data.token)
            {
                login('user', data.token);
                navigate('/usuarios');

            }

    }
    catch(er)
    {
        console.error(er);
    }
}

    return(
        <>
                <h2>Login</h2>

                            <hr />
                <form onSubmit={handlerForm}>                                
                            <label htmlFor='email'>Email</label><input type="email" name="email" value={user.email} onChange={handlerChange}/>
                                    
                            <label htmlFor='password'>Password</label><input type="password" name="password" value={user.password} onChange={ handlerChange}/>

                            <button type='submit'>Ingresar </button>
                </form>
        </>
        
    )
};

export default Login;