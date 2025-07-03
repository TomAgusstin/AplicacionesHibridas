import React from "react";

function Card(props)
{
    return (
        <>

            <div className="card">
            <img src={props.img} className="card-img-top img-fluid" alt={props.alt}/>
            <div className="card-body">
                <h5 className="card-title">{props.marca}</h5>
                <h5 className="card-title">{props.modelo}</h5>
                {/* <p className="card-text">{props.infoPrecio}</p> */}
                <p className="card-text">$ {props.alicuota}</p>
                
                <a href="#" className="btn btn-primary">Contactenos</a>
            </div>
            </div>

        </>
    )
}

export default Card;