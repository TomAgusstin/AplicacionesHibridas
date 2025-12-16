import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function TableCars(autos) {
    const navigate = useNavigate();
    const endPoint = import.meta.env.VITE_API_URL_CARS;
    const token = localStorage.getItem('token');
      const [showModal, setShowModal] = useState(false);
    const [autoToDelete, setAutoToDelete] = useState(null);

    async function deleteAuto(id) {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await fetch(`${endPoint}/${id}`, options);

            if (!response) {
                alert('Error al eliminar auto');
                return;
            }

            const { data } = await response.json();
            console.table(data);
        
            navigate('/autos' , {state: {
                    mensaje: 'Auto eliminado exitosamente',
                    tipo: 'alert-danger'
                }})

            // setUser({...user, nombre: '', email: '', password:''})
        }
        catch (er) {
            console.error(er);
        }
    }

const handleDeleteClick = (id) => {
        setAutoToDelete(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (autoToDelete) {
            deleteAuto(autoToDelete);
        }
        setShowModal(false);
        setAutoToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setAutoToDelete(null);
    };



    return (
        <>
            {
                                
                <tr key={autos._id}>
                    <td>{autos.marca}</td>
                    <td>{autos.modelo}</td>
                    <td>  
                            {autos.categoriaId.titulo} - {autos.categoriaId.estado}
                        </td>
                    <td>
                        <ul>
                            {autos.infoPrecio.map(precio => (
                                <li key={precio._id}>
                                    {precio.tipoCuota}: ${precio.precio.toLocaleString('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
                                </li>
                            ))}
                        </ul>
                    </td>
                    <td>{autos.alicuota.toLocaleString('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}</td>
                    <td>
                        <button className="btn btn-primary" type="button" onClick={() => { navigate(`/editarAuto/${autos._id}`) }}>
                            <i className="bi bi-pen"></i>
                        </button>
                    </td>
                    <td>
                        <button  className="btn btn-primary" type="button" onClick={() => handleDeleteClick(autos._id)}>
                           <i className="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>

            }



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
                                ¿Estás seguro de que deseas eliminar este auto?
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
}

export default TableCars;