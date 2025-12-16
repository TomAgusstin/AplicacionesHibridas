import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ButtonPrimary from '../components/ButtonPrimary';
import Alert from '../components/Alert';
// let users = [{id: 1, nombre: 'Tom', email: 'asd@gmail.com'},
//                 {id:2, nombre: 'Lu', email: 'asdasd@gmail.com'}
// ]

function Users()
{

const endPoint = import.meta.env.VITE_API_URL_USERS;
const [users, setUsers] = useState([]);
// const [user, setUser] = useState({nombre: '', email: '', password:''});
const navigate = useNavigate();
const {logout} = useContext(AuthContext);
const token = localStorage.getItem('token');
const [error, setError] = useState(null);
  const [sinDatos, setSinDatos] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [empleadoToDelete, setEmpleadoToDelete] = useState(null);
const location = useLocation();
const mensaje = location.state?.mensaje;
const tipo = location.state?.tipo;

async function getUsers(){
    try{
        
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
                }else      if (response.status === 404) {
                setSinDatos(true);
            } else {
                    throw new Error(`Error inesperado: ${response.status}`);
                }
            }

    
            const {data} = await response.json();
            console.table(data);
            setUsers(data);

    }
    catch(ex)
    {
        console.error(ex);
        setError(ex.message);
    }
};

async function deleteUser(id){
    const options = {
        method: 'DELETE',
        headers: {
                    Authorization: `Bearer ${token}`
                }
    }
    try{
       const response =  await fetch(`${endPoint}/${id}`, options);
       
       if(!response)
            {
                console.error('Error al eliminar usuario');
                return;
            }
            const {data} = await response.json();
            console.table(data);

            setError("Usuario eliminado con exito");
            getUsers();
            console.log(error)
            // setUser({...user, nombre: '', email: '', password:''})
    }
    catch(er)
    {
        console.error(er);
    }
}

useEffect(  () => {
    getUsers();

}, token)


const handleDeleteClick = (id) => {
        setEmpleadoToDelete(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (empleadoToDelete) {
            deleteUser(empleadoToDelete);
        }
        setShowModal(false);
        setEmpleadoToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setEmpleadoToDelete(null);
    };

const stats = [
    { title: 'Sin vender', value: '2', change: '+12%', icon: 'bi-people', color: 'white' },
    { title: 'Con seguimiento', value: '5', change: '+8%', icon: 'bi-people', color: 'white' },
    { title: 'Con planes activos', value: '10', change: '-3%', icon: 'bi-people', color: 'white' },
    { title: 'Facturado total', value: '$230.458.450,45', change: '+15%', icon: 'bi-currency-dollar', color: 'white' }
  ];
    return(
        <>
        <div className='container-fluid'>
              <h2>Panel de empleados</h2>
                <hr />
                   <div className="row g-3 mb-3">
              {stats.map((stat, index) => (
                <div key={index} className="col-12 col-sm-6 col-lg-3">
                  <div className="card border-0 shadow-sm dashboard">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className=" mb-0">{stat.title}</h4>
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
                   <div className="row">  {error && <Alert
                                tipoAlerta="alert-danger"
                                texto={error}
                                
                            />}
            {mensaje && <Alert
                                tipoAlerta={tipo}
                                texto={mensaje}
                            />}     
                            </div>
          
                            <div className="row">
                               <div className="col-xs-12 col-md-12 col-lg-12 mt-4  m-auto">
                 <div className="card-body">
                  <div className="table-responsive">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="m-3">
                    <h5 className="mb-0 fs-4">
                    <i className="bi bi-person-circle me-4"></i>
                    Empleados
                  </h5>
                  </div>
                  <div className="m-3 align-self-center">
                   <ButtonPrimary
                    to="/nuevoUsuario"
                    label="Nuevo empleado"
                />
                  </div>
                </div>
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
              <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                                            {sinDatos === true && <tr><td><span className='m-2'>No hay datos para mostrar</span></td></tr>}

                              {
                                users != null && users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.nombre}</td>
                                    <td>{user.email}</td>
                                    <td>{user.rol}</td>
                                    <td>
                                    <button className='btn btn-primary' onClick={() => {navigate(`/actualizarUsuario/${user._id}`)}} >
                                        <i className='bi bi-pen'></i>
                                    </button>
                                    </td>
                                    <td>
                                    <button className='btn btn-primary' onClick={() => handleDeleteClick(user._id)}><i className='bi bi-trash'></i></button>
                                    </td>
                                </tr>
                                ))
                            }
                        
                    </tbody>
                </table>
                </div>
                
                </div>
                </div>
                              </div>           
               
                                

        </div>
              
     {/* Modal de Confirmación */}
            <div 
                className={`modal fade ${showModal ? 'show' : ''}`} 
                style={{ display: showModal ? 'block' : 'none' }}
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmar Eliminación</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={handleCancelDelete}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center mb-3">
                                <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
                            </div>
                            <p className="text-center">
                                ¿Estás seguro de que deseas eliminar este empleado?
                            </p>
                            <p className="text-center text-muted small">
                                Esta acción no se puede deshacer.
                            </p>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={handleCancelDelete}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={handleConfirmDelete}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Backdrop del modal */}
            {showModal && (
                <div 
                    className="modal-backdrop fade show" 
                    onClick={handleCancelDelete}
                ></div>
            )}
        </>
        
    )
};

export default Users;