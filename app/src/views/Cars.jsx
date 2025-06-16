import Card from '../components/Card'
import ProductsContainer from '../components/ProductsContainer'
import { useState, useEffect } from 'react'
import TableCars from '../components/TableCars'
import { useNavigate } from 'react-router-dom'

function Cars() {
  const endpoint = 'http://localhost:3000/autos';
  const navigate = useNavigate();
  const [autos, setAutos] = useState([]);


  async function getCars() {
    try {

      const response = await fetch(endpoint);

      if (!response) {
        console.error('Error obteniendo los autos');
        return;
      }

      const { data } = await response.json();
      console.table(data);
      setAutos(data);
    }
    catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    getCars();
  }, {})
  return (
    <>
      <h2>Cars</h2>

      <hr />
      <div>
        <button type='button' onClick={() => navigate('/nuevoAuto')}>Agregar auto</button>
      </div>
      <ProductsContainer>

        <table>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Categoria</th>
              <th>Alicuota</th>
            </tr>
          </thead>

          <tbody>
            {autos != null &&
              autos.map(a => (
                <TableCars
                  key={a._id}
                  marca={a.marca}
                  modelo={a.modelo}
                  alicuota={a.alicuota}
                  _id={a._id}

                // price={product.price}
                />)
              )
            }
          </tbody>
        </table>



        {/* <form action="" onSubmit={nuevoProducto}>

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
    </form> */}

      </ProductsContainer>
    </>

  )
};

export default Cars;