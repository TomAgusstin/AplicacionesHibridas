import { useState } from 'react';
import { NavLink } from 'react-router-dom';
function CategoryForm({ onSubmit, initialData = { titulo: '', estado: '' }, buttonText = 'Agregar categoria', isEditing, loading }) {
    
    const [cat, setCat] = useState(initialData);
    function handlerChange(e) {
        const value = e.target.value;
        const key = e.target.name;
        setCat({ ...cat, [key]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(cat);
    }

   return (
    <div className="p-4">
        <div className="row d-flex justify-content-center">
            <div className="col-12 col-lg-12">
                <div className="card shadow-sm w-100">
                    <div className="card-header bg-primary text-white">
                        <h4 className="card-title mb-0">
                            <i className="bi bi-tags me-2"></i>
                            {isEditing ? `Actualizar Categoría ${cat._id}` : 'Agregar Nueva Categoría'}
                        </h4>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {/* Información de Categoría */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h5 className="text-muted border-bottom pb-2 mb-3">
                                        <i className="bi bi-info-circle me-2"></i>
                                        Información de Categoría
                                    </h5>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="titulo" className="form-label fw-semibold">
                                        Título <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="titulo"
                                        name="titulo"
                                        value={cat.titulo}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: Autos, Camionetas, Motos"
                                        onChange={handlerChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="estado" className="form-label fw-semibold">
                                        Estado <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="estado"
                                        name="estado"
                                        value={cat.estado}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: Activo, Inactivo"
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
                                      <NavLink to='/categorias' type='button' className='btn btn-secondary mt-4 float-start'>
                                                                               Volver
                                                                           </NavLink>

                                        <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Guardando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-check-lg me-2"></i>
                                                    {buttonText}
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

}

export default CategoryForm;