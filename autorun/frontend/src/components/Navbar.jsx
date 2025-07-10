import Home from '../views/Home'
import Cars from '../views/Cars'
import Users from '../views/Users'
import Login from '../views/Login'
import UserNew from '../views/UserNew'
import EditUser from '../views/EditUser'
import CarNew from '../views/CarNew'
import EditCar from '../views/EditCar'
import CategoryNew from '../views/CategoryNew'
import EditCategory from '../views/EditCategory'
import Category from '../views/Category'
import { AuthProvider, AuthContext } from '../context/AuthContext'
import PrivateRoute from '../utils/PrivateRoutes'
import { Routes, Route, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import Contacto from '../views/Contacto'
import NotFound from '../views/NotFound'

function Navbar() {
    // Ahora usamos el contexto para obtener el token
    const { token, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand img-fluid" href="#">
                        <img src="/uploads/imagotipo-autorun.png" alt="Imagotipo de AUTORUN SRL" className='w-50' />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className='navbar-nav'>
                            <li className='nav-item'><NavLink className='nav-link' to="/">Inicio</NavLink></li>
                            <li className='nav-item'><NavLink className='nav-link' to="/contacto">Contacto</NavLink></li>
                            {
                                token && (
                                    <>
                                        <li className='nav-item'><NavLink className='nav-link' to="/autos">Panel Autos</NavLink></li>
                                        <li className='nav-item'><NavLink className='nav-link' to="/usuarios">Panel usuarios</NavLink></li>
                                        <li className='nav-item'><NavLink className='nav-link' to="/categorias">Panel categorias</NavLink></li>
                                        <li className='nav-item'>
                                            <button className='nav-link btn btn-link' onClick={handleLogout}>
                                                Cerrar Sesión
                                            </button>
                                        </li>
                                    </>
                                )
                            }
                            {
                                !token && (
                                    <li className='nav-item'><NavLink className='nav-link' to="/login">Login</NavLink></li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path='/' element={<Home />} />
                   {/* Rutas de autos */}
                   <Route path='/autos' element=
                    {
                        <PrivateRoute>
                            <Cars />
                        </PrivateRoute>
                    } />
                
             
                <Route path='/nuevoAuto' element={
                    <PrivateRoute><CarNew /></PrivateRoute>
                    } />
                <Route path='/editarAuto/:id' element={<PrivateRoute><EditCar /></PrivateRoute>} />
                <Route path='/usuarios' element=
                    {
                        <PrivateRoute>
                            <Users />
                        </PrivateRoute>
                    }
                />
                {/* Rutas de categorias */}
                <Route path='/categorias' element=
                    {
                        <PrivateRoute>
                            <Category />
                        </PrivateRoute>
                    }
                />

                    <Route path='/nuevaCategoria' element={
                        <PrivateRoute>
                                <CategoryNew />
                        </PrivateRoute>
                        } />
                   
                
                <Route path='/editarCategoria/:id' element={
                    <PrivateRoute>
                        <EditCategory />
                        </PrivateRoute>
                    }
                     />
                <Route path='/contacto' element={<Contacto />} />

                {/* Rutas de usuarios */}
                <Route path='/nuevoUsuario' element={
                    <UserNew />
                    } />
                <Route path='/actualizarUsuario/:id' element={<PrivateRoute><EditUser /></PrivateRoute>} />

                <Route path='/login' element={<Login />} />


             
                    
                <Route path='*' element={ <NotFound />} />
            </Routes>
        </>
    )
}

// Componente wrapper que provee el contexto
function NavbarWithProvider() {
    return (
        <AuthProvider>
            <Navbar />
        </AuthProvider>
    );
}

export default NavbarWithProvider;