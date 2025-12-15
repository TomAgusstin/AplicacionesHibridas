import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CategoryForm from '../components/CategoryForm';

function EditCategory() {
    const endpoint = 'http://127.0.0.1:3000/categorias'
    const [cat, setCategory] = useState({ titulo: '', estado: '' })
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function getCategoryById() {
        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(`${endpoint}/${id}`, options);
            if (!response.ok) {
                alert('Error al solicitar la categoria')
                return
            }
            const { data } = await response.json();
            setCategory(data);
            console.log(data);

        } catch (error) {
            console.error(error);
            alert('Error en el servidor');
        }
    }

    useEffect(() => {
        getCategoryById();
    }, [])

    // Función corregida - recibe categoryData del formulario
    async function editCat(categoryData) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(categoryData) // Usar categoryData, no cat
        }
        try {
            const response = await fetch(`${endpoint}/${id}`, options);

            if (!response.ok) {
                console.error('Error al editar categoria');
                alert('Error al editar categoria');
                return;
            }

            const data = await response.json();
            console.log('Categoria actualizada:', data);
            
            // Navegación 
            navigate('/categorias', {
                state: {
                    mensaje: 'Categoria editada exitosamente',
                    tipo: 'alert-success'
                }
            });
        }
        catch (er) {
            console.error(er);
            alert('Error en el servidor');
        }
    }

    return (
        <>
            <div className="container-fluid">
               {
               cat.titulo && (
                    <CategoryForm 
                        onSubmit={editCat}
                        initialData={cat}
                        buttonText="Actualizar categoria"
                        isEditing={true}
                    />
                )
                }
            </div>
        </>
    )
}

export default EditCategory;