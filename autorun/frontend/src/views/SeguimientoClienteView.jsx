import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert';

function SeguimientoCliente() {
    const endpoint = import.meta.env.VITE_API_URL_PLANS;
    const endpointAutos = import.meta.env.VITE_API_URL_CARS;

    const [cliente, setCliente] = useState({ nombre: '', apellido: '', dni: '', email: '', celular: '' });
    const [planes, setPlanes] = useState([]); const { id } = useParams();
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [autos, setAutos] = useState([]);
    const [planSeleccionado, setPlanSeleccionado] = useState(null);

    async function getPlanesByIdCliente() {
        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(`${endpoint}/${id}`, options);

            if (!response.ok) {

                if (response.status === 404) {
                    console.log("No encontrado");
                    return
                }
                // alert('Error al solicitar los planes')
                // return
            }
            const { data } = await response.json();
            // Setear los datos por separado
            setCliente(data.cliente);
            setPlanes(data.planes || []); // Si viene null, usar array vacío

            console.log(data);

        } catch (error) {
            console.error(error);
            alert('Error en el servidor');
        }
    }

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
    useEffect(() => {

        getPlanesByIdCliente();
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
                                    Seguimiento de cliente
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
                                    <div className="col-12">
                                        <h5 className="text-muted border-bottom pb-2 mb-3">
                                            <i className="bi bi-info-circle me-2"></i>
                                            Información de {cliente.nombre} {cliente.apellido}
                                        </h5>
                                    </div>
                                    <div className="col-xs-12 col-md-12 col-lg-12">
                                        <strong>Planes vigentes</strong>
                                         {planes.length === 0 ? (
                                                            <strong colSpan="6" className="text-center text-muted py-4">
                                                                Sin plan vigente
                                                            </strong>
                                                    ) : (
                                        <div className="mt-3 table-responsive">
                                            <table className="table table-hover">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Marca</th>
                                                        <th>Modelo</th>
                                                        <th>Precio</th>
                                                    </tr>
                                                </thead>
                                               <tbody>
    {planes.map((plan) => (
        <tr
            key={plan._id}
            style={{ cursor: 'pointer' }}
        >

           <td><strong>{plan.planId.marca}</strong></td>
                <td>{plan.planId.modelo}</td>
                <td>
                    {plan.planId.infoPrecio?.length > 0 ? (
                        <ul className="mb-0 ps-3">
                            {plan.planId.infoPrecio.map((precio, index) => (
                                <li key={index}>
                                    <strong>{precio.tipoCuota}:</strong> ${precio.precio.toLocaleString('es-AR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-muted">Sin precios</span>
                    )}
                </td>
           
        </tr>
    ))}
</tbody>
                                            </table>
                                        </div>
                                                    )}
                                    </div>
                                </div>

              {/* Botones de acción */}
                            <div className="row">
                                <div className="col-12">
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <a href="/clientes" className="btn btn-secondary">
                                            <i className="bi bi-arrow-left me-2"></i>
                                            Volver
                                        </a>

                                        <button onClick={() => {navigate(`/nuevoPlan/${cliente._id}`)}} className="btn btn-primary px-4">

                                            <i className="bi bi-plus-lg me-2"></i>
                                            Nuevo plan

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

export default SeguimientoCliente;