import React from "react";

function Card(props)
{
    return (
        <div className="card">
                   <h4>{props.name}</h4>
                   <p>{props.price}</p>

        </div>
    )
}

export default Card;