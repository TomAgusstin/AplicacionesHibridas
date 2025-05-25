import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import ProductsContainer from './components/ProductsContainer'
import Header from './components/Header'

function App() {

  const price = 20;

  function saludar()
  {
    alert("HOLAAAAAa");
  }

  function addProduct(name)
  {
    alert(
      'Padre recibe el ' + name
    )
  }

  return (
    <>
    <Header></Header>

    <button type='button' onClick={saludar} >Saludaaar!!!</button>

    <ProductsContainer>
      <Card name="Teclado" price={price} add={addProduct}></Card>
      <Card name="Mouse" price="2500" add={addProduct}></Card>
    
    </ProductsContainer>
    </>
  )
}

export default App
