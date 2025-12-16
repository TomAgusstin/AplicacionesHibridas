import { useState, useEffect } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom';

function CarNew() {
    const endPoint = import.meta.env.VITE_API_URL_CARS;
    const endPointCategorias = import.meta.env.VITE_API_URL_CATEGORY;
    const [car, setCar] = useState({ 
        marca: '', 
        modelo: '', 
        categoriaId: '', 
        infoPrecio: [{ precio: '', tipoCuota: '' }], 
        alicuota: '', 
        img: '', 
        alt: '' 
    });
    const [cat, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [loadingModels, setLoadingModels] = useState(false);
    const navigate = useNavigate();
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

    // 1. Cargar las Marcas al iniciar el componente
    useEffect(() => {
        const fetchMakes = async () => {
            setLoading(true);
            try {
                // Pedimos solo las marcas de tipo "car" para no traer camiones/motos
                const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
                const data = await response.json();
                
                // La API devuelve muchas, ordenamos alfabéticamente para facilitar la búsqueda
                const sortedMakes = data.Results.sort((a, b) => a.MakeName.localeCompare(b.MakeName));
                setMakes(sortedMakes);
            } catch (error) {
                console.error("Error cargando marcas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMakes();
    }, []);

    // 2. Función especial para cuando cambia la Marca
    const handleMarcaChange = async (e) => {
        const marcaSeleccionada = e.target.value;

        // Actualizamos el estado del formulario y reseteamos el modelo
        setCar({ ...car, marca: marcaSeleccionada, modelo: '' });
        setModels([]); // Limpiamos modelos anteriores

        if (marcaSeleccionada) {
            setLoadingModels(true);
            try {
                const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${marcaSeleccionada}?format=json`);
                const data = await response.json();
                setModels(data.Results);
            } catch (error) {
                console.error("Error cargando modelos:", error);
            } finally {
                setLoadingModels(false);
            }
        }
    };

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

        const handlerFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setCar({ ...car, img: file });
  };

    async function addCar(event) {
        event.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        console.log(car);
        const formData = new FormData();
        formData.append('img', car.img);
        formData.append('marca', car.marca);
        formData.append('modelo', car.modelo);
        formData.append('infoPrecio', JSON.stringify(car.infoPrecio));
        formData.append('categoriaId', car.categoriaId);
        formData.append('alicuota', car.alicuota);
        formData.append('alt', car.alt);

        console.log(formData)

        const options = {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json'
            },
            body: formData
        }

        try {
            const response = await fetch(endPoint, options);

            if (!response.ok) {
                const errorData = await response.json();
                setMessage({ 
                    type: 'error', 
                    text: errorData.message || 'Error al guardar el auto' 
                });
                return;
            }

            const { data } = await response.json();
            console.log(data);
            
            // Resetear formulario
            setCar({ 
                marca: '', 
                modelo: '', 
                categoriaId: '', 
                infoPrecio: [{ precio: '', tipoCuota: '' }], 
                alicuota: '', 
                img: '', 
                alt: '' 
            });
            
            // setMessage({ 
            //     type: 'success', 
            //     text: '¡Auto agregado exitosamente!' 
            // });

            navigate('/autos', {state: {
                    mensaje: 'Auto agregado exitosamente',
                    tipo: 'alert-success'
                }})


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

    useEffect(() => {
        getCategorias();
    }, []);
          
    return (
       <div className="container-fluid p-4">
            <div className="row justify-content-center">
                    <div className="col-12 col-lg-12">
                    <div className="card shadow-sm w-100">
                        <div className="card-header bg-primary text-white">
                            <h4 className="card-title mb-0">
                                <i className="bi bi-car-front me-2"></i>
                                Agregar Nuevo Vehículo
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

                            <form onSubmit={addCar}>
                                {/* Información Básica */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5 className="text-muted border-bottom pb-2 mb-3">
                                            <i className="bi bi-info-circle me-2"></i>
                                            Información Básica
                                        </h5>
                                    </div>
                                    
                                    {/* <div className="col-md-6 mb-3">
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
                                    </div> */}

                                    <div className="col-md-6 mb-3">
                <label htmlFor="marca" className="form-label fw-semibold">
                    Marca <span className="text-danger">*</span>
                </label>
                <select
                    id="marca"
                    name="marca"
                    value={car.marca}
                    className="form-select" // Bootstrap usa form-select para combos
                    onChange={handleMarcaChange}
                    required
                    disabled={loading}
                >
                    <option value="">Selecciona una marca...</option>
                    {makes.map((make) => (
                        <option key={make.MakeId} value={make.MakeName}>
                            {make.MakeName}
                        </option>
                    ))}
                </select>
                {loading && <small className="text-muted">Cargando marcas...</small>}
            </div>

            {/* SELECT DE MODELO */}
            <div className="col-md-6 mb-3">
                <label htmlFor="modelo" className="form-label fw-semibold">
                    Modelo <span className="text-danger">*</span>
                </label>
                <select
                    id="modelo"
                    name="modelo"
                    value={car.modelo}
                    className="form-select"
                    onChange={handlerChange}
                    required
                    disabled={!car.marca || loadingModels} // Desactivado si no hay marca
                >
                    <option value="">Selecciona un modelo...</option>
                    {models.map((model, index) => (
                        // Usamos index + Model_ID como key porque a veces la API repite IDs en variantes
                        <option key={`${model.Model_ID}-${index}`} value={model.Model_Name}>
                            {model.Model_Name}
                        </option>
                    ))}
                </select>
                {loadingModels && <small className="text-muted">Cargando modelos...</small>}
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
                                            // value={car.img}
                                            type="file"
                                            className="form-control"
                                            placeholder="/src/img/imagen.jpg"
                                            onChange={handlerFileChange}
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
     
                                        <div className="gap-2">
                                      <Link to={backUrl} type='button' className='btn btn-secondary mt-4 float-start'>
                                                                               Volver
                                                                           </Link>
                            
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary px-4 float-end"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Guardando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-check-lg me-2"></i>
                                                        Agregar Vehículo
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

export default CarNew;