import React from "react";

function Card(props)
{
    function handlerAdd()
    {
        props.add(props.name);
    }

    return (
        <div className="card">
                   <h4>{props.name}</h4>
                   <p>{props.price}</p>
                    <button onClick={handlerAdd}>Quiero mas información</button>
        </div>
    )
}

export default Card;