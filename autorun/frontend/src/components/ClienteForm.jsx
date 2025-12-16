import React from 'react';
import { Link } from 'react-router-dom';
const ClienteForm = ({ 
    user, 
    handlerChange, 
    onSubmit, 
    error, 
    isEditing = false,
    userId = null,
    loading = false
}) => {
    return (
    <div className="container-fluid p-4 ">
        <div className="row d-flex justify-content-center">
            <div className="col-12 col-lg-12">
                <div className="card shadow-sm w-100">
                    <div className="card-header bg-primary text-white">
                        <h4 className="card-title mb-0">
                            <i className="bi bi-person me-2"></i>
                            {isEditing ? `Actualizar cliente ${userId}` : 'Agregar nuevo cliente'}
                        </h4>
                    </div>

                    <div className="card-body">
                        {/* Mostrar alertas */}
                        {error && (
                            
                            <div className="alert alert-danger alert-dismissible fade show" data-bs-dismiss="alert" aria-label="Close" role="alert">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {error}
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setError('')}
                                ></button>
                            </div>
                        )}
            
                        <form onSubmit={onSubmit}>
                            {/* Información de Usuario */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h5 className="text-muted border-bottom pb-2 mb-3">
                                        <i className="bi bi-info-circle me-2"></i>
                                        Información de cliente
                                    </h5>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="nombre" className="form-label fw-semibold">
                                        Nombre <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        value={user.nombre || ''}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: Juan"
                                        onChange={handlerChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                       <div className="col-md-6 mb-3">
                                    <label htmlFor="apellido" className="form-label fw-semibold">
                                        Apellido <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="apellido"
                                        name="apellido"
                                        value={user.apellido || ''}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej:Pérez"
                                        onChange={handlerChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                        <div className="col-md-6 mb-3">
                                    <label htmlFor="dni" className="form-label fw-semibold">
                                        DNI <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="dni"
                                        name="dni"
                                        value={user.dni || ''}
                                        type="dni"
                                        className="form-control"
                                        placeholder="123456789"
                                        onChange={handlerChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">
                                        Email <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        value={user.email || ''}
                                        type="email"
                                        className="form-control"
                                        placeholder="usuario@dominio.com"
                                        onChange={handlerChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                      <div className="col-md-6 mb-3">
                                    <label htmlFor="rol" className="form-label fw-semibold">
                                        Celular <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="celular"
                                        name="celular"
                                        value={user.celular || ''}
                                        type=""
                                        className="form-control"
                                        placeholder="1112345678"
                                        onChange={handlerChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
      
                            </div>

                            {/* Botones de acción */}
                            <div className="row">
                                <div className="col-12">
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                   <Link to={backUrl} type='button' className='btn btn-secondary mt-4 float-start'>
                                                                            Volver
                                                                        </Link>

                                        <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    {isEditing ? 'Actualizando...' : 'Agregando...'}
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-check-lg me-2"></i>
                                                    {isEditing ? 'Actualizar cliente' : 'Agregar cliente'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default ClienteForm;