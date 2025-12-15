import { useState } from 'react'
import CategoryForm from '../components/CategoryForm';
import { useNavigate, useLocation } from 'react-router-dom';


function CategoryNew()
{
const navigate = useNavigate();
const endPoint = 'http://127.0.0.1:3000/categorias';
const token = localStorage.getItem('token');
async function addCategory(categoryData){

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
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
        navigate('/categorias', {
                state: {
                    mensaje: 'Categoria agregada exitosamente',
                    tipo: 'alert-success'
                }
            });
    }
    catch(er)
    {
        console.error(er);
    }
}


    return(
        <><div className="container-fluid">


                <CategoryForm onSubmit={addCategory} 
                isEditing={false}
                loading={false} />
                </div>
        </>
        
    )
};

export default CategoryNew;