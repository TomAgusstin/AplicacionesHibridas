import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Alert from '../components/Alert';

function Login() {

    const endPoint = 'http://127.0.0.1:3000/users';
    const [user, setUser] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const location = useLocation();
    const mensaje = location.state?.mensaje;
    const tipo = location.state?.tipo;
    function handlerForm(e) {
        e.preventDefault();
        addUser(user);
    }

    function handlerChange(e) {
        const value = e.target.value;
        const key = e.target.name;

        setUser({ ...user, [key]: value });
    }

    async function addUser(user) {
        // event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        try {
            const response = await fetch(`${endPoint}/auth`, options);

            if (!response) {
                console.error('Error al ingresar usuario');
                throw new Error('Error al ingresar usuario');
            }

            else if(response.status === 404)
            {
              const errorData = await response.json();
              throw new Error('Error al iniciar sesion. ' + errorData.msg);
            }

            const data = await response.json();
            console.log(data);

            if (data.token) {
                login('user', data.token);
                navigate('/usuarios', {
                    state: {
                    mensaje: `Bienvenido ${data.data.nombre}`,
                    tipo: 'alert-success'
                }
                });
            }

        }
        catch (er) {
            console.error(er);
            setError(er.message);
        }
    }

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-6">

                         <h2>Login</h2>
                        {mensaje && <Alert
                                tipoAlerta={tipo}
                                texto={mensaje}
                            />}     

            <hr />
            <form onSubmit={handlerForm}>
                <div className="form-group">
                    <label htmlFor='email' className='form-label'>Email</label><input className='form-control' type="email" name="email" value={user.email} onChange={handlerChange} />

                </div>
                <div className="form-group">
                    <label htmlFor='password' className='form-label'>Password</label><input className='form-control' type="password" name="password" value={user.password} onChange={handlerChange} />

                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6 m-auto">
                        <button type='submit' className='btn btn-primary mt-3 w-100'>Ingresar </button>
                    </div>
                    

                </div>
                <div className='row mt-2'>
                                        <div className="col-xs-12 col-md-6 m-auto">
                                                                <button onClick={ () => { navigate('/nuevoUsuario')}} className='btn btn-secondary w-100'> Nuevo Usuario</button>

                    </div>
                </div>
                            {error && 
                            <Alert
                                tipoAlerta="alert-danger"
                                texto={error}
                                dismissAlert={setError}
                            />
                            }

            </form>

                </div>

                <div className="col-md-6 p-5">
             
                            <div className="row card w-100 d-flex flex-column justify-content-around">
                                <div className="col-12 mb-5">
                                    <div className="btn btn-primary w-100 d-flex flex-row m-auto align-items-center">
                                        <i className='bi bi-car-front-fill me-5 ms-2 fs-4'></i>
                                    Administrar autos
                                    </div>
                                    
                                </div>
                                <div className="col-12 mb-5">
                                       <div className="btn btn-primary w-100 d-flex flex-row m-auto align-items-center">
                                        <i className='bi bi-people-fill me-5 ms-2 fs-4'></i>
                                     Administrar usuarios
                                    </div>
                                </div>
                                <div className="col-12">
                                       <div className="btn btn-primary w-100 d-flex flex-row m-auto align-items-center">
                                        <i className='bi bi-tags-fill me-5 ms-2 fs-4'></i>
                                     Administrar categorias
                                    </div>
                                </div>
                            </div>

                </div>
            </div>

        </div>
           
        </>

    )
};

export default Login;