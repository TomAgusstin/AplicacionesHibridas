import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditCar (){
    const endpoint = 'http://127.0.0.1:3000/autos'
    const [ car, setCar] = useState({marca: '', modelo: '', categoriaId: '', infoPrecio: '', alicuota: '', img: '', alt: ''})
    const {id} = useParams();
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    async function getCarById(){
        try {
            const options = {
                 headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(`${endpoint}/${id}`, options);
            if( !response.ok){
                // alert('Error al solicitar el auto')
                navigate('/')
            } 
            const {data} = await response.json();
            setCar( data );
            
            console.log(data);
    
        } catch (error) {
            console.error(error);
            alert('Error en el servidor');
        }
    }
    useEffect(  () => {
       
        getCarById();

    }, [] )




    function handlerChange ( e) {
        setCar({ ...car, [e.target.name]: e.target.value})
    }

    
async function setEditCar(e){
    e.preventDefault();
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    }
    try{
       const response =  await fetch(`${endpoint}/${id}`, options);
       
       if(!response)
            {
                console.error('Error al editar auto');
                return;
            }

            const data = await response.json();
           
            setCar({...user, marca: '', modelo: ''});
            // Navegación 
            navigate('/autos');
    }
    catch(er)
    {
        console.error(er);
    }
}



    return (
        <>
            <h2> Actualizar Auto {id}</h2>
            <hr />

            <form onSubmit={ setEditCar }>
                <label htmlFor="marca">Marca</label>
                <input
                    name='marca' 
                    value={car.marca}
                    type="text" 
                    onChange={ handlerChange }
                />

                <label htmlFor="modelo">Modelo</label>
                <input 
                    name='modelo'
                    value={car.modelo}
                    onChange={ handlerChange }
                    type="text" 
                />

                <label htmlFor="categoria">Categoria</label>
               {/* Tengo que hacer un select que me recopile el idCategoria y me muestra el nombre */}

                <label htmlFor="marca">Info. Precio</label>
                <input
                    name='infoPrecio' 
                    value={car.infoPrecio}
                    type="text" 
                    onChange={ handlerChange }
                />

                       <label htmlFor="alicuota">Alicuota</label>
                <input
                    name='alicuota' 
                    value={car.alicuota}
                    type="text" 
                    onChange={ handlerChange }
                />
    
                       <label htmlFor="img">Imagen</label>
                <input
                    name='img' 
                    value={car.img}
                    type="text" 
                    onChange={ handlerChange }
                />
                       <label htmlFor="alt">Texto de imagen</label>
                <input
                    name='alt' 
                    value={car.alt}
                    type="text" 
                    onChange={ handlerChange }
                />
                
                <button type='submit'>Guardar auto</button>
            </form>
        
        </>
    )
}

export default EditCar;