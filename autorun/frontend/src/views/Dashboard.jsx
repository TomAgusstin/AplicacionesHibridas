import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ButtonPrimary from '../components/ButtonPrimary';
import Alert from '../components/Alert';
// let users = [{id: 1, nombre: 'Tom', email: 'asd@gmail.com'},
//                 {id:2, nombre: 'Lu', email: 'asdasd@gmail.com'}
// ]

function Dashboard() {

  const endPoint = 'http://127.0.0.1:3000/users';
  const [users, setUsers] = useState([]);
  // const [user, setUser] = useState({nombre: '', email: '', password:''});
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);

  const location = useLocation();
  const mensaje = location.state?.mensaje;
  const tipo = location.state?.tipo;

  async function getUsers() {
    try {

      const options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await fetch(endPoint, options);

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
      setUsers(data);
    }
    catch (ex) {
      console.error(ex);
      setError(ex.message);
    }
  };

  async function deleteUser(id) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(`${endPoint}/${id}`, options);

      if (!response) {
        console.error('Error al eliminar usuario');
        return;
      }

      const { data } = await response.json();
      console.table(data);

      setError("Usuario eliminado con exito");
      getUsers();
      console.log(error)
      // setUser({...user, nombre: '', email: '', password:''})
    }
    catch (er) {
      console.error(er);
    }
  }

  useEffect(() => {
    getUsers();

  }, token)

  const stats = [
    { title: 'Ventas', value: '$45,231', change: '+12%', icon: 'bi-graph-up', color: 'white' },
    { title: 'Clientes', value: '2,340', change: '+8%', icon: 'bi-people', color: 'white' },
    { title: 'Planes 0km', value: '456', change: '-3%', icon: 'bi-car-front', color: 'white' },
    { title: 'Facturado', value: '$23,890', change: '+15%', icon: 'bi-currency-dollar', color: 'white' }
  ];

  const recentOrders = [
    { id: '#1234', cliente: 'Juan Pérez', monto: '$150.000,00', estado: 'Completado', fecha: '18/11/2025' },
    { id: '#1235', cliente: 'María García', monto: '$230.000,00', estado: 'Pendiente', fecha: '18/11/2025' },
    { id: '#1236', cliente: 'Carlos López', monto: '$89.000,00', estado: 'Completado', fecha: '17/11/2025' },
    { id: '#1237', cliente: 'Ana Martínez', monto: '$340.000,00', estado: 'En proceso', fecha: '17/11/2025' }
  ];

  const activities = [
    { text: 'Nuevo plan ingresado', time: 'Hace 5 min', icon: 'bi-cart-plus', color: 'success' },
    { text: 'Cliente registrado', time: 'Hace 15 min', icon: 'bi-person-plus', color: 'info' },
    { text: 'Pago procesado', time: 'Hace 1 hora', icon: 'bi-cash-coin', color: 'secondary' },
    { text: 'Auto actualizado', time: 'Hace 2 horas', icon: 'bi-car-front', color: 'warning' }
  ];

  const deudores = [
    { id: '#1234', cliente: 'Juan Pérez', monto: '$150.000,00', estado: 'Adeuda', fecha: '18/11/2025' },
    { id: '#1235', cliente: 'María García', monto: '$230.000,00', estado: 'Adeuda', fecha: '18/11/2025' },
    { id: '#1236', cliente: 'Carlos López', monto: '$89.000,00', estado: 'Adeuda', fecha: '17/11/2025' },
    { id: '#1237', cliente: 'Ana Martínez', monto: '$340.000,00', estado: 'Adeuda', fecha: '17/11/2025' }
  ];

  return (
    <>
      <div className='container-fluid'>
        <h2>Dashboard</h2>
        <hr />

        <div className="row g-3 mb-4">
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


        <div className="row">
          {/* Recent Orders */}
          <div className="col-md-8 col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-receipt me-2"></i>
                  Seguimiento de pagos
                </h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index}>
                          <td className="fw-bold">{order.id}</td>
                          <td>{order.cliente}</td>
                          <td className="fw-bold text-success">{order.monto}</td>
                          <td>
                            <span className={`badge bg-${order.estado === 'Completado' ? 'success' :
                                order.estado === 'Pendiente' ? 'warning' : 'info'
                              }`}>
                              {order.estado}
                            </span>
                          </td>
                          <td className="text-muted">{order.fecha}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="col-md-4 col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-activity me-2"></i>
                  Actividad Reciente
                </h5>
              </div>
              <div className="card-body">
                {activities.map((activity, index) => (
                  <div key={index} className={`d-flex align-items-start ${index < activities.length - 1 ? 'mb-3' : ''}`}>
                    <div className={`rounded-circle bg-${activity.color} bg-opacity-10 p-2 me-3`}>
                      <i className={`bi ${activity.icon} text-${activity.color}`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-1 small">{activity.text}</p>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-receipt me-2"></i>
                  Clientes con deuda
                </h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deudores.map((order, index) => (
                        <tr key={index}>
                          <td className="fw-bold">{order.id}</td>
                          <td>{order.cliente}</td>
                          <td className="fw-bold text-success">{order.monto}</td>
                          <td>
                            <span className={`badge bg-danger`}>
                              {order.estado}
                            </span>
                          </td>
                          <td className="text-muted">{order.fecha}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>

  )
};

export default Dashboard;