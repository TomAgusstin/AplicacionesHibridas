import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import ProductsContainer from './components/ProductsContainer'

function App() {
  return (
    <>
    <ProductsContainer>
      <Card name="Teclado" price="1500"></Card>
      <Card name="Mouse" price="2500"></Card>
    
    </ProductsContainer>
    </>
  )
}

export default App
