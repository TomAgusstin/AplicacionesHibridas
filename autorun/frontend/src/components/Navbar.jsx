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
import Dashboard from '../views/Dashboard'

function Navbar() {
    // Ahora usamos el contexto para obtener el token
    const { token, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
        {
            token && <div className="d-flex flex-column flex-shrink-0 p-3 bg-primary" style={{ width: '280px', height: '100vh' }}>
            {/* Encabezado del Sidebar */}
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                {/* <img src="/uploads/isotipo.png" alt="" className='w-50' /> */}
                {/* <span className="fs-4">MasAuto</span> */}
                <img src="/uploads/imagotipo-masauto-negativo.png" alt="" className='w-75' />
            </a>
            <hr className='text-white' />

            {/* Menú de Navegación */}
            <ul className="nav nav-pills flex-column mb-auto">
                {/* Estos son ejemplos basados en tu imagen, puedes borrarlos o adaptarlos */}
                <li className="nav-item">
                    {/* Nota: react-router-dom v6 añade la clase 'active' automáticamente a NavLink */}
                    <NavLink to="/dashboard" className="nav-link text-white">
                        <i className="bi bi-house-door me-2"></i>
                        Dashboard
                    </NavLink>
                </li>

                {/* Aquí integramos tu lógica existente */}
                {token && (
                    <>
                        <li>
                            <NavLink to="/autos" className="nav-link text-white">
                                <i className="bi bi-grid me-2"></i>
                                Panel Autos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/usuarios" className="nav-link text-white">
                                <i className="bi bi-person-circle me-2"></i>
                                Panel usuarios
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/categorias" className="nav-link text-white">
                                <i className="bi bi-tag me-2"></i>
                                Panel categorias
                            </NavLink>
                        </li>
                    </>
                )}
                {!token && (
                     <li>
                        <NavLink to="/login" className="nav-link text-white">
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Login
                        </NavLink>
                    </li>
                )}
            </ul>
            <hr  className='text-white' />

            {/* Dropdown del Usuario */}
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    {/* Botón para cerrar sesión */}
                    {token && (
                        <li>
                            <button className="dropdown-item" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
        }
        

            <Routes>
                <Route path='/' element={<Login />} />
                   {/* Rutas de autos */}
                   <Route path='/autos' element=
                    {
                        <PrivateRoute>
                            <Cars />
                        </PrivateRoute>
                    } />
                
                             <Route path='/dashboard' element={<Dashboard />} />

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