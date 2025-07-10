
import React, { useState } from 'react';

    function Contacto() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        consulta: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensaje enviado!');
        setFormData({ name: '', email: '', consulta: '' });
    };
        return (
            <>
                <div className="container py-5">
                    <div className="row">
                        {/* Formulario de contacto */}
                        <div className="col-md-6">
                            <div className="card w-100">
                                <div className="card-body">
                                    <h3 className="card-title mb-4">Contacto</h3>

                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="consulta" className="form-label">Consulta</label>
                                        <textarea
                                            className="form-control"
                                            id="consulta"
                                            name="consulta"
                                            rows="4"
                                            value={formData.consulta}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                    >
                                       <i className='bi bi-envelope-arrow-up-fill me-3'></i> Enviar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mapa y redes sociales */}
                        <div className="col-md-6">
                            <h3 className='text-center mb-3'>Donde encontrarnos</h3>
                            {/* Google Maps iframe */}
                            <div className="mb-4">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168861262937!2d-58.38157498477025!3d-34.60373798045851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacb9f8ff113%3A0x22fd0f8c6d0a5b0a!2sObelisco!5e0!3m2!1ses!2sar!4v1635789012345!5m2!1ses!2sar"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>

                            {/* Redes sociales */}
                            <div className="d-flex align-items-center justify-content-between gap-3">
                                <h4>Nuestras redes</h4>
                                <a href="https://facebook.com" className="btn w-15" target="_blank">
                                    <img src="/uploads/facebook.png" alt="Red de facebook" className='img-fluid' />
                                </a>
                                <a href="https://instagram.com" className="btn w-15" target="_blank">
                                    <img src="/uploads/instagram-autorun.png" alt="Red de instagram" className='img-fluid' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    export default Contacto