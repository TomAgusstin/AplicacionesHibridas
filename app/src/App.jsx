import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import NavbarWithProvider from './components/Navbar'
import { useState } from 'react'
import { useContext } from 'react'
import Footer from './components/Footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'


function App() {
  // const {logout} = useContext(AuthContext);

  return (
    <>
    <div className="app-container">
      <NavbarWithProvider />
    </div>
    <Footer></Footer>
    </>
  )
}

export default App
