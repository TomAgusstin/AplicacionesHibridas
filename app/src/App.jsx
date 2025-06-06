import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './views/Home'
import Cars from './views/Cars'
import Users from './views/Users'


function App() {

  // let nombre = 'Jose';

  let  [nombre, setNombre] = useState('Pepito');
  
  let persona = {
    nombre: 'pepe', email: 'pepe@gmail.com', edad: 25
  };

  const price = 20;

  function cambiarNombre()
  {
    setNombre('El Pantus');
  }

  return (
    <>
    <Header></Header>

    {/* <button type='button' onClick={saludar} >Saludaaar!!!</button> */}
    <h4>Benvenuto {nombre}</h4>
    <button onClick={cambiarNombre}>Cambiar nombre</button>

    <nav>
      <ul>
        <li><NavLink to="/">Inicio</NavLink></li>
        <li><NavLink to="/autos">Autos</NavLink></li>
        <li><NavLink to="/usuarios">Usuarios</NavLink></li>
      </ul>
    </nav>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/autos' element={<Cars/>}/>
      <Route path='/usuarios' element={<Users/>}/>
    </Routes>

    
    </>
  )
}

export default App
