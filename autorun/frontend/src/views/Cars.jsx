import Card from '../components/Card'
import { useState, useEffect } from 'react'
import TableCars from '../components/TableCars'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import Alert from '../components/Alert'

function Cars() {
  const endpoint = import.meta.env.VITE_API_URL_CARS;

  const [autos, setAutos] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const location = useLocation();
  const mensaje = location.state?.mensaje;
  const tipo = location.state?.tipo;
  const [sinDatos, setSinDatos] = useState(false);
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
        }
        else if(response.status === 404)
        {
          setSinDatos(true);        }
           else {
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

  const stats = [
    { title: '0km', value: '25', change: '+12%', icon: 'bi-car-front', color: 'white' },
    { title: 'Usados', value: '12', change: '+8%', icon: 'bi-car-front', color: 'white' },
    { title: 'Vendidos', value: '59', change: '-3%', icon: 'bi-car-front', color: 'white' },
    { title: 'En planes', value: '28', change: '+15%', icon: 'bi-car-front', color: 'white' }
  ];
  return (
    <>
      <div className='container-fluid'>
        <h2 className=''>Panel de autos</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <hr />
        <div className="row g-3 mb-3">
          {stats.map((stat, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm dashboard">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">{stat.title}</h4>
                    <i className={`bi ${stat.icon} fs-4 text-${stat.color}`}></i>
                  </div>
                  <h3 className="mb-1">{stat.value}</h3>
                  <span className={`badge bg-white bg-opacity-10 text-${stat.change.startsWith('+') ? 'success' : 'danger'}`}>
                    {stat.change} vs mes anterior
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mensaje && <Alert
          tipoAlerta={tipo}
          texto={mensaje}
        />}
        <div className="row">
                      <div className="col-xs-12 col-md-12 col-lg-12 mt-4 m-auto">
            <div className="card-body">
              <div className="table-responsive">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="m-3">
                    <h5 className="mb-0 fs-4">
                    <i className="bi bi-car-front me-4"></i>
                    Autos
                  </h5>
                  </div>
                  <div className="m-3 align-self-center">
                    <ButtonPrimary
                    to="/nuevoAuto"
                    label="Nuevo auto"
                />
                  </div>
                </div>
                <table className="table table-hover mb-0">
                  <thead className="table-light">
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
                    {sinDatos === true && <tr><td><span className='m-2'>No hay datos para mostrar</span></td></tr>}
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
            </div>
          </div>
        </div>

      </div>

    </>

  )
};

export default Cars;