import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';



function EditCategory (){
    const endpoint = 'http://127.0.0.1:3000/categorias'
    const [ cat, setCategory] = useState({titulio: '', estado: ''})
    const {id} = useParams();
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    async function getCategoryById(){
        try {
            const options = {
                 headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(`${endpoint}/${id}`, options);
            if( !response.ok){
                alert('Error al solicitar la categoria')
                return
            } 
            const {data} = await response.json();
            setCategory( data );
            
            console.log(data);
    
        } catch (error) {
            console.error(error);
            alert('Error en el servidor');
        }
    }
    useEffect(  () => {
       
        getCategoryById();

    }, [] )




    function handlerChange ( e) {
        setCategory({ ...user, [e.target.name]: e.target.value})
    }

    
async function editCat(e){
    e.preventDefault();
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    try{
       const response =  await fetch(`${endpoint}/${id}`, options);
       
       if(!response)
            {
                console.error('Error al editar usuario');
                return;
            }

            const data = await response.json();
           
            setCategory({...user, titulio: '', estado: ''});
            // Navegación 
            navigate('/categorias');
            // setUser({...user, nombre: '', email: '', password:''})
    }
    catch(er)
    {
        console.error(er);
    }
}



    return (
        <>
            <h2> Actualizar categorias {id}</h2>
            <hr />

            <form onSubmit={ editCat }>
                <label htmlFor="titulo">Titulo</label>
                <input
                    name='titulo' 
                    value={cat.titulo}
                    type="text" 
                    onChange={ handlerChange }
                />

                <label htmlFor="estado">Estado</label>
                <input 
                    name='estado'
                    value={cat.estado}
                    onChange={ handlerChange }
                    type="text" 
                />


                <button type='submit'>Guardar</button>
            </form>
        
        </>
    )
}

export default EditCategory;