import React from 'react';

function CarModal({ auto, modalId }) {
  console.log(auto.categoriaId)
  return (
    <div 
      className="modal fade" 
      id={modalId} 
      tabIndex="-1" 
      aria-labelledby={`${modalId}Label`} 
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header text-white bg-primary">
            <h5 className="modal-title" id={`${modalId}Label`}>
              {auto.marca} {auto.modelo}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <strong>Categoría:</strong> {auto.categoriaId} <br />
                <strong>Alícuota:</strong> {auto.alicuota} <br />
                <strong>Alt:</strong> {auto.alt}
              </div>
              <div className="col-md-6">
                <strong>Precios:</strong>
                <ul>
                  {auto.infoPrecio.map((info, index) => (
                    <li key={index}>
                      {info.tipoCuota}: ${info.precio}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {auto.img && (
              <div className="mt-3 d-flex">
                <img 
                  src={`/uploads/${auto.img}`} 
                  alt={auto.alt} 
                  className="img-fluid rounded w-25 m-auto"
                />
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarModal;