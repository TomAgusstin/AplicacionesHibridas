import { useState } from 'react'
import UserForm from '../components/UserForm';
import { useNavigate } from 'react-router-dom';
function UserNew() {
    const token = localStorage.getItem('token');
    const endPoint = 'http://127.0.0.1:3000/users';
    const [user, setUser] = useState({ nombre: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    function handlerChange(e) {
        
        const value = e.target.value;
        const key = e.target.name;

        setUser({ ...user, [key]: value });
        console.log({ user });
    }

    async function addUser(event) {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        try {
            const response = await fetch(endPoint, options);

            if (!response) {
                console.error('Error al guardar usuario');
                const errorData = await response.json();
                throw new Error(errorData.msg);
            }

            const { data } = await response.json();
            console.table(data);
            setUser({ ...user, nombre: '', email: '', password: '' })

            if(token)
            {
                navigate('/usuarios', {
                state: {
                    mensaje: 'Usuario agregado exitosamente',
                    tipo: 'alert-success'
                }
            });
            }
            else
            {
                navigate('/login', {
                    state: {
                    mensaje: 'Usuario agregado exitosamente',
                    tipo: 'alert-success'                    }
                })
            }
              
        }
        catch (er) {
            setError(er.message);
            console.error(er);
        }
    }


    return (
        <>
        {/* <div className="container">
            <h2>Nuevo usuario</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

            <hr />
            <form onSubmit={addUser}>
                <div className="form-group">
                    <label htmlFor='nombre' className='form-label'>Nombre</label><input className='form-control' type="text" name="nombre" value={user.nombre} onChange={handlerChange} />
                </div>
                <div className="form-group">
                    <label htmlFor='email' className='form-label'>Email</label><input className='form-control' type="email" name="email" value={user.email} onChange={handlerChange} />

                </div>
                <div className="form-group">
                    <label htmlFor='password' className='form-label'>Password</label><input className='form-control' type="password" name="password" value={user.password} onChange={handlerChange} />

                </div>



                <button type='submit' className='btn btn-primary'>Agregar usuario</button>
            </form>
        </div> */}
            <UserForm
            user={user}
            handlerChange={handlerChange}
            onSubmit={addUser}
            error={error}
            isEditing={false}
        />
        </>

    )
};

export default UserNew;