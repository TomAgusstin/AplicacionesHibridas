import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { useState } from 'react'
import { AuthProvider, AuthContext} from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoutes'
import { useContext } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './views/Home'
import Cars from './views/Cars'
import Users from './views/Users'
import Login from './views/Login'
import UserNew from './views/UserNew'
import EditUser from './views/EditUser'
import CarNew from './views/CarNew'
import EditCar from './views/EditCar'
import CategoryNew from './views/CategoryNew'
import EditCategory from './views/EditCategory'
import Category from './views/Category'

function App() {
  const token = localStorage.getItem('token');
  // const {logout} = useContext(AuthContext);

  return (
    <>
    <Header titulo='AUTORUN'></Header>
    {/* <button type='button' onClick={saludar} >Saludaaar!!!</button> */}
    <nav>
      <ul>
        <li><NavLink to="/">Inicio</NavLink></li>
        {
          token != null && (
            <>
            <li><NavLink to="/autos">Panel Autos</NavLink></li>
            <li><NavLink to="/usuarios">Panel usuarios</NavLink></li>
            <li><NavLink to="/categorias">Panel categorias</NavLink></li>
            </>
            
          )
        }
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </nav>

<AuthProvider>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/autos' element=
      {
        <PrivateRoute>
          <Cars/>
        </PrivateRoute>
        }/>

      <Route path='/usuarios' element=
        {
          <PrivateRoute>
            <Users/>
          </PrivateRoute>
        }
      />

      <Route path='/categorias' element=
        {
          <PrivateRoute>
            <Category/>
          </PrivateRoute>
        }
      />

      {/* Rutas de usuarios */}
      <Route path='/nuevoUsuario' element={ <UserNew/> } />
      <Route path='/actualizarUsuario/:id' element={ <EditUser/> } />
      
      <Route path='/login' element={<Login/>}/>

        {/* Rutas de autos */}
      
      <Route path='/nuevoAuto' element={ <CarNew/> } />
      <Route path='/editarAuto/:id' element={ <EditCar/> } />

      {/* Rutas de categorias */}
            <Route path='/nuevaCategoria' element={ <CategoryNew/> } />
      <Route path='/editarCategoria/:id' element={ <EditCategory/> } />
    </Routes>
</AuthProvider>

    
    </>
  )
}

export default App
