import Card from '../components/Card'
import ProductsContainer from '../components/ProductsContainer'
import { useState, useEffect } from 'react'
import TableCars from '../components/TableCars'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import Alert from '../components/Alert'

function Cars() {
  const endpoint = 'http://localhost:3000/autos';

  const [autos, setAutos] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const location = useLocation();
const mensaje = location.state?.mensaje;
const tipo = location.state?.tipo;

  async function getCars() {
    try {

      const response = await fetch(endpoint);

           if (!response.ok) {
                if (response.status === 403) {
                    localStorage.removeItem('token');
                    throw new Error('Acceso denegado. No tenés permiso para ver esta información (su sesión expiro o no tiene permiso).');
                } else if (response.status === 401) {
                    localStorage.removeItem('token');
                    throw new Error('No estás autorizado. Iniciá sesión nuevamente.');
                } else {
                    throw new Error(`Error inesperado: ${response.status}`);
                }
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
  }, [location.state], {})

  return (
    <>
      <h2>Panel de autos</h2>
                  {error && <div className="alert alert-danger">{error}</div>}

      <hr />

           <ButtonPrimary
                    to="/nuevoAuto"
                    label="Nuevo auto"
                />
                                  {mensaje && <Alert
                                      tipoAlerta={tipo}
                                      texto={mensaje}
                                  />}               
      <ProductsContainer>
                                    
      <div className="table-scroll">
                    <table className='m-auto'>
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
            </div>
      </ProductsContainer>
    </>

  )
};

export default Cars;