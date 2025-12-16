import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ButtonPrimary from '../components/ButtonPrimary';
import Alert from '../components/Alert';

function Category() {

    const endPoint = import.meta.env.VITE_API_URL_CATEGORY;
    const [cat, setCat] = useState([]);
    // const [user, setUser] = useState({nombre: '', email: '', password:''});
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const location = useLocation();
    const mensaje = location.state?.mensaje;
    const tipo = location.state?.tipo;
    const [error, setError] = useState(null);
  const [sinDatos, setSinDatos] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    async function getCategorias() {
        try {

            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(endPoint, options);

            if (!response) {
                console.error('Error obteniendo las categorias');
                return;
            } else if(response.status === 404)
        {
          setSinDatos(true);        }
            const { data } = await response.json();
            console.table(data);
            setCat(data);
        }
        catch (ex) {
            console.error(error);
        }
    };

    async function deleteCat(id) {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await fetch(`${endPoint}/${id}`, options);

            if (!response) {
                console.error('Error al eliminar la categoria');
                return;
            }

            const { data } = await response.json();
            console.table(data);
            setError("Categoria eliminada con exito");
            getCategorias();
        }
        catch (er) {
            console.error(er);
        }
    }



    useEffect(() => {
        getCategorias();
    }, token)
    
const handleDeleteClick = (id) => {
        setCategoryToDelete(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (categoryToDelete) {
            deleteCat(categoryToDelete);
        }
        setShowModal(false);
        setCategoryToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setCategoryToDelete(null);
    };

    return (
        <>
            <div className="container-fluid">
                <h2>Panel de categorías</h2>
                <hr />

                {mensaje && <Alert
                    tipoAlerta={tipo}
                    texto={mensaje}
                    dismissAlert={mensaje}
                />}
                {error &&
                    <Alert
                        tipoAlerta="alert-danger"
                        texto={error}
                        dismissAlert={setError}
                    />
                }
                <div className="row">
                                      <div className="col-xs-12 col-md-12 col-lg-12 mt-5  m-auto">
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="m-3">
                                        <h5 className="mb-0 fs-4">
                                            <i className="bi bi-tag me-4"></i>
                                            Categorías
                                        </h5>
                                    </div>
                                    <div className="m-3 align-self-center">
                                        <ButtonPrimary
                                            to="/nuevaCategoria"
                                            label="Nueva Categoria"
                                        />
                                    </div>
                                </div>
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Titulo</th>
                                            <th>Estado</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sinDatos === true && <tr><td><span className='m-2'>No hay datos para mostrar</span></td></tr>}

                                        {
                                            cat != null && cat.map(c => (
                                                <tr key={c._id}>
                                                    <td>{c.titulo}</td>
                                                    <td>{c.estado}</td>
                                                    <td>
                                                        <button className='btn btn-primary' onClick={() => { navigate(`/editarCategoria/${c._id}`) }} >
                                                            <i className='bi bi-pen'></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-primary' onClick={() => handleDeleteClick(c._id)}>  <i className='bi bi-trash'></i></button>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div></div></div>
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
                                ¿Estás seguro de que deseas eliminar esta categoría?
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

export default Category;