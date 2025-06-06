import Card from '../components/Card'
import ProductsContainer from '../components/ProductsContainer'
import { useState } from 'react'

function Cars()
{

  const [product, setProduct] = useState({
    nombre: '',
    price: '',
    description: ''
  });
  
  const [ products, setProducts ] = useState( [
    { id:1, name: 'Celular Samsung', description: 'Celular Samsung A16 Dual Sim', price: 50000 },
    { id:2, name: 'Celular Motorola', description: 'Celular Motorola G15 Dual Sim', price: 75000 },
    { id:3, name: 'Mouse', description: 'Mouse gamer', price: 10000 }
  ])

    function addProduct(name)
  {
    alert(
      'Padre recibe el ' + name
    )
  }


  function nuevoProducto(e){
      e.preventDefault();
    const id = products.length + 1;
    const name = product.name;
    const price = product.price;
    const description = product.description;
    const nuevo =  { id, name, price, description };
    setProducts( [...products, nuevo] );

    setProduct({...product, nombre: '', price: '', description: ''})
  }


    return(
        <>
                <h2>Cars</h2>


                <ProductsContainer>
      {
         products.map( product =>  (
            <Card
              key={ product.id}
              add={ addProduct } 
              name={product.name} 
              description={product.description} 
              price={product.price}
              />) 
            )
      }
    

    <form action="" onSubmit={nuevoProducto}>

      <div>
        <label htmlFor="">Nombre</label>
        <input type="text" name="" id="" value={product.name} placeholder='Nombre' onChange={(e)=> { setProduct({...product, nombre: e.target.value})}}/>
      </div>
      <div>
        <label htmlFor="">Precio</label>
        <input type="number" name="" id="" value={product.price} placeholder='$' onChange={(e)=> { setProduct({...product, price: e.target.value})}}/>
      </div>
       <div>
        <label htmlFor="">Descripcion</label>
        <input type="text" name="" id="" value={product.description} placeholder='Descripcion' onChange={(e)=> { setProduct({...product, description: e.target.value})}}/>
      </div>

      <button type='submit'>Guardar</button>
    </form>

    </ProductsContainer>
        </>
        
    )
};

export default Cars;