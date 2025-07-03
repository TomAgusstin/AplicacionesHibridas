import Card from '../components/Card'
import ProductsContainer from '../components/ProductsContainer'
import { useState, useEffect } from 'react'
import TableCars from '../components/TableCars'
import { useNavigate } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import Alert from '../components/Alert'

function Cars() {
  const endpoint = 'http://localhost:3000/autos';
  const navigate = useNavigate();
  const [autos, setAutos] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const mensaje = '', tipoAlerta = '';

  async function getCars() {
    try {

      const response = await fetch(endpoint);

      if (!response) {
        console.error('Error obteniendo los autos');
        return;
      }

      if(localStorage.getItem('token') == null)
      {
        throw new Error('No estás autorizado. Iniciá sesión nuevamente.');
             
      }


      const { data } = await response.json();
      console.table(data);
      setAutos(data);
    }
    catch (ex) {
      console.error(ex);
      setError(ex);
    }
  };

  useEffect(() => {
    getCars();
  }, {})

  return (
    <>
      <h2>Cars</h2>
                  {error && <div className="alert alert-danger">{error}</div>}

      <hr />

           <ButtonPrimary
                    to="/nuevoAuto"
                    label="Nuevo auto"
                />
      <ProductsContainer>
                  {mensaje && <Alert
                                      tipoAlerta={tipo}
                                      texto={mensaje}
                                  />}                
        <table>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Alicuota</th>
              <th></th>
              <th></th>
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
                  categoriaId={a.categoriaId}
                  infoPrecio={a.infoPrecio}
                  _id={a._id}
                  setCars={setAutos}
                // price={product.price}
                />)
              )
            }
          </tbody>
        </table>

      </ProductsContainer>
    </>

  )
};

export default Cars;