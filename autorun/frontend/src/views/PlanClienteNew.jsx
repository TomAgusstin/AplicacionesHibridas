import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert';

function PlanClienteNew() {
    const endpoint = import.meta.env.VITE_API_URL_PLANS;
    const endpointAutos = import.meta.env.VITE_API_URL_CARS;
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [autos, setAutos] = useState([]);
    const [planSeleccionado, setPlanSeleccionado] = useState(null);


    async function getCars() {
        try {

            const response = await fetch(endpointAutos);

            if (!response.ok) {
                if (response.status === 403) {
                    localStorage.removeItem('token');
                    throw new Error('Acceso denegado. No tenés permiso para ver esta información (su sesión expiro o no tiene permiso).');
                } else if (response.status === 401) {
                    localStorage.removeItem('token');
                    throw new Error('No estás autorizado. Iniciá sesión nuevamente.');
                }
                else if (response.status === 404) {
                    setSinDatos(true);
                }
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

    const handleSeleccionarPlan = (auto) => {
        setPlanSeleccionado({
            planId: auto._id,
            clienteId: id,
            modelo: auto.modelo,
            marca: auto.marca
        });
    };

    async function handleAceptar(){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(planSeleccionado)
        }

        try {
            const response = await fetch(endpoint, options);

            if (!response) {
                console.error('Error al guardar el plan');
                const errorData = await response.json();
                throw new Error(errorData.msg);
            }

            const { data } = await response.json();

                navigate('/clientes', {
                    state: {
                    mensaje: 'Plan agregado exitosamente',
                    tipo: 'alert-success'                    }
                })
              
        }
        catch (er) {
            setError(er.message);
            console.error(er);
        }
        
    };
    
    
    useEffect(() => {
        getCars();

    }, [])

    return (
        <>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col-12 col-lg-12">
                        <div className="card shadow-sm w-100">
                            <div className="card-header bg-primary text-white">
                                <h4 className="card-title mb-0">
                                    <i className="bi bi-person me-2"></i>
                                    Nuevo plan
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

                                {/* Información de Usuario */}
                                <div className="row mb-4">
                                    <div className="col-xs-12 col-md-12 col-lg-12">
                                        <strong>Planes disponibles</strong>

                                        <div className="mt-3 table-responsive">
                                            <table className="table table-hover">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th></th>
                                                        <th>Marca</th>
                                                        <th>Modelo</th>
                                                        <th>Precio</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {autos.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="6" className="text-center text-muted py-4">
                                                                No hay planes disponibles
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        autos.map((auto) => (
                                                            <tr
                                                                key={auto._id}
                                                                onClick={() => handleSeleccionarPlan(auto)}
                                                                style={{ cursor: 'pointer' }}
                                                                className={planSeleccionado?._id === auto._id ? 'table-active' : ''}
                                                            >
                                                                <td className="text-center">
                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name="planRadio"
                                                                            checked={planSeleccionado?._id === auto._id}
                                                                            onChange={() => { }}
                                                                            style={{ cursor: 'pointer' }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td><strong>{auto.marca}</strong></td>
                                                                <td>{auto.modelo}</td>
                                                                <td>
                                                                    <ul>
                                                                        {auto.infoPrecio.map(precio => (
                                                                            <li key={precio._id}>
                                                                                {precio.tipoCuota}: ${precio.precio.toLocaleString('es-AR', {
                                                                                    minimumFractionDigits: 2,
                                                                                    maximumFractionDigits: 2,
                                                                                })}
                                                                            </li>
                                                                        ))}
                                                                    </ul></td>

                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {planSeleccionado && (
                                            <div className="alert alert-info mt-3">
                                                <i className="bi bi-info-circle me-2"></i>
                                                <strong>Plan seleccionado:</strong> {planSeleccionado.marca} {planSeleccionado.modelo}
                                            </div>
                                        )}
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

                                        <button onClick={() => handleAceptar()} className="btn btn-primary px-4">

                                            <i className="bi bi-check-lg me-2"></i>
                                            Aceptar

                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PlanClienteNew;