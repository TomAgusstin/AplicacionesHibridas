function Contacto()
{

    return(
<div className="container py-5">
      <div className="row">
        {/* Formulario de contacto */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Contacto</h3>
              
              <div className="mb-3">
                <label htmlFor="name" className="form-label">NOMBRE</label>
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
                <label htmlFor="email" className="form-label">EMAIL</label>
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
                <label htmlFor="consulta" className="form-label">CONSULTA</label>
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
                ENVIAR
              </button>
            </div>
          </div>
        </div>

        {/* Mapa y redes sociales */}
        <div className="col-md-6">
          {/* Google Maps iframe */}
          <div className="mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168861262937!2d-58.38157498477025!3d-34.60373798045851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacb9f8ff113%3A0x22fd0f8c6d0a5b0a!2sObelisco!5e0!3m2!1ses!2sar!4v1635789012345!5m2!1ses!2sar"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          {/* Redes sociales */}
          <div className="d-flex gap-3">
            <a href="https://facebook.com" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} className="me-2" />
              Facebook
            </a>
            <a href="https://instagram.com" className="btn btn-danger" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} className="me-2" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
    )


}

export default Contacto