import { useState, useEffect } from 'react'

function CarForm({ 
    mode = 'create', // 'create' o 'edit'
    initialData = null,
    onSuccess = () => {},
    onCancel = () => {},
    backUrl = '/usuarios'
}) {
    const endPoint = import.meta.env.VITE_API_URL_CARS;
    const endPointCategorias = import.meta.env.VITE_API_URL_CATEGORY;
    
    const defaultCar = { 
        marca: '', 
        modelo: '', 
        categoriaId: '', 
        infoPrecio: [{ precio: '', tipoCuota: '' }], 
        alicuota: '', 
        img: '', 
        alt: '' 
    };

    const [car, setCar] = useState(initialData || defaultCar);
    const [cat, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Configuración según el modo
    const isEditMode = mode === 'edit';
    const title = isEditMode ? 'Editar Vehículo' : 'Agregar Nuevo Vehículo';
    const submitText = isEditMode ? 'Actualizar Vehículo' : 'Agregar Vehículo';
    const successMessage = isEditMode ? '¡Auto actualizado exitosamente!' : '¡Auto agregado exitosamente!';

    async function getCategorias() {   
        try {
            const response = await fetch(endPointCategorias);
            
            if (!response.ok) {
                console.error('Error obteniendo las categorías');
                setMessage({ type: 'error', text: 'Error al cargar las categorías' });
                return;
            }
            
            const { data } = await response.json();
            console.table(data);
            setCategorias(data);
        }
        catch (ex) {
            console.error(ex);
            setMessage({ type: 'error', text: 'Error de conexión al cargar categorías' });
        }
    }

    function handlerChange(e) {
        const value = e.target.value;
        const key = e.target.name;

        setCar({ ...car, [key]: value });
        console.log({ car });
        
        // Limpiar mensajes cuando el usuario empiece a escribir
        if (message.text) {
            setMessage({ type: '', text: '' });
        }
    }

    function handleInfoPrecioChange(index, field, value) {
        const updatedInfoPrecio = [...car.infoPrecio];
        updatedInfoPrecio[index][field] = value;
        setCar({ ...car, infoPrecio: updatedInfoPrecio });
    }

    function addInfoPrecio() {
        setCar({
            ...car,
            infoPrecio: [...car.infoPrecio, { precio: '', tipoCuota: '' }]
        });
    }

    function removeInfoPrecio(index) {
        if (car.infoPrecio.length > 1) {
            const updatedInfoPrecio = car.infoPrecio.filter((_, i) => i !== index);
            setCar({ ...car, infoPrecio: updatedInfoPrecio });
        }
    }

    function resetForm() {
        setCar(initialData || defaultCar);
        setMessage({ type: '', text: '' });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const url = isEditMode ? `${endPoint}/${car._id}` : endPoint;
        const method = isEditMode ? 'PUT' : 'POST';

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                const errorData = await response.json();
                setMessage({ 
                    type: 'error', 
                    text: errorData.message || `Error al ${isEditMode ? 'actualizar' : 'guardar'} el auto` 
                });
                return;
            }

            const { data } = await response.json();
            console.table(data);
            
            // Solo resetear formulario si es modo crear
            if (!isEditMode) {
                resetForm();
            }
            
            setMessage({ 
                type: 'success', 
                text: successMessage
            });

            // Llamar callback de éxito
            onSuccess(data);

        } catch (er) {
            console.error(er);
            setMessage({ 
                type: 'error', 
                text: 'Error de conexión. Intenta nuevamente.' 
            });
        } finally {
            setLoading(false);
        }
    }

    // Efecto para cargar categorías al montar el componente
    useEffect(() => {
        getCategorias();
    }, []);

    // Efecto para actualizar el estado cuando cambian los datos iniciales (útil para edición)
    useEffect(() => {
        if (initialData) {
            setCar(initialData);
        }
    }, [initialData]);
          
    return (
        <div className="container-fluid p-4 d-flex justify-content-center align-items-center">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card shadow-sm w-100">
                        <div className="card-header bg-primary text-white">
                            <h4 className="card-title mb-0">
                                <i className="bi bi-car-front me-2"></i>
                                {title}
                            </h4>
                        </div>
                        <div className="card-body">
                            {/* Mensajes de estado */}
                            {message.text && (
                                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                                    <i className={`bi ${message.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                                    {message.text}
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={() => setMessage({ type: '', text: '' })}
                                    ></button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Información Básica */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5 className="text-muted border-bottom pb-2 mb-3">
                                            <i className="bi bi-info-circle me-2"></i>
                                            Información Básica
                                        </h5>
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="marca" className="form-label fw-semibold">
                                            Marca <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="marca"
                                            name="marca"
                                            value={car.marca}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ej: Toyota, Ford, Chevrolet"
                                            onChange={handlerChange}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="modelo" className="form-label fw-semibold">
                                            Modelo <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="modelo"
                                            name="modelo"
                                            value={car.modelo}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ej: Corolla, Focus, Cruze"
                                            onChange={handlerChange}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="categoria" className="form-label fw-semibold">
                                            Categoría <span className="text-danger">*</span>
                                        </label>
                                        <select 
                                            id="categoria"
                                            name="categoriaId"
                                            className="form-select"
                                            onChange={handlerChange}
                                            value={car.categoriaId}
                                            required
                                            disabled={loading}
                                        >
                                            <option value="">Seleccionar categoría...</option>
                                            {cat != null && cat.map(c => (
                                                <option key={c._id} value={c._id}>
                                                    {c.titulo} / {c.estado}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="alicuota" className="form-label fw-semibold">
                                            Alícuota
                                        </label>
                                        <input
                                            id="alicuota"
                                            name="alicuota"
                                            value={car.alicuota}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ej: 21%, 10.5%"
                                            onChange={handlerChange}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                {/* Información de Precios */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5 className="text-muted border-bottom pb-2 mb-3">
                                            <i className="bi bi-currency-dollar me-2"></i>
                                            Información de Precios
                                        </h5>
                                    </div>
                                    
                                    <div className="col-12">
                                        {car.infoPrecio.map((info, index) => (
                                            <div key={index} className="mb-3 border-light">
                                                <div className="">
                                                    <div className="row align-items-end">
                                                        <div className="col-md-5 mb-2">
                                                            <label className="form-label fw-semibold">Tipo de Cuota</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Ej: Contado, 12 cuotas, 24 cuotas"
                                                                value={info.tipoCuota}
                                                                onChange={(e) => handleInfoPrecioChange(index, 'tipoCuota', e.target.value)}
                                                                disabled={loading}
                                                            />
                                                        </div>
                                                        <div className="col-md-5 mb-2">
                                                            <label className="form-label fw-semibold">Precio</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text">$</span>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="0.00"
                                                                    value={info.precio}
                                                                    onChange={(e) => handleInfoPrecioChange(index, 'precio', e.target.value)}
                                                                    min="0"
                                                                    step="0.01"
                                                                    disabled={loading}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2 mb-2">
                                                            <button 
                                                                type="button" 
                                                                className="btn btn-outline-danger w-100"
                                                                onClick={() => removeInfoPrecio(index)}
                                                                title="Eliminar cuota"
                                                                disabled={loading || car.infoPrecio.length <= 1}
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-primary"
                                            onClick={addInfoPrecio}
                                            disabled={loading}
                                        >
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Agregar Cuota
                                        </button>
                                    </div>
                                </div>

                                {/* Información de Imagen */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5 className="text-muted border-bottom pb-2 mb-3">
                                            <i className="bi bi-image me-2"></i>
                                            Información de Imagen
                                        </h5>
                                    </div>
                                    
                                    <div className="col-md-8 mb-3">
                                        <label htmlFor="img" className="form-label fw-semibold">
                                            URL de Imagen
                                        </label>
                                        <input
                                            id="img"
                                            name="img"
                                            value={car.img}
                                            type="text"
                                            className="form-control"
                                            placeholder="/src/img/imagen.jpg"
                                            onChange={handlerChange}
                                            disabled={loading}
                                        />
                                        <div className="form-text">
                                            Ingresa la URL completa de la imagen del vehículo
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="alt" className="form-label fw-semibold">
                                            Texto Alternativo
                                        </label>
                                        <input
                                            id="alt"
                                            name="alt"
                                            value={car.alt}
                                            type="text"
                                            className="form-control"
                                            placeholder="Descripción de la imagen"
                                            onChange={handlerChange}
                                            disabled={loading}
                                        />
                                        <div className="form-text">
                                            Para accesibilidad
                                        </div>
                                    </div>
                                </div>

                                {/* Botones de Acción */}
                                <div className="row">
                                    <div className="col-12">
                                        <hr />
                                        <a href={backUrl} type='button' className='btn btn-secondary mt-4 float-start'>
                                            Volver
                                        </a>
                                        <div className="d-flex justify-content-end gap-2">
                                            {!isEditMode && (
                                                <button 
                                                    type="button" 
                                                    className="btn btn-secondary"
                                                    onClick={resetForm}
                                                    disabled={loading}
                                                >
                                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                                    Limpiar
                                                </button>
                                            )}
                                            {isEditMode && (
                                                <button 
                                                    type="button" 
                                                    className="btn btn-secondary"
                                                    onClick={onCancel}
                                                    disabled={loading}
                                                >
                                                    <i className="bi bi-x-circle me-2"></i>
                                                    Cancelar
                                                </button>
                                            )}
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary px-4"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        {isEditMode ? 'Actualizando...' : 'Guardando...'}
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className={`bi ${isEditMode ? 'bi-check-lg' : 'bi-check-lg'} me-2`}></i>
                                                        {submitText}
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

export default CarForm;