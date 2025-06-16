import { useState } from 'react'

function CategoryNew()
{

const endPoint = 'http://127.0.0.1:3000/categorias';
const [cat, setCategory] = useState({titulio: '', estado: ''});

function handlerChange(e){
    const value = e.target.value;
    const key = e.target.name;
    
    setCategory({ ...cat, [key]: value});
    // console.log({user});
}

async function addCategory(event){
    event.preventDefault();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cat)
    }
    try{
       const response =  await fetch(endPoint, options);
       
       if(!response)
            {
                console.error('Error al guardar la categoria');
                return;
            }

            const {data} = await response.json();
            console.table(data);
            // getUsers();

            setCategory({...cat, titulio: '', estado: ''})
    }
    catch(er)
    {
        console.error(er);
    }
}


    return(
        <>
                <h2>Nueva categoria</h2>

                            <hr />
                <form onSubmit={addCategory}>
                            <label htmlFor='titulo'>Titulo</label><input type="text" name="titulo" value={cat.titulo} onChange={handlerChange}/>
                                
                            <label htmlFor='estado'>Email</label><input type="text" name="estado" value={cat.estado} onChange={handlerChange}/>
                        
                            <button type='submit'>Agregar categoria</button>
                </form>
        </>
        
    )
};

export default CategoryNew;