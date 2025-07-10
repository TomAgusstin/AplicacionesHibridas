import React from "react";
import CarModal from "./CarModal";

function Card(props) {
    const urlImage = "/uploads/" + props.img;
    return (
        <>
                <div className="col-12 col-sm-6 col-md-4 col-xl-4 mb-4 d-flex p-4">
                    <div className="card card-home m-auto">
                        <img src={urlImage} className="card-img-top img-fluid" alt={props.alt} />
                        <div className="card-body d-grid">
                            <h5 className="card-title">{props.marca} {props.modelo}</h5>
                            {/* <p className="card-text">{props.infoPrecio}</p> */}
                            <p className="card-text fw-bold fs-6">Alicuota: $ {props.alicuota}</p>
                        
                        </div>
                                                  <button type="button" className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target={`#modalAuto${props._id}`}>
                                Ver mas
                            </button>
                    </div>
                    
                </div>
            <CarModal auto={props} modalId={`modalAuto${props._id}`} />

        </>
    )
}

export default Card;