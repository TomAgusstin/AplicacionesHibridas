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
    const [showPassword, setShowPassword] = useState(false);

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

            else if (response.status === 404) {
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


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <>
            <div className="container-fluid w-100 p-0">

                <div className="d-flex justify-content-around h-100">

                    <div className="d-flex justify-content-center align-items-center flex-column">
                        {error &&
                            <Alert
                                tipoAlerta="alert-danger"
                                texto={error}
                                dismissAlert={setError}
                            />
                        }

                        <div className="w-75 card mb-2 d-flex justify-content-center align-items-center">
                            <img src="/uploads/imagotipo-masauto-original.png" alt="Logo de MasAuto" className='w-50 m-auto' />

                            <h2 className='w-75 border-bottom'>Login</h2>
                            {mensaje && <Alert
                                tipoAlerta={tipo}
                                texto={mensaje}
                            />}

                            <form onSubmit={handlerForm} className='w-75'>
                                <div className="form-group">
                                    <label htmlFor='email' className='form-label'>Email</label><input className='form-control' type="email" name="email" value={user.email} onChange={handlerChange} />

                                </div>

                                <label htmlFor='password' className='form-label mt-2'>Password</label>

                                <div className="input-group mt-">

                                    <input
                                        className='form-control'
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={user.password}
                                        onChange={handlerChange}
                                        placeholder="Ingresa tu contraseña"
                                    />
                                    <button
                                        className="btn"
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        <i className={`text-primary bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                    </button>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-md-6 m-auto">
                                        <button type='submit' className='btn btn-primary mt-3 w-100'>Ingresar </button>
                                    </div>
                                    <a className='text-center pt-4 text-primary mb-3' href="">Olvide mi contraseña</a>


                                </div>

                            </form>

                        </div>


                    </div>

                    <div className="w-50 bg-primary trama d-flex justify-content-center align-items-center">
                        <h2 className='text-white'>
                            Más confianza, más gestión, menos problemas.
                        </h2>

                    </div>
                </div>

            </div>

        </>

    )
};

export default Login;